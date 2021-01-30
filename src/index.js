import React from 'react';
import { jsx } from 'slate-hyperscript';

export default {
  name: 'italic',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'span' && el.style.fontStyle === 'italic') {
      return jsx('text', { italic: true }, children);
    }
  },
  // to-html
  exporter: (node, children) => {
    if (!children) {
      if (node.italic) {
        return `<span style="font-style: italic">${node.text}</span>`;
      }
    }
  },
  hooks: {
    leaf: (inContext, { attributes, children, leaf }) => {
      if (leaf.italic) {
        children = <em>{children}</em>;
      }
      return <span {...attributes}>{children}</span>;
    }
  }
};
