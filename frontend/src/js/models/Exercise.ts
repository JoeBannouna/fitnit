import { ExerciseType } from '../types';

// Exercise class connects UI to backend (database or localStorage)
class Exercise {
  constructor(exercise: ExerciseType) {
    // Save the exercise to backend or localStorage
    // Return exercise object to UI so it could be updated to the local state
    exercise.id = Exercise.newExerciseIndexId().toString();
    return exercise;
  }

  static checkIfIdExists(id: string) {
    // If logged in, make a database request
    // If not, check localStorage
  }

  static editName(id: string, name: string) {
    // Check if user is logged in
    // If yes, save it in database
    // If no, save it in localStorage

    // Return true if changed, false if failed
    return true;
  }

  static delete(id: string) {
    return true;
  }

  // This function is for local / logged off use only
  static newExerciseIndexId() {
    if (localStorage.getItem('currentExerciseIndex') == null) {
      localStorage.setItem('currentExerciseIndex', '0');
      return 0;
    } else {
      const index = parseFloat(localStorage.getItem('currentExerciseIndex')) + 1;
      localStorage.setItem('currentExerciseIndex', index.toString());
      return index;
    }
  }
}

export default Exercise;
