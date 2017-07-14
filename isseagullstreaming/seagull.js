/**
 * circulator.js
 * Provides the basic function that allow the retrieval and parseing of the
 * NextBus API for the buses arriving at a give stop (hardcoded)
**/

var request = require('request');
var FIRE_URL = 'https://api.twitch.tv/kraken/streams/19070311'

module.exports.FIRE_URL = FIRE_URL;
module.exports.getStatus = getStatus

var options = {
    url: FIRE_URL,
    headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'c60idanxwolzuamsmjd5fyd9tk452n'
    }
}

/**
 * get_html
 * Makes a request to the next bus url and passes the body onto the parser
**/
function getStatus(callback){
   request(options, function (error, response, body) {
        if(error){
            callback(false)
            return console.log('Error:', error);
        }

        if(response.statusCode !== 200){
            callback(false)
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        if (body == '{"stream":null}'){
            callback('Seagull is offline');
        } else {
            callback('Yes, seagull is streaming');
        }
   });
}

