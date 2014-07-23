var tfl = require('./tfl')
  // , rail = require('./national-rail')
;

tfl.tube.status({
    'lines': ['Jubilee', 'District']
}).then(function(lines) {
    console.log('Status:', lines);
});

tfl.tube.incidents({
    'lines': ['Jubilee', 'District'],
}).then(function(lines) {
    console.log('Incidents:', lines);
});

// tfl.tube.line('Jubilee');

// tfl.overground.???.('Algate East');

// tfl.road.disruptions();
// tfl.road.cameras();

// tfl.cyclehire.availability();

// tfl.bus.???;