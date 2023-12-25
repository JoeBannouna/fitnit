import { currentWorkout, currentWorkoutIndex, loggedIn } from '../global';
import Exercise from '../models/Exercise';
import { fadeOut, hideModal, renderAlert, renderModal } from './animations';
import { selectCurrentActivity } from './player';
import { deleteAlert, exerciseBar, exerciseModal, infoAlert, newExerciseModal, normalExerciseInputs, restBox, selectedWorkoutExercise, videoExerciseInputs, } from './templates';
import { exerciseImageDropzoneUpload } from './upload';
import { cueVideoFromUrl, onYouTubeIframeAPIReady } from './youtube';
// Exercise
function renderExercisesHTML() {
    var singleExercisesSection = document.getElementById('single-exercises-section');
    if (currentWorkout.exercises.length) {
        var exercisesHTML = currentWorkout.exercises.map(exerciseBar).join('');
        singleExercisesSection.innerHTML = '<div><div class="dropzone h-px w-full" id="exercise-dropzone-0"></div></div>';
        singleExercisesSection.innerHTML += exercisesHTML;
    }
    else {
        singleExercisesSection.innerHTML =
            /* html */
            "<div class=\"bg-gray-200 flex justify-center items-center text-center px-4 py-20\">\n        Workout exercises will appear here\n      </div>";
    }
}
function renderSelectedWorkoutExercisesHTML() {
    var selectedExercisesSection = document.getElementById('selected-exercises-section');
    var exercisesHTML = currentWorkout.exercises.map(selectedWorkoutExercise).join(currentWorkout.rest ? restBox(currentWorkout.rest) : '');
    selectedExercisesSection.innerHTML = exercisesHTML;
    document.querySelectorAll('.rest-box').forEach(function (restBox, index) {
        restBox.id = 'rest-box-' + index;
        restBox.onmousedown = function () { return selectCurrentActivity(index, 'rest', true); };
    });
    document.querySelectorAll('.exercise-box').forEach(function (exerciseBox, index) {
        // exerciseBox.id = 'rest-box-' + index;
        exerciseBox.onmousedown = function () { return selectCurrentActivity(index, 'exercise', true); };
    });
}
function showExerciseModal(index) {
    var exercise = currentWorkout.exercises[index];
    renderModal(function () { return exerciseModal(index, exercise, loggedIn); });
    if (loggedIn)
        exerciseImageDropzoneUpload();
    if (exercise.type == 'VIDEO') {
        // Load IFrame youtube API
        onYouTubeIframeAPIReady(function () { return cueVideoFromUrl(exercise.url); });
        // Listing for change in youtube url input
        var videoInput = document.getElementById('video-url');
        videoInput.oninput = function (e) { return cueVideoFromUrl(e.target.value); };
        var customTimeCheckBox_1 = document.getElementById('customTimeCheckBox');
        customTimeCheckBox_1.oninput = function () { return toggleVideoExerciseTimeInterval(customTimeCheckBox_1.checked); };
        toggleVideoExerciseTimeInterval(customTimeCheckBox_1.checked);
    }
    var form = document.getElementById('update-exercise-form');
    form.onsubmit = function (e) { return submitNewExerciseValues(e, 'update'); };
}
function showDeleteExerciseAlert(index) {
    renderAlert(function () { return deleteAlert('Delete exercise', 'Are you sure you want to delete this item?', "UI.deleteExercise(this, ".concat(index, ")")); });
    document.getElementById('alert-cancel-button').focus();
}
function hideDeleteExerciseAlert(button) {
    var alertElement = button.parentElement.parentElement.parentElement;
    hideModal(alertElement);
}
function deleteExercise(deleteButton, index) {
    deleteButton.disabled = true;
    Exercise.delete(currentWorkoutIndex, index);
    renderExercisesHTML();
    fadeOut(document.getElementById('alert-container').children[0]);
    hideModal(document.getElementById('modal-container').children[0]);
}
function updateExerciseModalValues(event) {
    var typeInput = event.target;
    var type = typeInput.value;
    if (type == 'TIMED-REPS') {
        document.querySelector('.timed-reps').classList.remove('hidden');
    }
    else {
        document.querySelector('.timed-reps').classList.add('hidden');
    }
}
function changeInbetween(string) {
    var input = document.getElementById('inbetween-input');
    var span = document.getElementById('inbetween-span');
    var newVal;
    if (string == 'up') {
        newVal = parseFloat(input.value) + 1;
    }
    else {
        newVal = parseFloat(input.value) == 0 ? 0 : parseFloat(input.value) - 1;
    }
    input.value = newVal.toString();
    span.innerHTML = newVal.toString();
}
var submitVals = function (mode, exercise, index) {
    if (index === void 0) { index = 0; }
    if (mode == 'update') {
        Exercise.update(currentWorkoutIndex, index, exercise);
    }
    else if (mode == 'new') {
        new Exercise(currentWorkoutIndex, exercise);
    }
};
function toggleVideoExerciseTimeInterval(bool) {
    if (bool) {
        document.querySelectorAll('.video-seconds-input').forEach(function (element) {
            element.classList.remove('opacity-50');
            element.children[1].readOnly = false;
        });
    }
    else {
        document.querySelectorAll('.video-seconds-input').forEach(function (element) {
            element.classList.add('opacity-50');
            element.children[1].readOnly = true;
        });
    }
}
function submitNewExerciseValues(e, mode) {
    e.preventDefault();
    e.submitter.disabled = true;
    var exerciseInputsType = document.getElementById('exerciseInputsType');
    var name = document.getElementById('modal-title');
    var index = document.getElementById('exercise-index');
    if (exerciseInputsType.value == 'normal') {
        var amount = document.getElementById('exercise-amount');
        var type = document.getElementById('exercise-type');
        var inbetween = document.getElementById('inbetween-input');
        var exercise = {};
        exercise.name = name.value;
        exercise.amount = parseFloat(amount.value);
        exercise.type = type.value;
        if (exercise.type == 'TIMED-REPS')
            exercise.inbetween = parseFloat(inbetween.value);
        if (loggedIn) {
            // Process image upload and ID here??
        }
        submitVals(mode, exercise, parseFloat(index.value));
        renderExercisesHTML();
        hideModal(document.getElementById('modal-container').children[0]);
    }
    else if (exerciseInputsType.value == 'video') {
        var url = document.getElementById('video-url');
        var customTimeCheckBox = document.getElementById('customTimeCheckBox');
        var videoStartSecondsInput = document.getElementById('videoStartSeconds');
        var videoEndSecondsInput = document.getElementById('videoEndSeconds');
        var exercise = {};
        exercise.name = name.value;
        exercise.url = url.value;
        exercise.type = 'VIDEO';
        if (customTimeCheckBox.checked) {
            var videoStartSeconds = parseFloat(videoStartSecondsInput.value);
            var videoEndSeconds = parseFloat(videoEndSecondsInput.value);
            if (videoStartSeconds < videoEndSeconds) {
                exercise.period = {
                    startSeconds: videoStartSeconds,
                    endSeconds: videoEndSeconds,
                };
            }
            else {
                renderAlert(function () { return infoAlert('Start seconds cannot be bigger than End seconds'); });
                e.submitter.disabled = false;
                return;
            }
        }
        if (loggedIn) {
            // Process image upload and ID here??
        }
        submitVals(mode, exercise, parseFloat(index.value));
        renderExercisesHTML();
        hideModal(document.getElementById('modal-container').children[0]);
    }
}
function renderNewExerciseModal() {
    renderModal(function () { return newExerciseModal(loggedIn); });
    document.getElementById('modal-title').focus();
    if (loggedIn)
        exerciseImageDropzoneUpload();
    // Switching between modes
    var changeExerciseInputsType = document.getElementById('change-exercise-inputs-type');
    var exerciseInputsTypeSection = document.getElementById('exerciseInputsTypeSection');
    var normalButton = changeExerciseInputsType.children[0];
    var videoButton = changeExerciseInputsType.children[1];
    normalButton.onclick = function () {
        normalButton.disabled = true;
        videoButton.disabled = false;
        exerciseInputsTypeSection.innerHTML = normalExerciseInputs(loggedIn);
    };
    videoButton.onclick = function () {
        videoButton.disabled = true;
        normalButton.disabled = false;
        exerciseInputsTypeSection.innerHTML = videoExerciseInputs();
        // Load IFrame youtube API
        onYouTubeIframeAPIReady();
        // Listing for change in youtube url input
        var videoInput = document.getElementById('video-url');
        videoInput.oninput = function (e) { return cueVideoFromUrl(e.target.value); };
        var customTimeCheckBox = document.getElementById('customTimeCheckBox');
        customTimeCheckBox.oninput = function () { return toggleVideoExerciseTimeInterval(customTimeCheckBox.checked); };
    };
    // Submitting the form
    var form = document.getElementById('new-exercise-form');
    form.onsubmit = function (e) {
        submitNewExerciseValues(e, 'new');
        document.getElementById('add-exercise-button').focus();
    };
}
// Creating a new exercise
var newExerciseButton = document.getElementById('add-exercise-button');
newExerciseButton.onclick = renderNewExerciseModal;
export { renderExercisesHTML, renderSelectedWorkoutExercisesHTML, showExerciseModal, updateExerciseModalValues, changeInbetween, showDeleteExerciseAlert, hideDeleteExerciseAlert, deleteExercise, };
