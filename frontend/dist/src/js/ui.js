var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as workout from './ui/workout';
import * as exercise from './ui/exercise';
// Navbar dropdown button
$('.main-dropdown-button').on('click', function () { return $('#main-dropdown').slideToggle(); });
// Navbar links selection
var navbarOptions = document.querySelectorAll('.main-dropdown-ul li');
navbarOptions.forEach(function (li) {
    li.onclick = function () {
        navbarOptions.forEach(function (childLi) { return childLi.classList.remove('selected'); });
        li.classList.add('selected');
    };
});
// Control panel section toggle
var controlPanelSectionIsOpen = !($(window).width() < 1024);
var controlPanelButton = document.querySelector('.control-panel-button');
var controlPanelSection = document.querySelector('.control-panel');
var timerSection = document.querySelector('.timer-section');
controlPanelButton.innerHTML = controlPanelSectionIsOpen ? '❱' : '❰';
function controlPanelPanelToggle() {
    var isMobileScreen = $(window).width() < 1024;
    if (controlPanelSectionIsOpen) {
        controlPanelSection.style.width = '0';
        timerSection.style.width = '100%';
        controlPanelButton.innerHTML = '❰';
        isMobileScreen ? (controlPanelButton.style.transform = 'translateX(-20px)') : '';
    }
    else {
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
var UI = __assign(__assign({}, workout), exercise);
export default UI;
