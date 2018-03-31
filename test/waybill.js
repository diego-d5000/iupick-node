const Iupick = require('../lib/iupick');
const assert = require('chai').assert;

describe('Waybill', function () {
  var iupickClient;

  before(function () {
    const secretToken = 'sk_sandbox_4bdcd3630417c5119029859c08a7b8d9d97dda79'
    const publicToken = '315cdf3ca4dd588ab8e6f7fa4b7aa433c641cadd'
    const environment = 'sandbox'

    // not named iupick to test not dependence to global var "iupick"
    iupickClient = new Iupick(secretToken, publicToken, environment);

  });

  describe('Waybill process', function () {
    it('should pass through a waybill process successful', function (done) {
      const shipperAddress = iupickClient.createAddress(
        city = 'Querétaro',
        lineOne = 'Epigmenio Gonzáles 500',
        postalCode = [76130],
        lineTwo = '',
        neighborhood = 'Momma'
      );

      const shipperContact = iupickClient.createPerson(
        personName = 'Tony Stark',
        phoneNumber = '555555555',
        emailAddress = 'tony@fakemail.com',
        title = 'CEO',
        companyName = 'Stark Industries',
        phoneExtension = '123'
      )

      const recipientContact = iupickClient.createPerson(
        personName = 'Steve Rogers',
        phoneNumber = '555555555',
        emailAddress = 'steve@fakemail.com',
        title = 'Agent',
        companyName = 'SHIELD',
        phoneExtension = '123'
      )

      iupickClient.shipment.create({ length: 8, width: 8, height: 8, weight: 1.1 },
        function (shipmentToken) {

          assert.exists(shipmentToken);
          assert.typeOf(shipmentToken, 'string')


          iupickClient.shipment.addInformation({
            shipmentToken: shipmentToken,
            waypointId: 486,
            shipperAddress: shipperAddress,
            shipperContact: shipperContact,
            recipientContact: recipientContact,
            thirdPartyReference: 'I am a shipment'
          },
            function (confirmationToken) {

              assert.exists(confirmationToken);
              assert.typeOf(confirmationToken, 'string')


              iupickClient.shipment.generateWaybill(
                confirmationToken,
                function (waybill) {
                  assert.exists(waybill);
                  assert.typeOf(confirmation, 'string')

                  done();
                });
            });
        });
    });
  });

  describe('track', function () {
    it('return a tracking code status', function (done) {
      this.timeout(15000);
      iupickClient.shipment.track({ carrier: 'Estafeta', trackingNumber: '8055241528464720099314' },
        function (status) {
          assert.exists(status);
          assert.exists(status.status);
          assert.exists(status.description);
          assert.exists(status.dateTime);
          assert.exists(status.address);

          assert.typeOf(status, 'object');
          assert.typeOf(status.status, 'string');
          assert.typeOf(status.description, 'string');
          assert.typeOf(status.dateTime, 'string');
          assert.typeOf(status.address, 'string');

          done();
        });
    })
  })

  describe('confirmShipmentWaypoint', function () {
    it('return a confirmation token given a waypoint id and order id', function (done) {
      iupickClient.shipment.confirmShipmentWaypoint({ waypoint: 486, orderId: "ORDER666" },
        function (confirmation) {
          assert.exists(confirmation);
          assert.typeOf(confirmation, 'string')

          done();
        });
    })
  })

});