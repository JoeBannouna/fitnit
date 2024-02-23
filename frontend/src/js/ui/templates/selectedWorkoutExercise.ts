import { ExerciseType } from '../../types';
import { getYoutubeVideoThumbnailUrl } from '../youtube';

export default function selectedWorkoutExercise(exercise: ExerciseType, index: number) {
  if (exercise.type == 'VIDEO') {
    return (
      /* html */
      `<button class="exercise-box px-4 py-4 box-border bg-gray-200 active:text-gray-400 outline-none drop-shadow shadow-blue-400 w-full duration-100 border-t border-gray-400 outline-none" id="exercise-box-${index}">
        <div class="mb-3 flex justify-center items-center">
          <div>${exercise.name}</div>
          <i class="text-red-600 text-2xl ml-2 fab fa-youtube"></i>
        </div>
        <img src="${getYoutubeVideoThumbnailUrl(exercise.url)}" class="w-full">
      </button>`
    );
  } else {
    return (
      /* html */
      `<button class="exercise-box px-4 py-4 box-border bg-gray-200 active:text-gray-400 outline-none drop-shadow shadow-blue-400 w-full duration-100 border-t border-gray-400" id="exercise-box-${index}">
        ${exercise.name}
      </button>`
    );
  }
}
