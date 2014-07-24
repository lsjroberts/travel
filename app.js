var tfl = require('./tfl')
  // , rail = require('./national-rail')
  , express = require('express')
  , app = express()
  , server
;

app.get('/hipchat/summary', function(req, res) {

});

app.get('/hipchat/tube/status', function(req, res) {
    tfl.tube.status().then(function(lines) {

    });
});

app.get('/hipchat/tube/incidents', function(req, res) {
    tfl.tube.status({
        'incidents': true,
    }).then(function(lines) {
        var response = '<ul>';

        lines.forEach(function(line) {
            response += '<li><strong>' + line.line + ':</strong> '
            response += '<span style="color: #f00;">' + line.status + '</span>';
            response += '<br>' + line.statusDescription + '</li>';
        });

        response += '</ul>';

        res.send(response);
    });
});

server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});