'use strict';

function init() {
  const contacts = JSON.parse(loadContacts());

  let contactListDom = document.querySelector('.contacts-list');
  contactListDom.innerHTML = '';

  contacts.forEach((contact) => {
    let listHTML = '';
    listHTML += `<li data-email="${contact.email}" data-phone="${contact.phone}"><strong>${contact.name}</strong></li>`;
    contactListDom.innerHTML = listHTML;
  });
}

document.addEventListener('DOMContentLoaded', init);