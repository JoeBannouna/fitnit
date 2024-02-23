function loggedInExerciseImageUploadSection() {
    return (
    /* html */
    "<span>\n      <div id=\"exercise-uploaded-image-container\"></div>\n      \n      <label class=\"myLabel\" id=\"exerciseImageDropzone\">\n        <div class=\"border-dashed border-2 border-gray-400 bg-blue-50 p-6 text-center rounded cursor-pointer\">\n          <div class=\"text-gray-700 text-8xl my-8\"><i class=\"fas fa-file-upload\"></i></div>\n          <div class=\"text-gray-700 text-lg font-bold mt-4\">Drag and drop or click here</div>\n          <div>Upload an image or GIF file for exercise</div>\n          <div>(Maximum file size is 5 MB)</div>\n        </div>\n        <input type=\"file\" hidden id=\"exerciseImageDropzoneInput\" />\n      </label>\n\n      <div class=\"mt-2 hidden\" id=\"uploaded-image-progress-bar\">\n        <h3 class=\"text-md mb-1\">Uploading...</h3>\n        <div class=\"w-full h-2 rounded bg-gray-600\">\n          <div class=\"h-full bg-green-400 rounded duration-200\"></div>\n        </div>\n      </div>\n    </span>");
}
function loggedOffExerciseImageUploadSection() {
    return (
    /* html */
    "<span>\n      <div class=\"myLabel\">\n        <div class=\"border-dashed border-2 border-gray-400 bg-blue-50 p-6 text-center rounded\">\n          <div class=\"text-gray-700 text-8xl my-8\"><i class=\"fas fa-file-upload\"></i></div>\n          <div class=\"text-gray-700 text-lg font-bold mt-4\">Sign in to upload images for exercises</div>\n          <!--div>Upload an image or GIF file for exercise</div-->\n          <div>(Maximum file size is 5 MB)</div>\n        </div>\n      </div>\n    </span>");
}
export default function exerciseImageUploadSection(loggedInImageUploadSecion) {
    return loggedInImageUploadSecion ? loggedInExerciseImageUploadSection() : loggedOffExerciseImageUploadSection();
}
