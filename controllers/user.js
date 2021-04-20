'use strict'

const { UserPerson, User, UserCompany } = require('../models/user');

var controller = {

  saveUser: function(req, res) {
    var user = UserPerson();
    var params = req.body;
    user.authId = params.authId;
    user.name = params.name;
    user.lastName = params.lastName;
    user.email = params.email;
    user.password = params.password;
    user.phone = params.phone;
    user.admin = params.admin || user.admin;
    user.contactForm = params.contactForm || user.contactForm;
    user.favourites = params.favourites || user.favourites;
    user.advertisements = params.advertisements || user.advertisements;

    user.save((err, userStored) => {
      if(err) return res.status(500).send({ error: 'Error del servidor.' });

      if(!userStored) return res.status(404).send({ message: 'No se ha podido guardar el usuario.' });

      return res.status(200).send({ person: userStored });
    });
  },

  saveCompany: function(req, res) {
    var user = UserCompany();
    var params = req.body;
    user.authId = params.authId;
    user.name = params.name;
    user.email = params.email;
    user.password = params.password;
    user.phone = params.phone;
    user.contactForm = params.contactForm || user.contactForm;
    user.address = params.address;
    user.logo = params.logo;

    user.save((err, userStored) => {
      if(err) return res.status(500).send({ error: err });

      if(!userStored) return res.status(404).send({ message: 'No se ha podido guardar el usuario.' });

      return res.status(200).send({ company: userStored });
    });
  },

  getUserById: function(req, response) {
    var id = req.params.id;

    if(id == null) return response.status(404).send({ message: 'No has introducido ningún usuario.' });

    User.findById(id, (err, user) => {
      if(err) return response.status(500).send({
        message: 'Error en el servicio'
      });
      if(!user) return response.status(404).send({ message: 'Usuario no encontrado.' });

      return response.status(200).send({user});
    });
  },

  getUser: function(req, res) {
    var userId = req.params.id;
    if(userId === null) {
      res.status(404).send({ message: 'No has introducido ningún usuario.' });
      return;
    };
    
    User.findOne({authId: userId}, (err, user) => {
      if(err) {
        res.status(500).send({
          message: err
        });
        return;
      };
      if(!user) {
        controller.getUserById(req, res);
        return;
      }

      res.status(200).send({user});
      return;
    });
  },

  getUsers: function(req, res) {
    User.find({}).exec((err, users) => {
      if(err) return res.status(500).send({ message: 'Error en el servicio.' });
      if(!users) return res.status(404).send({ message: 'Usuario no encontrado.' });

      return res.status(200).send({users});
    });
  },

  updateUser: function(req, res) {
    var userId = req.params.id;
    var update = req.body;
    const model = req.body._type === 'company' ? UserCompany : UserPerson;

    model.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) => {
      if(err) return res.status(500).send({ message: 'Error en el servicio' });
      if(!userUpdated) return res.status(404).send({ message: 'Usuario no encontrado.' });

      return res.status(200).send({ user: userUpdated });
    });

  },

  deleteUser: function(req, res) {
    var userId = req.params.id;

    User.findByIdAndDelete(userId, (err, userDeleted) => {
      if(err) return res.status(500).send({ message: 'Error en el servicio' });
      if(!userDeleted) return res.status(404).send({ message: 'Usuario no encontrado.' })

      return res.status(200).send({ user: userDeleted });
    });
  }

};

module.exports = controller;
