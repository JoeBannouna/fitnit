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
  }, 20);
}

function hideModal(modalElement: HTMLElement) {
  const modalRect = document.querySelector('.modal-rect') as HTMLElement;

  removeMultipleClasses(modalElement, ['opacity-100', 'ease-out', 'duration-300']);
  removeMultipleClasses(modalRect, ['ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100']);

  addMultipleClasses(modalElement, ['opacity-0', 'ease-in', 'duration-200']);
  addMultipleClasses(modalRect, ['ease-in', 'duration-200', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95']);

  setTimeout(() => modalElement.classList.add('hidden'), 300);
}

const modalContainer = document.getElementById('modal-container');
function renderModal(modalTemplate: (...args: any[]) => string) {
  modalContainer.innerHTML = modalTemplate();
  const modalElement = modalContainer.children[0] as HTMLElement;

  const modalCancelButton = document.getElementById('modal-cancel-button');
  modalCancelButton.onclick = () => hideModal(modalElement);
  document.onkeyup = e => e.code == 'Escape' && hideModal(modalElement);

  showModal(modalElement);
}

const alertContainer = document.getElementById('alert-container');
function renderAlert(alertTemplate: (...args: any[]) => string) {
  alertContainer.innerHTML = alertTemplate();
  const alertElement = alertContainer.children[0] as HTMLElement;

  const alertCancelButtons = document.querySelectorAll('.alert-cancel-button');
  alertCancelButtons.forEach((alertCancelButton: HTMLElement) => (alertCancelButton.onclick = () => fadeOut(alertElement)));

  fadeIn(alertElement);
}

export { fadeIn, fadeOut, showModal, hideModal, renderModal, renderAlert };
