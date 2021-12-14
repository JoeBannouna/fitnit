// Default modal animations
function fadeIn(element: HTMLElement) {
  element.style.display = 'block';
  setTimeout(() => (element.style.opacity = '1'), 0);
}

function fadeOut(element: HTMLElement) {
  element.style.transition = '0.3s';
  element.style.opacity = '0';
  setTimeout(() => (element.style.display = 'none'), 300);
}

// function fadeIn(modalElement) {
//   modalElement.style.display = 'block';
//   setTimeout(() => (modalElement.style.opacity = 1), 0);
// }

// function fadeOut(modalElement) {
//   modalElement.style.transition = '0.3s';
//   modalElement.style.opacity = 0;
//   setTimeout(() => (modalElement.style.display = 'none'), 300);
// }

const ANIMATIONS = {
  fadeIn,
  fadeOut,
};

export default ANIMATIONS;
