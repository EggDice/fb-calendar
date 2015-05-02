'use strict';

jest.autoMockOff();

var positionsFactory = require('../positions');
var defaultBoardDetails = {
  width: 600,
  height: 720
};
var getPositions = positionsFactory(defaultBoardDetails);

describe('positions', function() {
  it('should return empty array', function() {
    expect(getPositions([])).toEqual([]);
  });

  it('should return one event', function() {
    expect(getPositions([[
        [{start: 0, end: 60}]
    ]])).toEqual([{
      top: 0,
      left: 0,
      width: 600,
      height: 60
    }]);
  });

  it('should return two events', function() {
    expect(getPositions([
      [[{start: 0, end: 60}]],
      [[{start: 60, end: 90}]]
    ])).toEqual([{
      top: 0,
      left: 0,
      width: 600,
      height: 60
    }, {
      top: 60,
      left: 0,
      width: 600,
      height: 30
    }]);
  });

  it('should handle width', function() {
    expect(getPositions([
      [[{start: 0, end: 60}], [{start: 0, end: 60}]]
    ])).toEqual([{
      top: 0,
      left: 0,
      width: 300,
      height: 60
    }, {
      top: 0,
      left: 300,
      width: 300,
      height: 60
    }]);
  });

  it('should handle multiple in one column', function() {
    expect(getPositions([
      [[{start: 0, end: 60}, {start: 60, end: 120}],
      [{start: 0, end: 120}]]
    ])).toEqual([{
      top: 0,
      left: 0,
      width: 300,
      height: 60
    }, {
      top: 60,
      left: 0,
      width: 300,
      height: 60
    }, {
      top: 0,
      left: 300,
      width: 300,
      height: 120
    }]);
  });

  it('should handle different width', function() {
    var getPositions = positionsFactory({
      width: 400,
      height: 720
    });
    expect(getPositions([
      [[{start: 0, end: 60}]]
    ])).toEqual([{
      top: 0,
      left: 0,
      width: 400,
      height: 60
    }]);
  });

 it('should handle different height', function() {
    var getPositions = positionsFactory({
      width: 600,
      height: 360
    });
    expect(getPositions([
      [[{start: 60, end: 120}]]
    ])).toEqual([{
      top: 30,
      left: 0,
      width: 600,
      height: 30
    }]);
  });

});
