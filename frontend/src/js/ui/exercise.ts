import { currentWorkout, currentWorkoutIndex, loggedIn } from '../global';
import Exercise from '../models/Exercise';
import { ExerciseType, NormalExerciseType, VideoExerciseType } from '../types';
import { fadeOut, hideModal, renderAlert, renderModal } from './animations';
import { selectCurrentActivity } from './player';
import {
  deleteAlert,
  exerciseBar,
  exerciseModal,
  infoAlert,
  newExerciseModal,
  normalExerciseInputs,
  restBox,
  selectedWorkoutExercise,
  videoExerciseInputs,
} from './templates';
import { exerciseImageDropzoneUpload } from './upload';
import { cueVideoFromUrl, onYouTubeIframeAPIReady } from './youtube';

// Exercise
function renderExercisesHTML() {
  const singleExercisesSection = document.getElementById('single-exercises-section');
  if (currentWorkout.exercises.length) {
    const exercisesHTML = currentWorkout.exercises.map(exerciseBar).join('');
    singleExercisesSection.innerHTML = '<div><div class="dropzone h-px w-full" id="exercise-dropzone-0"></div></div>';
    singleExercisesSection.innerHTML += exercisesHTML;
  } else {
    singleExercisesSection.innerHTML =
      /* html */
      `<div class="bg-gray-200 flex justify-center items-center text-center px-4 py-20">
        Workout exercises will appear here
      </div>`;
  }
}

function renderSelectedWorkoutExercisesHTML() {
  const selectedExercisesSection = document.getElementById('selected-exercises-section');
  const exercisesHTML = currentWorkout.exercises.map(selectedWorkoutExercise).join(currentWorkout.rest ? restBox(currentWorkout.rest) : '');
  selectedExercisesSection.innerHTML = exercisesHTML;
  document.querySelectorAll('.rest-box').forEach((restBox: HTMLElement, index) => {
    restBox.id = 'rest-box-' + index;
    restBox.onmousedown = () => selectCurrentActivity(index, 'rest', true);
  });

  document.querySelectorAll('.exercise-box').forEach((exerciseBox: HTMLElement, index) => {
    // exerciseBox.id = 'rest-box-' + index;
    exerciseBox.onmousedown = () => selectCurrentActivity(index, 'exercise', true);
  });
}

function showExerciseModal(index: number) {
  const exercise = currentWorkout.exercises[index];
  renderModal(() => exerciseModal(index, exercise, loggedIn));
  if (loggedIn) exerciseImageDropzoneUpload();

  if (exercise.type == 'VIDEO') {
    // Load IFrame youtube API
    onYouTubeIframeAPIReady(() => cueVideoFromUrl(exercise.url));

    // Listing for change in youtube url input
    const videoInput = document.getElementById('video-url') as HTMLInputElement;
    videoInput.oninput = e => cueVideoFromUrl((e.target as HTMLInputElement).value);

    const customTimeCheckBox = document.getElementById('customTimeCheckBox') as HTMLInputElement;
    customTimeCheckBox.oninput = () => toggleVideoExerciseTimeInterval(customTimeCheckBox.checked);
    toggleVideoExerciseTimeInterval(customTimeCheckBox.checked);
  }

  const form = document.getElementById('update-exercise-form') as HTMLFormElement;
  form.onsubmit = e => submitNewExerciseValues(e, 'update');
}

function showDeleteExerciseAlert(index: number) {
  renderAlert(() => deleteAlert('Delete exercise', 'Are you sure you want to delete this item?', `UI.deleteExercise(this, ${index})`));
  (document.getElementById('alert-cancel-button') as HTMLButtonElement).focus();
}

function hideDeleteExerciseAlert(button: HTMLElement) {
  const alertElement = button.parentElement.parentElement.parentElement;
  hideModal(alertElement);
}

function deleteExercise(deleteButton: HTMLButtonElement, index: number) {
  deleteButton.disabled = true;

  Exercise.delete(currentWorkoutIndex, index);
  renderExercisesHTML();

  fadeOut(document.getElementById('alert-container').children[0] as HTMLElement);
  hideModal(document.getElementById('modal-container').children[0] as HTMLElement);
}

function updateExerciseModalValues(event: InputEvent) {
  const typeInput = event.target as HTMLInputElement;
  const type = typeInput.value as ExerciseType['type'];

  if (type == 'TIMED-REPS') {
    document.querySelector('.timed-reps').classList.remove('hidden');
  } else {
    document.querySelector('.timed-reps').classList.add('hidden');
  }
}

function changeInbetween(string: 'up' | 'down') {
  const input = document.getElementById('inbetween-input') as HTMLInputElement;
  const span = document.getElementById('inbetween-span');

  let newVal;
  if (string == 'up') {
    newVal = parseFloat(input.value) + 1;
  } else {
    newVal = parseFloat(input.value) == 0 ? 0 : parseFloat(input.value) - 1;
  }

  input.value = newVal.toString();
  span.innerHTML = newVal.toString();
}

const submitVals = (mode: 'update' | 'new', exercise: ExerciseType, index = 0) => {
  if (mode == 'update') {
    Exercise.update(currentWorkoutIndex, index, exercise);
  } else if (mode == 'new') {
    new Exercise(currentWorkoutIndex, exercise);
  }
};

function toggleVideoExerciseTimeInterval(bool: boolean) {
  if (bool) {
    document.querySelectorAll('.video-seconds-input').forEach(element => {
      element.classList.remove('opacity-50');
      (element.children[1] as HTMLInputElement).readOnly = false;
    });
  } else {
    document.querySelectorAll('.video-seconds-input').forEach(element => {
      element.classList.add('opacity-50');
      (element.children[1] as HTMLInputElement).readOnly = true;
    });
  }
}

function submitNewExerciseValues(e: SubmitEvent, mode: 'update' | 'new') {
  e.preventDefault();
  (e.submitter as HTMLButtonElement).disabled = true;

  const exerciseInputsType = document.getElementById('exerciseInputsType') as HTMLInputElement;
  const name = document.getElementById('modal-title') as HTMLInputElement;
  const index = document.getElementById('exercise-index') as HTMLInputElement;

  if (exerciseInputsType.value == 'normal') {
    const amount = document.getElementById('exercise-amount') as HTMLInputElement;
    const type = document.getElementById('exercise-type') as HTMLInputElement;
    const inbetween = document.getElementById('inbetween-input') as HTMLInputElement;

    const exercise = {} as NormalExerciseType;
    exercise.name = name.value;
    exercise.amount = parseFloat(amount.value);
    exercise.type = type.value as NormalExerciseType['type'];
    if (exercise.type == 'TIMED-REPS') exercise.inbetween = parseFloat(inbetween.value);

    if (loggedIn) {
      // Process image upload and ID here??
    }

    submitVals(mode, exercise, parseFloat(index.value));
    renderExercisesHTML();
    hideModal(document.getElementById('modal-container').children[0] as HTMLElement);
  } else if (exerciseInputsType.value == 'video') {
    const url = document.getElementById('video-url') as HTMLInputElement;

    const customTimeCheckBox = document.getElementById('customTimeCheckBox') as HTMLInputElement;
    const videoStartSecondsInput = document.getElementById('videoStartSeconds') as HTMLInputElement;
    const videoEndSecondsInput = document.getElementById('videoEndSeconds') as HTMLInputElement;

    const exercise = {} as VideoExerciseType;
    exercise.name = name.value;
    exercise.url = url.value;
    exercise.type = 'VIDEO';

    if (customTimeCheckBox.checked) {
      const videoStartSeconds = parseFloat(videoStartSecondsInput.value);
      const videoEndSeconds = parseFloat(videoEndSecondsInput.value);

      if (videoStartSeconds < videoEndSeconds) {
        exercise.period = {
          startSeconds: videoStartSeconds,
          endSeconds: videoEndSeconds,
        };
      } else {
        renderAlert(() => infoAlert('Start seconds cannot be bigger than End seconds'));
        (e.submitter as HTMLButtonElement).disabled = false;
        return;
      }
    }

    if (loggedIn) {
      // Process image upload and ID here??
    }

    submitVals(mode, exercise, parseFloat(index.value));
    renderExercisesHTML();
    hideModal(document.getElementById('modal-container').children[0] as HTMLElement);
  }
}

function renderNewExerciseModal() {
  renderModal(() => newExerciseModal(loggedIn));
  document.getElementById('modal-title').focus();

  if (loggedIn) exerciseImageDropzoneUpload();

  // Switching between modes
  const changeExerciseInputsType = document.getElementById('change-exercise-inputs-type');
  const exerciseInputsTypeSection = document.getElementById('exerciseInputsTypeSection');
  const normalButton = changeExerciseInputsType.children[0] as HTMLButtonElement;
  const videoButton = changeExerciseInputsType.children[1] as HTMLButtonElement;

  normalButton.onclick = () => {
    normalButton.disabled = true;
    videoButton.disabled = false;
    exerciseInputsTypeSection.innerHTML = normalExerciseInputs(loggedIn);
  };

  videoButton.onclick = () => {
    videoButton.disabled = true;
    normalButton.disabled = false;
    exerciseInputsTypeSection.innerHTML = videoExerciseInputs();

    // Load IFrame youtube API
    onYouTubeIframeAPIReady();

    // Listing for change in youtube url input
    const videoInput = document.getElementById('video-url') as HTMLInputElement;
    videoInput.oninput = e => cueVideoFromUrl((e.target as HTMLInputElement).value);

    const customTimeCheckBox = document.getElementById('customTimeCheckBox') as HTMLInputElement;
    customTimeCheckBox.oninput = () => toggleVideoExerciseTimeInterval(customTimeCheckBox.checked);
  };

  // Submitting the form
  const form = document.getElementById('new-exercise-form') as HTMLFormElement;
  form.onsubmit = e => {
    submitNewExerciseValues(e, 'new');
    document.getElementById('add-exercise-button').focus();
  };
}

// Creating a new exercise
const newExerciseButton = document.getElementById('add-exercise-button');
newExerciseButton.onclick = renderNewExerciseModal;

export {
  renderExercisesHTML,
  renderSelectedWorkoutExercisesHTML,
  showExerciseModal,
  updateExerciseModalValues,
  changeInbetween,
  showDeleteExerciseAlert,
  hideDeleteExerciseAlert,
  deleteExercise,
};
