'use strict'

var Advertisement = require('../models/advertisement');

var controller = {

  saveAdvertisement: function(req, res) {
    var advertisement = Advertisement();
    var params = req.body;
    advertisement.lastModified = new Date(Date.now());
    advertisement.author = params.author;
    advertisement.isCompany = params.isCompany || advertisement.isCompany;
    advertisement.published = params.published || advertisement.published;
    advertisement.type = params.type;
    advertisement.address = params.address;
    advertisement.price = params.price;
    advertisement.deposit = params.deposit;
    advertisement.description = params.description;
    advertisement.size = params.size;
    advertisement.rooms = params.rooms;
    advertisement.toilets = params.toilets;
    advertisement.furnished = params.furnished || advertisement.furnished;
    advertisement.energeticCert = params.energeticCert;
    advertisement.otherServices = params.otherServices;
    advertisement.contractClauses = params.contractClauses;
    advertisement.inventory = params.inventory;
    advertisement.images = params.images;

    advertisement.save((err, advertisementStored) => {
      if(err) return res.status(500).send({ message: 'Error en el servicio.' });

      if(!advertisementStored) return res.status(404).send({ message: 'No se ha podido guardar el anuncio.' });

      return res.status(200).send({ advertisement: advertisementStored });
    });
  },

  getAdvertisement: function(req, res) {
    var advertisementId = req.params.id;

    if(advertisementId == null) return res.status(404).send({ message: 'No has introducido ningún anuncio.' });

    Advertisement.findById(advertisementId, (err, advertisement) => {
      if(err) return res.status(500).send({
        message: err
      });
      if(!advertisement) return res.status(404).send({ message: 'Anuncio no encontrado.' });

      return res.status(200).send({advertisement});
    });
  },

  // getAdvertisements: function(req, res) {
  //   const options = req.body;
  //   Advertisement.find(options).sort('-lastModified').exec((err, advertisements) => {
  //     if(err) return res.status(500).send({ message: err });
  //     if(!advertisements) return res.status(404).send({ message: 'Anuncio no encontrado.' });

  //     return res.status(200).send({ advertisements });
  //   });
  // },

  getAdvertisements: function(req, res) {
    const { published, orderBy } = req.query;

    Advertisement.find({ 'published': published }).sort(orderBy).exec((err, advertisements) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!advertisements) return res.status(404).send({ message: 'Anuncio no encontrado.' });

      return res.status(200).send({ advertisements });
    });
  },

  updateAdvertisement: function(req, res) {
    var advertisementId = req.params.id;
    var update = req.body;
    Object.assign(update, { lastModified: new Date(Date.now()) });

    Advertisement.findByIdAndUpdate(advertisementId, update, {new: true}, (err, advertisementUpdated) => {
      if(err) return res.status(500).send({ message: err });
      if(!advertisementUpdated) return res.status(404).send({ message: 'Anuncio no encontrado.' });

      return res.status(200).send({ advertisement: advertisementUpdated });
    });

  },

  deleteAdvertisement: function(req, res) {
    var advertisementId = req.params.id;

    Advertisement.findByIdAndDelete(advertisementId, (err, advertisementDeleted) => {
      if(err) return res.status(500).send({ message: err });
      if(!advertisementDeleted) return res.status(404).send({ message: 'Anuncio no encontrado.' });

      return res.status(200).send({ advertisement: advertisementDeleted });
    });
  }

};

module.exports = controller;
