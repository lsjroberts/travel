var tfl = require('./tfl')
    _ = require('underscore');

var Tube = function() { };

Tube.prototype.status = function(options) {
    var statuses
      , promise
    ;

    options = _.defaults(options, {
        lines: [],
    });

    if (options.lines.length == 0) {
        return;
    }

    promise = tfl.get('/TrackerNet/LineStatus');

    return promise.then(function(nodes) {
        var lines = []
          , n
          , node
        ;

        for (n in nodes) {
            node = nodes[n];
            if (node.name() == 'LineStatus') {
                // console.log(node.child(3).name());
                lines.push({
                    'line': node.child(3).attr('Name').value(),
                    'status': node.child(5).attr('Description').value(),
                    'statusDescription': node.attr('StatusDetails').value(),
                });
            }
        }

        return lines;
    });
};

Tube.prototype.incidents = function(options) { };
Tube.prototype.line = function(name) { };
Tube.prototype.station = function(name) { };

module.exports = new Tube();