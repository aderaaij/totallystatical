var $ = require('jQuery');
require('waypoints/lib/noframework.waypoints.js')
require('blazy')
require('fancybox')($)

console.log('bla')


var waypoint = new Waypoint({
  element: document.getElementById('title'),
  handler: function(direction) {
    console.log('Scrolled to waypoint!')
  }
})


