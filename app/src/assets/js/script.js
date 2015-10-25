var $ = require('jQuery');
require('waypoints/lib/noframework.waypoints.js')
require('blazy')
require('fancybox')($)

$(document).ready(function() {
 console.log('bla 234');
 $.fancybox.open($('.fancybox-me'));
});



var waypoint = new Waypoint({
  element: document.getElementById('title'),
  handler: function(direction) {
    console.log('Scrolled to waypoint!')
  }
})


