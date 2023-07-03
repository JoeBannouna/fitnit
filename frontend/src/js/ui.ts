import * as workout from './ui/workout';
import * as exercise from './ui/exercise';

// Navbar dropdown button
$('.main-dropdown-button').on('click', () => $('#main-dropdown').slideToggle());

// Navbar links selection
const navbarOptions = document.querySelectorAll('.main-dropdown-ul li');

navbarOptions.forEach((li: HTMLElement) => {
  li.onclick = () => {
    navbarOptions.forEach(childLi => childLi.classList.remove('selected'));
    li.classList.add('selected');
  };
});

// Control panel section toggle
let controlPanelSectionIsOpen = !($(window).width() < 1024);

const controlPanelButton: HTMLElement = document.querySelector('.control-panel-button');
const controlPanelSection: HTMLElement = document.querySelector('.control-panel');
const timerSection: HTMLElement = document.querySelector('.timer-section');

controlPanelButton.innerHTML = controlPanelSectionIsOpen ? '❱' : '❰';

function controlPanelPanelToggle() {
  let isMobileScreen = $(window).width() < 1024;

  if (controlPanelSectionIsOpen) {
    controlPanelSection.style.width = '0';
    timerSection.style.width = '100%';
    controlPanelButton.innerHTML = '❰';
    isMobileScreen ? (controlPanelButton.style.transform = 'translateX(-20px)') : '';
  } else {
    controlPanelSection.style.width = isMobileScreen ? '100%' : '25%';
    timerSection.style.width = isMobileScreen ? '0%' : '75%';

    isMobileScreen ? (controlPanelButton.style.transform = 'translateX(0px) scale(-1)') : (controlPanelButton.innerHTML = '❱');
  }

  controlPanelSectionIsOpen = !controlPanelSectionIsOpen;
}

controlPanelButton.onclick = controlPanelPanelToggle;
controlPanelButton.addEventListener('swiped-left', controlPanelPanelToggle);
controlPanelButton.addEventListener('swiped-right', controlPanelPanelToggle);

// Exporting global functions
const UI: any = {
  ...workout,
  ...exercise,
};

export default UI;
