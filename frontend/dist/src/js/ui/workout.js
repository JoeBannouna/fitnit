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
import { currentWorkout, currentWorkoutIndex, loggedIn, modifyCurrentExercise, modifyCurrentWorkout, setSharedWorkout, workouts } from '../global';
import Composer from '../models/Composer';
import Router from '../models/Router';
import Workout from '../models/Workout';
import { fadeIn, fadeOut, hideModal, renderAlert, renderModal } from './animations';
import { renderExercisesHTML, renderSelectedWorkoutExercisesHTML } from './exercise';
import { resetCurrentActivity, selectCurrentActivity, togglePlay } from './player';
import { deleteAlert, newWorkoutModal, workoutBar } from './templates';
import shareWorkoutModal from './templates/shareWorkoutModal';
// Rendering workouts
var workoutsContainer = document.getElementById('workouts-container');
function renderWorkouts() {
    if (workouts.length) {
        var workoutsHTML = workouts.map(workoutBar).join('');
        workoutsContainer.innerHTML = workoutsHTML;
    }
    else if (!workouts.length && !loggedIn) {
        workoutsContainer.innerHTML =
            /* html */
            "<div class=\"flex justify-center items-center text-center px-4 py-20\">\n        Can't find your workouts? Sign in to access them.\n      </div>";
    }
}
renderWorkouts();
// Toggling between All Workouts section and a single workout section
var controlPanelButton = document.querySelector('.control-panel-button');
var allWorkoutSection = document.getElementById('all-workouts-section');
var singleWorkoutSection = document.getElementById('single-workout-section');
var selectedWorkoutSection = document.getElementById('selected-workout-section');
var workOutBackButton = document.getElementById('workout-back-button');
var selectedWorkoutBackButton = document.getElementById('selected-workout-back-button');
var workoutsIsOpen = true;
function toggleWorkoutsSection(e, sectionElement, callback, controlPanelButtonHidden) {
    if (e === void 0) { e = null; }
    if (sectionElement === void 0) { sectionElement = singleWorkoutSection; }
    if (callback === void 0) { callback = function () { }; }
    if (controlPanelButtonHidden === void 0) { controlPanelButtonHidden = true; }
    if (workoutsIsOpen) {
        allWorkoutSection.style.width = '0';
        sectionElement.style.width = '100%';
        controlPanelButtonHidden && fadeOut(controlPanelButton);
    }
    else {
        renderWorkouts();
        allWorkoutSection.style.width = '100%';
        sectionElement.style.width = '0';
        controlPanelButtonHidden && fadeIn(controlPanelButton);
    }
    workoutsIsOpen = !workoutsIsOpen;
    callback();
}
// Loading a workout
var changeWorkoutNameInput = document.getElementById('change-workout-name-input');
var changeWorkoutNameForm = document.getElementById('change-workout-name-form');
var changeWorkoutNameButton = document.getElementById('change-workout-name-button');
var changeWorkoutNameEditButton = document.getElementById('change-workout-name-edit-button');
var restIntervalsInput = document.getElementById('rest-input');
var restIntervalsSpan = document.getElementById('rest-span');
var restIntervalsButton = document.getElementById('rest-button');
var restIntervalsForm = document.getElementById('rest-form');
function changeWorkoutName() {
    changeWorkoutNameButton.style.display = 'block';
    changeWorkoutNameEditButton.style.display = 'none';
    changeWorkoutNameInput.readOnly = false;
    changeWorkoutNameInput.focus();
    changeWorkoutNameInput.style.background = 'white';
    changeWorkoutNameInput.style.color = 'black';
}
function defaultWorkoutNameUI() {
    changeWorkoutNameButton.style.display = 'none';
    changeWorkoutNameEditButton.style.display = 'block';
    changeWorkoutNameInput.readOnly = true;
    changeWorkoutNameInput.style.background = 'transparent';
    changeWorkoutNameInput.style.color = 'white';
}
function loadWorkout(button, index) {
    if (button)
        button.blur();
    // SET CURRENT WORKOUT ID
    if (index != null)
        modifyCurrentWorkout(index);
    // RENDERING HTML
    // Title area
    changeWorkoutNameInput.value = currentWorkout.name;
    defaultWorkoutNameUI();
    // Resr intervals
    restIntervalsInput.value = currentWorkout.rest.toString();
    restIntervalsSpan.innerHTML = currentWorkout.rest.toString();
    // Exercises
    renderExercisesHTML();
    // ANIMATE
    toggleWorkoutsSection();
}
// Edit a workout
function saveWorkoutName(e) {
    e.preventDefault && e.preventDefault();
    Workout.editName(currentWorkoutIndex, changeWorkoutNameInput.value);
    currentWorkout.name = changeWorkoutNameInput.value;
    defaultWorkoutNameUI();
}
changeWorkoutNameEditButton.onclick = changeWorkoutName;
changeWorkoutNameForm.onsubmit = saveWorkoutName;
workOutBackButton.onclick = toggleWorkoutsSection;
selectedWorkoutBackButton.onclick = function () { return toggleWorkoutsSection(null, selectedWorkoutSection, deselectWorkout, false); };
restIntervalsButton.onclick = function () {
    restIntervalsForm.children[2].disabled = false;
    restIntervalsForm.classList.remove('hidden');
    setTimeout(function () {
        restIntervalsForm.classList.remove('opacity-0');
        restIntervalsForm.classList.add('opacity-100');
        restIntervalsInput.focus();
    }, 0);
};
restIntervalsInput.onblur = function () {
    restIntervalsForm.classList.remove('opacity-100');
    restIntervalsForm.classList.add('opacity-0');
    setTimeout(function () {
        restIntervalsForm.classList.add('hidden');
        restIntervalsInput.value = currentWorkout.rest.toString();
    }, 300);
};
restIntervalsForm.onsubmit = function (e) {
    e.preventDefault();
    e.submitter.disabled = true;
    Workout.editRest(currentWorkoutIndex, parseFloat(restIntervalsInput.value));
    restIntervalsSpan.innerHTML = restIntervalsInput.value;
    restIntervalsForm.classList.remove('opacity-100');
    restIntervalsForm.classList.add('opacity-0');
    setTimeout(function () {
        restIntervalsForm.classList.add('hidden');
    }, 300);
};
// Creating a new workout
var newWorkoutButton = document.getElementById('add-workout-button');
newWorkoutButton.onclick = function () {
    renderModal(function () { return newWorkoutModal(); });
    var form = document.getElementById('modal-rect');
    var name = document.getElementById('workout-name');
    name.focus();
    form.onsubmit = function (e) {
        e.preventDefault();
        e.submitter.disabled = true;
        new Workout({
            name: name.value,
            rest: 5,
            exercises: [],
        });
        renderWorkouts();
        hideModal(document.getElementById('modal-container').children[0]);
        loadWorkout(null, workouts.length - 1);
    };
};
function showDeleteWorkoutAlert(index) {
    renderAlert(function () { return deleteAlert('Delete workout', 'Are you sure you want to delete this item?', "UI.deleteWorkout(this, ".concat(index, ")")); });
    document.getElementById('alert-cancel-button').focus();
}
function deleteWorkout(button, index) {
    button.disabled = true;
    Workout.delete(index);
    renderWorkouts();
    fadeOut(document.getElementById('alert-container').children[0]);
}
function deselectWorkout() {
    modifyCurrentExercise(null);
    modifyCurrentWorkout(null);
    resetCurrentActivity();
    document.removeEventListener('keypress', function (e) {
        if (e.code == 'Space') {
            togglePlay(undefined, true);
        }
    });
    var data = Router.getCurrentPageData();
    if (Router.currentPage.test('workout/something') && data)
        Router.replace('/');
    document.getElementById('timer-section-cover').classList.remove('hidden');
    document.getElementById('timer-title').innerHTML = 'Current Exercise';
    document.getElementById('timer-number').innerHTML = '60';
}
function selectWorkout(button, index) {
    if (button)
        button.blur();
    modifyCurrentWorkout(index);
    currentWorkout.exercises.length ? modifyCurrentExercise(0) : modifyCurrentExercise(null);
    // Title area
    document.getElementById('workout-name-input').value = currentWorkout.name;
    // Info area
    // document.getElementById('workout-info-box').innerHTML
    // Exercises
    renderSelectedWorkoutExercisesHTML();
    selectCurrentActivity();
    document.getElementById('timer-section-cover').classList.add('hidden');
    toggleWorkoutsSection(null, selectedWorkoutSection, function () { }, false);
    document.addEventListener('keypress', function (e) {
        if (e.code == 'Space') {
            togglePlay(undefined, true);
        }
    });
}
var importWorkoutBox = document.getElementById('import-workout-box');
var importWorkoutButton = importWorkoutBox.children[1];
var exportWorkoutBox = document.getElementById('export-workout-box');
var exportWorkoutButton = exportWorkoutBox.children[0];
exportWorkoutButton.onclick = function () {
    Composer.exportWorkout(currentWorkoutIndex).then(function (res) {
        var link = window.location.origin + '/workout/' + encodeURIComponent(res);
        renderModal(function () { return shareWorkoutModal(link); });
    });
};
importWorkoutButton.onclick = function () {
    new Workout(__assign({}, currentWorkout));
    selectedWorkoutBackButton.click();
};
window.addEventListener('routeChanged', function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, compressedWorkout, workoutJSON;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = Router.getCurrentPageData();
                if (!(Router.currentPage.test('workout/something') && data)) return [3 /*break*/, 2];
                compressedWorkout = decodeURIComponent(data[0]);
                return [4 /*yield*/, Composer.getWorkoutJSON(compressedWorkout)];
            case 1:
                workoutJSON = _a.sent();
                if (workoutJSON) {
                    importWorkoutBox.classList.remove('hidden');
                    setSharedWorkout(workoutJSON);
                    selectWorkout(null, -1);
                }
                else {
                    setSharedWorkout("{\"name\": \"Error, invalid link\", \"res\": 1, \"exercises\": [] }");
                    selectWorkout(null, -1);
                }
                return [3 /*break*/, 3];
            case 2:
                importWorkoutBox.classList.add('hidden');
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
export { loadWorkout, selectWorkout, showDeleteWorkoutAlert, deleteWorkout };
