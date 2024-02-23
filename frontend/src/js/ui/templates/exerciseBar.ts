import { ExerciseType } from '../../types';

export default function exerciseBar(exercise: ExerciseType, index: number) {
  let exerciseUnit;

  if (exercise.type == 'REPS') exerciseUnit = 'text-orange-500';
  else if (exercise.type == 'TIMED') exerciseUnit = 'text-blue-500';
  else if (exercise.type == 'TIMED-REPS') exerciseUnit = 'text-lime-500';
  else if (exercise.type == 'VIDEO') exerciseUnit = 'text-red-600';

  return (
    /* html */
    `<div class="duration-300 relative" id="exercise-${index}">
        <div class="flex exercise bg-transparent z-20 translate-y-0 duration-300 relative" id="${exercise.id}">
          <div class="flex flex-col justify-center">
            <button class="mx-4 text-2xl text-gray-700 upper-arrow-button scale-x-105 cursor-move outline-none h-full touch-none select-none draggable yes-drop">
              <i class="fas fa-bars"></i>
            </button>
          </div>
          <div class="bg-white my-3 px-4 py-3 rounded-l-lg mr-0 shadow flex w-full text-left overflow-x-auto">
            <input class="text-sm w-full outline-none select-none" value="${exercise.name}" readonly>
          </div>
          <div class="bg-white mx-0 my-3 w-32 py-3 shadow flex justify-center items-center ${exerciseUnit}">
            <strong class="text-lg self-center">
              ${exercise.type == 'VIDEO' ? '<i class="fab fa-youtube"></i>' : exercise.amount}
            </strong>
          </div>
          <button class="workout-gear-button bg-white mx-3 my-3 px-4 py-3 rounded-r-lg ml-0 shadow flex text-gray-500 items-center" onclick="UI.showExerciseModal(${index})">
            <span class="ml-auto text-lg"><i class="fas fa-cog duration-300"></i></span>
          </button>
        </div>
      </div>
      <div>
      <div class="dropzone h-px w-full" id="exercise-dropzone-${index + 1}"></div>
    </div>`
  );
}