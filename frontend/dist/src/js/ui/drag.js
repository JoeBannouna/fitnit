var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import interact from 'interactjs';
import { currentWorkout, currentWorkoutIndex } from '../global';
import Workout from '../models/Workout';
import { renderExercisesHTML } from './exercise';
import { arrayMove } from '../utils';
var currentDrag = function () { return document.querySelector('.current-drag').parentElement.parentElement.parentElement; };
var dropzoneAccepted = function (event) {
    var currentDragId = parseFloat(currentDrag().id.split('-')[1]);
    var dropzoneId = parseFloat(event.target.id.split('-')[2]);
    return !(currentDragId == dropzoneId || currentDragId == dropzoneId - 1);
};
var opacity50 = function (event) {
    event.target.classList.add('opacity-50');
    event.target.classList.remove('opacity-100');
};
var opacity100 = function (event) {
    event.target.classList.add('opacity-100');
    event.target.classList.remove('opacity-50');
};
var z20 = function (element) {
    var _a, _b;
    (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('z-20');
    (_b = element === null || element === void 0 ? void 0 : element.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('z-30');
    element === null || element === void 0 ? void 0 : element.classList.add('z-20');
    element === null || element === void 0 ? void 0 : element.classList.remove('z-30');
};
var z30 = function (element) {
    var _a, _b;
    (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('z-30');
    (_b = element === null || element === void 0 ? void 0 : element.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('z-20');
    element === null || element === void 0 ? void 0 : element.classList.add('z-30');
    element === null || element === void 0 ? void 0 : element.classList.remove('z-20');
};
var isCurrentElementBeingCloned = false;
var illusionCreated = false;
function dragMoveListener(event) {
    var target = event.target;
    var exerciseBar = target.parentElement.parentElement;
    exerciseBar.classList.remove('duration-300');
    z30(exerciseBar);
    target.classList.add('current-drag');
    if (event.altKey) {
        isCurrentElementBeingCloned = true;
        currentDrag().style.marginBottom = currentDrag().clientHeight + 'px';
    }
    if (isCurrentElementBeingCloned && !illusionCreated) {
        var spanContainer = document.createElement("span");
        spanContainer.appendChild(currentDrag().children[0].cloneNode(true));
        currentDrag().appendChild(spanContainer);
        console.log(currentDrag().children[1]);
        currentDrag().children[1].id = null;
        currentDrag().children[1].children[0].classList.remove('current-drag');
        currentDrag().children[1].style.display = 'block';
        currentDrag().children[0].style.position = 'absolute';
        // (currentDrag().children[1].children[0] as HTMLElement).id = null;
        // (currentDrag().children[1].children[0] as HTMLElement).style = ;/
        illusionCreated = true;
    }
    var y = (parseFloat(exerciseBar.getAttribute('data-y')) || 0) + event.dy;
    exerciseBar.style.transform = 'translate(0px, ' + y + 'px)';
    exerciseBar.setAttribute('data-y', y);
    exerciseBar.setAttribute('data-x', '0');
}
function drageEndListener(event) {
    var target = event.target;
    var exerciseBar = target.parentElement.parentElement;
    exerciseBar.classList.add('duration-300');
    z20(exerciseBar);
    // currentDrag().style.marginBottom = null;
    target.classList.remove('current-drag');
    exerciseBar.style.transform = 'translate(0px, 0px)';
    exerciseBar.setAttribute('data-y', '0');
    exerciseBar.setAttribute('data-x', '0');
}
var dragMode;
var loopThroughExercisesUp = function (barIndex, dropzoneIndex, marginHeight) {
    if (marginHeight === void 0) { marginHeight = 0; }
    var recallFunc = false;
    var actualMarginHeight = dropzoneIndex > barIndex ? 0 : marginHeight;
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
var loopThroughExercisesDown = function (barIndex, dropzoneIndex, marginHeight) {
    if (marginHeight === void 0) { marginHeight = 0; }
    var recallFunc = false;
    var actualMarginHeight = dropzoneIndex - 1 < barIndex ? 0 : -marginHeight;
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
            var currentDragId = parseFloat(currentDrag().id.split('-')[1]);
            var dropzoneId = parseFloat(event.target.id.split('-')[2]);
            loopThroughExercisesUp(currentDragId, dropzoneId, currentDrag().clientHeight);
            loopThroughExercisesDown(currentDragId, dropzoneId, currentDrag().clientHeight);
            dragMode = dropzoneId > currentDragId ? 'down' : 'up';
            opacity50(event);
            // console.log('ondragenter');
        }
    },
    ondragleave: function (event) {
        if (dropzoneAccepted(event)) {
            var currentDragId = parseFloat(currentDrag().id.split('-')[1]);
            var dropzoneId = parseFloat(event.target.id.split('-')[2]);
            loopThroughExercisesUp(currentDragId, dropzoneId);
            loopThroughExercisesDown(currentDragId, dropzoneId);
            opacity100(event);
            // console.log('ondragleave');
        }
    },
    ondrop: function (event) {
        if (dropzoneAccepted(event) || isCurrentElementBeingCloned) {
            // Get required data
            var currentDragElement = currentDrag();
            var currentDragId = parseFloat(currentDragElement.id.split('-')[1]);
            var dropzoneId = parseFloat(event.target.id.split('-')[2]);
            // Set the new index and translate value
            var newIndex = dragMode == 'up' ? dropzoneId : dropzoneId - 1;
            var newTranslateIndex = Math.abs(newIndex - currentDragId);
            var sign = dragMode == 'up' ? -1 : 1;
            var newTranslateValue = sign * (newTranslateIndex * currentDragElement.clientHeight);
            // Do a nice little animation
            currentDragElement.classList.add('duration-300');
            currentDragElement.style.transform = 'translate(0px, ' + newTranslateValue + 'px)';
            currentDragElement.setAttribute('data-y', newTranslateValue.toString());
            currentDragElement.setAttribute('data-x', '0');
            // Re-render the exercises
            var arr = __spreadArray([], currentWorkout.exercises, true);
            arrayMove(arr, currentDragId, newIndex);
            // If the element is being clone, add a clone in the array
            if (isCurrentElementBeingCloned)
                arr.splice(currentDragId <= newIndex ? currentDragId : newIndex + 2, 0, arr[newIndex]);
            Workout.updateExercisesPosition(currentWorkoutIndex, arr);
            // No animation if it is a clone operation
            setTimeout(renderExercisesHTML, isCurrentElementBeingCloned ? 0 : 100);
            // Set back options
            isCurrentElementBeingCloned = false;
            illusionCreated = false;
        }
    },
});
