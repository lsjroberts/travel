var tfl = require('./tfl')
  , rail = require('./national-rail')
  , express = require('express')
  , app = express()
  , server
;


// Responses
function createResponseFromLines(lines, response) {
    response = response || '<ul>';

    lines.forEach(function(line) {
        var style;

        if (line.incident) {
            style = 'style="color: #f00;"';
        } else {
            style = 'style="color: #0f0;"';
        }

        response += '<li><strong>' + line.line + ':</strong> '
        response += '<span ' + style + '>' + line.status + '</span>';
        response += '<br>' + line.statusDescription + '</li>';
    });

    response += '</ul>';

    return response;
}


// Routes

app.get('/hipchat/summary', function(req, res) {
    var response = '';

    tfl.tube.status({
        'incidents': true,
    }).then(function(lines) {
        response += createResponseFromLines(lines);
        res.send(response);
    });
});

app.get('/hipchat/tube/status', function(req, res) {
    tfl.tube.status().then(function(lines) {
        var response = createResponseFromLines(lines);
        res.send(response);
    });
});

app.get('/hipchat/tube/incidents', function(req, res) {
    tfl.tube.status({
        'incidents': true,
    }).then(function(lines) {
        var response = createResponseFromLines(lines);
        res.send(response);
    });
});

server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});