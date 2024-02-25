import { addMultipleClasses, removeMultipleClasses } from '../utils';
// Default modal animations
function fadeIn(element) {
    element.style.display = 'block';
    setTimeout(function () { return (element.style.opacity = '1'); }, 0);
}
function fadeOut(element) {
    element.style.transition = '0.3s';
    element.style.opacity = '0';
    setTimeout(function () { return (element.style.display = 'none'); }, 300);
}
function showModal(modalElement) {
    var modalRect = document.querySelector('.modal-rect');
    modalElement.classList.remove('hidden');
    setTimeout(function () {
        removeMultipleClasses(modalElement, ['opacity-0', 'ease-in', 'duration-200']);
        removeMultipleClasses(modalRect, ['ease-in', 'duration-200', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95']);
        addMultipleClasses(modalElement, ['opacity-100', 'ease-out', 'duration-300']);
        addMultipleClasses(modalRect, ['ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100']);
    }, 20);
}
function hideModal(modalElement) {
    var modalRect = document.querySelector('.modal-rect');
    removeMultipleClasses(modalElement, ['opacity-100', 'ease-out', 'duration-300']);
    removeMultipleClasses(modalRect, ['ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100']);
    addMultipleClasses(modalElement, ['opacity-0', 'ease-in', 'duration-200']);
    addMultipleClasses(modalRect, ['ease-in', 'duration-200', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95']);
    setTimeout(function () { return modalElement.classList.add('hidden'); }, 300);
}
var modalContainer = document.getElementById('modal-container');
function renderModal(modalTemplate) {
    modalContainer.innerHTML = modalTemplate();
    var modalElement = modalContainer.children[0];
    var modalCancelButton = document.getElementById('modal-cancel-button');
    modalCancelButton.onclick = function () { return hideModal(modalElement); };
    document.onkeyup = function (e) { return e.code == 'Escape' && hideModal(modalElement); };
    showModal(modalElement);
}
var alertContainer = document.getElementById('alert-container');
function renderAlert(alertTemplate) {
    alertContainer.innerHTML = alertTemplate();
    var alertElement = alertContainer.children[0];
    var alertCancelButtons = document.querySelectorAll('.alert-cancel-button');
    alertCancelButtons.forEach(function (alertCancelButton) { return (alertCancelButton.onclick = function () { return fadeOut(alertElement); }); });
    fadeIn(alertElement);
}
export { fadeIn, fadeOut, showModal, hideModal, renderModal, renderAlert };
