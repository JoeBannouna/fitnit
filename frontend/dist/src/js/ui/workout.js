import { currentWorkout, currentWorkoutIndex, loggedIn, modifyCurrentExercise, modifyCurrentWorkout, workouts } from '../global';
import Workout from '../models/Workout';
import { fadeIn, fadeOut, hideModal, renderAlert, renderModal } from './animations';
import { renderExercisesHTML, renderSelectedWorkoutExercisesHTML } from './exercise';
import { resetCurrentActivity, selectCurrentActivity, togglePlay } from './player';
import { deleteAlert, newWorkoutModal, workoutBar } from './templates';
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
var slectedWorkoutBackButton = document.getElementById('selected-workout-back-button');
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
slectedWorkoutBackButton.onclick = function () { return toggleWorkoutsSection(null, selectedWorkoutSection, deselctWorkout, false); };
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
function deselctWorkout() {
    modifyCurrentExercise(null);
    modifyCurrentWorkout(null);
    resetCurrentActivity();
    document.removeEventListener('keypress', function (e) {
        if (e.code == 'Space') {
            togglePlay(undefined, true);
        }
    });
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
export { loadWorkout, selectWorkout, showDeleteWorkoutAlert, deleteWorkout };
