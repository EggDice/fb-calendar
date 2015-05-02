'use strict';

/**
 * Returns the last element from an array.
 *
 * @param {Array<T>} array
 *
 * @param {T} The last element.
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

/**
 * Determinates if the event on the second argument is after the first.
 *
 * @param {event} event1
 * @param {event} event2
 *
 * @return {Boolean}
 */
function isAfter(event1, event2) {
  return event1.end <= event2.start;
}

/**
 * Separates an array's elements into clusters, based on the iterator
 * The iterator gets all the clusters, and the current element. The iterator
 * should return the cluster the element belongs to or a falsy value if it
 * should belong to a new cluster. The first element will always create a new
 * cluster.
 *
 * @param {Array<T>} array
 * @param {function(Array<Array<T>>, T)} iterator
 *
 * @return {Array<Array<T>>} The clusters.
 */
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
  isAfter: isAfter,
  buildClustersBy: buildClustersBy
};
