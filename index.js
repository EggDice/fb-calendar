'use strict';

module.exports = function ca(events) {
  if (events.length) {
    return [{
      x: 0,
      y: 0,
      width: 600,
      height: 60
    }];
  }
  return [];
};
