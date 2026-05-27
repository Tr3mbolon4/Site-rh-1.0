#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${APP_NAME:-cipolatti-rh}"
APP_DIR="${APP_DIR:-/var/www/${APP_NAME}}"
SITE_DOMAIN="${SITE_DOMAIN:-_}"
NGINX_SITE="/etc/nginx/sites-available/${APP_NAME}"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ "$(id -u)" -ne 0 ]; then
  echo "Execute como root: sudo bash deploy/install-debian.sh"
  exit 1
fi

echo "==> Atualizando pacotes do Debian"
apt-get update
apt-get install -y ca-certificates curl gnupg nginx rsync

if ! command -v node >/dev/null 2>&1 || ! node -e "process.exit(Number(process.versions.node.split('.')[0]) >= 20 ? 0 : 1)"; then
  echo "==> Instalando Node.js 22.x"
  install -d -m 0755 /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" > /etc/apt/sources.list.d/nodesource.list
  apt-get update
  apt-get install -y nodejs
fi

echo "==> Instalando dependencias do projeto"
cd "${PROJECT_DIR}"
npm ci

echo "==> Validando e gerando build"
npm run lint
npm run build

echo "==> Publicando arquivos em ${APP_DIR}/current"
mkdir -p "${APP_DIR}/current"
rsync -a --delete "${PROJECT_DIR}/dist/" "${APP_DIR}/current/"
chown -R www-data:www-data "${APP_DIR}"

echo "==> Configurando Nginx"
cp "${PROJECT_DIR}/deploy/nginx-cipolatti.conf" "${NGINX_SITE}"
sed -i "s/server_name _;/server_name ${SITE_DOMAIN};/" "${NGINX_SITE}"
ln -sfn "${NGINX_SITE}" "/etc/nginx/sites-enabled/${APP_NAME}"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl reload nginx

echo "==> Deploy concluido"
echo "Site: http://${SITE_DOMAIN}"
echo "Painel RH/Admin: http://${SITE_DOMAIN}/painel-rh"
