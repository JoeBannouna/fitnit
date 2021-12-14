import { workouts, WorkoutType } from './global';
import Workout from './models/Workout';
import ANIMATIONS from './ui/animations';

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
  const workoutsHTML = workouts
    .map((workout, index) => {
      return `<div class="flex workout">
                <button class="bg-white mx-6 my-3 px-4 py-3 rounded-l-lg mr-0 shadow flex w-full text-left" onclick="UI.selectWorkout('${index}')">
                  <strong class="mr-2 text-lg self-center">${index + 1}</strong> <span class="text-sm my-auto">${workout.name}</span>
                </button>
                <button class="workout-gear-button bg-white mx-6 my-3 px-4 py-3 rounded-r-lg ml-0 shadow flex text-gray-500 items-center" onclick="UI.loadWorkout('${index}')">
                  <span class="ml-auto text-lg"><i class="fas fa-cog duration-300"></i></span>
                </button>
              </div>`;
    })
    .join('');

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
    ANIMATIONS.fadeOut(exercisesButton);
  } else {
    renderWorkouts();
    allWorkoutSection.style.width = '100%';
    singleWorkoutSection.style.width = '0';
    ANIMATIONS.fadeIn(exercisesButton);
  }
  workoutsIsOpen = !workoutsIsOpen;
}

// Loading a workout
let currentWorkout: WorkoutType;
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

function loadWorkout(index: number) {
  // Set current workout id
  currentWorkout = workouts[index];

  // Render HTML
  changeWorkoutNameInput.value = currentWorkout.name;
  defaultWorkoutNameUI();

  // Animate
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

const UI: any = {
  toggleWorkoutsSection,
  loadWorkout,
  // deleteWorkout,
};

UI.ANIMATIONS = ANIMATIONS;

export default UI;

// JUST FOR TESTING
// window.workouts = workouts;

// ANIMATIONS.fadeIn(document.getElementById('thismodal'));
