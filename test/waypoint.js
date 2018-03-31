const Iupick = require('../lib/iupick');
const assert = require('chai').assert

describe('Waypoints', function () {
  var iupickClient;

  before(function () {
    const secretToken = 'sk_sandbox_4bdcd3630417c5119029859c08a7b8d9d97dda79'
    const publicToken = '315cdf3ca4dd588ab8e6f7fa4b7aa433c641cadd'
    const environment = 'sandbox'

    // not named iupick to test not dependence to global var "iupick"
    iupickClient = new Iupick(secretToken, publicToken, environment);

  });

  describe('getWaypointInformation', function () {
    it('return the info of a waypoint', function (done) {
      iupickClient.waypoint.getWaypointInformation(20, function (waypoint) {
        assert.exists(waypoint);
        assert.exists(waypoint.id);
        assert.exists(waypoint.name);
        assert.exists(waypoint.entity);
        assert.exists(waypoint.address);
        assert.exists(waypoint.latitude);
        assert.exists(waypoint.longitude);

        assert.typeOf(waypoint, 'object');
        assert.typeOf(waypoint.id, 'number');
        assert.typeOf(waypoint.name, 'string');
        assert.typeOf(waypoint.entity, 'string');
        assert.typeOf(waypoint.address, 'object');
        assert.typeOf(waypoint.latitude, 'string');
        assert.typeOf(waypoint.longitude, 'string');

        done()
      });
    });
  });

  describe('getWaypointsLite', function () {
    it('return a list of waypoints', function (done) {
      iupickClient.waypoint.getWaypointsLite(
        function (waypoints) {

          const testwaypoint = waypoints[0];

          assert.exists(waypoints);
          assert.exists(testwaypoint.id);
          assert.exists(testwaypoint.latitude);
          assert.exists(testwaypoint.longitude);
          assert.exists(testwaypoint['postal_code']);

          assert.typeOf(waypoints, 'array');
          assert.typeOf(testwaypoint.id, 'number');
          assert.typeOf(testwaypoint.latitude, 'string');
          assert.typeOf(testwaypoint.longitude, 'string');
          assert.typeOf(testwaypoint['postal_code'], 'string');

          done();
        })
    })
  })

  describe('getPostalCodeWaypoints', function () {
    it('return a list of waypoints given a postal code number', function (done) {
      iupickClient.waypoint.getPostalCodeWaypoints('06700',
        function (waypoints) {
          const testwaypoint = waypoints[0];

          assert.exists(waypoints);
          assert.exists(testwaypoint);
          assert.exists(testwaypoint.id);
          assert.exists(testwaypoint.name);
          assert.exists(testwaypoint.entity);
          assert.exists(testwaypoint.address);
          assert.exists(testwaypoint.latitude);
          assert.exists(testwaypoint.longitude);

          assert.typeOf(waypoints, 'array')
          assert.typeOf(testwaypoint, 'object');
          assert.typeOf(testwaypoint.id, 'number');
          assert.typeOf(testwaypoint.name, 'string');
          assert.typeOf(testwaypoint.entity, 'string');
          assert.typeOf(testwaypoint.address, 'object');
          assert.typeOf(testwaypoint.latitude, 'string');
          assert.typeOf(testwaypoint.longitude, 'string');

          done();
        });
    })
  })

});