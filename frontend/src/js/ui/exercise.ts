import { currentWorkout } from '../global';
import Exercise from '../models/Exercise';
import { ExerciseType } from '../types';
import { fadeOut, hideModal, renderAlert, renderModal } from './animations';
import { deleteExerciseAlert, exerciseBar, exerciseModal, newExerciseModal } from './templates';
import { exerciseImageDropzoneUpload } from './upload';

// Exercise
function renderExercisesHTML() {
  const singleExercisesSection = document.getElementById('single-exercises-section');
  const exercisesHTML = currentWorkout.exercises.map(exerciseBar).join('');
  singleExercisesSection.innerHTML = '<div><div class="dropzone h-px w-full" id="exercise-dropzone-0"></div></div>';
  singleExercisesSection.innerHTML += exercisesHTML;
}

function showExerciseModal(index: number) {
  const exercise = currentWorkout.exercises[index];
  renderModal(() => exerciseModal(index, exercise));
  exerciseImageDropzoneUpload();
}

function showDeleteExerciseAlert(index: number) {
  renderAlert(() => deleteExerciseAlert(index));
}

function hideDeleteExerciseAlert(button: HTMLElement) {
  const alertElement = button.parentElement.parentElement.parentElement;
  hideModal(alertElement);
}

function deleteExercise(deleteButton: HTMLButtonElement, index: number) {
  deleteButton.disabled = true;
  const exercise = currentWorkout.exercises[index];
  if (Exercise.delete(exercise.id)) {
    fadeOut(document.getElementById('alert-container').children[0] as HTMLElement);
    hideModal(document.getElementById('modal-container').children[0] as HTMLElement);

    currentWorkout.exercises.splice(index, 1);

    renderExercisesHTML();
  } else {
    deleteButton.disabled = false;
  }
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

const newExerciseButton = document.getElementById('add-exercise-button');
newExerciseButton.onclick = () => {
  renderModal(() => newExerciseModal());
  exerciseImageDropzoneUpload();
};

export {
  renderExercisesHTML,
  showExerciseModal,
  updateExerciseModalValues,
  changeInbetween,

  showDeleteExerciseAlert,
  hideDeleteExerciseAlert,
  deleteExercise,
};