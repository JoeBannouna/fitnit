import { addMultipleClasses, removeMultipleClasses } from '../utils';

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

function showModal(modalElement: HTMLElement) {
  const modalRect = document.querySelector('.modal-rect') as HTMLElement;
  modalElement.classList.remove('hidden');

  setTimeout(() => {
    removeMultipleClasses(modalElement, ['opacity-0', 'ease-in', 'duration-200']);
    removeMultipleClasses(modalRect, ['ease-in', 'duration-200', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95']);

    addMultipleClasses(modalElement, ['opacity-100', 'ease-out', 'duration-300']);
    addMultipleClasses(modalRect, ['ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100']);
  }, 0);
}

function hideModal(modalElement: HTMLElement) {
  const modalRect = document.querySelector('.modal-rect') as HTMLElement;

  removeMultipleClasses(modalElement, ['opacity-100', 'ease-out', 'duration-300']);
  removeMultipleClasses(modalRect, ['ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100']);

  addMultipleClasses(modalElement, ['opacity-0', 'ease-in', 'duration-200']);
  addMultipleClasses(modalRect, ['ease-in', 'duration-200', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95']);

  setTimeout(() => modalElement.classList.add('hidden'), 300);
}

// function renderModal(modalTemplate: Function<string>);

const ANIMATIONS = {
  fadeIn,
  fadeOut,
  showModal,
  hideModal,
};

export default ANIMATIONS;
