## Desafio Corelab - Desenvolvedor(a) - JS - Júnior

​	Esse projeto full-stack foi desenvolvido por José Dagmar Florentino da Silva Sobrinho para o Desafio da Corelab. O projeto consiste em duas etapas: sendo a primeira etapa é a parte de back-end envolve na criação de um banco de dados MySQL e uma API **REST** em NodeJS, Express e Sequelize na utilização de dados de  veiculos na realização de testes de requisito, e já a  segunda etapa é a parte de front-end envolve na criação de um sistema de cadastro dr veiculos feita em ReactJS.

### Instruções de Acesso

Para rodar esse projeto, deve seguir essa ordem:

#### 1 - Acesso e criação do Banco de Dados MySQL

- mysql -u root -p
- CREATE DATABASE vehicledb; (opcional --> se não tiver criado o banco de dados)
- use vehicledb;
- A tabela e os atributos serão gerados automaticamente quando for rodar o projeto back-end através do mecanismo ORM (Mapeamento objeto-relacional) chamado Sequelize.

#### 2 - Acesso para rodar o projeto NodeJS:

- cd vehicle-backend
- npm install
- node server.js

#### 3 - Acesso para rodar o projeto ReactJS:

- cd vehicle-frontend
- npm install
- npm start

### Tecnologias Utilizadas

#### Etapa 1: Back-End

- NodeJS
- Express
- Sequelize
- API REST
- Banco de Dados MySQL

#### Etapa 2: Front-End

- ReactJS
- Bootstrap 5.2.0
- Fortawesome/Fontawesome
- Axios
- React Router DOM
- React Table

### Entidades

Esse projeto consiste em apenas uma unica entidade (tabela) que será usada: Veiculo (vehicle).

#### Veiculo (Vehicle)

Atributos:

- id: number; -> Chave Primaria
- name (nome): string;
- description (descrição): string;
- plate (placa): string;
- isFavorite (favorito): boolean;
- year (ano): number;
- color (cor): string;
- price (preço): number;
- createdAt: Date; --> Esse atributo é gerado automaticamente pelo Sequelize sem precisar criar-lo, porém ele aparece apenas nos resultados do MySQL e nos requisitos de API do projeto back-end.

### Requisitos de API

Os requisitos de API deste projeto foram criados na base do sistema CRUD e foram testados no programa de API Client  chamado Postman.

#### Requisitos de Veiculo

##### Criar um novo veiculo

URL do Requisito: http://localhost:8080/api/vehicles

##### Recuperar todos os veiculos

URL do Requisito: http://localhost:8080/api/vehicles

##### Recuperar um único veiculo com id

URL do Requisito: http://localhost:8080/api/vehicles/{id}

##### Atualizar um veiculo com id

URL do Requisito: http://localhost:8080/api/vehicles/{id}

##### Excluir um veiculo com id

URL do Requisito: http://localhost:8080/api/vehicles/{id}

##### Excluir todos os veiculos

URL do Requisito: http://localhost:8080/api/vehicles



