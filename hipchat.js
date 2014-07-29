var
    tfl = require('../node-tfl')
  , rail = require('../node-national-rail')
    // tfl = require('tfl')
  // , rail = require('national-rail')
  , express = require('express')
  , app = express()
  , server
  , request = require('request')
;


// Responses

function createResponseFromLines(lines, response) {
    response = response || '<ul style="list-style: none; margin: 0; padding: 0; font-family: Helivetica, Arial, sans-serif;">';

    lines.forEach(function(line) {
        var style;

        if (line.incident) {
            style = 'style="color: #f00;"';
        } else {
            style = 'style="color: #0f0;"';
        }

        response += '<li style="background: #' + tfl.tube.lines.values[line.name].color + '; color: #fff; padding: 3px 8px;">';
        response += '   <strong>' + line.name + ':</strong> '
        response += '   <span ' + style + '>' + line.status + '</span>';
        response += '   <br>' + line.statusDescription;
        response += '</li>';
    });

    response += '</ul>';

    return response;
}

function createResponseFromStations(stations, response) {
    response = response || '<ul>';

    stations.forEach(function(station) {
        var style;

        if (station.incident) {
            style = 'style="color: #f00;"';
        } else {
            style = 'style="color: #0f0;"';
        }

        response += '<li><strong>' + station.name + ':</strong> '
        response += '<span ' + style + '>' + station.status + '</span>';
        response += '<br>' + station.statusDescription + '</li>';
    });

    response += '</ul>';

    return response;
}

function sendToHipChat(message) {
    var url = 'https://api.hipchat.com/v1/rooms/message?auth_token=0d8b95be37aa018db02a5f44f354f4&room_id=709499&color=purple&message={message}&from=Travel Updates';
    url = url.replace('{message}', encodeURIComponent(message));
    // request({
    //     url: url
    // });
}


// Routes

app.get('/', function(req, res) {
    var response = '';

    tfl.tube.lines.status({
        'incidents': true,
    }).then(function(lines) {
        response += createResponseFromLines(lines);
        res.send(response);
    });
});

app.get('/tube/lines', function(req, res) {
    var lines = [];

    if (req.query && req.query.q) {
        lines = req.query.q.split(',');
    }

    tfl.tube.lines.status({
        'lines': lines,
    }).then(function(lines) {
        var response = createResponseFromLines(lines);
        sendToHipChat(response);
        res.send(response);
    }).done();
});

app.get('/tube/lines/incidents', function(req, res) {
    tfl.tube.lines.status({
        'incidents': true,
    }).then(function(lines) {
        var response = createResponseFromLines(lines);
        res.send(response);
    });
});

app.get('/tube/stations', function(req, res) {

});

app.get('/tube/stations/incidents', function(req, res) {
    tfl.tube.stations.status({
        'incidents': true,
    }).then(function(stations) {
        var response = createResponseFromStations(stations);
        sendToHipChat(response);
        res.send(response);
    });
});

server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});