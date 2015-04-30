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
