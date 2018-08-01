'use strict';

function createElement(node) {
  if ((node === undefined) || (node === null) || (node === false)) {
    return document.createTextNode('');
  }

  if ((typeof node === 'string') || (typeof node === 'number') || (node === true)) {
    return document.createTextNode(node.toString());
  }

  if (typeof node === 'object') {
    const element = document.createElement(node.name || 'div');

    for (let attr in node.props) {
      element.setAttribute(attr, node.props[attr]);
    }

    if (Array.isArray(node.childs)) {
      element.appendChild(
        node.childs.reduce((f, child) => {
          f.appendChild(createElement(child));

          return f;
        }, document.createDocumentFragment())
      );
    }

    if (typeof node.childs === 'string') {
      element.textContent = node.childs;
    }

    return element;
  }
}