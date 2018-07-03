'use strict';

function init() {
  const contacts = JSON.parse(loadContacts());

  let contactListDom = document.querySelector('.contacts-list');
  contactListDom.innerHTML = '';

  contacts.forEach((contact) => {
    contactListDom.innerHTML += `<li data-email="${contact.email}" data-phone="${contact.phone}"><strong>${contact.name}</strong></li>`;
  });

  /*
    Второй вариант с присвоением атрибутов через обьект dataset.
    В данном случае это только усложняет решение и читаемость.
    Поэтому решил закоментировать и оставить предыдущее решение как рабочий вариант.

    contacts.forEach(() => {
      contactListDom.innerHTML += '<li><strong></strong></li>';
    });

    let contactList = contactListDom.querySelectorAll('.contacts-list > li');

    for (let i = 0; i < contactList.length; i++) {
      contactList[i].querySelector('li > strong').innerHTML = contacts[i].name;
      contactList[i].dataset.email = contacts[i].email;
      contactList[i].dataset.phone = contacts[i].phone;
    }
  */
}

document.addEventListener('DOMContentLoaded', init);