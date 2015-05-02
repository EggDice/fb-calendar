'use strict';

/**
 * Returns a renderer instance.
 *
 * @param {{element: DomElement, template: string}} options
 * 
 * @return {Renderer}
 */
function rendererFactory(options) {
  var element = options.element;
  var template = options.template;

  /**
   * Renders events by position details into the DOM element's innerHTML.
   *
   * @param {Array<positions>} events
   */
  function render(events) {
    element.innerHTML = events.reduce(_appendRenderedElement, '');
  }

  function _appendRenderedElement(html, event) {
    return html + _renderElement(event);
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

module.exports = rendererFactory;

