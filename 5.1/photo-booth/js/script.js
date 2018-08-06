'use strict';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.app').appendChild(canvas);

const video = document.createElement('video');
document.querySelector('.app').appendChild(video);

const audio = document.createElement('audio');
audio.src = './audio/click.mp3';
document.querySelector('.app').appendChild(audio);

navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then((stream) => {
    video.srcObject = stream;
    video.width = '20vw';
    video.play();

    document.querySelector('.app .controls').style.display = 'block';

    document.querySelector('#take-photo').addEventListener('click', e => {
      audio.play();

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      const photo = nodeEngine(createPhotoNode(canvas));
      document.querySelector('.list').insertBefore(photo, document.querySelector('.list').children[0]);
    });
  })
  .catch((err) => {
    document.querySelector('#error-message').textContent(err);
  });

document.querySelector('.list').addEventListener('click', e => {
  if (e.target.textContent === 'delete') {
    document.querySelector('.list').removeChild(e.target.parentElement.parentElement.parentElement);
  }

  if (e.target.textContent === 'file_upload') {
    let formData = new FormData();
    formData.append("image", imageToBlob(e.target.parentElement.parentElement.parentElement.querySelector('img')));

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://neto-api.herokuapp.com/photo-booth");
    xhr.send(formData);
  }
});

function createPhotoNode(canv) {
  return {
    tag: 'figure',
    content: [
      {
        tag: 'img',
        attr: {src: `${canv.toDataURL()}`}
      },
      {
        tag: 'figcaption',
        content: [
          {
            tag: 'a',
            attr: {href: `${canv.toDataURL()}`, download: 'snapshot.png'},
            content: {
              tag: 'i',
              attr: {class: "material-icons"},
              content: 'file_download'
            }
          },
          {
            tag: 'a',
            content: {
              tag: 'i',
              attr: {class: "material-icons"},
              content: 'file_upload'
            }
          },
          {
            tag: 'a',
            content: {
              tag: 'i',
              attr: {class: "material-icons"},
              content: 'delete'
            }
          }
        ]
      }
    ]
  }
}

function nodeEngine(nodeObj) {
  const node = document.createElement(nodeObj.tag);

  if (typeof nodeObj.attr === 'object') {
    for (let key in nodeObj.attr) {
      node.setAttribute(key, nodeObj.attr[key]);
    }
  }

  if (nodeObj.content) {
    if (typeof nodeObj.content === 'string' || typeof nodeObj.content === 'number') {
      node.textContent = nodeObj.content;
    } else if (Array.isArray(nodeObj.content)) {
      nodeObj.content.forEach(child => {
        node.appendChild(nodeEngine(child));
      });
    } else {
      node.appendChild(nodeEngine(nodeObj.content));
    }
  }

  return node;
}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function imageToBlob(img){
  var ImageURL = img.getAttribute('src');
  var block = ImageURL.split(";");
  var contentType = block[0].split(":")[1];
  var realData = block[1].split(",")[1];

  return b64toBlob(realData, contentType);
}