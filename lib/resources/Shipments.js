'use strict';

var Shipment = function (iupick) {
  return {

    /**
     * Allows you to generate a token for the new shipment.
     * Needs weight
     * Needs Dimensions
     * Receive a shipment id.
     */

    create: function (args, callback) {

      var url = iupick.getBaseUrl() + 'create-shipment-token/';
      var headers = { Authorization: 'Secret ' + iupick.secretToken };
      var payload = {
        length: Number(args.length),
        width: Number(args.width),
        height: Number(args.height),
        weight: Number(args.weight)
      };

      iupick.requests.post({ url: url, json: payload, headers: headers },
        function (err, response) {
          var body = response.body;
          if (err) {
            throw new Error(err);
          } else if (body.shipment_token) {
            callback(body.shipment_token);
          } else {
            callback(body);
          }
        });
    },

    /**
     * This method allows you to fill the information required
     * for the package, and receive a confirmation_token in exchange.
     */

    addInformation: function (args, callback) {
      var waypointId = args.waypointId ? args.waypointId : null;
      var recipientAddress = args.recipientAddress ? args.recipientAddress : null;

      if ((waypointId || recipientAddress) != iupick.emptyAddress()) {
        var url = (iupick.getBaseUrl() +
          'fill-shipment-information/' + args.shipmentToken + '/');
        var headers = { 'Authorization': 'Token ' + iupick.publicToken };
        var payload = {
          waypoint: args.waypointId,
          shipper_address: args.shipperAddress,
          shipper_contact: args.shipperContact,
          recipient_address: recipientAddress,
          recipient_contact: args.recipientContact,
          third_party_reference: args.thirdPartyReference
        };

        //if waypoint id was given replace replace recipient_address by waypointaddress
        if (waypointId) {
          iupick.waypoint.getWaypointInformation(waypointId, function (waypoint) {

            payload.recipient_address = waypoint.address;

            iupick.requests.post({ url: url, json: payload, headers: headers },
              function (err, response) {
                var body = response.body;
                if (err) {
                  throw new Error(err);
                } else if (body.confirmation_token) {
                  callback(body.confirmation_token);
                } else {
                  callback(body);
                }
              });
          })
        } else {
          iupick.requests.post({ url: url, json: payload, headers: headers },
            function (err, response) {
              var body = response.body;
              if (err) {
                throw new Error(err);
              } else if (body.confirmation_token) {
                callback(body.confirmation_token);
              } else {
                callback(body);
              }
            });
        }
      }
    },

    /**
     * Generates a waybill, once the information has been
     * properly filled for the shipment.
     */

    generateWaybill: function (confirmationToken, callback) {
      var url = (
        iupick.getBaseUrl() + 'generate-waybill/' + confirmationToken + '/'
      );
      var headers = { 'Authorization': 'Secret ' + iupick.secretToken };

      iupick.requests.post({ url: url, headers: headers },
        function (err, response) {
          if (err) {
            throw new Error(err);
          }
          var decodedResponse = JSON.parse(response.body);
          callback(decodedResponse);
        });
    },

    /**
     * Allows you to track the status of a shipment, with the
     * tracking number and carrier.
     */

    track: function (args, callback) {
      var url = iupick.getBaseUrl() + 'track-shipment/';
      var payload = {
        'carrier': args.carrier,
        'tracking_number': String(args.trackingNumber)
      };
      var headers = { 'Authorization': 'Token ' + iupick.publicToken };

      iupick.requests.get({ url: url, headers: headers, qs: payload },
        function (err, response) {
          if (err) {
            throw new Error(err);
          }
          var decodedResponse = JSON.parse(response.body);
          callback(decodedResponse);
        });
    },

    /*
     * Generates a waybill, once the information has been
     * properly filled for the shipment.
     */

    confirmShipmentWaypoint(args, callback) {
      var url = iupick.getBaseUrl() + 'waypoint-confirmation/';
      var headers = { Authorization: 'Secret ' + iupick.secretToken };
      var payload = {
        waypoint: args.waypoint,
        order_id: args.orderId
      };

      iupick.requests.post({ url: url, json: payload, headers: headers },
        function (err, response) {
          var body = response.body;
          if (err) {
            throw new Error(err);
          } else if (response.body.shipment_token) {
            callback(body.shipment_token);
          } else {
            callback(body);
          }
        });
    }
  }
}

module.exports = Shipment;
