var tfl = require('./tfl')
  , _ = require('underscore')
;

var Tube = function() { };

Tube.prototype.status = function(options) {
    var endpoint
      , statuses
      , promise
    ;

    options = _.defaults(options, {
        lines: [],
        stations: [],
        incidents: false,
    });

    endpoint = '/TrackerNet';

    if (options.stations.length > 0) {
        endpoint += '/StationStatus';
    } else {
        endpoint += '/LineStatus';
    }

    if (options.incidents) {
        endpoint += '/IncidentsOnly';
    }

    promise = tfl.get(endpoint);

    return promise.then(function(nodes) {
        var lines = []
          , n
          , node
        ;

        for (n in nodes) {
            node = nodes[n];
            if (node.name() == 'LineStatus') {
                lines.push({
                    'line': node.child(3).attr('Name').value(),
                    'status': node.child(5).attr('Description').value(),
                    'statusDescription': node.attr('StatusDetails').value(),
                    'incident': node.child(5).attr('Description').value() !== 'Good Service',
                });
            }
        }

        if (options.lines.length > 0) {
            lines = lines.filter(function(line) {
                return options.lines.indexOf(line.line) > -1;
            });
        }

        return lines;
    });
};

Tube.prototype.incidents = function(options) {
    options = options || {};
    options.incidents = true;

    return this.status(options);
};

Tube.prototype.line = function(name) {

};

Tube.prototype.station = function(name) { };

module.exports = new Tube();