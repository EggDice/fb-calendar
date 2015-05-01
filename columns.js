'use strict';

var utils = require('./utils');
var last = utils.last;
var isLaterThan = utils.isLaterThan;
var buildClustersBy = utils.buildClustersBy;

function getColumns(group) {
  return buildClustersBy(group, _findFirstColumnWithEmptyPlace);
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

module.exports = getColumns;
