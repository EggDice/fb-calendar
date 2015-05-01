'use strict';

var generateCalendar = require('./calendar');
var generateRender = require('./render');

var TEMPLATE = 
  '<div ' +
    'class="event" ' +
    'style="top: {{top}}px; ' +
      'left: {{left}}px; ' +
      'width: {{width}}px; ' +
      'height: {{height}}px"' +
  '>' +
    '<div class="content">' +
      '<h2>Sample Item</h2>' +
      '<p>Sample Location</p>' +
    '</div>' +
  '</div>';

function generateApp(options) {
  var element = options.element;
  var calendar = generateCalendar({
    width: options.width,
    height: options.height
  });
  var renderer = generateRender({
    element: element,
    template: TEMPLATE
  });

  function render(events) {
    var positions = calendar(events);
    renderer(positions);
  }

  return {
    render: render
  };
}

module.exports = generateApp;
