import { ExerciseType, WorkoutType } from '../types';

class StorageWrapper {
  static fetchWorkoutsIndexes() {
    return JSON.parse(localStorage.getItem('workouts')) as number[];
  }

  static updateWorkoutsIndexes(workoutIndexes: number[]) {
    localStorage.setItem('workouts', JSON.stringify(workoutIndexes));
    return true;
  }

  static addWorkoutIndex(index: number) {
    const workoutsIndexArray = this.fetchWorkoutsIndexes();
    workoutsIndexArray.push(index);
    this.updateWorkoutsIndexes(workoutsIndexArray);
  }

  static removeWorkoutIndex(index: number) {
    // Update workouts array
    const workoutsIndexArray = this.fetchWorkoutsIndexes();
    workoutsIndexArray.pop();
    this.updateWorkoutsIndexes(workoutsIndexArray);

    let i = index + 1;
    while (localStorage.getItem('workout-' + i) !== null) {
      this.updateKey('workout-' + i, 'workout-' + (i - 1));
      i++;
    }
  }

  static fetchWorkouts() {
    return this.fetchWorkoutsIndexes().map(index => this.fetchWorkout(index));
  }

  static fetchWorkoutString(index: number) {
    return localStorage.getItem('workout-' + index);
  }

  static fetchWorkout(index: number) {
    return JSON.parse(this.fetchWorkoutString(index)) as WorkoutType;
  }

  static updateWorkout(index: number, workout: WorkoutType) {
    localStorage.setItem('workout-' + index, JSON.stringify(workout));
    return true;
  }

  // Write workout bruteforce into localStorage (should only be used for Composer class for importing)
  static writeWorkout(workoutJSON: string) {
    const workoutsIndexes = this.fetchWorkoutsIndexes();
    const index = workoutsIndexes.length !== 0 ? workoutsIndexes[workoutsIndexes.length - 1] + 1 : 0;
    this.addWorkoutIndex(index);

    localStorage.setItem('workout-' + index, workoutJSON);
  }

  static createWorkout(workout: WorkoutType) {
    const workoutsIndexes = this.fetchWorkoutsIndexes();
    const index = workoutsIndexes.length !== 0 ? workoutsIndexes[workoutsIndexes.length - 1] + 1 : 0;
    this.addWorkoutIndex(index);
    this.updateWorkout(index, workout);
    return true;
  }

  static deleteWorkout(index: number) {
    localStorage.removeItem('workout-' + index);
    this.removeWorkoutIndex(index);
    return true;
  }

  static addExercise(workoutIndex: number, exercise: ExerciseType) {
    const workout = this.fetchWorkout(workoutIndex);
    workout.exercises.push(exercise);
    this.updateWorkout(workoutIndex, workout);
    return true;
  }

  static removeExercise(workoutIndex: number, exerciseIndex: number) {
    const workout = this.fetchWorkout(workoutIndex);
    workout.exercises.splice(exerciseIndex, 1);
    this.updateWorkout(workoutIndex, workout);
    return true;
  }

  static updateExercises(workoutIndex: number, exercises: ExerciseType[]) {
    const workout = this.fetchWorkout(workoutIndex);
    workout.exercises = exercises;
    this.updateWorkout(workoutIndex, workout);
    return true;
  }

  static updateExercise(workoutIndex: number, exerciseIndex: number, exercise: ExerciseType) {
    const workout = this.fetchWorkout(workoutIndex);
    workout.exercises[exerciseIndex] = exercise;
    this.updateWorkout(workoutIndex, workout);
    return true;
  }

  private static checkLocalStorageVariable(localStorageString: string, defaultValue: string) {
    if (localStorage.getItem(localStorageString) == null) {
      localStorage.setItem(localStorageString, defaultValue);
    }
  }

  static checkLocalStorageVariables() {
    this.checkLocalStorageVariable('workouts', '[]');
  }

  static updateKey(oldKey: string, newKey: string) {
    localStorage.setItem(newKey, localStorage.getItem(oldKey));
    localStorage.removeItem(oldKey);
  }
}

export default StorageWrapper;
