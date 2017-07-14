/**
 * circulator.js
 * Provides the basic function that allow the retrieval and parseing of the
 * NextBus API for the buses arriving at a give stop (hardcoded)
**/

var request = require('request');
var FIRE_URL = 'https://www.ismetroonfire.com/fireapi'

module.exports.FIRE_URL = FIRE_URL;
module.exports.getStatus = getStatus

/**
 * get_html
 * Makes a request to the next bus url and passes the body onto the parser
**/
function getStatus(callback){
   request(FIRE_URL, function (error, response, body) {
        if(error){
            callback(false)
            return console.log('Error:', error);
        }

        if(response.statusCode !== 200){
            callback(false)
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }

        var resp = JSON.parse(body); // Show the HTML for the Modulus homepage.
        callback(resp.message);
   });
}


