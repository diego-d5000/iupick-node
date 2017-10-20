# iupick.js

The iupick Node library wraps the iupick API to facilitate access from applications written in server-side JavaScript.

Keep in mind that this package requires iupick secret keys, contact
info@iupick.com for more information.

## Installation

Install the package with:

```
npm install iupick --save
```

## Usage

Import the library and instantiate a new iupick object.

``` js
var Iupick = require('../lib/iupick');

const secretToken = 'sk_sandbox_4bdcd3630417c5119029859c08a7b8d9d97dda79'
const publicToken = '315cdf3ca4dd588ab8e6f7fa4b7aa433c641cadd'
const environment = 'sandbox'

iupick = new Iupick(secretToken, publicToken, environment);
```

The iupick Node library has multiple resources with methods that call the API
and return a callback.

## Waybills

The waybill generation occurs on three steps.

Never expose your secret token.

Methods that require your secret_token should never be done from the front-end. Since this methods deal with sensitive information. 

The Waybills resource allows you to create and track shipments.

### Step 1

Create a shipment on the iuPick platform and receive a
shipment token.

``` js
iupick.shipment.create({length: 8, width: 8, height: 8, weight: 1.1},
    function(shipmentToken) {
    shipmentToken; //the created shipment token
    });
```

### Step 2

Fill the rest of the information required to generate a waybill,
and receive a confirmation token.

You can send a shipment either to an arbitrary direction or to one
of our waypoints; just replace the waypoint_id attribute for a recipient
address.

``` js
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
```

```js
iupick.shipment.addInformation({
shipmentToken: shipmentToken,
waypointId: 486,
shipperAddress: shipperAddress,
shipperContact: shipperContact,
recipientContact: recipientContact,
thirdPartyReference: 'I am a shipment'},
function(confirmationToken) {
confirmationToken; // the created confirmation token
});

```

### Step 3.

Generate your waybill with your confirmation token.

``` js
iupick.shipment.generateWaybill(
    confirmationToken,
    function(waybill_link) {
    waybill_link // the created waybill link
    });

```

### Tracking your shipment

In order to track a shipment send the carrier and the tracking number.

``` js
iupick.shipment.track({carrier: 'Estafeta', trackingNumber: '8055241528464720099314'},
    function(status){
    status; // the tracking status
    });
```

## Waypoints

The Waypoints resource allows you to interact with all the delivery points from
our network that are available to your account.

To pull the full information for a single waypoint. Use `getWaypointInformation`
It requires the waypoint unique id.

``` js
iupick.waypoint.getWaypointInformation(20, function(waypoint) {
    waypoint; // information of the waypoint
    });
```

To get a list of all the coordinates of available waypoints, use
`getWaypointsLite`.

``` js
iupick.waypoint.getWaypointsLite(function(waypoints) {
    waypoints; // list of waypoints
    });
```

You can get all the waypoints close to a Postal Code with
`getPostalCodeWaypoints`.

``` js
iupick.waypoint.getPostalCodeWaypoints(95710, function(waypoints) {
    waypoints; // list of waypoints by CP
    });
```


