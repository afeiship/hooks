'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slateHyperscript = require('slate-hyperscript');

exports.default = {
  name: 'italic',
  importer: function importer(el, children) {
    var nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'span' && el.style.fontStyle === 'italic') {
      return (0, _slateHyperscript.jsx)('text', { italic: true }, children);
    }
  },
  // to-html
  exporter: function exporter(node, children) {
    if (!children) {
      if (node.italic) {
        return '<span style="font-style: italic">' + node.text + '</span>';
      }
    }
  },
  hooks: {
    leaf: function leaf(inContext, _ref) {
      var attributes = _ref.attributes,
          children = _ref.children,
          _leaf = _ref.leaf;

      if (_leaf.italic) {
        children = React.createElement(
          'em',
          null,
          children
        );
      }
      return React.createElement(
        'span',
        attributes,
        children
      );
    }
  }
};