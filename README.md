1. Introdução
Este documento detalha a arquitetura, tecnologias e configuração do projeto Invest App. A aplicação foi desenvolvida como uma solução para um escritório de investimentos, com o objetivo de fornecer uma plataforma para gerenciar clientes e visualizar informações básicas de ativos financeiros.

O sistema consiste em uma arquitetura de serviços moderna, com um backend responsável pela lógica de negócios e acesso ao banco de dados, e um frontend reativo para a interação com o usuário. Toda a aplicação foi containerizada com Docker para garantir portabilidade e facilidade de implantação.

2. Requisitos do Projeto
Os requisitos foram baseados no case técnico fornecido.

2.1. Requisitos Funcionais
Gerenciamento de Clientes:
Permitir o cadastro e listagem de clientes, contendo nome, email e status (ativo/inativo).
A interface deve possuir uma página para listar, adicionar e editar clientes.
Gerenciamento de Ativos e Investimentos:
Permitir o cadastro e exibição de ativos financeiros por cliente, contendo nome do ativo e valor atual.
Permitir a visualização das alocações (investimentos) para cada cliente.
Uma página de ativos deve exibir uma lista fixa de ativos financeiros (somente leitura).
2.2. Requisitos Técnicos
Implementação 100% em TypeScript.
Backend:
Desenvolvido em Node.js com o framework Fastify.


Utilização do Prisma ORM para interação com o banco de dados.
Validação de payloads das requisições com a biblioteca Zod.
CRUD completo de Clientes.


Endpoint para listar ativos com valores estáticos.
Frontend:
Desenvolvido com Next.js.
Utilização da biblioteca React Query para buscas e gerenciamento de estado do servidor.
Utilização de React Hook Form e Zod para construção e validação de formulários.
Axios para requisições HTTP ao backend.
UI construída com componentes ShadCN para uma interface funcional e personalizável.

Containerização e Banco de Dados:
A aplicação deve ser containerizada com Docker.
Utilização do Docker Compose para orquestrar os serviços de backend e banco de dados.


O banco de dados para persistência de dados do cliente deve ser MySQL, rodando em um contêiner.


3. Arquitetura da Solução
O projeto segue uma arquitetura cliente-servidor desacoplada, orquestrada pelo Docker Compose.

Frontend (Next.js): É a camada de apresentação, responsável pela interface do usuário. Ele roda no navegador do cliente e se comunica com o Backend através de uma API REST.
Backend (Fastify API): É o cérebro da aplicação. Ele expõe uma API REST, processa as regras de negócio e se comunica com o banco de dados para persistir e recuperar informações.
Banco de Dados (MySQL): É a camada de persistência, responsável por armazenar os dados de clientes e seus investimentos.
Docker: O Backend e o Banco de Dados rodam em contêineres isolados, gerenciados pelo Docker Compose, garantindo um ambiente de execução consistente e portátil.
Fluxo de Comunicação:
[Navegador com Frontend] <--- Requisições HTTP ---> [API Backend (Fastify)] <--- Queries Prisma ---> [Banco de Dados (MySQL)]

4. Tecnologias Utilizadas (Stack)
Backend
Runtime: Node.js v18
Framework: Fastify
Linguagem: TypeScript
ORM: Prisma
Validação: Zod
Banco de Dados: MySQL 8.0
Frontend
Framework: Next.js 14+ (com App Router)
Linguagem: TypeScript
UI: React 18, Tailwind CSS, ShadCN
Gerenciamento de Estado de Servidor: TanStack Query (React Query)
Formulários: React Hook Form & Zod
Cliente HTTP: Axios
DevOps
Containerização: Docker & Docker Compose
5. Configuração do Ambiente de Desenvolvimento
Para executar o projeto em um ambiente local, siga os passos abaixo.

5.1. Pré-requisitos
Node.js (v18 ou superior)
NPM
Docker Desktop
5.2. Instruções de Instalação
Clonar o Repositório:

Bash

git clone [<URL_DO_SEU_REPOSITORIO>](https://github.com/PatrickCosta-dev/invest-app-project.git)
cd invest-app-project
Configurar Variáveis de Ambiente do Backend:

Navegue até a pasta backend.
Crie uma cópia do arquivo .env.example (se houver) ou crie um novo arquivo chamado .env.
Preencha o arquivo backend/.env com a URL de conexão para o banco de dados que será usado para desenvolvimento local (fora do Docker):
Snippet de código

DATABASE_URL="mysql://invest_user:your_user_password@localhost:3307/invest_db"
Nota: As credenciais devem ser as mesmas definidas no docker-compose.yml e a porta deve ser a que foi exposta para a máquina host (ex: 3307).
Instalar Dependências:

Execute npm install em cada uma das pastas, backend e frontend.
5.3. Executando a Aplicação com Docker Compose
A forma recomendada para rodar a aplicação é utilizando Docker Compose, que gerencia o backend e o banco de dados.

Inicie os Contêineres:

Na pasta raiz do projeto, execute:
Bash

docker-compose up --build
Este comando irá construir a imagem do backend e iniciar os contêineres do backend e do MySQL. A API do backend estará disponível em http://localhost:3333.
Inicie o Frontend:

Em um novo terminal, navegue até a pasta frontend e execute:
Bash

npm run dev
A aplicação frontend estará disponível em http://localhost:3000 (ou outra porta, caso a 3000 esteja em uso).
6. Estrutura de Arquivos
Backend
backend/
└── src/
    ├── lib/            # Módulos centrais (ex: cliente Prisma)
    ├── routes/         # Definição das rotas da API
    ├── schemas/        # Schemas de validação Zod
    └── server.ts       # Ponto de entrada do servidor Fastify
Frontend
frontend/
└── src/
    ├── app/            # Rotas da aplicação (App Router)
    │   ├── clientes/
    │   └── ativos/
    ├── components/     # Componentes React reutilizáveis (formulários, UI)
    └── lib/            # Módulos de utilitários e camada de API
7. Endpoints da API
A API do backend expõe os seguintes endpoints principais:

Método	URL	Descrição
GET	/clientes	Retorna a lista de todos os clientes.
POST	/clientes	Cria um novo cliente.
PUT	/clientes/:id	Atualiza um cliente existente.
DELETE	/clientes/:id	Deleta um cliente.
GET	/assets	Retorna uma lista estática de ativos.
POST	/investimentos	Cria um novo investimento para um cliente.

Exportar para as Planilhas
8. Próximos Passos e Melhorias Futuras
A aplicação atual é uma base sólida e funcional. Possíveis melhorias futuras incluem:

Testes Automatizados: Implementação de testes unitários e de integração para garantir a qualidade e a estabilidade do código.
Autenticação e Autorização: Adicionar um sistema de login para proteger a API e os dados.
Refinamento da UI/UX: Melhorar a experiência do usuário com feedback visual mais elaborado, paginação e filtros.
Deploy: Configurar um pipeline de CI/CD para automatizar o deploy da aplicação em um serviço de nuvem (ex: AWS, Vercel, Railway).
