# Deploy em VM Debian

Este projeto é uma aplicação React/Vite estática. Em produção, ela pode ser servida por Nginx sem Node rodando em segundo plano.

## Requisitos da VM

- Debian 12 ou superior.
- Acesso SSH com usuário que possa usar `sudo`.
- Porta `80` liberada no firewall/security group.
- Opcional: domínio apontando para o IP da VM.

## Subir o projeto para a VM

No seu computador, compacte a pasta do projeto sem `node_modules`:

```bash
tar --exclude=node_modules --exclude=dist -czf cipolatti-rh.tar.gz .
```

Envie para a VM:

```bash
scp cipolatti-rh.tar.gz usuario@IP_DA_VM:/tmp/
```

Na VM:

```bash
sudo mkdir -p /opt/cipolatti-rh
sudo tar -xzf /tmp/cipolatti-rh.tar.gz -C /opt/cipolatti-rh
cd /opt/cipolatti-rh
```

## Instalar e publicar

Para publicar usando o IP da VM:

```bash
sudo bash deploy/install-debian.sh
```

Para publicar com domínio:

```bash
sudo SITE_DOMAIN=rh.seudominio.com.br bash deploy/install-debian.sh
```

Rotas principais:

- Site público: `http://IP_DA_VM/`
- Vagas: `http://IP_DA_VM/vagas`
- Faça sua avaliação: `http://IP_DA_VM/faca-sua-avaliacao`
- Painel RH/Admin: `http://IP_DA_VM/painel-rh`

## Atualizar uma nova versão

Envie os arquivos novos para `/opt/cipolatti-rh` e rode novamente:

```bash
cd /opt/cipolatti-rh
sudo bash deploy/install-debian.sh
```

O script recompila o projeto, substitui os arquivos publicados e recarrega o Nginx.

## HTTPS

Depois de validar o site em HTTP, instale certificado com Certbot:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d rh.seudominio.com.br
```

## Observação importante

Esta versão ainda é um protótipo frontend. Os dados ficam no navegador/estado da aplicação e as credenciais do painel estão no código. Antes de uso real com dados de candidatos, conecte backend, banco PostgreSQL, autenticação segura, armazenamento de arquivos e variáveis de ambiente.
