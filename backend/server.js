//Importa as ferramentas utilizadas pelo codigo
const express = require('express');
const dayjs = require('dayjs');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();


// Inicia a aplicação na porta escolhida
const app = express();
const port = process.env.PORT;


// Define a conexão do backend da aplicação com os três bancos de dados do projeto 
const dbUsuarios = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_USUARIOS
});
const dbHistorico = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_HISTORICO
});
const dbPrevisao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_PREVISAO
});


// Função para converter data do formato 'YYYY-MM-DDTHH:mm:ss.000Z' para 'DD/MM/YYYY'
function FormatarData(dataISO) {
  return dayjs(dataISO).format('DD/MM/YYYY');
}


// Executa a conexão do backend da aplicação com os três bancos de dados do projeto
dbUsuarios.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados "site": ', err);
  } else {
    console.log('Conectado ao banco de dados "site"');
  }
});
dbPrevisao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados "previsao": ', err);
  } else {
    console.log('Conectado ao banco de dados "previsao"');
  }
});
dbHistorico.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados "historico": ', err);
  } else {
    console.log('Conectado ao banco de dados "historico"');
  }
});


// Endpoints com todas as informações dos três bancos de dados do projeto
app.get('/usuarios', (req, res) => {
  dbUsuarios.query('SELECT * FROM data', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar dados dos usuários.');
      return;
    }
    res.json(results);
  });
});
app.get('/historico', (req, res) => {
  dbHistorico.query('SELECT * FROM main', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar dados do histórico.');
      return;
    }
    res.json(results);
  });
});
app.get('/previsao', (req, res) => {
  dbPrevisao.query('SELECT * FROM sensores', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar dados da previsão.');
      return;
    }

    const ListaDadosConvertidos = results.map(linha => {
      return {
        ...linha,
        Dia: FormatarData(linha.Data)
      };
    });

    res.json(ListaDadosConvertidos);
  });
});


// Inicia os arquivos estáticos do projeto
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../templates')));


// Inicia o backend (node server.js  ou  nodemon server.js)
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});