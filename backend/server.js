const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;


// Conexão com o banco de dados 'usuarios'
const dbUsuarios = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_USUARIOS
});

// Conexão com o banco de dados 'historico'
const dbHistorico = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_HISTORICO
});

// Conexão com o banco de dados 'previsao'
const dbPrevisao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_PREVISAO
});


// Função para conectar ao banco de dados 'usuarios'
dbUsuarios.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados usuarios: ', err);
  } else {
    console.log('Conectado ao banco de dados usuarios');
  }
});

// Função para conectar ao banco de dados 'previsao'
dbPrevisao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados previsao: ', err);
  } else {
    console.log('Conectado ao banco de dados previsao');
  }
});

// Função para conectar ao banco de dados 'historico'
dbHistorico.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados historico: ', err);
  } else {
    console.log('Conectado ao banco de dados historico');
  }
});


// Endpoints
app.get('/usuarios', (req, res) => {
  dbUsuarios.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar dados dos usuários.');
      return;
    }
    res.json(results);
  });
});

app.get('/historico', (req, res) => {
  dbHistorico.query('SELECT * FROM historico', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar dados do histórico.');
      return;
    }
    res.json(results);
  });
});

app.get('/previsao', (req, res) => {
  dbPrevisao.query('SELECT * FROM previsao', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar dados da previsão.');
      return;
    }
    res.json(results);
  });
});


// Servir arquivos estáticos
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../templates')));


//node server.js  ou  nodemon server.js 
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
