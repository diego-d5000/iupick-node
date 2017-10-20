'use strict';

function Iupick(secretToken = null, publicToken = null, environment = 'sandbox')
{
  if (!(this instanceof Iupick)) {
    return new Iupick(secretToken, publicToken, environment);
  }

  this.secretToken = secretToken;
  this.publicToken = publicToken;
  this.environment = environment;
  this.requests = require('request');
  this.shipment = require('./resources/Shipments');
  this.waypoint = require('./resources/Waypoints');
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
      line_one: lineOne,
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
      person_name: personName,
      phone_number: phoneNumber,
      email_address: emailAddress,
      title: title,
      company_name: companyName,
      phone_extension: phoneExtension
    }
  },

  /**
   * Gets the base url, to be used for the API service.
   */

  getBaseUrl: function() {
    if (this.environment == 'development') {
      return 'http://localhost:8000/api/'

    } else if (this.environment == 'sandbox') {
      return 'https://sandbox.iupick.com/api/'

    } else if (this.environment == 'production') {
      return 'https://iupick.com/api/'

    } else {
      throw new Error('Environment must defined.');
    }
  },
};

module.exports = Iupick;
