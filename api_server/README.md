# API Server

This directory contains a simple Node.js Express server to provide a backend for the application.

## Prerequisites

- Node.js (v14 or later recommended)
- npm (usually comes with Node.js)

## Setup

1.  Navigate to the `api_server` directory:
    ```bash
    cd api_server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the server

1.  Start the server:
    ```bash
    npm start
    ```
    (This will run `node index.js` as defined in `package.json`'s scripts)

The server will start on `http://localhost:3333`.

## API Endpoints

### Clients (`/clientes`)

-   `GET /clientes`: Get all clients.
-   `GET /clientes/:id`: Get a specific client by ID.
-   `POST /clientes`: Create a new client.
    -   Body: `{ "nome": "string", "email": "string", "status": "ativo" | "inativo", "telefone"?: "string", "endereco"?: "string" }`
-   `PUT /clientes/:id`: Update a client.
    -   Body: `{ "nome"?: "string", "email"?: "string", "status"?: "ativo" | "inativo", "telefone"?: "string", "endereco"?: "string" }`
-   `DELETE /clientes/:id`: Delete a client.

### Investments (`/investimentos`)

-   `POST /investimentos`: Create a new investment for a client.
    -   Body: `{ "nome": "string", "valor": number, "tipo"?: "string", "clienteId": number }`
-   `GET /clientes/:id/investimentos`: Get all investments for a specific client.

### Assets (`/assets`)

-   `GET /assets`: Get a list of available assets.
