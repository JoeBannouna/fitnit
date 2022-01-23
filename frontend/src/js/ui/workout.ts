import { currentWorkout, currentWorkoutIndex, modifyCurrentWorkout, workouts } from '../global';
import Workout from '../models/Workout';
import { fadeIn, fadeOut, hideModal, renderAlert, renderModal, showModal } from './animations';
import { renderExercisesHTML } from './exercise';
import { deleteAlert, newWorkoutModal, workoutBar } from './templates';

// Rendering workouts
const workoutsContainer = document.getElementById('workouts-container');

function renderWorkouts() {
  const workoutsHTML = workouts.map(workoutBar).join('');
  workoutsContainer.innerHTML = workoutsHTML;
}

renderWorkouts();

// Toggling between All Workouts section and a single workout section
const controlPanelButton: HTMLElement = document.querySelector('.control-panel-button');
const singleWorkoutSection = document.getElementById('single-workout-section');
const allWorkoutSection = document.getElementById('all-workouts-section');
const workOutBackButton = document.getElementById('workout-back-button');

let workoutsIsOpen = true;
function toggleWorkoutsSection() {
  if (workoutsIsOpen) {
    allWorkoutSection.style.width = '0';
    singleWorkoutSection.style.width = '100%';
    fadeOut(controlPanelButton);
  } else {
    renderWorkouts();
    allWorkoutSection.style.width = '100%';
    singleWorkoutSection.style.width = '0';
    fadeIn(controlPanelButton);
  }
  workoutsIsOpen = !workoutsIsOpen;
}

// Loading a workout
const changeWorkoutNameInput = document.getElementById('change-workout-name-input') as HTMLInputElement;
const changeWorkoutNameForm = document.getElementById('change-workout-name-form') as HTMLFormElement;
const changeWorkoutNameButton = document.getElementById('change-workout-name-button');
const changeWorkoutNameEditButton = document.getElementById('change-workout-name-edit-button');
const restIntervalsInput = document.getElementById('rest-input') as HTMLInputElement;
const restIntervalsSpan = document.getElementById('rest-span');
const restIntervalsButton = document.getElementById('rest-button') as HTMLButtonElement;
const restIntervalsForm = document.getElementById('rest-form') as HTMLFormElement;

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

function loadWorkout(index?: number) {
  // SET CURRENT WORKOUT ID
  if (index != null) modifyCurrentWorkout(index);

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
function saveWorkoutName(e: Event) {
  e.preventDefault && e.preventDefault();
  Workout.editName(currentWorkoutIndex, changeWorkoutNameInput.value);
  currentWorkout.name = changeWorkoutNameInput.value;
  defaultWorkoutNameUI();
}

changeWorkoutNameEditButton.onclick = changeWorkoutName;
changeWorkoutNameForm.onsubmit = saveWorkoutName;
workOutBackButton.onclick = toggleWorkoutsSection;

restIntervalsButton.onclick = () => {
  (restIntervalsForm.children[2] as HTMLButtonElement).disabled = false;
  restIntervalsForm.classList.remove('hidden');
  setTimeout(() => {
    restIntervalsForm.classList.remove('opacity-0');
    restIntervalsForm.classList.add('opacity-100');

    restIntervalsInput.focus();
  }, 0);
};

restIntervalsForm.onsubmit = e => {
  e.preventDefault();
  (e.submitter as HTMLButtonElement).disabled = true;
  Workout.editRest(currentWorkoutIndex, parseFloat(restIntervalsInput.value));
  restIntervalsSpan.innerHTML = restIntervalsInput.value;

  restIntervalsForm.classList.remove('opacity-100');
  restIntervalsForm.classList.add('opacity-0');
  setTimeout(() => {
    restIntervalsForm.classList.add('hidden');
  }, 300);
};

// Creating a new workout
const newWorkoutButton = document.getElementById('add-workout-button');
newWorkoutButton.onclick = () => {
  renderModal(() => newWorkoutModal());

  const form = document.getElementById('modal-rect') as HTMLFormElement;
  const name = document.getElementById('workout-name') as HTMLInputElement;
  name.focus();

  form.onsubmit = e => {
    e.preventDefault();
    (e.submitter as HTMLButtonElement).disabled = true;

    new Workout({
      name: name.value,
      rest: 5,
      exercises: [],
    });

    renderWorkouts();
    hideModal(document.getElementById('modal-container').children[0] as HTMLElement);
    loadWorkout(workouts.length - 1);
  };
};

function showDeleteWorkoutAlert(index: number) {
  renderAlert(() => deleteAlert('Delete workout', 'Are you sure you want to delete this item?', `UI.deleteWorkout(this, ${index})`));
  (document.getElementById('alert-cancel-button') as HTMLButtonElement).focus();
}

function deleteWorkout(button: HTMLButtonElement, index: number) {
  button.disabled = true;

  Workout.delete(index);
  renderWorkouts();

  fadeOut(document.getElementById('alert-container').children[0] as HTMLElement);
}

export { loadWorkout, showDeleteWorkoutAlert, deleteWorkout };
