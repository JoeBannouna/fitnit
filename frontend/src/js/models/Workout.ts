import { ExerciseType, WorkoutType } from '../types';

import { loggedIn, workouts } from '../global';
import StorageWrapper from './StorageWrapper';

// Workout class connects UI to backend (database or localStorage)
class Workout {
  constructor(workout: WorkoutType) {
    // Save the workout to backend or localStorage
    // Return workout object to UI so it could be updated to the local state

    if (loggedIn) {
    } else {
      if (StorageWrapper.createWorkout(workout)) {
        workouts.push(workout);
      }
    }
  }

  static updateExercisesPosition(index: number, exercises: ExerciseType[]) {
    if (loggedIn) {
    } else {
      if (StorageWrapper.updateExercises(index, exercises)) {
        workouts[index].exercises = exercises;
      }
    }
  }

  static checkIfIdExists(id: string) {
    // If logged in, make a database request
    // If not, check localStorage
  }

  static editName(index: number, name: string) {
    // Check if user is logged in
    // If yes, save it in database
    // If no, save it in localStorage

    if (loggedIn) {
    } else {
      if (StorageWrapper.updateWorkout(index, { ...workouts[index], name })) {
        workouts[index].name = name;
      }
    }
  }

  static editRest(index: number, rest: number) {
    // Check if user is logged in
    // If yes, save it in database
    // If no, save it in localStorage

    if (loggedIn) {
    } else {
      if (StorageWrapper.updateWorkout(index, { ...workouts[index], rest })) {
        workouts[index].rest = rest;
      }
    }
  }

  static moveExercise(workoutId: WorkoutType['id'], exerciseId: ExerciseType['id'], newIndex: number) {
    // Change position of both exercises in database / localStorage
    return true;
  }

  static delete(index: number) {
    if (loggedIn) {
    } else {
      if (StorageWrapper.deleteWorkout(index)) {
        workouts.splice(index, 1);
      }
    }
  }
}

export default Workout;
