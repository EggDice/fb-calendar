'use strict';

var generateApp = require('./app');

document.addEventListener('DOMContentLoaded', function(event) { 
  var app = generateApp({
    width: 600,
    height: 720,
    element: document.getElementsByClassName('day')[0]
  });

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
