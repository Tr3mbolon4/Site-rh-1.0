# Política de Segurança

## Uso do protótipo

Este repositório contém uma interface de demonstração. A autenticação exibida
na interface não substitui autenticação e autorização implementadas no servidor.
Não publique esta versão com dados pessoais, credenciais reutilizáveis ou dados
de produção.

## Como reportar uma vulnerabilidade

Não abra uma issue pública com detalhes exploráveis, credenciais, dados pessoais
ou arquivos enviados por candidatos. Envie uma descrição privada ao responsável
do projeto, incluindo impacto, passos de reprodução sem dados sensíveis e uma
forma segura de contato para retorno.

## Antes de implantar

- implemente autenticação no backend e validação de permissões no servidor;
- armazene segredos fora do código-fonte e fora do repositório;
- aplique controles de acesso e retenção adequados aos dados de candidatos;
- revise uploads, logs e exportações para evitar exposição de dados pessoais.
