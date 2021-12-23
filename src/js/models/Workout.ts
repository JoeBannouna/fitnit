import { ExercisesType, WorkoutType } from '../global';

// Workout class connects UI to backend (database or localStorage)
class Workout {
  constructor(workout: WorkoutType) {
    // Save the workout to backend or localStorage
    // Return workout object to UI so it could be updated to the local state
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

  // This function is for local / logged off use only
  static newWorkoutIndexId() {
    if (localStorage.getItem('currentWorkoutIndex') == null) {
      localStorage.setItem('currentWorkoutIndex', '0');
      return 0;
    } else {
      const index = parseFloat(localStorage.getItem('currentWorkoutIndex')) + 1;
      localStorage.setItem('currentWorkoutIndex', index.toString());
      return index;
    }
  }

  static moveExercise(workoutId: WorkoutType['id'], exerciseId: ExercisesType['id'], newIndex: number) {
    // Change position of both exercises in database / localStorage
    return true;
  }
}

export default Workout;
