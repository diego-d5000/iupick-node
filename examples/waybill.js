var Iupick = require('../lib/iupick');

const secretToken = 'sk_sandbox_4bdcd3630417c5119029859c08a7b8d9d97dda79'
const publicToken = '315cdf3ca4dd588ab8e6f7fa4b7aa433c641cadd'
const environment = 'sandbox'

iupick = new Iupick(secretToken, publicToken, environment);


var shipperAddress = iupick.createAddress(
  city = 'Querétaro',
  lineOne = 'Epigmenio Gonzáles 500',
  postalCode = 76130,
  lineTwo = '',
  neighborhood = 'Momma'
);

var shipperContact = iupick.createPerson(
  personName = 'Tony Stark',
  phoneNumber = '555555555',
  emailAddress = 'tony@fakemail.com',
  title = 'CEO',
  companyName = 'Stark Industries',
  phoneExtension = '123'
)

var recipientContact = iupick.createPerson(
  personName='Steve Rogers',
  phoneNumber='555555555',
  emailAddress='steve@fakemail.com',
  title='Agent',
  companyName='SHIELD',
  phoneExtension='123'
)

iupick.shipment.create({length: 8, width: 8, height: 8, weight: 1.1},
  function(shipmentToken) {

    shipmentToken; //the created shipment token

    iupick.shipment.addInformation({
      shipmentToken: shipmentToken,
      waypointId: 486,
      shipperAddress: shipperAddress,
      shipperContact: shipperContact,
      recipientContact: recipientContact,
      thirdPartyReference: 'I am a shipment'},
      function(confirmationToken) {

        confirmationToken; // the created confirmation token

        iupick.shipment.generateWaybill(
          confirmationToken,
          function(waybill_link) {
            waybill_link // the created waybill link
          });
      });
  });