'use strict';

var getCollidedGroups = require('../groups');
var getNormalEvent = require('../get-normal-event');

describe('groups', function() {
  it('should return no groups', function() {
    expect(getCollidedGroups([])).toEqual([]);
  });

  it('should return one group', function() {
    expect(getGroupCount([
      [0, 60]
    ])).toBe(1);
  });

  it('should return two group', function() {
    expect(getGroupCount([
      [0, 60], [60, 120]
    ])).toBe(2);
  });

  it('should handle exact match', function() {
    expect(getGroupCount([
      [0, 60], [0, 60]
    ])).toBe(1);
  });

  it('should handle if second is overlap', function() {
    expect(getGroupCount([
      [0, 60], [30, 90]
    ])).toBe(1);
  });

  it('should handle if contains', function() {
    expect(getGroupCount([
      [30, 90], [0, 120]
    ])).toBe(1);
  });

  it('should not rely on order', function() {
    expect(getGroupCount([
      [60, 120], [0, 60]
    ])).toBe(2);
  });

  it('should handle more than 2', function() {
    expect(getGroupCount([
      [0, 60], [60, 120], [90, 180]
    ])).toBe(2);
  });

  it('should handle sorted events', function() {
    expect(exec([
      [0, 60],
      [70, 120],
      [90, 130],
      [120, 140],
      [140, 200],
      [140, 210],
      [220, 240],
      [220, 240]
    ])).toEqual(getNormalGroups([
      [[0, 60]],
      [[70, 120], [90, 130], [120, 140]],
      [[140, 200], [140, 210]],
      [[220, 240], [220, 240]]
    ]));
  });

  it('should handle unsorted events', function() {
    expect(exec([
      [140, 210],
      [220, 240],
      [140, 200],
      [0, 60],
      [90, 130],
      [220, 240],
      [70, 120],
      [120, 140]
    ])).toEqual(getNormalGroups([
      [[0, 60]],
      [[70, 120], [90, 130], [120, 140]],
      [[140, 200], [140, 210]],
      [[220, 240], [220, 240]]
    ]));
  });
});

function exec(simplifiedEvents) {
  var events = simplifiedEvents.map(getNormalEvent);
  return getCollidedGroups(events);
}

function getGroupCount(simplifiedEvents) {
  return exec(simplifiedEvents).length;
}

function getNormalGroups(simplifiedGroups) {
  return simplifiedGroups.map(mapEachWith(getNormalEvent));
}

function mapEachWith(fn) {
  return function(list) { return list.map(fn); };
}

