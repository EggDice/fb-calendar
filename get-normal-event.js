'use strict';

module.exports = function getNormalEvent(simplifiedEvent) {
  return {
    start: simplifiedEvent[0],
    end: simplifiedEvent[1]
  };
};
