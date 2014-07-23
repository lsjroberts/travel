var request = require('request')
  , q = require('q')
  , libxml = require('libxmljs')
;

var TFL = function() {
    this.baseUrl = 'http://cloud.tfl.gov.uk/';
};

TFL.prototype.get = function(uri, root) {
    var deferred = q.defer(),
        xml;

    this.promise = deferred.promise;

    request({
        url: this.baseUrl + uri
    }, function(error, response, body) {
        xml = libxml.parseXml(body);

        console.log(xml);
        console.log(xml.root().childNodes());

        if (root) {

        }

        deferred.resolve(xml);
    }.bind(this));

    return this.promise;
};

module.exports = new TFL();