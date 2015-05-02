'use strict';

var getGroups = require('./groups');
var getColumns = require('./columns');
var positionsFactory = require('./positions');

/**
 * Returns a calendar instance
 *
 * @param {{width: number, height: number}} options
 *
 * @return {Calendar} The calendar instance
 */
function calendarFactory(options) {
  var getPositions = positionsFactory(options);

  /**
   * Returns a list of event positions and sizes based on original events.
   *
   * @param {Array<event>} events
   *
   * @param {Array<{top: number, left: number, height: number, width: number}>}
   */
  function calendar(events) {
    var groups = getGroups(events);
    var columns = groups.map(getColumns);
    return getPositions(columns);
  }

  return calendar;
}

module.exports = calendarFactory;
