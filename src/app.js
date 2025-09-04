require('./models/ticket');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sdlucianoduarte_db_user:gpAE2Na35pRhHvLP@cluster0.lqkmbjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB conectado com sucesso'))
    .catch(err => console.error('Erro de conexão MongoDB:', err));

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Importar rotas
const index = require('./routes/index');
const ticketRoute = require('./routes/ticket-route');

// Usar rotas
app.use('/', index);
app.use('/ticket', ticketRoute);

module.exports = app;
