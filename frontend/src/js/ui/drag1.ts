import { getTranslateY } from '../utils.js';

let mouseIsDown = false;
let currentMovingElement: HTMLElement = null;
let offsets: { [key: string]: any };

function sortDrag(elementClass: string) {
  // buttons = document.querySelectorAll(buttonClass)
  const elements = document.querySelectorAll(elementClass);
  // console.log(elements);

  document.onmouseup = () => {
    mouseIsDown = false;
  };

  document.onmousemove = e => {
    if (mouseIsDown) {
      currentMovingElement.style.transform = `translateY(${e.clientY - currentMovingElement.offsetTop + offsets[currentMovingElement.id]}px)`;
    }
  };

  elements.forEach((element: HTMLElement) => {
    const button = element.children[0] as HTMLElement;

    button.onmousedown = e => {
      currentMovingElement = button.parentElement;
      offsets[currentMovingElement.id] = element.offsetTop + getTranslateY(currentMovingElement) - e.clientY;
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
