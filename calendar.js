'use strict';

var getGroups = require('./groups');
var getColumns = require('./columns');
var positionsGenerator = require('./positions');

function generateCalendar(options) {
  var getPositions = positionsGenerator(options);

  function calendar(events) {
    var groups = getGroups(events);
    var columns = groups.map(getColumns);
    return getPositions(columns);
  }

  return calendar;
}

module.exports = generateCalendar;
