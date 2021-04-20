'use strict'

var mongoose = require('mongoose'),
      extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  authId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contactForm: {
    type: String,
    enum : ['mail', 'tel', 'both'],
    default: 'both',
    required: true
  },
  phone: {
    type: String,
    required: function() {
      return this.contactForm === 'both' || this.contactForm === 'tel';
    }
  },
  advertisements: {
    type: [String],
    default: []
  }
}, { collection : 'users', discriminatorKey : '_type' });

var PersonSchema = UserSchema.extend({
  lastName : {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  favourites: {
    type: [String],
    default: []
  }
});

var CompanySchema = UserSchema.extend({
  logo : String,
  address : {
    street: String,
    number: String,
    postalCode: String,
    city: String
  }
});


module.exports = {
  User: mongoose.model('user', UserSchema),
  UserPerson: mongoose.model('person', PersonSchema),
  UserCompany: mongoose.model('company', CompanySchema)
};
