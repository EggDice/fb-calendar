'use strict';

var calendarFactory = require('./calendar');
var rendererFactory = require('./render');

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

/**
 * Returns an app instance.
 * 
 * @param {{element: DomElement, height: number, width: number}} options
 *
 * @return {App} The app instance
 */
function appFactory(options) {
  var element = options.element;
  var calendar = calendarFactory({
    width: options.width,
    height: options.height
  });
  var renderer = rendererFactory({
    element: element,
    template: TEMPLATE
  });

  /**
   * Renders events to the DOM element.
   *
   * @param {Array<event>} List of the rendered events
   */
  function render(events) {
    var positions = calendar(events);
    renderer(positions);
  }

  return {
    render: render
  };
}

module.exports = appFactory;
