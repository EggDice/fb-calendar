'use strict';

var appFactory = require('./app');

document.addEventListener('DOMContentLoaded', function(event) { 
  var app = appFactory({
    width: 600,
    height: 720,
    element: document.getElementsByClassName('day')[0]
  });

  /**
   * Exposed main function, takes events.
   *
   * @param {Array<event>} events
   */
  window.layOutDay = function(events) {
    app.render(events);
  };

  window.layOutDay([
    {start: 30, end: 150},
    {start: 540, end: 600},
    {start: 560, end: 620},
    {start: 610, end: 670}
  ]);
});
