import { currentExercise, currentExerciseIndex, currentWorkout, modifyCurrentExercise } from '../global';
import { currentActivityIndex, currentActivityType, videoOptions, YTClassType } from '../types';
import { onYouTubeIframeAPIReady, youtube_parser } from './youtube';

let playerPaused = true;
let startTime: Date;
let pausedTime: Date;
let tickTimeout: NodeJS.Timeout;
let youtubePlayerObj: YTClassType = null;

const audio = {} as { [key: string]: HTMLAudioElement };
audio[1] = new Audio(`assets/sounds/beep-1.mp3`);
audio[2] = new Audio(`assets/sounds/beep-2.mp3`);
audio[3] = new Audio(`assets/sounds/beep-3.mp3`);

const currentActivity: { index: currentActivityIndex; type: currentActivityType; time?: number } = { index: null, type: null, time: null };

// Timer info
const timerTitle = document.getElementById('timer-title');
const timerNumber = document.getElementById('timer-number');

// Now playing bar buttons
const playButton = document.getElementById('play-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

function toggleSelectedBox() {
  if (currentActivity.index !== null) {
    const element = document.getElementById(currentActivity.type + '-box-' + currentActivity.index);
    element.classList.toggle(currentActivity.type + '-box-selected');
    element.scrollIntoView(false);
  }
}

function updateTimerState(index: currentActivityIndex, type: currentActivityType) {
  toggleSelectedBox();
  currentActivity.index = index;
  currentActivity.type = type;
  toggleSelectedBox();

  if (type == 'exercise') {
    timerTitle.innerHTML = currentExercise.name;
    if (currentExercise.type == 'VIDEO') {
      const url = currentExercise.url;
      const period = currentExercise.period;

      const videoObject = {} as videoOptions;
      videoObject.videoId = youtube_parser(url);
      period?.startSeconds ? (videoObject.startSeconds = period.startSeconds) : (videoObject.startSeconds = 0.1);
      period?.endSeconds && (videoObject.endSeconds = period.endSeconds);

      timerNumber.innerHTML = /* html */ `<div id="player"></div>`;
      youtubePlayerObj = onYouTubeIframeAPIReady(() => {
        if (playerPaused) youtubePlayerObj.cueVideoById(videoObject);
        else youtubePlayerObj.loadVideoById(videoObject);
      });

      youtubePlayerObj.addEventListener('onStateChange', e => {
        switch (e.data) {
          case 1:
            play(false);
            break;

          case 2:
            pause();
            break;

          case 0:
            nextActivity();
            break;

          default:
            break;
        }
      });
    } else {
      currentActivity.time = currentExercise.amount;
      timerNumber.innerHTML = currentActivity.time.toString();
    }
  } else if (type == 'rest') {
    timerTitle.innerHTML = 'Rest';
    currentActivity.time = currentWorkout.rest;
    timerNumber.innerHTML = currentActivity.time.toString();
  }
}

function selectCurrentActivity(index: currentActivityIndex = null, type: currentActivityType = 'exercise', sound = false) {
  currentActivity.time = null;
  startTime = new Date();
  pausedTime = null;
  youtubePlayerObj = null;

  if (sound && !playerPaused) playSound(3);

  if (index == null) {
    if (currentExerciseIndex !== null) {
      updateTimerState(currentExerciseIndex, 'exercise');
    }
  } else {
    modifyCurrentExercise(index);
    updateTimerState(index, type);
  }
}

function resetCurrentActivity() {
  currentActivity.index = null;
  currentActivity.type = null;
  currentActivity.time = null;

  clearTimeout(tickTimeout);
  if (!playerPaused) togglePlay();

  pausedTime = null;
}

function prevActivity() {
  if (currentActivity.type == 'exercise') {
    if (document.getElementById('rest' + '-box-' + (currentActivity.index - 1))) {
      selectCurrentActivity(currentActivity.index - 1, 'rest', true);
    } else {
      selectCurrentActivity(0, 'exercise', true);
    }
  } else {
    if (document.getElementById('exercise' + '-box-' + currentActivity.index)) {
      selectCurrentActivity(currentActivity.index, 'exercise', true);
    }
  }
}

function nextActivity() {
  if (currentActivity.type == 'exercise') {
    if (document.getElementById('rest' + '-box-' + currentActivity.index)) {
      selectCurrentActivity(currentActivity.index, 'rest', true);
    } else {
      pause();
    }
  } else {
    if (document.getElementById('exercise' + '-box-' + (currentActivity.index + 1))) {
      selectCurrentActivity(currentActivity.index + 1, 'exercise', true);
    }
  }
}

function playSound(soundNumber: number) {
  audio[soundNumber].play();
}

function updateCurrentActivityTime(howManySecondsPassed: number) {
  if (currentActivity.time !== null) {
    const timeLeft = currentActivity.time + howManySecondsPassed;
    if (timeLeft < 0) {
      nextActivity();
    } else {
      timerNumber.innerHTML = timeLeft.toString();
    }
  }
}

let howManySecondsPassed: number;
async function tick() {
  if (!playerPaused) {
    howManySecondsPassed = (startTime.getTime() - new Date().getTime()) / 1000;
    updateCurrentActivityTime(parseFloat(howManySecondsPassed.toFixed(0)));
    tickTimeout = setTimeout(tick, 1000);
  }
}

function play(sound = true) {
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
  playerPaused = false;

  const playStartTime = new Date();
  if (pausedTime == null) {
    startTime.setTime(startTime.getTime() + playStartTime.getTime() - startTime.getTime());
    sound && playSound(3);
  } else {
    startTime.setTime(startTime.getTime() - (pausedTime.getTime() - playStartTime.getTime()));
  }

  tick();

  youtubePlayerObj !== null && youtubePlayerObj.playVideo();
}

function pause() {
  playButton.innerHTML = '<i class="fas fa-play"></i>';
  playerPaused = true;
  pausedTime = new Date();

  youtubePlayerObj !== null && youtubePlayerObj.pauseVideo();
}

export function togglePlay(e: any = undefined, force = false) {
  console.log(document.activeElement)
  // e && e.target.blur();

  if (e || force) {
    if (playerPaused) {
      play();
    } else {
      pause();
    }
  }
}

playButton.onmousedown = togglePlay;
nextButton.onclick = nextActivity;
prevButton.onclick = prevActivity;

export { selectCurrentActivity, resetCurrentActivity };
