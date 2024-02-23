import { NormalExerciseType } from '../../types';
import exerciseImageUploadSection from './exerciseImageUploadSection';

export default function normalExerciseModalContent(exercise: NormalExerciseType, loggedInImageUploadSecion: boolean) {
  return (
    /* html */
    `<span>
      ${exerciseImageUploadSection(loggedInImageUploadSecion)}
      
      <input value="normal" hidden id="exerciseInputsType">

      <div class="flex h-24 mt-6 flex-col">
        <div class="text-center mr-3 h-full w-full">
          <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" id="modal-title" autocomplete="off" value="${
            exercise.name
          }" placeholder="Exercise name" required maxlength="100">
        </div>

        <div class="flex items-center justify-center h-full w-full mt-2 relative select-none bg-white">
          <div class="flex w-full h-12 text-black bg-white rounded-md border border-gray-300 shadow-sm px-2 py-1.5 edit-exercise-type">
            <input 
              type="number" 
              value="${exercise.amount}" 
              class="w-1/3 sm:w-full outline-none p-1" 
              onchange="this.value = this.value < 1 ? 1 : this.value"
              required
              id="exercise-amount"
            >
            <select class="bg-white w-full outline-none" onchange="UI.updateExerciseModalValues(event)" id="exercise-type">
              <option ${exercise.type == 'TIMED' ? 'selected' : ''} value="TIMED">seconds</option>
              <option ${exercise.type == 'REPS' ? 'selected' : ''} value="REPS">reps</option>
              <option ${exercise.type == 'TIMED-REPS' ? 'selected' : ''} value="TIMED-REPS">timed reps</option>
            </select>
            <div class="bg-white h-full w-full flex justify-center sm:block">
              <div class="timed-reps flex p-1${exercise.type == 'TIMED-REPS' ? '' : ' hidden'}">
                <div>per</div>
                <div class="flex mx-2">
                  <span id="inbetween-span">${exercise.type == 'TIMED-REPS' ? exercise.inbetween : '5'}</span>
                  <input hidden value="${exercise.type == 'TIMED-REPS' ? exercise.inbetween : '5'}" id="inbetween-input">
                </div>
                <div>secs</div>
                <div class="ml-2 flex flex-col">
                  <button type="button" class="h-3 w-4 p-0.5 bg-gray-300 outline-none mb-[1px]" onclick="UI.changeInbetween('up')">
                    <img src="/assets/icons/up.svg" class="h-full w-full">
                  </button>
                  <button type="button" class="h-3 w-4 p-0.5 bg-gray-300 outline-none mt-[1px]" onclick="UI.changeInbetween('down')">
                    <img src="/assets/icons/down.svg" class="h-full w-full">
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>`
  );
}
