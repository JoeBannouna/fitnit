import { ExerciseType, workouts, WorkoutType } from './global';
import Exercise from './models/Exercise';
import Workout from './models/Workout';
import { fadeIn, fadeOut, hideModal, renderAlert, renderModal } from './ui/animations';
import { deleteExerciseAlert, exerciseBar, exerciseModal, newExerciseModal, newWorkoutModal, workoutBar } from './ui/templates';
import { exerciseImageDropzoneUpload } from './ui/upload';
import { arrayRemoveItem } from './utils';

// Dropdown button
$('.main-dropdown-button').on('click', () => $('#main-dropdown').slideToggle());

// Navbar links selection
const navbarOptions = document.querySelectorAll('.main-dropdown-ul li');

navbarOptions.forEach((li: HTMLElement) => {
  li.onclick = () => {
    navbarOptions.forEach(childLi => childLi.classList.remove('selected'));
    li.classList.add('selected');
  };
});

// Exercises section toggle
let exercisesSecionOpen = !($(window).width() < 1024);

const exercisesButton: HTMLElement = document.querySelector('.exercises-section-button');
const exercisesSection: HTMLElement = document.querySelector('.exercises-section');
const timerSection: HTMLElement = document.querySelector('.timer-section');

exercisesButton.innerHTML = exercisesSecionOpen ? '❱' : '❰';

function exercisesPanelToggle() {
  let isMobileScreen = $(window).width() < 1024;

  if (exercisesSecionOpen) {
    exercisesSection.style.width = '0';
    timerSection.style.width = '100%';
    exercisesButton.innerHTML = '❰';
    isMobileScreen ? (exercisesButton.style.transform = 'translateX(-20px)') : '';
  } else {
    exercisesSection.style.width = isMobileScreen ? '100%' : '25%';
    timerSection.style.width = isMobileScreen ? '0%' : '75%';

    isMobileScreen ? (exercisesButton.style.transform = 'translateX(0px) scale(-1)') : (exercisesButton.innerHTML = '❱');
  }

  exercisesSecionOpen = !exercisesSecionOpen;
}

exercisesButton.onclick = exercisesPanelToggle;
exercisesButton.addEventListener('swiped-left', exercisesPanelToggle);
exercisesButton.addEventListener('swiped-right', exercisesPanelToggle);

// Rendering workouts
const workoutsContainer = document.getElementById('workouts-container');

function renderWorkouts() {
  const workoutsHTML = workouts.map(workoutBar).join('');
  workoutsContainer.innerHTML = workoutsHTML;
}

renderWorkouts();

// Toggling between All Workouts section and a single workout section
const singleWorkoutSection = document.getElementById('single-workout-section');
const allWorkoutSection = document.getElementById('all-workouts-section');

let workoutsIsOpen = true;
function toggleWorkoutsSection() {
  if (workoutsIsOpen) {
    allWorkoutSection.style.width = '0';
    singleWorkoutSection.style.width = '100%';
    fadeOut(exercisesButton);
  } else {
    renderWorkouts();
    allWorkoutSection.style.width = '100%';
    singleWorkoutSection.style.width = '0';
    fadeIn(exercisesButton);
  }
  workoutsIsOpen = !workoutsIsOpen;
}

// Loading a workout
export let currentWorkout: WorkoutType;
const changeWorkoutNameInput = document.getElementById('change-workout-name-input') as HTMLInputElement;
const changeWorkoutNameButton = document.getElementById('change-workout-name-button');
const changeWorkoutNameEditButton = document.getElementById('change-workout-name-edit-button');

function changeWorkoutName() {
  changeWorkoutNameButton.style.display = 'block';
  changeWorkoutNameEditButton.style.display = 'none';
  changeWorkoutNameInput.readOnly = false;
  changeWorkoutNameInput.focus();
}

function defaultWorkoutNameUI() {
  changeWorkoutNameButton.style.display = 'none';
  changeWorkoutNameEditButton.style.display = 'block';
  changeWorkoutNameInput.readOnly = true;
}

export function renderExercisesHTML() {
  const singleExercisesSection = document.getElementById('single-exercises-section');
  const exercisesHTML = currentWorkout.exercises.map(exerciseBar).join('');
  singleExercisesSection.innerHTML = '<div><div class="dropzone h-px w-full" id="exercise-dropzone-0"></div></div>';
  singleExercisesSection.innerHTML += exercisesHTML;
}

function loadWorkout(index?: number) {
  // SET CURRENT WORKOUT ID
  if (index != null) currentWorkout = workouts[index];

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
function saveWorkoutName() {
  if (Workout.editName(currentWorkout.id, changeWorkoutNameInput.value)) {
    currentWorkout.name = changeWorkoutNameInput.value;
  }
  defaultWorkoutNameUI();
}

changeWorkoutNameEditButton.onclick = changeWorkoutName;
changeWorkoutNameButton.onclick = saveWorkoutName;

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

    arrayRemoveItem(currentWorkout.exercises, index);

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

const newWorkoutButton = document.getElementById('add-workout-button');
newWorkoutButton.onclick = () => {
  renderModal(() => newWorkoutModal());

  const form = document.getElementById('modal-rect') as HTMLFormElement;
  const name = document.getElementById('workout-name') as HTMLInputElement;
  name.focus()
  
  form.onsubmit = e => {
    e.preventDefault();
    (e.submitter as HTMLButtonElement).disabled = true;
    
    new Workout({
      name: name.value,
      rest: 5,
      exercises: [],
    });

    renderWorkouts()
    hideModal(document.getElementById('modal-container').children[0] as HTMLElement);
  };
};

const newExerciseButton = document.getElementById('add-exercise-button');
newExerciseButton.onclick = () => {
  renderModal(() => newExerciseModal());
  exerciseImageDropzoneUpload();
};

const UI: any = {
  toggleWorkoutsSection,
  loadWorkout,
  // deleteWorkout,

  showExerciseModal,
  updateExerciseModalValues,
  changeInbetween,

  showDeleteExerciseAlert,
  hideDeleteExerciseAlert,
  deleteExercise,
};

export default UI;

// JUST FOR TESTING
// @ts-ignore
window.workouts = workouts;

// showModal(document.getElementById('modal-element'));
