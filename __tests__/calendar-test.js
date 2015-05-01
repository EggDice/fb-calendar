'use strict';

jest.autoMockOff();


var generateCalendar = require('../calendar');
var getNormalEvent = require('./get-normal-event');

describe('index', function() {
  it('should return an empty list', function() {
    expect(exec([])).toEqual([]);
  });

  it('should return an event', function() {
    expect(exec([
      [0, 60], [30, 90], [60, 120], [90, 150]
    ])).toEqual([{
      top: 0,
      left: 0,
      height: 60,
      width: 300
    }, {
      top: 60,
      left: 0,
      height: 60,
      width: 300
    }, {
      top: 30,
      left: 300,
      height: 60,
      width: 300
    }, {
      top: 90,
      left: 300,
      height: 60,
      width: 300
    }]);
  });
});

function exec(simplifiedEvents) {
  var events = simplifiedEvents.map(getNormalEvent);
  var calendar = generateCalendar({
    width: 600,
    height: 720
  });
  return calendar(events);
}
