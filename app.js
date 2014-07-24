var tfl = require('./tfl')
  // , rail = require('./national-rail')
;

tfl.tube.lines({
    'lines': ['Jubilee', 'District']
}).then(function(lines) {
    console.log('Lines:', lines);
});

tfl.tube.lines({
    'lines': ['Jubilee', 'District'],
    'incidents': true
}).then(function(lines) {
    console.log('Incidents:', lines);
});

tfl.tube.stations({
    'stations': ['Victoria'],
}).then(function(stations) {
    console.log('Stations:', stations);
});

// tfl.tube.line('Jubilee');

// tfl.overground.???.('Algate East');

// tfl.road.disruptions();
// tfl.road.cameras();

// tfl.cyclehire.availability();

// tfl.bus.???;