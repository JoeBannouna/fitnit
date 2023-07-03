import { UPLOAD_EXERCISE_IMAGE_URL } from '../global';
function hideUploadedImage() {
    var dropzone = document.getElementById('exerciseImageDropzone');
    var imageContainer = document.getElementById('exercise-uploaded-image-container');
    imageContainer.classList.add('hidden');
    dropzone.classList.remove('hidden');
}
function showUploadedImage(imgElement) {
    var dropzone = document.getElementById('exerciseImageDropzone');
    var imageContainer = document.getElementById('exercise-uploaded-image-container');
    imgElement.classList.add('rounded');
    imgElement.classList.add('w-full');
    /* html */
    imageContainer.innerHTML = "<div class=\"w-full text-right h-0\">\n      <button class=\"relative m-1.5 rounded-full bg-white w-7 h-7\" id=\"hide-uploaded-image-button\">\n        <i class=\"fas fa-times\"></i>\n      </button>\n    </div>";
    var hideImageButton = document.getElementById('hide-uploaded-image-button');
    hideImageButton.onclick = hideUploadedImage;
    imageContainer.appendChild(imgElement);
    dropzone.classList.add('hidden');
    imageContainer.classList.remove('hidden');
}
function updateProgressBar(percent) {
    var progressBarContainer = document.getElementById('uploaded-image-progress-bar');
    var progressBar = progressBarContainer.children[1];
    if (percent == 100) {
        progressBarContainer.classList.add('hidden');
    }
    else {
        progressBarContainer.classList.remove('hidden');
        progressBar.style.width = percent + '%';
    }
    console.log(percent);
}
function readAndUploadFile(file) {
    // Show image
    var img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    showUploadedImage(img);
    // Upload image
    if (file.type.match(/image.*/)) {
        var rawBinaryStringReader = new FileReader();
        rawBinaryStringReader.onload = function (e2) {
            $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function (e3) {
                        if (e3.lengthComputable) {
                            var percentComplete = e3.loaded / e3.total;
                            percentComplete = Math.round(percentComplete * 100);
                            updateProgressBar(percentComplete);
                        }
                    }, false);
                    return xhr;
                },
                url: UPLOAD_EXERCISE_IMAGE_URL,
                type: 'POST',
                data: e2.target.result,
                contentType: 'application/octet-stream',
                success: function (result) {
                    console.log(result);
                },
            });
        };
        rawBinaryStringReader.readAsBinaryString(file);
    }
}
function uploadFile(data, url, callback) {
    if (callback === void 0) { callback = function () { }; }
    $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', function (e3) {
                if (e3.lengthComputable) {
                    var percentComplete = e3.loaded / e3.total;
                    percentComplete = Math.round(percentComplete * 100);
                    updateProgressBar(percentComplete);
                }
            }, false);
            return xhr;
        },
        url: url,
        type: 'POST',
        data: data,
        contentType: 'application/octet-stream',
        success: callback,
    });
}
export function exerciseImageDropzoneUpload() {
    var dropzone = document.getElementById('exerciseImageDropzone');
    var dropzoneInput = document.getElementById('exerciseImageDropzoneInput');
    // Optional. Show the copy icon when dragging over. Seems to only work for chrome.
    dropzone.addEventListener('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    // Get file data on drop
    dropzone.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        readAndUploadFile(file);
    });
    // Input change
    dropzoneInput.onchange = function () { return readAndUploadFile(dropzoneInput.files[0]); };
}
