'use strict';

function generateRender(options) {
  var element = options.element;
  var template = options.template;

  function render(events) {
    element.innerHTML = events.reduce(function(html, event) {
      return html + _renderElement(event);
    }, '');
  }

  function _renderElement(event) {
    return Object.keys(event).reduce(_replaceTag(event), template);
  }

  function _replaceTag(event) {
    return function(element, key) {
      var replacer = new RegExp('{{' + key + '}}', 'ig');
      return element.replace(replacer, event[key]);
    };
  }

  return render;
}

module.exports = generateRender;

