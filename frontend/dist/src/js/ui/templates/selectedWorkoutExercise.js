import { getYoutubeVideoThumbnailUrl } from '../youtube';
export default function selectedWorkoutExercise(exercise, index) {
    if (exercise.type == 'VIDEO') {
        return (
        /* html */
        "<button class=\"exercise-box px-4 py-4 box-border bg-gray-200 active:text-gray-400 outline-none drop-shadow shadow-blue-400 w-full duration-100 border-t border-gray-400 outline-none\" id=\"exercise-box-".concat(index, "\">\n        <div class=\"mb-3 flex justify-center items-center\">\n          <div>").concat(exercise.name, "</div>\n          <i class=\"text-red-600 text-2xl ml-2 fab fa-youtube\"></i>\n        </div>\n        <img src=\"").concat(getYoutubeVideoThumbnailUrl(exercise.url), "\" class=\"w-full\">\n      </button>"));
    }
    else {
        return (
        /* html */
        "<button class=\"exercise-box px-4 py-4 box-border bg-gray-200 active:text-gray-400 outline-none drop-shadow shadow-blue-400 w-full duration-100 border-t border-gray-400\" id=\"exercise-box-".concat(index, "\">\n        ").concat(exercise.name, "\n      </button>"));
    }
}
