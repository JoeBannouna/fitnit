var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { loggedIn, workouts } from '../global';
import StorageWrapper from './StorageWrapper';
// Workout class connects UI to backend (database or localStorage)
var Workout = /** @class */ (function () {
    function Workout(workout) {
        // Save the workout to backend or localStorage
        // Return workout object to UI so it could be updated to the local state
        if (loggedIn) {
        }
        else {
            if (StorageWrapper.createWorkout(workout)) {
                workouts.push(workout);
            }
        }
    }
    Workout.updateExercisesPosition = function (index, exercises) {
        if (loggedIn) {
        }
        else {
            if (StorageWrapper.updateExercises(index, exercises)) {
                workouts[index].exercises = exercises;
            }
        }
    };
    Workout.checkIfIdExists = function (id) {
        // If logged in, make a database request
        // If not, check localStorage
    };
    Workout.editName = function (index, name) {
        // Check if user is logged in
        // If yes, save it in database
        // If no, save it in localStorage
        if (loggedIn) {
        }
        else {
            if (StorageWrapper.updateWorkout(index, __assign(__assign({}, workouts[index]), { name: name }))) {
                workouts[index].name = name;
            }
        }
    };
    Workout.editRest = function (index, rest) {
        // Check if user is logged in
        // If yes, save it in database
        // If no, save it in localStorage
        if (loggedIn) {
        }
        else {
            if (StorageWrapper.updateWorkout(index, __assign(__assign({}, workouts[index]), { rest: rest }))) {
                workouts[index].rest = rest;
            }
        }
    };
    Workout.moveExercise = function (workoutId, exerciseId, newIndex) {
        // Change position of both exercises in database / localStorage
        return true;
    };
    Workout.delete = function (index) {
        if (loggedIn) {
        }
        else {
            if (StorageWrapper.deleteWorkout(index)) {
                workouts.splice(index, 1);
            }
        }
    };
    return Workout;
}());
export default Workout;
