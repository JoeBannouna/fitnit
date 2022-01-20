import { ExerciseType, WorkoutType } from '../types';

export function exerciseBar(exercise: ExerciseType, index: number) {
  return (
    /* html */
    `<div class="duration-300 relative" id="exercise-${index}">
      <div class="flex exercise bg-transparent z-20 translate-y-0 duration-300 touch-none select-none relative" id="${exercise.id}">
        <div class="flex flex-col justify-center">
          <button class="mx-4 text-2xl text-gray-700 upper-arrow-button scale-x-105 cursor-move outline-none h-full draggable yes-drop">
            <i class="fas fa-bars"></i>
          </button>
        </div>
        <div class="bg-white my-3 px-4 py-3 rounded-l-lg mr-0 shadow flex w-full text-left overflow-x-auto">
          <!--strong class="mr-2 text-lg self-center">${index + 1}</strong-->
          <!--span class="text-sm my-auto whitespace-nowrap">${exercise.name}</span-->
          <input class="text-sm w-full outline-none select-none" value="${exercise.name}" readonly>
        </div>
        <button class="workout-gear-button bg-white mx-0 my-3 px-4 py-3 shadow flex text-blue-500 items-center" onclick="">
          <strong class="mr-2 text-lg self-center">${exercise.amount}</strong>
        </button>
        <button 
          class="workout-gear-button bg-white mx-3 my-3 px-4 py-3 rounded-r-lg ml-0 shadow flex text-gray-500 items-center"
          onclick="UI.showExerciseModal(${index})"
        >
          <span class="ml-auto text-lg"><i class="fas fa-cog duration-300"></i></span>
        </button>
      </div>
    </div>
    <div><div class="dropzone h-px w-full" id="exercise-dropzone-${index + 1}"></div></div>`
  );
}

export function workoutBar(workout: WorkoutType, index: number) {
  return (
    /* html */
    `<div class="flex workout">
      <button class="bg-white mx-6 my-3 px-4 py-3 rounded-l-lg mr-0 shadow flex w-full text-left" onclick="UI.selectWorkout('${index}')">
        <strong class="mr-2 text-lg self-center">${index + 1}</strong> <span class="text-sm my-auto">${workout.name}</span>
      </button>
      <button class="workout-gear-button bg-white mx-6 my-3 px-4 py-3 rounded-r-lg ml-0 shadow flex text-gray-500 items-center" onclick="UI.loadWorkout('${index}')">
        <span class="ml-auto text-lg"><i class="fas fa-cog duration-300"></i></span>
      </button>
    </div>`
  );
}

export function defaultModal() {
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
        <div class="modal-rect inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Deactivate account</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Deactivate
            </button>
            <button type="button" class=" mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" id="modal-cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>`
  );
}

export function exerciseModal(index: number, exercise: ExerciseType) {
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
        <div class="modal-rect w-full inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div id="exercise-uploaded-image-container"></div>
            
            <label class="myLabel" id="exerciseImageDropzone">
              <div class="border-dashed border-2 border-gray-400 bg-blue-50 p-6 text-center rounded cursor-pointer">
                <div class="text-gray-700 text-8xl my-8"><i class="fas fa-file-upload"></i></div>
                <div class="text-gray-700 text-lg font-bold mt-4">Drag and drop or click here</div>
                <div>Upload an image or GIF file for exercise</div>
                <div>(Maximum file size is 5 MB)</div>
              </div>
              <input type="file" hidden id="exerciseImageDropzoneInput" />
            </label>

            <div class="mt-2 hidden" id="uploaded-image-progress-bar">
              <h3 class="text-md mb-1">Uploading...</h3>
              <div class="w-full h-2 rounded bg-gray-600">
                <div class="h-full bg-green-400 rounded duration-200"></div>
              </div>
            </div>

            <div class="flex h-24 mt-6 flex-col">
              <div class="text-center mr-3 h-full w-full">
                <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" id="modal-title" value="${
                  exercise.name
                }">
              </div>

              <div class="flex items-center justify-center h-full w-full mt-2 relative select-none bg-white">
                <div class="flex w-full h-12 text-black bg-white rounded-md border border-gray-300 shadow-sm px-2 py-1.5 edit-exercise-type">
                  <input 
                    type="number" 
                    value="${exercise.amount}" 
                    class="w-full outline-none p-1" 
                    onchange="this.value = this.value < 0 ? 0 : this.value"
                  >
                  <select class="bg-white w-full outline-none" onchange="UI.updateExerciseModalValues(event)">
                    <option ${exercise.type == 'TIMED' ? 'selected' : ''} value="TIMED">seconds</option>
                    <option ${exercise.type == 'REPS' ? 'selected' : ''} value="REPS">reps</option>
                    <option ${exercise.type == 'TIMED-REPS' ? 'selected' : ''} value="TIMED-REPS">timed reps</option>
                  </select>
                  <div class="bg-white h-full w-full">
                    <div class="timed-reps flex p-1${exercise.type == 'TIMED-REPS' ? '' : ' hidden'}">
                      <div>per</div>
                      <div class="flex mx-2">
                        <span id="inbetween-span">${exercise.type == 'TIMED-REPS' ? exercise.inbetween : '5'}</span>
                        <input hidden value="${exercise.type == 'TIMED-REPS' ? exercise.inbetween : '5'}" id="inbetween-input">
                      </div>
                      <div>seconds</div>
                      <div class="ml-2 flex flex-col">
                        <button class="h-3 w-4 p-0.5 bg-gray-300 outline-none mb-[1px]" onclick="UI.changeInbetween('up')">
                          <img src="/assets/icons/up.svg" class="h-full w-full">
                        </button>
                        <button class="h-3 w-4 p-0.5 bg-gray-300 outline-none mt-[1px]" onclick="UI.changeInbetween('down')">
                          <img src="/assets/icons/down.svg" class="h-full w-full">
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--div class="w-4 h-4 bg-white rounded inset-x-0 mx-auto absolute rotate-45 mt-[-1px]"></div-->
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 sm:px-6 text-right">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" id="modal-cancel-button">
              Cancel
            </button>
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm mt-3" onclick="UI.showDeleteExerciseAlert(${index})">
              Delete
            </button>
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mt-3">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>`
  );
}

export function newExerciseModal() {
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
        <div class="modal-rect w-full inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 class="text-lg text-center mb-4">New Exercise</h2>
            <div id="exercise-uploaded-image-container"></div>
            
            <label class="myLabel" id="exerciseImageDropzone">
              <div class="border-dashed border-2 border-gray-400 bg-blue-50 p-6 text-center rounded cursor-pointer">
                <div class="text-gray-700 text-8xl my-8"><i class="fas fa-file-upload"></i></div>
                <div class="text-gray-700 text-lg font-bold mt-4">Drag and drop or click here</div>
                <div>Upload an image or GIF file for exercise</div>
                <div>(Maximum file size is 5 MB)</div>
              </div>
              <input type="file" hidden id="exerciseImageDropzoneInput" />
            </label>

            <div class="mt-2 hidden" id="uploaded-image-progress-bar">
              <h3 class="text-md mb-1">Uploading...</h3>
              <div class="w-full h-2 rounded bg-gray-600">
                <div class="h-full bg-green-400 rounded duration-200"></div>
              </div>
            </div>

            <div class="flex h-24 mt-6 flex-col">
              <div class="text-center mr-3 h-full w-full">
                <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" id="modal-title" placeholder="Exercise name">
              </div>

              <div class="flex items-center justify-center h-full w-full mt-2 relative select-none bg-white">
                <div class="flex w-full h-12 text-black bg-white rounded-md border border-gray-300 shadow-sm px-2 py-1.5 edit-exercise-type">
                  <input 
                    type="number" 
                    value="60" 
                    class="w-full outline-none p-1" 
                    onchange="this.value = this.value < 0 ? 0 : this.value"
                  >
                  <select class="bg-white w-full outline-none" onchange="UI.updateExerciseModalValues(event)">
                    <option value="TIMED">seconds</option>
                    <option value="REPS">reps</option>
                    <option value="TIMED-REPS">timed reps</option>
                  </select>
                  <div class="bg-white h-full w-full">
                    <div class="timed-reps flex p-1 hidden">
                      <div>per</div>
                      <div class="flex mx-2">
                        <span id="inbetween-span">5</span>
                        <input hidden value="5" id="inbetween-input">
                      </div>
                      <div>seconds</div>
                      <div class="ml-2 flex flex-col">
                        <button class="h-3 w-4 p-0.5 bg-gray-300 outline-none mb-[1px]" onclick="UI.changeInbetween('up')">
                          <img src="/assets/icons/up.svg" class="h-full w-full">
                        </button>
                        <button class="h-3 w-4 p-0.5 bg-gray-300 outline-none mt-[1px]" onclick="UI.changeInbetween('down')">
                          <img src="/assets/icons/down.svg" class="h-full w-full">
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--div class="w-4 h-4 bg-white rounded inset-x-0 mx-auto absolute rotate-45 mt-[-1px]"></div-->
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 sm:px-6 text-right">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" id="modal-cancel-button">
              Cancel
            </button>
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mt-3">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>`
  );
}

export function newWorkoutModal() {
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
        <form class="modal-rect w-full inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" id="modal-rect">
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 class="text-lg text-center mb-4">Create New Workout</h2>
            
            <div class="flex mt-6 flex-col">
              <div class="text-center mr-3 h-full w-full">
                <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" id="workout-name" placeholder="Workout name" autocomplete="off">
              </div>
            </div>
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

export function deleteExerciseAlert(index: number) {
  return (
    /* html */
    `<div class="z-50 absolute inset-0 hidden duration-300 opacity-0 bg-[#3d3d3d50]">
      <div role="alert" class="absolute w-[calc(100%-1rem)] md:w-6/12 mt-2 mx-auto left-0 right-0 shadow-lg">
        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 flex">
          Delete exercise
          <button class="ml-auto alert-cancel-button">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="border rounded-b bg-red-100 px-4 py-3 text-red-700 text-right">
          <p class="text-center sm:text-left mb-2">Are you sure you want to delete this item?</p>
          <div class="flex">
            <button type="button" class="w-full mr-2 sm:mr-0 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:ml-auto sm:w-auto text-sm alert-cancel-button">
              Cancel
            </button>
            <button type="button" class="w-full ml-2 sm:ml-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto text-sm" onclick="UI.deleteExercise(this, ${index})">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>`
  );
}
