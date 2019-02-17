'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var STYLE = { fontStyle: 'italic' };

exports.default = {
  renderMark: function renderMark(inProps, inEditor, inNext) {
    var children = inProps.children,
        attributes = _objectWithoutProperties(inProps, ['children']);

    switch (inProps.mark.type) {
      case 'italic':
        return React.createElement(
          'span',
          { style: STYLE },
          children
        );
      default:
        return inNext();
    }
  }
};