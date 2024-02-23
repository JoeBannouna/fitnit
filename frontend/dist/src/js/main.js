$('.loading-screen-content').fadeIn('slow');
import './ui/youtube';
import UI from './ui';
import Router from './models/Router';
import './libs/swiped-events';
// @ts-ignore
window.UI = UI;
// @ts-ignore
window.Router = Router.getInstance();
import './ui/drag';
setTimeout(function () { return $('.loading-screen').fadeOut('fast'); }, 1000);
