const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3333;

// In-memory store for clientes
let clientes = [];
let currentClientId = 1;

// In-memory store for investimentos
let investimentos = [];
let currentInvestmentId = 1;

// Static store for ativos
const ativos = [
  { name: "Ação XYZ", value: 150.75 },
  { name: "Tesouro Direto ABC", value: 1050.00 },
  { name: "Fundo Imobiliário DEF", value: 88.20 },
  { name: "CDB Banco GHI", value: 2500.00 },
];

// GET /assets
app.get('/assets', (req, res) => {
  res.json(ativos);
});

// GET /clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// GET /clientes/:id
app.get('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === clienteId);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).send('Cliente não encontrado');
  }
});

// POST /clientes
app.post('/clientes', (req, res) => {
  const { nome, email, status, telefone, endereco } = req.body;
  if (!nome || !email || !status) {
    return res.status(400).send('Campos obrigatórios: nome, email, status');
  }
  const newCliente = {
    id: currentClientId++,
    nome,
    email,
    status,
    telefone: telefone || null,
    endereco: endereco || null,
    investimentos: [], // This will be managed by the /investimentos endpoint
  };
  clientes.push(newCliente);
  res.status(201).json(newCliente);
});

// PUT /clientes/:id
app.put('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const clienteIndex = clientes.findIndex(c => c.id === clienteId);
  if (clienteIndex === -1) {
    return res.status(404).send('Cliente não encontrado');
  }
  const { nome, email, status, telefone, endereco } = req.body;

  if (nome) clientes[clienteIndex].nome = nome;
  if (email) clientes[clienteIndex].email = email;
  if (status) clientes[clienteIndex].status = status;
  if (telefone) clientes[clienteIndex].telefone = telefone;
  if (endereco) clientes[clienteIndex].endereco = endereco;

  res.json(clientes[clienteIndex]);
});

// DELETE /clientes/:id
app.delete('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const clienteIndex = clientes.findIndex(c => c.id === clienteId);
  if (clienteIndex === -1) {
    return res.status(404).send('Cliente não encontrado');
  }
  clientes.splice(clienteIndex, 1);
  // Optionally, remove associated investments
  // investimentos = investimentos.filter(inv => inv.clienteId !== clienteId);
  res.status(204).send();
});

// POST /investimentos
app.post('/investimentos', (req, res) => {
  const { nome, valor, tipo, clienteId } = req.body;
  if (!nome || valor === undefined || clienteId === undefined) {
    return res.status(400).send('Campos obrigatórios: nome, valor, clienteId');
  }

  const clienteExists = clientes.some(c => c.id === parseInt(clienteId));
  if (!clienteExists) {
    return res.status(404).send('Cliente não encontrado para o ID fornecido');
  }

  const newInvestment = {
    id: currentInvestmentId++,
    nome,
    valor: parseFloat(valor),
    tipo: tipo || null,
    clienteId: parseInt(clienteId),
    dataAquisicao: new Date().toISOString(),
  };
  investimentos.push(newInvestment);

  // Also update the client's investimentos array (optional, based on data model consistency needs)
  // const client = clientes.find(c => c.id === parseInt(clienteId));
  // if (client) {
  //   client.investimentos.push(newInvestment.id); // or the full investment object
  // }

  res.status(201).json(newInvestment);
});

// GET /clientes/:id/investimentos
app.get('/clientes/:id/investimentos', (req, res) => {
  const clienteIdParam = parseInt(req.params.id);

  const cliente = clientes.find(c => c.id === clienteIdParam);
  if (!cliente) {
    return res.status(404).send('Cliente não encontrado');
  }

  const clientInvestments = investimentos.filter(inv => inv.clienteId === clienteIdParam);
  res.json(clientInvestments);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
