// Load youtube IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// Get video ID from youtube video URL
export function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
}
// Load IFrame player API
var playerObj;
export function onYouTubeIframeAPIReady(callback) {
    if (callback === void 0) { callback = function () { }; }
    // @ts-ignore
    playerObj = new YT.Player('player', {
        events: {
            onReady: callback,
        },
    });
    return playerObj;
}
// Load a video
export function cueVideoFromUrl(url, seconds) {
    if (seconds === void 0) { seconds = false; }
    if (seconds)
        playerObj.cueVideoById({ videoId: youtube_parser(url), startSeconds: seconds.start, endSeconds: seconds.end });
    else
        playerObj.cueVideoById({ videoId: youtube_parser(url), startSeconds: 0 });
}
export function getYoutubeVideoThumbnailUrl(url) {
    var id = youtube_parser(url);
    return "https://img.youtube.com/vi/".concat(id, "/mqdefault.jpg");
}
