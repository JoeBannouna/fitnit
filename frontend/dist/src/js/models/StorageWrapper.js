var StorageWrapper = /** @class */ (function () {
    function StorageWrapper() {
    }
    StorageWrapper.fetchWorkoutsIndexes = function () {
        return JSON.parse(localStorage.getItem('workouts'));
    };
    StorageWrapper.updateWorkoutsIndexes = function (workoutIndexes) {
        localStorage.setItem('workouts', JSON.stringify(workoutIndexes));
        return true;
    };
    StorageWrapper.addWorkoutIndex = function (index) {
        var workoutsIndexArray = this.fetchWorkoutsIndexes();
        workoutsIndexArray.push(index);
        this.updateWorkoutsIndexes(workoutsIndexArray);
    };
    StorageWrapper.removeWorkoutIndex = function (index) {
        // Update workouts array
        var workoutsIndexArray = this.fetchWorkoutsIndexes();
        workoutsIndexArray.pop();
        this.updateWorkoutsIndexes(workoutsIndexArray);
        var i = index + 1;
        while (localStorage.getItem('workout-' + i) !== null) {
            this.updateKey('workout-' + i, 'workout-' + (i - 1));
            i++;
        }
    };
    StorageWrapper.fetchWorkouts = function () {
        var _this = this;
        return this.fetchWorkoutsIndexes().map(function (index) { return _this.fetchWorkout(index); });
    };
    StorageWrapper.fetchWorkoutString = function (index) {
        return localStorage.getItem('workout-' + index);
    };
    StorageWrapper.fetchWorkout = function (index) {
        return JSON.parse(this.fetchWorkoutString(index));
    };
    StorageWrapper.updateWorkout = function (index, workout) {
        localStorage.setItem('workout-' + index, JSON.stringify(workout));
        return true;
    };
    // Write workout bruteforce into localStorage (should only be used for Composer class for importing)
    StorageWrapper.writeWorkout = function (workoutJSON) {
        var workoutsIndexes = this.fetchWorkoutsIndexes();
        var index = workoutsIndexes.length !== 0 ? workoutsIndexes[workoutsIndexes.length - 1] + 1 : 0;
        this.addWorkoutIndex(index);
        localStorage.setItem('workout-' + index, workoutJSON);
    };
    StorageWrapper.createWorkout = function (workout) {
        var workoutsIndexes = this.fetchWorkoutsIndexes();
        var index = workoutsIndexes.length !== 0 ? workoutsIndexes[workoutsIndexes.length - 1] + 1 : 0;
        this.addWorkoutIndex(index);
        this.updateWorkout(index, workout);
        return true;
    };
    StorageWrapper.deleteWorkout = function (index) {
        localStorage.removeItem('workout-' + index);
        this.removeWorkoutIndex(index);
        return true;
    };
    StorageWrapper.addExercise = function (workoutIndex, exercise) {
        var workout = this.fetchWorkout(workoutIndex);
        workout.exercises.push(exercise);
        this.updateWorkout(workoutIndex, workout);
        return true;
    };
    StorageWrapper.removeExercise = function (workoutIndex, exerciseIndex) {
        var workout = this.fetchWorkout(workoutIndex);
        workout.exercises.splice(exerciseIndex, 1);
        this.updateWorkout(workoutIndex, workout);
        return true;
    };
    StorageWrapper.updateExercises = function (workoutIndex, exercises) {
        var workout = this.fetchWorkout(workoutIndex);
        workout.exercises = exercises;
        this.updateWorkout(workoutIndex, workout);
        return true;
    };
    StorageWrapper.updateExercise = function (workoutIndex, exerciseIndex, exercise) {
        var workout = this.fetchWorkout(workoutIndex);
        workout.exercises[exerciseIndex] = exercise;
        this.updateWorkout(workoutIndex, workout);
        return true;
    };
    StorageWrapper.checkLocalStorageVariable = function (localStorageString, defaultValue) {
        if (localStorage.getItem(localStorageString) == null) {
            localStorage.setItem(localStorageString, defaultValue);
        }
    };
    StorageWrapper.checkLocalStorageVariables = function () {
        this.checkLocalStorageVariable('workouts', '[]');
    };
    StorageWrapper.updateKey = function (oldKey, newKey) {
        localStorage.setItem(newKey, localStorage.getItem(oldKey));
        localStorage.removeItem(oldKey);
    };
    return StorageWrapper;
}());
export default StorageWrapper;
