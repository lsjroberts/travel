var request = require('request');

var tfl = function() {
    this.baseUrl = 'http://cloud.tfl.gov.uk/';
};

tfl.prototype.get = function(uri) { };

module.exports = tfl;