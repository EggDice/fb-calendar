'use strict';

var utils = require('./utils');
var last = utils.last;
var isAfter = utils.isAfter;
var buildClustersBy = utils.buildClustersBy;

/**
 * Calculates collisions between events, and based on these collisions groups
 * them.
 *
 * @param Array({start: number, end: number}) events The list of events.
 * @return Array(Array({start: number, end: number})) The list of groups.
 */
function getCollidedGroups(events) {
  var sortedEvents = events.sort(_compareEvents);
  return buildClustersBy(sortedEvents, _getLastOverlappedGroup);
}

function _compareEvents(a, b) {
  return a.start === b.start ? a.end - b.end : a.start - b.start;
}

function _getLastOverlappedGroup(groups, event) {
  var lastGroup = last(groups);
  return _isOverlap(event, last(lastGroup)) ? lastGroup : null;
}

function _isOverlap(event1, event2) {
  if (event1 && event2) {
    return !isAfter(event1, event2) && !isAfter(event2, event1);
  }
  return false;
}

module.exports = getCollidedGroups;

