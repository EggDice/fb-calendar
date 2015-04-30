'use strict';

jest.autoMockOff();

var getNormalEvent = require('./get-normal-event');
var getRow = require('../row');

describe('row', function() {
  it('should return 1 as width', function() {
    var row = exec([
      [0, 60]
    ]);
    expect(row.width).toBe(1);
  });

  it('should return 2 as width', function() {
    var row = exec([
      [0, 60], [0, 60]
    ]);
    expect(row.width).toBe(2);
  });

  it('should handle events below each other', function() {
    var row = exec([
      [0, 60], [30, 90], [60, 120]
    ]);
    expect(row.width).toBe(2);
  });

  it('should handle events below each other', function() {
    var row = exec([
      [30, 90], [0, 60], [60, 120]
    ]);
    expect(row.width).toBe(2);
  });

  it('should return eventPositions', function() {
    var row = exec([
      [0, 60]
    ]);
    expect(row.eventPositions).toEqual([{
      start: 0,
      end: 60,
      columnIndex: 0
    }]);
  });

  it('should put it to two columns', function() {
    var row = exec([
      [0, 60], [30, 90]
    ]);
    expect(row.eventPositions).toEqual([{
      start: 0,
      end: 60,
      columnIndex: 0
    }, {
      start: 30,
      end: 90,
      columnIndex: 1
    }]);
  });

});

function exec(simplifiedEvents) {
  var events = simplifiedEvents.map(getNormalEvent);
  return getRow(events);
}
