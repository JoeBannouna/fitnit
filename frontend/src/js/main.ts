$('.loading-screen-content').fadeIn('slow');

import './ui/youtube';

import UI from './ui';
import Router from './models/Router';
import './libs/swiped-events';

// @ts-ignore
window.UI = UI;
// @ts-ignore
window.Router = Router;
window.dispatchEvent(Router.routeChanged);

import './ui/drag';
import Composer from './models/Composer';

setTimeout(() => $('.loading-screen').fadeOut('fast'), 1000);
Composer.exportWorkout(0).then(res => console.log(res));