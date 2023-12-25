import interact from 'interactjs';
import { currentWorkout, currentWorkoutIndex } from '../global';
import Workout from '../models/Workout';
import { renderExercisesHTML } from './exercise';
import { arrayMove } from '../utils';

const currentDrag = () => document.querySelector('.current-drag').parentElement.parentElement.parentElement;

const dropzoneAccepted = (event: any) => {
  const currentDragId = parseFloat(currentDrag().id.split('-')[1]);
  const dropzoneId = parseFloat(event.target.id.split('-')[2]);

  return !(currentDragId == dropzoneId || currentDragId == dropzoneId - 1);
};

const opacity50 = (event: any) => {
  event.target.classList.add('opacity-50');
  event.target.classList.remove('opacity-100');
};

const opacity100 = (event: any) => {
  event.target.classList.add('opacity-100');
  event.target.classList.remove('opacity-50');
};

const z20 = (element: HTMLElement) => {
  element?.parentElement?.classList.add('z-20');
  element?.parentElement?.classList.remove('z-30');
  element?.classList.add('z-20');
  element?.classList.remove('z-30');
};

const z30 = (element: HTMLElement) => {
  element?.parentElement?.classList.add('z-30');
  element?.parentElement?.classList.remove('z-20');
  element?.classList.add('z-30');
  element?.classList.remove('z-20');
};

let isCurrentElementBeingCloned = false;
let illusionCreated = false;
function dragMoveListener(event: any) {
  const target = event.target as HTMLElement;
  const exerciseBar = target.parentElement.parentElement;

  exerciseBar.classList.remove('duration-300');
  z30(exerciseBar);
  target.classList.add('current-drag');

  if (event.altKey) {
    isCurrentElementBeingCloned = true;
    currentDrag().style.marginBottom = currentDrag().clientHeight + 'px';
  }

  if (isCurrentElementBeingCloned && !illusionCreated) {
    const spanContainer = document.createElement("span");
    spanContainer.appendChild(currentDrag().children[0].cloneNode(true));
    currentDrag().appendChild(spanContainer);
    
    console.log(currentDrag().children[1]);
    (currentDrag().children[1] as HTMLElement).id = null;
    (currentDrag().children[1].children[0] as HTMLElement).classList.remove('current-drag');
    (currentDrag().children[1] as HTMLElement).style.display = 'block';
    (currentDrag().children[0] as HTMLElement).style.position = 'absolute';
    // (currentDrag().children[1].children[0] as HTMLElement).id = null;
    // (currentDrag().children[1].children[0] as HTMLElement).style = ;/
    
    illusionCreated = true;
  }

  const y = (parseFloat(exerciseBar.getAttribute('data-y')) || 0) + event.dy;
  exerciseBar.style.transform = 'translate(0px, ' + y + 'px)';
  exerciseBar.setAttribute('data-y', y);
  exerciseBar.setAttribute('data-x', '0');
}

function drageEndListener(event: any) {
  const target = event.target as HTMLElement;
  const exerciseBar = target.parentElement.parentElement;

  exerciseBar.classList.add('duration-300');
  z20(exerciseBar);
  // currentDrag().style.marginBottom = null;
  target.classList.remove('current-drag');
  exerciseBar.style.transform = 'translate(0px, 0px)';
  exerciseBar.setAttribute('data-y', '0');
  exerciseBar.setAttribute('data-x', '0');
}

let dragMode: string;

const loopThroughExercisesUp = (barIndex: number, dropzoneIndex: number, marginHeight: number = 0) => {
  let recallFunc = false;

  const actualMarginHeight = dropzoneIndex > barIndex ? 0 : marginHeight;

  if (document.getElementById('exercise-' + dropzoneIndex)) {
    if (currentDrag().id != 'exercise-' + dropzoneIndex) {
      document.getElementById('exercise-' + dropzoneIndex).style.transform = 'translateY(' + actualMarginHeight + 'px)';
    }
    recallFunc = true;
  }

  if (document.getElementById('exercise-dropzone-' + dropzoneIndex)) {
    document.getElementById('exercise-dropzone-' + dropzoneIndex).style.transform = 'translateY(' + actualMarginHeight + 'px)';
    recallFunc = true;
  }

  dropzoneIndex += 1;

  if (recallFunc) {
    loopThroughExercisesUp(barIndex, dropzoneIndex, marginHeight);
  }
};

const loopThroughExercisesDown = (barIndex: number, dropzoneIndex: number, marginHeight: number = 0) => {
  let recallFunc = false;

  const actualMarginHeight = dropzoneIndex - 1 < barIndex ? 0 : -marginHeight;

  if (!(dropzoneIndex < 0)) {
    if (document.getElementById('exercise-' + (dropzoneIndex - 1))) {
      if (currentDrag().id != 'exercise-' + (dropzoneIndex - 1)) {
        document.getElementById('exercise-' + (dropzoneIndex - 1)).style.transform = 'translateY(' + actualMarginHeight + 'px)';
      }
      recallFunc = true;
    }

    if (document.getElementById('exercise-dropzone-' + (dropzoneIndex - 1))) {
      document.getElementById('exercise-dropzone-' + (dropzoneIndex - 1)).style.transform = 'translateY(' + actualMarginHeight + 'px)';
      recallFunc = true;
    }
  }

  dropzoneIndex -= 1;

  if (recallFunc) {
    loopThroughExercisesDown(barIndex, dropzoneIndex, marginHeight);
  }
};

interact('.draggable').draggable({
  listeners: {
    move: dragMoveListener,
    end: drageEndListener,
  },
});

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.draggable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.001,

  ondragenter: function (event) {
    if (dropzoneAccepted(event)) {
      const currentDragId = parseFloat(currentDrag().id.split('-')[1]);
      const dropzoneId = parseFloat(event.target.id.split('-')[2]);

      loopThroughExercisesUp(currentDragId, dropzoneId, currentDrag().clientHeight);
      loopThroughExercisesDown(currentDragId, dropzoneId, currentDrag().clientHeight);
      dragMode = dropzoneId > currentDragId ? 'down' : 'up';

      opacity50(event);
      // console.log('ondragenter');
    }
  },
  ondragleave: function (event) {
    if (dropzoneAccepted(event)) {
      const currentDragId = parseFloat(currentDrag().id.split('-')[1]);
      const dropzoneId = parseFloat(event.target.id.split('-')[2]);

      loopThroughExercisesUp(currentDragId, dropzoneId);
      loopThroughExercisesDown(currentDragId, dropzoneId);

      opacity100(event);
      // console.log('ondragleave');
    }
  },
  ondrop: function (event) {
    if (dropzoneAccepted(event) || isCurrentElementBeingCloned) {
      // Get required data
      const currentDragElement = currentDrag();
      const currentDragId = parseFloat(currentDragElement.id.split('-')[1]);
      const dropzoneId = parseFloat(event.target.id.split('-')[2]);

      // Set the new index and translate value
      const newIndex = dragMode == 'up' ? dropzoneId : dropzoneId - 1;
      const newTranslateIndex = Math.abs(newIndex - currentDragId);
      const sign = dragMode == 'up' ? -1 : 1;
      const newTranslateValue = sign * (newTranslateIndex * currentDragElement.clientHeight);

      // Do a nice little animation
      currentDragElement.classList.add('duration-300');
      currentDragElement.style.transform = 'translate(0px, ' + newTranslateValue + 'px)';
      currentDragElement.setAttribute('data-y', newTranslateValue.toString());
      currentDragElement.setAttribute('data-x', '0');

      // Re-render the exercises
      const arr = [...currentWorkout.exercises];
      arrayMove(arr, currentDragId, newIndex);

      // If the element is being clone, add a clone in the array
      if (isCurrentElementBeingCloned) arr.splice(currentDragId <= newIndex ? currentDragId : newIndex + 2, 0, arr[newIndex]);

      Workout.updateExercisesPosition(currentWorkoutIndex, arr);
      
      // No animation if it is a clone operation
      setTimeout(renderExercisesHTML, isCurrentElementBeingCloned ? 0 : 100);

      // Set back options
      isCurrentElementBeingCloned = false;
      illusionCreated = false;
    }
  },
});
