import { WorkoutType } from '../../types';

export default function workoutBar(workout: WorkoutType, index: number) {
  return (
    /* html */
    `<div class="flex workout">
      <button class="bg-white mx-6 my-3 px-4 py-3 rounded-l-lg mr-0 shadow flex w-full text-left" onclick="UI.selectWorkout(this, '${index}')">
        <strong class="mr-2 text-lg self-center">${index + 1}</strong> <span class="text-sm my-auto">${workout.name}</span>
      </button>
      <button class="workout-gear-button bg-white my-3 px-4 py-3 ml-0 shadow flex text-gray-500 items-center" onclick="UI.loadWorkout(this, '${index}')">
        <span class="ml-auto text-lg"><i class="fas fa-cog duration-300"></i></span>
      </button>
      <button class="bg-white mx-6 my-3 px-4 py-3 rounded-r-lg ml-0 shadow flex text-red-400 hover:text-red-600 items-center" onclick="UI.showDeleteWorkoutAlert('${index}')">
        <span class="ml-auto text-lg"><i class="far fa-trash-alt"></i></span>
      </button>
    </div>`
  );
}
