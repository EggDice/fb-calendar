'use strict';

jest.autoMockOff();

var generateApp = require('../app');

var mockElement = {
  innerHTML: ''
};

describe('app', function() {
  it('should render one element', function() {
    var app = generateApp({
      element: mockElement,
      width: 600,
      height: 720
    });
    app.render([{
      start: 0,
      end: 60
    }]);
    expect(mockElement.innerHTML).toBe(
      '<div class="event" '+
      'style="top: 0px; left: 0px; width: 600px; height: 60px"'+
      '>' +
        '<div class="content">' +
          '<h2>Sample Item</h2>' +
          '<p>Sample Location</p>' +
        '</div>' +
      '</div>'
    );
  });
});

