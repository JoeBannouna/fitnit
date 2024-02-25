export default function shareWorkoutModal(link: string) {
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
        <div class="modal-rect w-full inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" id="modal-rect">
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 class="text-lg text-center mb-4">Share Workout</h2>
            
            <div class="flex mt-6 flex-col">
              <div class="text-center mr-3 h-full w-full">
                <input class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 focus:outline-none w-full h-12" placeholder="Workout link" autocomplete="off" readonly value="${link}" id="shareLinkInput">
              </div>
            </div>
          </div>
          <div class="px-4 py-3 sm:px-6 text-right">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" id="modal-cancel-button">
              Back
            </button>
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mt-3" onclick="document.getElementById('shareLinkInput').select(); document.getElementById('shareLinkInput').setSelectionRange(0, 99999); navigator.clipboard.writeText(document.getElementById('shareLinkInput').value);">
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>`
  );
}
