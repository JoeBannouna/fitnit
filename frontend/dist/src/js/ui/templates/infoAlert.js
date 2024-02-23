export default function infoAlert(msg) {
    return (
    /* html */
    "<div class=\"z-50 absolute inset-0 hidden duration-300 opacity-0 bg-[#3d3d3d50]\">\n      <div role=\"alert\" class=\"absolute w-[calc(100%-1rem)] md:w-6/12 mt-2 mx-auto left-0 right-0 shadow-lg\">\n        <div class=\"bg-gray-700 flex flex-col sm:flex-row items-center text-white font-bold rounded px-2 py-2 sm:py-0\">\n          <div class=\"my-2 leading-5 text-center sm:text-left mr-4\">".concat(msg, "</div>\n          <button type=\"button\" class=\"w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 sm:ml-auto sm:w-auto text-sm my-2 alert-cancel-button\">\n            Dismiss\n          </button>\n        </div>\n      </div>\n    </div>"));
}
