'use strict';

jest.dontMock('../utils');

var utils = require('../utils');

describe('last', function() {
  it('should get the last element', function() {
    expect(utils.last([1, 2, 3, 4])).toBe(4);
  });

  it('should return undefined on empty array', function() {
    expect(utils.last([])).toBeUndefined();
  });

  it('should return undefined on no input', function() {
    expect(utils.last()).toBeUndefined();
  });
});

describe('isLaterThan', function() {
  it('should give true only if the second event is later', function() {
    expect(utils.isAfter({start: 0, end: 60}, {start: 60, end: 120}));
    expect(utils.isAfter({start: 0, end: 60}, {start: 90, end: 150}));
    expect(utils.isAfter({start: 0, end: 60}, {start: 30, end: 90}));
  });
});

describe('buildClustersBy', function() {
  it('should return an empty array', function() {
    var clusters = utils.buildClustersBy([], function() {});
    expect(clusters).toEqual([]);
  });

  it('should put all the items to one cluster', function() {
    var list = [1, 2, 3, 4];
    var clusters = utils.buildClustersBy(list, function(clusters) {
      return clusters[0];
    });
    expect(clusters).toEqual([[1, 2, 3, 4]]);
  });

  it('should put all the items to different clusters', function() {
    var list = [1, 2, 3, 4];
    var clusters = utils.buildClustersBy(list, function() {
      return null;
    });
    expect(clusters).toEqual([[1], [2], [3], [4]]);
  });
});
