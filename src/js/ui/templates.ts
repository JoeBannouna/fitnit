import { ExercisesType, WorkoutType } from '../global';

export function exerciseBar(exercise: ExercisesType, index: number) {
  return `<div class="duration-300 relative" id="exercise-${index}">
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
              <button class="workout-gear-button bg-white mx-0 my-3 px-4 py-3 shadow flex text-blue-500 items-center" onclick="UI.loadWorkout('${index}')">
                <strong class="mr-2 text-lg self-center">${exercise.amount}</strong>
              </button>
              <button class="workout-gear-button bg-white mx-3 my-3 px-4 py-3 rounded-r-lg ml-0 shadow flex text-gray-500 items-center">
                <span class="ml-auto text-lg"><i class="fas fa-cog duration-300"></i></span>
              </button>
            </div>
          </div>
          <div><div class="dropzone h-px w-full" id="exercise-dropzone-${index + 1}"></div></div>`;
}

export function workoutBar(workout: WorkoutType, index: number) {
  return `<div class="flex workout">
            <button class="bg-white mx-6 my-3 px-4 py-3 rounded-l-lg mr-0 shadow flex w-full text-left" onclick="UI.selectWorkout('${index}')">
              <strong class="mr-2 text-lg self-center">${index + 1}</strong> <span class="text-sm my-auto">${workout.name}</span>
            </button>
            <button class="workout-gear-button bg-white mx-6 my-3 px-4 py-3 rounded-r-lg ml-0 shadow flex text-gray-500 items-center" onclick="UI.loadWorkout('${index}')">
              <span class="ml-auto text-lg"><i class="fas fa-cog duration-300"></i></span>
            </button>
          </div>`;
}

function defaultModal() {
  return `<div
            class="fixed z-20 inset-0 overflow-y-auto ease-out duration-300 hidden opacity-0"
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
                  <button type="button" class=" mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="UI.ANIMATIONS.hideModal(document.getElementById('thismodal'))">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>`;
}
