$('.loading-screen-content').fadeIn('slow');

import './ui/youtube'

import UI from './ui';
import './libs/swiped-events';

// @ts-ignore
window.UI = UI;

import './ui/drag';


setTimeout(() => $('.loading-screen').fadeOut('fast'), 1000);
