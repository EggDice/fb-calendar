'use strict';

var getNormalEvent = require('../get-normal-event');
var getColumns = require('../columns');

describe('columns', function() {
  it('should return 1 as width', function() {
    var columns = exec([
      [0, 60]
    ]);
    expect(columns.length).toBe(1);
  });

  it('should return 2 as width', function() {
    var columns = exec([
      [0, 60], [0, 60]
    ]);
    expect(columns.length).toBe(2);
  });

  it('should handle events below each other', function() {
    var columns = exec([
      [0, 60], [30, 90], [60, 120]
    ]);
    expect(columns.length).toBe(2);
  });

  it('should handle events below each other', function() {
    var columns = exec([
      [30, 90], [0, 60], [60, 120]
    ]);
    expect(columns.length).toBe(2);
  });

  it('should return eventPositions', function() {
    var columns = exec([
      [0, 60]
    ]);
    expect(columns).toEqual([[{
      start: 0,
      end: 60,
    }]]);
  });

  it('should put it to two columns', function() {
    var columns = exec([
      [0, 60], [30, 90]
    ]);
    expect(columns).toEqual([[{
      start: 0,
      end: 60,
    }], [{
      start: 30,
      end: 90,
    }]]);
  });

  it('should put it to two columns', function() {
    var columns = exec([
      [0, 60], [30, 90], [60, 120], [90, 150]
    ]);
    expect(columns).toEqual([[{
      start: 0,
      end: 60,
    }, {
      start: 60,
      end: 120
    }], [{
      start: 30,
      end: 90,
    }, {
      start: 90,
      end: 150,
    }]]);
  });
});

function exec(simplifiedEvents) {
  var events = simplifiedEvents.map(getNormalEvent);
  return getColumns(events);
}
