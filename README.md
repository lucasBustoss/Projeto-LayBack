
# Projeto Layback

Projeto desenvolvido em cima das especificações enviadas para a vaga de Desenvolvedor da empresa Layback. A API em produção pode ser acessada por este [link](http://projeto-layback.sa-east-1.elasticbeanstalk.com/).

## Stack utilizada

**Back-end:** Node, Typescript, Express

**Database:** MongoDB - Atlas Cloud

**Infra:** AWS ElasticBeanstalk

**CI/CD:** AWS CodePipeline

**API externa:** API-Football

## Arquitetura

O projeto foi desenvolvido em uma arquitetura de camadas, com responsabilidades separadas. Escolhi utilizar essa arquitetura pois, além de simples, encaixa bem com os requisitos de um projeto pequeno e que não precisará escalar. 

**Controller:** Responsável por receber a requisição, tratar os filtros e encaminhar a chamada para a camada Service. Por fim, a camada Controller é responsável por padronizar e retornar os dados. 

**Service:** Camada responsável por gerir qual tipo de dado deve ser retornado, seja dado armazenado (BD) ou dado gerado em tempo real (API).

**Data:** Camada que contém a definição dos repositórios dos dados, seja BD ou API. 

**Models:** Camada de dominio, contém as entidades, schemas do BD modelos dos filtros e modelos de retorno da API.

**Validations:** Middleware responsável por validar os filtros recebidos. 

## Documentação

A documentação da API pode ser encontrada neste [link](http://projeto-layback.sa-east-1.elasticbeanstalk.com/)

## Rodando localmente

**Clone o projeto**

```bash
  git clone https://github.com/lucasBustoss/Projeto-LayBack
```

**Entre no diretório do projeto**

```bash
  cd projeto-layback
```

**Instale as dependências**

```bash
  npm install
```
ou

```bash
  yarn
```

**Inicie o servidor**

```bash
  npm run dev
```
ou


```bash
  yarn dev
```