(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var generateCalendar = require('./calendar');
var generateRender = require('./render');

var TEMPLATE = 
  '<div ' +
    'class="event" ' +
    'style="top: {{top}}px; ' +
      'left: {{left}}px; ' +
      'width: {{width}}px; ' +
      'height: {{height}}px"' +
  '>' +
    '<div class="content">' +
      '<h2>Sample Item</h2>' +
      '<p>Sample Location</p>' +
    '</div>' +
  '</div>';

function generateApp(options) {
  var element = options.element;
  var calendar = generateCalendar({
    width: options.width,
    height: options.height
  });
  var renderer = generateRender({
    element: element,
    template: TEMPLATE
  });

  function render(events) {
    var positions = calendar(events);
    renderer(positions);
  }

  return {
    render: render
  };
}

module.exports = generateApp;

},{"./calendar":2,"./render":7}],2:[function(require,module,exports){
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

},{"./columns":3,"./groups":4,"./positions":6}],3:[function(require,module,exports){
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

},{"./utils":8}],4:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var last = utils.last;
var isLaterThan = utils.isLaterThan;
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
    return !isLaterThan(event1, event2) && !isLaterThan(event2, event1);
  }
  return false;
}

module.exports = getCollidedGroups;


},{"./utils":8}],5:[function(require,module,exports){
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

},{"./app":1}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

function generateRender(options) {
  var element = options.element;
  var template = options.template;

  function render(events) {
    element.innerHTML = events.reduce(function(html, event) {
      return html + _renderElement(event);
    }, '');
  }

  function _renderElement(event) {
    return Object.keys(event).reduce(_replaceTag(event), template);
  }

  function _replaceTag(event) {
    return function(element, key) {
      var replacer = new RegExp('{{' + key + '}}', 'ig');
      return element.replace(replacer, event[key]);
    };
  }

  return render;
}

module.exports = generateRender;


},{}],8:[function(require,module,exports){
'use strict';

function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

function isLaterThan(event1, event2) {
  return event1.end <= event2.start;
}

function buildClustersBy(array, iterator) {
  return array.reduce(function(clusters, element) {
    var cluster = clusters.length ? iterator(clusters, element) : null;
    if (cluster) {
      cluster.push(element);
    } else {
      clusters.push([element]);
    }
    return clusters;
  }, []);
}

module.exports = {
  last: last,
  isLaterThan: isLaterThan,
  buildClustersBy: buildClustersBy
};

},{}]},{},[5]);
