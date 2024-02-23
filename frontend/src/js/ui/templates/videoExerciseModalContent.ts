import { VideoExerciseType } from '../../types';

export default function videoExerciseModalContent(exercise: VideoExerciseType) {
  return (
    /* html */
    `<span class="block">
      <input value="video" hidden id="exerciseInputsType">

      <div class="flex flex-col">
        <div class="text-center w-full">
          <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" id="modal-title" placeholder="Exercise name" autocomplete="off" required maxlength="100" value="${
            exercise.name
          }">
        </div>
        
        <div class="text-center w-full mt-3">
          <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" id="video-url" placeholder="Youtube Video URL" required maxlength="100" value="${
            exercise.url
          }">
        </div>

        <div class="mt-3 w-full h-[200px] xs:h-[300px] sm:h-[300px] md:h-[300px]" id="player"></div>

        <div class="flex mt-3">
          <div class="w-1/3 text-center py-4">
            <input type="checkbox" id="customTimeCheckBox" ${exercise.period ? 'checked' : ''}>
            <div><label for="customTimeCheckBox" class="cursor-pointer">Time interval</label></div>
          </div>

          <div class="ml-4 video-seconds-input opacity-50">
            <label for="videoStartSeconds">Start (seconds)</label>
            <input class="p-2 border border-gray-400 rounded outline-none w-full" type="number" readonly value="${
              exercise.period ? exercise.period.startSeconds : '0'
            }" id="videoStartSeconds">
          </div>

          <div class="ml-4 video-seconds-input opacity-50">
            <label for="videoEndSeconds">End (seconds)</label>
            <input class="p-2 border border-gray-400 rounded outline-none w-full" type="number" readonly value="${
              exercise.period ? exercise.period.endSeconds : '10'
            }" id="videoEndSeconds">
          </div>
        </div>
      </div>
    </span>`
  );
}
