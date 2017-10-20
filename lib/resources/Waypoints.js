'use strict';

var Waypoints = {

  /**
   * This method allows you to pull the full information for a single waypoint
   * Needs waypoint id
   * Receives a JSON with full information of waypoint.
   */
  getWaypointInformation: function(waypointId, callback) {
    var url = iupick.getBaseUrl() + 'waypoints/'+ waypointId +'/';
    var headers = { Authorization: 'Token '  + iupick.publicToken };

    iupick.requests.get({url: url, headers: headers},
      function(err, response) {
        if (err) {
          throw new Error(err);
        }
        var decodedResponse = JSON.parse(response.body);
        callback(decodedResponse);
      });
  },

  /**
   * This method allows you to pull the basic information required to plot
   * the waypoints in a map
   */
  getWaypointsLite: function(callback) {
    var url = iupick.getBaseUrl() + 'waypoints/lite/';
    var headers = { Authorization: 'Token '  + iupick.publicToken };

    iupick.requests.get({url: url, headers: headers},
      function(err, response) {
        if (err) {
          throw new Error(err);
        }
        var decodedResponse = JSON.parse(response.body);
        callback(decodedResponse);
      });
  },

  /**
   * This method allows you to pull the full information for waypoints in a
   * certain postal code
   */
  getPostalCodeWaypoints: function(postalCode, callback) {
    var url = iupick.getBaseUrl() + 'waypoints/postal-ids/' + postalCode + '/';
    var headers = { Authorization: 'Token '  + iupick.publicToken };

    iupick.requests.get({url: url, headers: headers},
      function(err, response) {
        if (err) {
          throw new Error(err);
        }
        var decodedResponse = JSON.parse(response.body);
        callback(decodedResponse);
      });
  },

}
module.exports = Waypoints;
