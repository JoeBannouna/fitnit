import { ExercisesType, WorkoutType } from '../global';

export function exerciseBar(exercise: ExercisesType, index: number) {
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

export function exerciseModal(index: number, exercise: ExercisesType) {
  let exerciseUnit: string;
  if (exercise.type === 'REPS') {
    exerciseUnit = 'reps';
  } else if (exercise.type == 'TIMED') {
    exerciseUnit = 'seconds';
  } else if (exercise.type == 'TIMED-REPS') {
    exerciseUnit = 'reps per' + exercise.inbetween + 'seconds';
  }

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
              <div class="border-dashed border-2 border-gray-400 bg-blue-50 p-6 text-center rounded">
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

            <div class="flex h-12 mt-6">
              <div class="text-center mr-3 h-full w-2/3">
                <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-full" id="modal-title" value="${exercise.name}">
              </div>

              <div class="flex items-center justify-center h-full w-1/3 rounded-full bg-blue-500 text-white px-4 cursor-pointer shadow-lg">
                <strong class="exercise-amount">${exercise.amount}</strong>&nbsp;<span class="exercise-unit">${exerciseUnit}</span>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 sm:px-6 text-right">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" id="modal-cancel-button">
              Cancel
            </button>
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm mt-3" onclick="UI.showDeleteAlert(${index})">
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

export function deleteExerciseModal() {
  return (
    /* html */
    `<div role="alert" class="absolute z-50 w-[calc(100%-1rem)] md:w-6/12 mt-2 mx-auto left-0 right-0 shadow-lg">
      <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 flex">
        Delete exercise
        <button class="ml-auto">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="border rounded-b bg-red-100 px-4 py-3 text-red-700 text-right">
        <p class="text-center sm:text-left mb-2">Are you sure you want to delete this item?</p>
        <div class="flex">
          <button type="button" class="w-full mr-2 sm:mr-0 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:ml-auto sm:w-auto text-sm">
            Cancel
          </button>
          <button type="button" class="w-full ml-2 sm:ml-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto text-sm">
            Delete
          </button>
        </div>
      </div>
    </div>`
  );
}