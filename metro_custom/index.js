'use strict';
var Alexa = require("alexa-sdk");
const https = require('https');



exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};


function get_response(respond){
    var options = {
        host: 'api.wmata.com',
        path: '/StationPrediction.svc/json/GetPrediction/E04',
        method: 'GET',
        headers: {
            'api_key': 'garbage'
        }
    };
    const req = https.request(options, (res) => {
        res.on('data', (d) => {
            try {
                var metroTimes = JSON.parse(d);
                process_response(metroTimes.Trains, respond);
            } catch (e) {
                console.error(e)
                respond(':tell', 'Error while requesting next train');
            }
        });
    });
    req.on('error', (e) => {
        respond(':tell', 'Error while requesting next train');
    });
    req.end();
}


function process_response(metroTrains, respond){

    var trains = ['There is'];
    metroTrains.forEach(function(train) {
        console.log(train)
        if (train.Group !== "2") {
            console.log('Wrong Direction');
            return;
        }
        if (train.DestinationCode === null){
            console.log('No Destination');
            return;
        }
        var line = train.Line === "GR" ? 'green' : 'yellow';
        var time = train.Min === "ARR" || train.Min === "BRD" ? ' arriving.' : 'in ' + train.Min + ' minutes.';
        trains.push('a ' + line + ' train ' + time)
    });
    if (trains.length === 1) {
        respond(':tell', 'No trains found');
        return;
    }
    trains.push('and ' + trains.pop());
    respond(':tell', trains.join(' '));
}

var handlers = {
    'LaunchRequest': function () {
        this.emit('InitResponse');
    },
    'HelloWorldIntent': function () {
        this.emit('InitResponse')
    },
    'InitResponse': function () {
        get_response(this.emit);
    }
};
