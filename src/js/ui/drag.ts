import { getTranslateY } from '../utils.js';

let mouseIsDown = false;
let currentMovingElement = null;
let offsets = [];

function sortDrag(elementClass) {
  // buttons = document.querySelectorAll(buttonClass)
  const elements = document.querySelectorAll(elementClass);
  // console.log(elements);

  document.onmouseup = () => {
    mouseIsDown = false;
  };

  document.onmousemove = e => {
    if (mouseIsDown) {
      currentMovingElement.style.transform = `translateY(${e.clientY - currentMovingElement.offsetTop + offsets[currentMovingElement]}px)`;
    }
  };

  elements.forEach(element => {
    const button = element.children[0];

    button.onmousedown = e => {
      currentMovingElement = button.parentElement;
      offsets[currentMovingElement] = element.offsetTop + getTranslateY(currentMovingElement) - e.clientY;
      mouseIsDown = true;
    };

    element.onmouseover = () => {
      if (mouseIsDown && element != currentMovingElement) {
        console.log('hello');
      }
    };
  });
}

sortDrag('.exercise');
