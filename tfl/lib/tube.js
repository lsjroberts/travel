var tfl = require('./tfl')
  , _ = require('underscore')
;

var Tube = function() { };

Tube.prototype.lines = function(options) {
    var endpoint
      , statuses
      , promise
    ;

    options = _.defaults(options, {
        lines: [],
        stations: [],
        incidents: false,
    });

    if (options.lines.length == 0 && options.stations.length == 0) {
        return;
    }

    endpoint = '/TrackerNet';

    if (option.lines.length > 0) {
        endpoint += '/LineStatus';
    } else {
        endpoint += '/StationStatus';
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
                });
            }
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