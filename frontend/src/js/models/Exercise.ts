import { loggedIn, workouts } from '../global';
import { ExerciseType } from '../types';
import StorageWrapper from './StorageWrapper';

// Exercise class connects UI to backend (database or localStorage)
class Exercise {
  constructor(workoutIndex: number, exercise: ExerciseType) {
    // Save the exercise to backend or localStorage
    // Return exercise object to UI so it could be updated to the local state

    if (loggedIn) {
    } else {
      if (StorageWrapper.addExercise(workoutIndex, exercise)) {
        workouts[workoutIndex].exercises.push(exercise);
      }
    }
  }

  static update(workoutIndex: number, index: number, exercise: ExerciseType) {
    if (loggedIn) {
    } else {
      if (StorageWrapper.updateExercise(workoutIndex, index, exercise)) {
        workouts[workoutIndex].exercises[index] = exercise;
      }
    }
  }

  static checkIfIdExists(id: string) {
    // If logged in, make a database request
    // If not, check localStorage
  }

  static delete(workoutIndex: number, index: number) {
    if (loggedIn) {
    } else {
      if (StorageWrapper.removeExercise(workoutIndex, index)) {
        workouts[workoutIndex].exercises.splice(index, 1);
      }
    }
  }
}

export default Exercise;
