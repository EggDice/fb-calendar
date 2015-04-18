'use strict';

/**
 * Calculates collisions between events, and based on these collisions groups
 * them.
 *
 * @param Array({start: number, end: number}) events The list of events.
 * @return Array(Array({start: number, end: number})) The list of groups.
 */
function getCollidedGroups(events) {
  return events
    .sort(_compareEvents)
    .reduce(_reduceToGroups, []);
}

function _compareEvents(a, b) {
  return a.start === b.start ? a.end - b.end : a.start - b.start;
}

function _reduceToGroups(groups, event) {
  var lastGroup = _last(groups) || [];
  var lastEvent = _last(lastGroup);
  if (_isNotOverlap(event, lastEvent)) {
    groups.push([event]);
  } else {
    lastGroup.push(event);
  }
  return groups;
}

function _isNotOverlap(event1, event2) {
  if (event1 && event2) {
    return event1.end <= event2.start || event1.start >= event2.end;
  }
  return true;
}

function _last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = getCollidedGroups;

