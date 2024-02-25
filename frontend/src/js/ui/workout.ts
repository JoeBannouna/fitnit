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
const workoutsContainer = document.getElementById('workouts-container');

function renderWorkouts() {
  if (workouts.length) {
    const workoutsHTML = workouts.map(workoutBar).join('');
    workoutsContainer.innerHTML = workoutsHTML;
  } else if (!workouts.length && !loggedIn) {
    workoutsContainer.innerHTML =
      /* html */
      `<div class="flex justify-center items-center text-center px-4 py-20">
        Can't find your workouts? Sign in to access them.
      </div>`;
  }
}

renderWorkouts();

// Toggling between All Workouts section and a single workout section
const controlPanelButton: HTMLElement = document.querySelector('.control-panel-button');
const allWorkoutSection = document.getElementById('all-workouts-section');
const singleWorkoutSection = document.getElementById('single-workout-section');
const selectedWorkoutSection = document.getElementById('selected-workout-section');
const workOutBackButton = document.getElementById('workout-back-button');
const selectedWorkoutBackButton = document.getElementById('selected-workout-back-button');

let workoutsIsOpen = true;
function toggleWorkoutsSection(e: Event = null, sectionElement: HTMLElement = singleWorkoutSection, callback = () => {}, controlPanelButtonHidden = true) {
  if (workoutsIsOpen) {
    allWorkoutSection.style.width = '0';
    sectionElement.style.width = '100%';
    controlPanelButtonHidden && fadeOut(controlPanelButton);
  } else {
    renderWorkouts();
    allWorkoutSection.style.width = '100%';
    sectionElement.style.width = '0';
    controlPanelButtonHidden && fadeIn(controlPanelButton);
  }
  workoutsIsOpen = !workoutsIsOpen;
  callback();
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

function loadWorkout(button: HTMLButtonElement | null, index?: number) {
  if (button) button.blur();

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
selectedWorkoutBackButton.onclick = () => toggleWorkoutsSection(null, selectedWorkoutSection, deselectWorkout, false);

restIntervalsButton.onclick = () => {
  (restIntervalsForm.children[2] as HTMLButtonElement).disabled = false;
  restIntervalsForm.classList.remove('hidden');
  setTimeout(() => {
    restIntervalsForm.classList.remove('opacity-0');
    restIntervalsForm.classList.add('opacity-100');

    restIntervalsInput.focus();
  }, 0);
};

restIntervalsInput.onblur = () => {
  restIntervalsForm.classList.remove('opacity-100');
  restIntervalsForm.classList.add('opacity-0');
  setTimeout(() => {
    restIntervalsForm.classList.add('hidden');
    restIntervalsInput.value = currentWorkout.rest.toString();
  }, 300);
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
    loadWorkout(null, workouts.length - 1);
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

function deselectWorkout() {
  modifyCurrentExercise(null);
  modifyCurrentWorkout(null);
  resetCurrentActivity();
  document.removeEventListener('keypress', e => {
    if (e.code == 'Space') {
      togglePlay(undefined, true);
    }
  });

  const data = Router.getCurrentPageData();
  if (Router.currentPage.test('workout/something') && data) Router.replace('/');

  document.getElementById('timer-section-cover').classList.remove('hidden');
  document.getElementById('timer-title').innerHTML = 'Current Exercise';
  document.getElementById('timer-number').innerHTML = '60';
}

function selectWorkout(button: HTMLButtonElement | null, index: number) {
  if (button) button.blur();

  modifyCurrentWorkout(index);
  currentWorkout.exercises.length ? modifyCurrentExercise(0) : modifyCurrentExercise(null);

  // Title area
  (document.getElementById('workout-name-input') as HTMLInputElement).value = currentWorkout.name;

  // Info area
  // document.getElementById('workout-info-box').innerHTML

  // Exercises
  renderSelectedWorkoutExercisesHTML();
  selectCurrentActivity();

  document.getElementById('timer-section-cover').classList.add('hidden');
  toggleWorkoutsSection(null, selectedWorkoutSection, () => {}, false);

  document.addEventListener('keypress', e => {
    if (e.code == 'Space') {
      togglePlay(undefined, true);
    }
  });
}

const importWorkoutBox = document.getElementById('import-workout-box');
const importWorkoutButton = importWorkoutBox.children[1] as HTMLButtonElement;

const exportWorkoutBox = document.getElementById('export-workout-box');
const exportWorkoutButton = exportWorkoutBox.children[0] as HTMLButtonElement;

exportWorkoutButton.onclick = () => {
  Composer.exportWorkout(currentWorkoutIndex).then(res => {
    let link = window.location.origin + '/workout/' + encodeURIComponent(res);
    renderModal(() => shareWorkoutModal(link));
  });
};

importWorkoutButton.onclick = () => {
  new Workout({ ...currentWorkout });
  selectedWorkoutBackButton.click();
};

window.addEventListener('routeChanged', async () => {
  const data = Router.getCurrentPageData();
  if (Router.currentPage.test('workout/something') && data) {
    const compressedWorkout = decodeURIComponent(data[0]);
    const workoutJSON = await Composer.getWorkoutJSON(compressedWorkout);
    if (workoutJSON) {
      importWorkoutBox.classList.remove('hidden');
      setSharedWorkout(workoutJSON);
      selectWorkout(null, -1);
    } else {
      setSharedWorkout(`{"name": "Error, invalid link", "res": 1, "exercises": [] }`);
      selectWorkout(null, -1);
    }
  } else {
    importWorkoutBox.classList.add('hidden');
  }
});

export { loadWorkout, selectWorkout, showDeleteWorkoutAlert, deleteWorkout };
