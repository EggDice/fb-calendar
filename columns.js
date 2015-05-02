'use strict';

var utils = require('./utils');
var last = utils.last;
var isAfter = utils.isAfter;
var buildClustersBy = utils.buildClustersBy;

/**
 * Takes a group af collided events and returns them in columns.
 *
 * @param {Array<event>} group - A group off collided events.
 * 
 * @return {Array<Array<event>>}
 */
function getColumns(group) {
  return buildClustersBy(group, _findFirstColumnWithEmptyPlace);
}

function _findFirstColumnWithEmptyPlace(columns, event) {
  return _find(columns, function(column) {
    return isAfter(last(column), event);
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

module.exports = getColumns;
