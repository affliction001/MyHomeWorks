'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = document.createDocumentFragment();

  list.forEach(comment => {
    comments.appendChild(tamplateEngine(createTemplate(comment)));
  });

  commentsContainer.appendChild(comments);
}

function tamplateEngine(block) {
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }

  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    return document.createTextNode(block.toString());
  }

  if (Array.isArray(block)) {
    return block.reduce((f, elem) => {
      f.appendChild(tamplateEngine(elem));

      return f;
    }, document.createDocumentFragment());
  }

  const element = document.createElement(block.tag || 'div');

  [].concat(block.cls || []).forEach(
    className => element.classList.add(className)
  );

  if (block.attrs) {
    Object.keys(block.attrs).forEach(
      key => element.setAttribute(key, block.attrs[key])
    );
  }

  if (block.content) element.appendChild(tamplateEngine(block.content));

  return element;
}

function createTemplate(comment) {
  return {
    tag: 'div',
    cls: 'comment-wrap',
    content: [
      {
        tag: 'div',
        cls: 'photo',
        attrs: {
          title: `${comment.author.name}`
        },
        content: {
          tag: 'div',
          cls: 'avatar',
          attrs: {
            style: `background-image: url('${comment.author.pic}')`
          }
        }
      },
      {
        tag: 'div',
        cls: 'comment-block',
        content: [
          {
            tag: 'p',
            cls: 'comment-text',
            content: comment.text.split('\n').reduce((commentStrings, str) => {
              commentStrings.push({
                tag: 'p',
                content: str ? str : { tag: 'br'}
              });

              return commentStrings;
            }, [])
          },
          {
            tag: 'div',
            cls: 'bottom-comment',
            content: [
              {
                tag: 'div',
                cls: 'comment-date',
                content: `${new Date(comment.date).toLocaleString('ru-Ru')}`
              },
              {
                tag: 'ul',
                cls: 'comment-actions',
                content: [
                  {
                    tag: 'li',
                    cls: 'complain',
                    content: 'Пожаловаться'
                  },
                  {
                    tag: 'li',
                    cls: 'reply',
                    content: 'Ответить'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
