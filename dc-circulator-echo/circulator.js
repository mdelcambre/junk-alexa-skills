/**
 * circulator.js
 * Provides the basic function that allow the retrieval and parseing of the
 * NextBus API for the buses arriving at a give stop (hardcoded)
**/

var request = require('request');
var NB_URL = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=dc-circulator&stopId=0054'

module.exports.NB_URL = NB_URL;
module.exports.getArrivals = getArrivals

/**
 * get_xml
 * Makes a request to the next bus url and passes the body onto the parser
**/
function getArrivals(callback){
   request(NB_URL, function (error, response, body) {
        if(error){
            callback(false)
            return console.log('Error:', error);
        }

        if(response.statusCode !== 200){
            callback(false)
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }

        var arrivals = parseXML(body); // Show the HTML for the Modulus homepage.
        callback(arrivals);
   });
}

/**
 * parse_xml(xml string)
 * Parses the arrivals for all predictions returning an array of int (minutes)
 * Returns a null on parse error
**/
function parseXML(xml){
    var predictions = xml.match(/<prediction .*?\/>/g);
    return predictions.map(function(row, index, array){
        try {
            return row.match(/minutes="(\d+)"/)[1];
        }
        catch (e) {
            return null;
        }
    });
}

