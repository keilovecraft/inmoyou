'use strict'
// Importar variables de entorno globales
require('dotenv').config({ path: 'variables.env'});

var mongoose = require('mongoose');
var app = require('./app');
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
    console.log(`Mongo: ${process.env.DB_URL}`);

    // Creación del servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });

  })
  .catch( err => {
    console.log(err);
  });
