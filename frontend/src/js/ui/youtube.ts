// Load youtube IFrame Player API code asynchronously
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';

const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Get video ID from youtube video URL
function youtube_parser(url: string) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

interface YTClassType {
  Player: Function,
  cueVideoById: Function
}

// Load IFrame player API
let playerObj: YTClassType;

export function onYouTubeIframeAPIReady(callback = () => {}) {
  // @ts-ignore
  playerObj = new YT.Player('player', {
    events: {
      onReady: callback,
    },
  });
}

// Load a video
export function loadVideoFromUrl(url: string) {
  playerObj.cueVideoById(youtube_parser(url));
}
