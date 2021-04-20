'use strict'
// Importar variables de entorno globales
require('dotenv').config({ path: 'variables.env'});

var mongoose = require('mongoose');
var app = require('./app');
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 3700;


// MongoDB conexión
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
  })
  .then(() => {
    console.log('Conexión a la base de datos establecida');

    // Creación del servidor
    app.listen(port, host, () => {
      console.log(`Servidor corriendo en ${host}:${port}`);
    });

  })
  .catch( err => {
    console.log(err);
  });
