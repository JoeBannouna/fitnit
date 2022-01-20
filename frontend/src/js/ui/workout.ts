import { currentWorkout, modifyCurrentWorkout, workouts } from '../global';
import Workout from '../models/Workout';
import { fadeIn, fadeOut, hideModal, renderModal } from './animations';
import { renderExercisesHTML } from './exercise';
import { newWorkoutModal, workoutBar } from './templates';

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
  if (index != null) modifyCurrentWorkout(workouts[index]);

  // RENDERING HTML

  // Title area
  changeWorkoutNameInput.value = currentWorkout.name;
  defaultWorkoutNameUI();

  // Exercises
  renderExercisesHTML();

  // ANIMATE
  toggleWorkoutsSection();
}

// Edit a workout
function saveWorkoutName(e: Event) {
  e.preventDefault && e.preventDefault();
  if (Workout.editName(currentWorkout.id, changeWorkoutNameInput.value)) {
    currentWorkout.name = changeWorkoutNameInput.value;
  }
  defaultWorkoutNameUI();
}

changeWorkoutNameEditButton.onclick = changeWorkoutName;
changeWorkoutNameButton.onclick = saveWorkoutName;
changeWorkoutNameForm.onsubmit = saveWorkoutName;
workOutBackButton.onclick = toggleWorkoutsSection;

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

export {
  loadWorkout,
  // deleteWorkout,
};
