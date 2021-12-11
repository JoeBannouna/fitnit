// Global variables
const workouts = [
  {
    id: 'wdubdbwk',
    name: 'Upper-body workout',
    rest: 10,
    exercises: [
      {
        name: 'Push-ups',
        type: 'REPS',
        reps: 20,
        inbetween: 2,
      },
      {
        name: 'Arm circles',
        type: 'TIME',
        time: 60,
      },
    ],
  },
  {
    id: 'e2hndo',
    name: 'Lower-body workout',
    rest: 5,
    exercises: [
      {
        name: 'Push-ups',
        type: 'REPS',
        reps: 20,
        inbetween: 2,
      },
      {
        name: 'Arm circles',
        type: 'TIME',
        time: 60,
      },
    ],
  },
];

// Navbar links selection
const navbarOptions = document.querySelectorAll('.main-dropdown-ul li');

navbarOptions.forEach(li => {
  li.onclick = () => {
    navbarOptions.forEach(childLi => childLi.classList.remove('selected'));
    li.classList.add('selected');
  };
});

// exercises section toggle
let exercisesSecionOpen = !($(window).width() < 1024);

const exercisesButton = document.querySelector('.exercises-section-button');
const exercisesSection = document.querySelector('.exercises-section');
const timerSection = document.querySelector('.timer-section');

exercisesButton.innerHTML = exercisesSecionOpen ? '❱' : '❰';

function exercisesPanelToggle() {
  isMobileScreen = $(window).width() < 1024;

  if (exercisesSecionOpen) {
    exercisesSection.style.width = 0;
    timerSection.style.width = '100%';
    exercisesButton.innerHTML = '❰';
    isMobileScreen ? (exercisesButton.style.transform = 'translateX(-20px)') : '';
  } else {
    exercisesSection.style.width = isMobileScreen ? '100%' : '25%';
    timerSection.style.width = isMobileScreen ? '0%' : '75%';

    isMobileScreen ? (exercisesButton.style.transform = 'translateX(0px) scale(-1) rotate(0deg)') : (exercisesButton.innerHTML = '❱');
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
                <button class="bg-white mx-6 my-3 px-4 py-3 rounded-l-lg mr-0 shadow flex w-full text-left" onclick="loadWorkout('${workout.id}')">
                  <strong class="mr-2 text-lg">${index + 1}</strong> <span class="text-sm my-auto">${workout.name}</span>
                </button>
                <button class="bg-white mx-6 my-3 px-4 py-3 rounded-r-lg ml-0 shadow flex text-red-500" onclick="deleteWorkout('${workout.id}')">
                  <span class="ml-auto text-lg"><i class="far fa-trash-alt"></i></span>
                </button>
              </div>`;
    })
    .join('');

  workoutsContainer.innerHTML = workoutsHTML;
}

renderWorkouts();

// Loading a workout
const singleWorkoutSection = document.getElementById('single-workout-section');
const allWorkoutSection = document.getElementById('all-workouts-section');

let workoutsIsOpen = true;
function workoutsToggle() {
  if (workoutsIsOpen) {
    allWorkoutSection.style.width = 0;
    singleWorkoutSection.style.width = '100%';
  } else {
    allWorkoutSection.style.width = '100%';
    singleWorkoutSection.style.width = 0;
  }
  workoutsIsOpen = !workoutsIsOpen;
}

function loadWorkout() {
  // Render HTML
  // Animate
  workoutsToggle();
}

function changeWorkoutName() {
  
}

function saveWorkoutName() {

}