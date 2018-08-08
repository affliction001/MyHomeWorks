'use strict';

const pupil = document.querySelector('.big-book__pupil');


document.addEventListener('mousemove', e => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  updateEye(mouseX, mouseY);
});

document.addEventListener('scroll', e => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  updateEye(mouseX, mouseY);
});

function updateEye(mouseX, mouseY) {
  const pupilCoords = pupil.getBoundingClientRect();
  const pupilCenterX = pupilCoords.left + pupilCoords.width / 2;
  const pupilCenterY = pupilCoords.top + pupilCoords.height / 2;

  pupil.style.setProperty('--pupil-x', getX(mouseX) + 'px');
  pupil.style.setProperty('--pupil-y', getY(mouseY) + 'px');
  pupil.style.setProperty('--pupil-size', getSize(mouseX, mouseY));

  function getX(mX) {
    return mX <= pupilCenterX ?
      -((pupilCenterX - mX) * 100 / pupilCenterX) * 30 / 100 :
      (mX - pupilCenterX) * 100 / (window.innerWidth - pupilCenterX) * 30 / 100;
  }

  function getY(mY) {
    return mY <= pupilCenterY ?
      -((pupilCenterY - mY) * 100 / pupilCenterY) * 30 / 100 :
      (mY - pupilCenterY) * 100 / (window.innerHeight - pupilCenterY) * 30 / 100;
  }

  function getSize(mX, mY) {
    const msX = mX <= pupilCenterX ?
      ((pupilCenterX - mX) * 100 / pupilCenterX) :
      (mX - pupilCenterX) * 100 / (window.innerWidth - pupilCenterX);

    const msY = mY <= pupilCenterY ?
      ((pupilCenterY - mY) * 100 / pupilCenterY) :
      (mY - pupilCenterY) * 100 / (window.innerHeight - pupilCenterY);

    if (msX >= 66.66 || msY >= 66.66) {
      return 1;
    } else if (msX >= 33.33 || msY >= 33.33) {
      return 2;
    }

    return 3;
  }
}