'use strict';

var utils = require('./utils');
var last = utils.last;
var isLaterThan = utils.isLaterThan;
var buildClustersBy = utils.buildClustersBy;

function getRow(group) {
  var columns = buildClustersBy(group, _findFirstColumnWithEmptyPlace);

  return {
    width: columns.length,
    eventPositions: _getEventPositions(columns)
  };
}

function _findFirstColumnWithEmptyPlace(columns, event) {
  return _find(columns, function(column) {
    return isLaterThan(last(column), event);
  });
}

function _find(array, predicate) {
  for (var i = 0; i < array.length; ++i) {
    var value = array[i];
    if (predicate(value)) {
      return value;
    }
  }
  return undefined;
}

function _getEventPositions(columns) {
  return  columns.reduce(_concatColumnAndMapEvents, []);
}

function _concatColumnAndMapEvents(positions, column, index) {
  return positions.concat(column.map(_extendEventWithColumnIndex(index)));
}

function _extendEventWithColumnIndex(index) {
  return function(event) {
    return {
      start: event.start,
      end: event.end,
      columnIndex: index
    };
  };
}

module.exports = getRow;
