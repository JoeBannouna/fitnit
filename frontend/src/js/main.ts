$('.loading-screen-content').fadeIn('slow');

import './ui/youtube';
import './libs/swiped-events';
import './ui/drag';

window.addEventListener('ytLoaded', async () => {
  // import UI from './ui';
  const UI = (await import('./ui')).default;

  // import Router from './models/Router';
  const Router = (await import('./models/Router')).default;

  // @ts-ignore
  window.UI = UI;
  // @ts-ignore
  window.Router = Router;
  window.dispatchEvent(Router.routeChanged);

  setTimeout(() => $('.loading-screen').fadeOut('fast'), 1000);
});
