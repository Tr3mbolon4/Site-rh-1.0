# CIPOLATTI RH

Sistema web responsivo para RH, recrutamento e seleção da CIPOLATTI.

## Rodar localmente

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5188 --strictPort
```

Acesse: http://127.0.0.1:5188

Painel RH/Admin restrito: http://127.0.0.1:5188/painel-rh

Credenciais de protótipo:

- Usuário Administrador geral: `admin`
- Senha Administrador geral: `admin2026`
- Usuário: `rh`
- Senha: `cipolatti2026`

## Entregue nesta versão

- Home pública com identidade visual baseada no ícone CIPOLATTI.
- Listagem pública de vagas com busca, filtro por cidade e setor.
- Página individual de vaga com perguntas inteligentes por tipo de vaga.
- Formulário de candidatura com dados pessoais, profissionais, uploads e aceite LGPD.
- Painel administrativo RH com dashboard, vagas, candidatos, funil Kanban, entrevistas, avaliações, desligamentos e permissões.
- Painel RH oculto no site público e disponível apenas por tela de login restrita.
- Perfis finais: Administrador geral, RH, Gestor de setor, Diretoria e Consulta/leitura.
- Exportação de aprovados para arquivo `.xlsx`.
- Layout responsivo para computador, tablet e celular.

## Próxima etapa recomendada

Conectar a interface a um backend com autenticação, PostgreSQL, armazenamento real de arquivos, envio de e-mail e integração futura com WhatsApp.

## Deploy em VM Debian

Arquivos prontos em [deploy](G:/Site-rh/deploy):

- [install-debian.sh](G:/Site-rh/deploy/install-debian.sh): instala dependências, gera build e publica no Nginx.
- [nginx-cipolatti.conf](G:/Site-rh/deploy/nginx-cipolatti.conf): configuração Nginx com fallback para rotas React.
- [README-debian.md](G:/Site-rh/deploy/README-debian.md): passo a passo para subir na VM.

Resumo na VM:

```bash
cd /opt/cipolatti-rh
sudo SITE_DOMAIN=rh.seudominio.com.br bash deploy/install-debian.sh
```
