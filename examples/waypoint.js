var Iupick = require('../lib/iupick');

const secretToken = 'sk_sandbox_4bdcd3630417c5119029859c08a7b8d9d97dda79'
const publicToken = '315cdf3ca4dd588ab8e6f7fa4b7aa433c641cadd'
const environment = 'sandbox'

iupick = new Iupick(secretToken, publicToken, environment);

iupick.waypoint.getWaypointInformation(20,
  function(waypoint) {
    waypoint; // information of the waypoint
  });

iupick.waypoint.getWaypointsLite(
  function(waypoints) {
    waypoints; // list of waypoints
  });

iupick.waypoint.getPostalCodeWaypoints(95710,
  function(waypoints) {
    waypoints; // list of waypoints by CP
  });

