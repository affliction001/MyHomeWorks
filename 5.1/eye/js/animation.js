'use strict';

const pupil = document.querySelector('.big-book__pupil');
const pupilCoords = pupil.getBoundingClientRect();
const pupilCenterX = pupilCoords.left + pupilCoords.width / 2;
const pupilCenterY = pupilCoords.top + pupilCoords.height / 2;

document.addEventListener('mousemove', e => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  pupil.style.setProperty('--pupil-x', 30 * (mouseX * 100 / pupilCenterX) / 100 - 30 + 'px');
  pupil.style.setProperty('--pupil-y', 30 * (mouseY * 100 / pupilCenterY) / 100 - 30 + 'px');
  pupil.style.setProperty('--pupil-size', getSize(mouseX, mouseY, pupilCenterX, pupilCenterY));
});

function getSize(mX, mY, pX, pY) {
  const msX = Math.abs(pX - mX) * 100 / pX;
  const msY = Math.abs(pY - mY) * 100 / pY;

  if (msX >= 66.66 || msY >= 66.66) {
    return 1;
  } else if (msX >= 33.33 || msY >= 33.33) {
    return 2;
  }

  return 3;
}