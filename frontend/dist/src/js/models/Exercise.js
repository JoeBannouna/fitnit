import { loggedIn, workouts } from '../global';
import StorageWrapper from './StorageWrapper';
// Exercise class connects UI to backend (database or localStorage)
var Exercise = /** @class */ (function () {
    function Exercise(workoutIndex, exercise) {
        // Save the exercise to backend or localStorage
        // Return exercise object to UI so it could be updated to the local state
        if (loggedIn) {
        }
        else {
            if (StorageWrapper.addExercise(workoutIndex, exercise)) {
                workouts[workoutIndex].exercises.push(exercise);
            }
        }
    }
    Exercise.update = function (workoutIndex, index, exercise) {
        if (loggedIn) {
        }
        else {
            if (StorageWrapper.updateExercise(workoutIndex, index, exercise)) {
                workouts[workoutIndex].exercises[index] = exercise;
            }
        }
    };
    Exercise.checkIfIdExists = function (id) {
        // If logged in, make a database request
        // If not, check localStorage
    };
    Exercise.delete = function (workoutIndex, index) {
        if (loggedIn) {
        }
        else {
            if (StorageWrapper.removeExercise(workoutIndex, index)) {
                workouts[workoutIndex].exercises.splice(index, 1);
            }
        }
    };
    return Exercise;
}());
export default Exercise;
