import StorageWrapper from './models/StorageWrapper';
// State variables
export var loggedIn = false;
export var modifyLoggedIn = function (val) { return (loggedIn = val); };
export var currentWorkout;
export var currentWorkoutIndex;
export var modifyCurrentWorkout = function (index) {
    currentWorkoutIndex = index;
    currentWorkout = workouts[currentWorkoutIndex];
};
export var currentExercise;
export var currentExerciseIndex;
export var modifyCurrentExercise = function (index) {
    currentExerciseIndex = index;
    currentExercise = workouts[currentWorkoutIndex].exercises[currentExerciseIndex];
};
export var workouts;
if (loggedIn) {
}
else {
    // localStorage.clear();
    StorageWrapper.checkLocalStorageVariables();
    // StorageWrapper.createWorkout({
    //   exercises: [
    //     {
    //       amount: 40,
    //       name: 'Exercise 1',
    //       type: 'TIMED'
    //     },
    //     {
    //       amount: 40,
    //       name: 'Exercise 2',
    //       type: 'TIMED'
    //     },
    //     {
    //       amount: 40,
    //       name: 'Exercise 3',
    //       type: 'TIMED'
    //     },
    //     {
    //       amount: 40,
    //       name: 'Exercise 4',
    //       type: 'TIMED'
    //     },
    //   ],
    //   name: 'Test1',
    //   rest: 5,
    // });
    // StorageWrapper.createWorkout({
    //   exercises: [],
    //   name: 'Test2',
    //   rest: 5,
    // });
    // StorageWrapper.createWorkout({
    //   exercises: [],
    //   name: 'Test3',
    //   rest: 5,
    // });
    // StorageWrapper.deleteWorkout(1);
    // StorageWrapper.addExercise(1, {
    //   amount: 60,
    //   name: 'Push ups',
    //   type: 'TIMED',
    // });
    // console.log(StorageWrapper.fetchWorkouts());
    // Global variables
    workouts = StorageWrapper.fetchWorkouts();
}
// export const workouts: WorkoutType[] = [
//   {
//     id: 'wdubdbwk',
//     name: 'Upper-body workout',
//     rest: 10,
//     exercises: [
//       {
//         id: 'nwonso',
//         name: 'Push-ups',
//         type: 'REPS',
//         amount: 20,
//       },
//       {
//         id: 'nwonso',
//         name: 'Wide Push-ups',
//         type: 'TIMED-REPS',
//         amount: 20,
//         inbetween: 2,
//       },
//       {
//         id: 'wdniodn',
//         name: 'Arm circles',
//         type: 'TIMED',
//         amount: 60,
//       },
//     ],
//   },
//   {
//     id: 'e2hndo',
//     name: 'Lower-body workout',
//     rest: 5,
//     exercises: [
//       {
//         id: 'dwniod',
//         name: 'Squats',
//         type: 'REPS',
//         amount: 20,
//         inbetween: 2,
//       },
//       {
//         id: 'dwniud',
//         name: 'Leg raises',
//         type: 'TIMED',
//         amount: 60,
//       },
//       {
//         id: 'dwdwdw',
//         name: 'Cath raises',
//         type: 'REPS',
//         amount: 40,
//       },
//       {
//         id: 'downww',
//         name: 'Jumping squats',
//         type: 'REPS',
//         amount: 80,
//       },
//       {
//         id: 'uiwyei',
//         name: 'Lunges',
//         type: 'TIMED',
//         amount: 45,
//       },
//     ],
//   },
// ];
export var modifyWorkouts = function (val) { return (workouts = val); };
// Endpoint URLs
export var UPLOAD_EXERCISE_IMAGE_URL = 'http://127.0.0.1:3000/';
