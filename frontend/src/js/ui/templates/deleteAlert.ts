export default function deleteAlert(title: string, msg: string, deleteFunction: string) {
  return (
    /* html */
    `<div class="z-50 fixed inset-0 hidden duration-300 opacity-0 bg-[#3d3d3d50]">
      <div role="alert" class="absolute w-[calc(100%-1rem)] md:w-6/12 mt-2 mx-auto left-0 right-0 shadow-lg">
        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 flex">
          ${title}
          <button class="ml-auto alert-cancel-button">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="border rounded-b bg-red-100 px-4 py-3 text-red-700 text-right">
          <p class="text-center sm:text-left mb-2">${msg}</p>
          <div class="flex">
            <button type="button" class="w-full mr-2 sm:mr-0 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:ml-auto sm:w-auto text-sm alert-cancel-button" id="alert-cancel-button">
              Cancel
            </button>
            <button type="button" class="w-full ml-2 sm:ml-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto text-sm" onclick="${deleteFunction}">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>`
  );
}