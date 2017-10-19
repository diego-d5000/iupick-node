'use strict';

Iupick.SECRET_TOKEN = 'fasfasdfa';
Iupick.PUBLIC_TOKEN = null;
Iupick.ENVIRONMENT = 'sandbox';

function Iupick() {
  if (!(this instanceof Iupick)) {
    return new Iupick();
  }

  this.requests = require('request');
  this.shipment = require('./resources/Shipments');
}

Iupick.prototype = {


  /**
   * Initializes the address dictionary with
   * the values to be passed.
   * This returns an object for versatility.
   */

  createAddress: function(city, lineOne, postalCode, lineTwo = '', neighborhood = '') {

    return {
      city: city,
      lineOne: lineOne,
      line_two: lineTwo,
      neighborhood: neighborhood,
      postal_code: postalCode
    };
  },

  emptyAddress: function() {
    return this.createAddress('Empty', 'Empty', 'Empty', 'Empty', 'Empty');
  },

  /**
   * Initializes the person object with
   * the values to be passed.
   * This returns an object for versatility.
   */

  createPerson: function(
    personName,
    phoneNumber,
    emailAddress,
    title='',
    companyName='',
    phoneExtension=''
  ) {

    return {
      personName: personName,
      phoneNumber: phoneNumber,
      emailAddress: emailAddress,
      title: title,
      companyName: companyName,
      phoneExtension: phoneExtension
    }
  },

  /**
   * Gets the base url, to be used for the API service.
   */

  getBaseUrl: function() {
    if (Iupick.ENVIRONMENT == 'development') {
      return 'http://localhost:8000/api/'

    } else if (Iupick.ENVIRONMENT == 'sandbox') {
      return 'https://sandbox.iupick.com/api/'

    } else if (Iupick.ENVIRONMENT == 'production') {
      return 'https://iupick.com/api/'

    } else {
      throw new Error('Environment must defined.');
    }
  },
};


module.exports = Iupick;
