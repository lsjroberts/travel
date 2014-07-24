var request = require('request')
  , q = require('q')
  , libxml = require('libxmljs')
;

var TFL = function() {
    this.baseUrl = 'http://cloud.tfl.gov.uk';
};

TFL.prototype.get = function(uri, root) {
    var deferred = q.defer()
      , xml
      , nodes
    ;

    this.promise = deferred.promise;

    // console.log('GET:', {
    //     'url': this.baseUrl + uri
    // });

    request({
        url: this.baseUrl + uri
    }, function(error, response, body) {
        xml = libxml.parseXml(body);

        if (root) {
            nodes = xml.get('//' + root).childNodes();
        } else {
            nodes = xml.root().childNodes();
        }

        deferred.resolve(nodes);
    }.bind(this));

    return this.promise;
};

module.exports = new TFL();