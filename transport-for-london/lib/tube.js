var tfl = require('tfl')
    _ = require('underscore');

var tube = function() { };

tube.prototype.status = function(options) {
    var statuses;

    options = _.defaults(options, {
        lines: [],
    });

    if (options.lines.length == 0) {
        return;
    }

    lines = tfl.get('/TrackerNet/LineStatus');
};

tube.prototype.incidents = function(options) { };
tube.prototype.line = function(name) { };
tube.prototype.station = function(name) { };