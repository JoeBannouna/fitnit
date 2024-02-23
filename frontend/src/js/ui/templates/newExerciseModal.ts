import exerciseImageUploadSection from './exerciseImageUploadSection';

export function normalExerciseInputs(loggedInImageUploadSecion: boolean) {
  return (
    /* html */
    `<span class="block">
      ${exerciseImageUploadSection(loggedInImageUploadSecion)}

      <input value="normal" hidden id="exerciseInputsType">

      <div class="flex h-24 mt-6 flex-col">
        <div class="text-center mr-3 h-full w-full">
          <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" id="modal-title" placeholder="Exercise name" autocomplete="off" required maxlength="100">
        </div>

        <div class="flex items-center justify-center h-full w-full mt-2 relative select-none bg-white">
          <div class="flex w-full h-12 text-black bg-white rounded-md border border-gray-300 shadow-sm px-2 py-1.5 edit-exercise-type">
            <input 
              type="number" 
              value="60" 
              class="w-1/3 sm:w-full outline-none p-1" 
              onchange="this.value = this.value < 1 ? 1 : this.value"
              required
              id="exercise-amount"
            >
            <select class="bg-white w-full outline-none" onchange="UI.updateExerciseModalValues(event)" id="exercise-type">
              <option value="TIMED">seconds</option>
              <option value="REPS">reps</option>
              <option value="TIMED-REPS">timed reps</option>
            </select>
            <div class="bg-white h-full w-full flex justify-center sm:block">
              <div class="timed-reps flex p-1 hidden">
                <div>per</div>
                <div class="flex mx-2">
                  <span id="inbetween-span">5</span>
                  <input hidden value="5" id="inbetween-input">
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

export function videoExerciseInputs() {
  return (
    /* html */
    `<span class="block">
      <input value="video" hidden id="exerciseInputsType">

      <div class="flex flex-col mt-6">
        <div class="text-center w-full">
          <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" id="modal-title" placeholder="Exercise name" autocomplete="off" required maxlength="100">
        </div>
        
        <div class="text-center w-full mt-3">
          <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" id="video-url" placeholder="Youtube Video URL" required maxlength="100">
        </div>

        <div class="mt-3 w-full h-[200px] xs:h-[300px] sm:h-[300px] md:h-[300px]" id="player"></div>

        <div class="flex mt-3">
          <div class="w-1/3 text-center py-4">
            <input type="checkbox" id="customTimeCheckBox">
            <div><label for="customTimeCheckBox" class="cursor-pointer">Time interval</label></div>
          </div>

          <div class="ml-4 video-seconds-input opacity-50">
            <label for="videoStartSeconds">Start (seconds)</label>
            <input class="p-2 border border-gray-400 rounded outline-none w-full" type="number" readonly value="0" id="videoStartSeconds">
          </div>

          <div class="ml-4 video-seconds-input opacity-50">
            <label for="videoEndSeconds">End (seconds)</label>
            <input class="p-2 border border-gray-400 rounded outline-none w-full" type="number" readonly value="10" id="videoEndSeconds">
          </div>
        </div>
      </div>
    </span>`
  );
}

export default function newExerciseModal(loggedInImageUploadSecion = false) {
  return (
    /* html */
    `<div
      class="fixed z-50 inset-0 overflow-y-auto ease-out duration-300 hidden opacity-0"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="modal-element"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <form class="modal-rect w-full inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" id="new-exercise-form">
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 class="text-lg text-center mb-4">New Exercise</h2>

            <input hidden value="0" id="exercise-index">

            <div class="flex justify-center items-center text-lg my-3" id="change-exercise-inputs-type">
              <button type="button" class="border-l rounded-l border-y border-gray-300 px-3 py-2 w-full md:w-2/5 disabled:bg-gray-200 exercise-inputs-type-toggle" disabled>
                Normal
              </button>
              <button type="button" class="border-r rounded-r border-y border-gray-300 px-3 py-2 w-full md:w-2/5 disabled:bg-gray-200 exercise-inputs-type-toggle">
                Video
              </button>
            </div>

            <span id="exerciseInputsTypeSection" class="block">
              ${normalExerciseInputs(loggedInImageUploadSecion)}
            <span>  
          </div>

          <div class="px-4 py-3 sm:px-6 text-right">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" id="modal-cancel-button">
              Cancel
            </button>
            <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mt-3">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>`
  );
}