'use strict';

function positionsGenerator(options) {
  var CALENDAR_LENGTH = 720;

  function getPositions(groups) {
    return _flattenMap(groups, function(group) {
      return _flattenMap(group, _mapColumns);
    });
  }

  function _mapColumns(column, index, columns) {
    var colDetails = {
      width: options.width / columns.length,
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
    return absoulte * options.height / CALENDAR_LENGTH;
  }

  function _flattenMap(arrayOfArrays, iterator) {
    return arrayOfArrays.reduce(function(output, array, index) {
      return output.concat(iterator(array, index, arrayOfArrays));
    }, []);
  }

  return getPositions;
}

module.exports = positionsGenerator;
