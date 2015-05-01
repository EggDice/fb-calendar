'use strict';

jest.autoMockOff();

var generateRender = require('../render');

var mockElement = {
  innerHTML: ''
};

describe('render', function() {
  it('should clear the element', function() {
    var render = getRenderer('');
    mockElement.innerHTML = 'content';
    render([]);
    expect(mockElement.innerHTML).toBe('');
  });

 it('should render an element', function() {
    var render = getRenderer('e');
    render([{
      top: 0,
      left: 0,
      width: 600,
      height: 60
    }]);
    expect(mockElement.innerHTML).toBe('e');
  });

  it('should render a property', function() {
    var render = getRenderer('e {{top}}');
    render([{
      top: 0,
      left: 0,
      width: 600,
      height: 60
    }]);
    expect(mockElement.innerHTML).toBe('e 0');
  });

  it('should render multiple properties', function() {
    var render = getRenderer('e {{top}} {{width}}');
    render([{
      top: 0,
      left: 0,
      width: 600,
      height: 60
    }]);
    expect(mockElement.innerHTML).toBe('e 0 600');
  });
});

function getRenderer(template) {
  return generateRender({
    element: mockElement,
    template: template
  });
}
