function loggedInExerciseImageUploadSection() {
  return (
    /* html */
    `<span>
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
    </span>`
  );
}

function loggedOffExerciseImageUploadSection() {
  return (
    /* html */
    `<span>
      <div class="myLabel">
        <div class="border-dashed border-2 border-gray-400 bg-blue-50 p-6 text-center rounded">
          <div class="text-gray-700 text-8xl my-8"><i class="fas fa-file-upload"></i></div>
          <div class="text-gray-700 text-lg font-bold mt-4">Sign in to upload images for exercises</div>
          <!--div>Upload an image or GIF file for exercise</div-->
          <div>(Maximum file size is 5 MB)</div>
        </div>
      </div>
    </span>`
  );
}

export default function exerciseImageUploadSection(loggedInImageUploadSecion: boolean) {
  return loggedInImageUploadSecion ? loggedInExerciseImageUploadSection() : loggedOffExerciseImageUploadSection();
}
