'use strict';

const chatStatus = document.querySelector('.chat .chat-status');
const formButton = document.querySelector('.message-submit');
const messagesField = document.querySelector('.messages-content');

messagesField.style.overflowY = 'auto';

const messageStatus = document.querySelector('.message-status');
const messageLoading = document.querySelector('.loading');
const messagePersonal = document.querySelector('.message-personal');
const messageInterlocutor = document.querySelector('.loading').nextElementSibling;

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

connection.addEventListener('open', function(e) {
  chatStatus.textContent = chatStatus.dataset.online;
  formButton.disabled = false;
  messagesField.appendChild(messageStatus);
  messagesField.querySelector('.message-status .message-text').textContent = 'Пользователь появился в сети';
});

connection.addEventListener('message', function(e) {
  if (e.data === '...') {
    messageLoading.querySelector('span').textContent = 'набирает сообщение...';
    messagesField.appendChild(messageLoading.cloneNode(true));
  } else {
    messageInterlocutor.querySelector('.message-text').textContent = e.data;
    messageInterlocutor.querySelector('.timestamp').textContent = new Date().toTimeString().substr(0, 5);

    messagesField.appendChild(messageInterlocutor.cloneNode(true));
  }
});

connection.addEventListener('close', function(e) {
  chatStatus.textContent = chatStatus.dataset.offline;
  formButton.disabled = true;
  messageStatus.querySelector('.message-text').textContent = 'Пользователь не в сети';
  messagesField.appendChild(messageStatus.cloneNode(true));
});

formButton.addEventListener('click', function(e) {
  e.preventDefault();

  const sms = document.querySelector('.message-input').value;

  if (sms) {
    document.querySelector('.message-input').value = '';

    connection.send(sms);

    messagePersonal.querySelector('.message-text').textContent = sms;
    messagePersonal.querySelector('.timestamp').textContent = new Date().toTimeString().substr(0, 5);

    messagesField.appendChild(messagePersonal.cloneNode(true));
  }
});

window.addEventListener('beforeunload', function(e) {
  connection.close(1000, 'Connection closed');
});