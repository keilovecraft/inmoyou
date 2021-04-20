'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdvertisementSchema = Schema({
  lastModified: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isCompany: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  images: {
    type: [String],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address : {
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  price: {
    type: Number,
    required: true
  },
  deposit: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  toilets: {
    type: Number,
    required: true
  },
  furnished: {
    type: Boolean,
    default: false
  },
  energeticCert: {
    type: String,
    required: true
  },
  otherServices: [String],
  contractClauses: {
    type: String,
    required: true
  },
  inventory: String
}, { collection : 'advertisements'});


// Guarda los documentos en la colección advertisements
module.exports = mongoose.model('Advertisement', AdvertisementSchema);