/* Configuración de Express y peticiones con bodyParser */
'use strict'


// Declaramos express y su librería de subida de ficheros
var express = require('express');
// Para unificar el cliente
var path = require('path');
var cors = require('cors');

var app = express();

// Cargar ficheros de rutas
var user_routes = require('./routes/user');
var advertisement_routes = require('./routes/advertisement');

// Middlewares
app.use(express.urlencoded({ limit: '150000mb', extended: false} ));
// parse application/json
app.use(express.json({ limit: '150000mb' }));

app.options('*', cors());

// Configurar cabeceras y CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Rutas
app.use('/', express.static('client', {redirect: false}));
app.use('/api', user_routes);
app.use('/api', advertisement_routes);

app.get('*', function(req, res, next){
  res.sendFile(path.resolve('client/index.html'));
});

// Export
module.exports = app;
