var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { currentExercise, currentExerciseIndex, currentWorkout, modifyCurrentExercise } from '../global';
import { onYouTubeIframeAPIReady, youtube_parser } from './youtube';
var playerPaused = true;
var startTime;
var pausedTime;
var tickTimeout;
var youtubePlayerObj = null;
var audio = {};
audio[1] = new Audio("assets/sounds/beep-1.mp3");
audio[2] = new Audio("assets/sounds/beep-2.mp3");
audio[3] = new Audio("assets/sounds/beep-3.mp3");
var currentActivity = { index: null, type: null, time: null };
// Timer info
var timerTitle = document.getElementById('timer-title');
var timerNumber = document.getElementById('timer-number');
// Now playing bar buttons
var playButton = document.getElementById('play-button');
var prevButton = document.getElementById('prev-button');
var nextButton = document.getElementById('next-button');
function toggleSelectedBox() {
    if (currentActivity.index !== null) {
        var element = document.getElementById(currentActivity.type + '-box-' + currentActivity.index);
        element.classList.toggle(currentActivity.type + '-box-selected');
        element.scrollIntoView(false);
    }
}
function updateTimerState(index, type) {
    toggleSelectedBox();
    currentActivity.index = index;
    currentActivity.type = type;
    toggleSelectedBox();
    if (type == 'exercise') {
        timerTitle.innerHTML = currentExercise.name;
        if (currentExercise.type == 'VIDEO') {
            var url = currentExercise.url;
            var period = currentExercise.period;
            var videoObject_1 = {};
            videoObject_1.videoId = youtube_parser(url);
            (period === null || period === void 0 ? void 0 : period.startSeconds) ? (videoObject_1.startSeconds = period.startSeconds) : (videoObject_1.startSeconds = 0.1);
            (period === null || period === void 0 ? void 0 : period.endSeconds) && (videoObject_1.endSeconds = period.endSeconds);
            timerNumber.innerHTML = /* html */ "<div id=\"player\"></div>";
            youtubePlayerObj = onYouTubeIframeAPIReady(function () {
                if (playerPaused)
                    youtubePlayerObj.cueVideoById(videoObject_1);
                else
                    youtubePlayerObj.loadVideoById(videoObject_1);
            });
            youtubePlayerObj.addEventListener('onStateChange', function (e) {
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
        }
        else {
            currentActivity.time = currentExercise.amount;
            timerNumber.innerHTML = currentActivity.time.toString();
        }
    }
    else if (type == 'rest') {
        timerTitle.innerHTML = 'Rest';
        currentActivity.time = currentWorkout.rest;
        timerNumber.innerHTML = currentActivity.time.toString();
    }
}
function selectCurrentActivity(index, type, sound) {
    if (index === void 0) { index = null; }
    if (type === void 0) { type = 'exercise'; }
    if (sound === void 0) { sound = false; }
    currentActivity.time = null;
    startTime = new Date();
    pausedTime = null;
    youtubePlayerObj = null;
    if (sound && !playerPaused)
        playSound(3);
    if (index == null) {
        if (currentExerciseIndex !== null) {
            updateTimerState(currentExerciseIndex, 'exercise');
        }
    }
    else {
        modifyCurrentExercise(index);
        updateTimerState(index, type);
    }
}
function resetCurrentActivity() {
    currentActivity.index = null;
    currentActivity.type = null;
    currentActivity.time = null;
    clearTimeout(tickTimeout);
    if (!playerPaused)
        togglePlay();
    pausedTime = null;
}
function prevActivity() {
    if (currentActivity.type == 'exercise') {
        if (document.getElementById('rest' + '-box-' + (currentActivity.index - 1))) {
            selectCurrentActivity(currentActivity.index - 1, 'rest', true);
        }
        else {
            selectCurrentActivity(0, 'exercise', true);
        }
    }
    else {
        if (document.getElementById('exercise' + '-box-' + currentActivity.index)) {
            selectCurrentActivity(currentActivity.index, 'exercise', true);
        }
    }
}
function nextActivity() {
    if (currentActivity.type == 'exercise') {
        if (document.getElementById('rest' + '-box-' + currentActivity.index)) {
            selectCurrentActivity(currentActivity.index, 'rest', true);
        }
        else {
            pause();
        }
    }
    else {
        if (document.getElementById('exercise' + '-box-' + (currentActivity.index + 1))) {
            selectCurrentActivity(currentActivity.index + 1, 'exercise', true);
        }
    }
}
function playSound(soundNumber) {
    audio[soundNumber].play();
}
function updateCurrentActivityTime(howManySecondsPassed) {
    if (currentActivity.time !== null) {
        var timeLeft = currentActivity.time + howManySecondsPassed;
        if (timeLeft < 0) {
            nextActivity();
        }
        else {
            timerNumber.innerHTML = timeLeft.toString();
        }
    }
}
var howManySecondsPassed;
function tick() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!playerPaused) {
                howManySecondsPassed = (startTime.getTime() - new Date().getTime()) / 1000;
                updateCurrentActivityTime(parseFloat(howManySecondsPassed.toFixed(0)));
                tickTimeout = setTimeout(tick, 1000);
            }
            return [2 /*return*/];
        });
    });
}
function play(sound) {
    if (sound === void 0) { sound = true; }
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    playerPaused = false;
    var playStartTime = new Date();
    if (pausedTime == null) {
        startTime.setTime(startTime.getTime() + playStartTime.getTime() - startTime.getTime());
        sound && playSound(3);
    }
    else {
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
export function togglePlay(e, force) {
    if (e === void 0) { e = undefined; }
    if (force === void 0) { force = false; }
    console.log(document.activeElement);
    // e && e.target.blur();
    if (e || force) {
        if (playerPaused) {
            play();
        }
        else {
            pause();
        }
    }
}
playButton.onmousedown = togglePlay;
nextButton.onclick = nextActivity;
prevButton.onclick = prevActivity;
export { selectCurrentActivity, resetCurrentActivity };
