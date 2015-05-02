'use strict';

/**
 * Returns a positions instance.
 *
 * @param {{width: number, height: number}}
 *
 * @return {Positions}
 */
function positionsFactory(options) {
  var CALENDAR_LENGTH_IN_MINUTES = 720;
  var height = options.height;
  var width = options.width;

  /**
   * Returns a list of event positions and sizes
   *
   * @param {Array<collidedGroup>} groups - A list of the collided groups in
   * columns.
   *
   * @return {Array<{top: number, left: number, width: number, height: number}>}
   */
  function getPositions(groups) {
    return _flattenMap(groups, function(group) {
      return _flattenMap(group, _mapColumns);
    });
  }

  function _mapColumns(column, index, columns) {
    var colDetails = {
      width: width / columns.length,
      index: index
    };
    return column.map(_positionFactory(colDetails));
  }

  function _positionFactory(colDetails) {
    return function(event) {
      return {
        top: _getRelativeHeight(event.start),
        left: colDetails.index * colDetails.width,
        width: colDetails.width,
        height: _getRelativeHeight(event.end - event.start)
      };
    };
  }

  function _getRelativeHeight(absoulte) {
    return absoulte * height / CALENDAR_LENGTH_IN_MINUTES;
  }

  function _flattenMap(arrayOfArrays, iterator) {
    return arrayOfArrays.reduce(function(output, array, index) {
      return output.concat(iterator(array, index, arrayOfArrays));
    }, []);
  }

  return getPositions;
}

module.exports = positionsFactory;
