'use strict';

jest.dontMock('../');

var calendar = require('../');

describe('index', function() {
  it('should return an empty list', function() {
    expect(calendar([])).toEqual([]);
  });

  it('should return an event', function() {
    expect(calendar([{
      start: 0, end: 60
    }])).toEqual([{
      x: 0,
      y: 0,
      width: 600,
      height: 60
    }]);
  });
});
