var tfl = require('./tfl')
    _ = require('underscore');

var Tube = function() { };

Tube.prototype.status = function(options) {
    var statuses;

    options = _.defaults(options, {
        lines: [],
    });

    if (options.lines.length == 0) {
        return;
    }

    return tfl.get('/TrackerNet/LineStatus');
};

Tube.prototype.incidents = function(options) { };
Tube.prototype.line = function(name) { };
Tube.prototype.station = function(name) { };

module.exports = new Tube();