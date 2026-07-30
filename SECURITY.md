# Politica de seguranca

## Dados que nao devem ser versionados

- Arquivos `.env` reais.
- Senhas, tokens e credenciais de acesso ao painel.
- Dados reais de candidatos, colaboradores, ex-colaboradores ou curriculos.
- CPFs, RGs, telefones, e-mails, enderecos, entrevistas e historicos reais.
- Uploads, backups e bancos de dados.

## Observacao sobre o prototipo

Este projeto e uma aplicacao frontend estatica. Variaveis `VITE_*` podem ser expostas no bundle do navegador, portanto o painel nao deve ser usado com dados reais sem backend, autenticacao server-side e armazenamento seguro.

## Pendencias

- Limpar historico Git antigo se dados ou credenciais ja estiverem publicados.
- Confirmar com o mantenedor se referencias de marca/cliente podem permanecer em repositorio publico.
- Rotacionar qualquer credencial usada fora de ambiente demonstrativo.
