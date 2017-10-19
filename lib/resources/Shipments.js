'use strict';

var Shipment = {

  /**
   * Allows you to generate a token for the new shipment.
   * Needs weight
   * Needs Dimensions
   * Receive a shipment id.
   */

  create: function(length, width, height, weight) {
    var url = iupick.getBaseUrl() + 'create-shipment-token/';
    var headers = { Authorization: 'Secret '  + Iupick.SECRET_TOKEN };
    var payload = {
      length: Number(length),
      width: Number(width),
      height: Number(height),
      weight: Number(weight)
    };
    var r = iupick.requests.post({url, json: payload, headers: headers});
    decodedResponse = JSON.parse(r);
    return decodedResponse;
  },

  /**
   * This method allows you to fill the information required
   * for the package, and receive a confirmation_token in exchange.
   */

  addInformation: function(
    shipmentToken,
    shipperAddress,
    shipperContact,
    recipientContact,
    thirdPartyReference,
    waypointId = null,
    recipientAddress = iupick.emptyAddress())
  {
    if ((waypointId || recipientAddress) != iupick.emptyAddress()) {
      var url = (iupick.getBaseUrl() +
        'fill-shipment-information/' + shipmentToken + '/');
      var headers = {'Authorization': 'Token ' + Iupick.PUBLIC_TOKEN };
      var payload = {
        waypoint: waypointId,
        shipperAddress: shipperAddress,
        shipperContact: shipperContact,
        recipientAddress: recipientAddress,
        recipientContact: recipientContact,
        thirdPartyReference: thirdPartyReference
      };
      var r = iupick.requests.post({url, json: payload, headers: headers});
      var decodedResponse = JSON.parse(r);
      return decodedResponse;
    } else {
      return false;
    }
  },

  /**
   * Generates a waybill, once the information has been
   * properly filled for the shipment.
   */

  generateWaybill: function(confirmationToken) {
    var url = (iupick.getBaseUrl() + 'generate-waybill/' + confirmationToken + '/');
    var headers = {'Authorization': 'Secret ' + Iupick.SECRET_TOKEN };
    var r = iupick.requests.post({url, headers: headers});
    var decodedResponse = JSON.parse(r);
    return decodedResponse;
  }
}
module.exports = Shipment;
