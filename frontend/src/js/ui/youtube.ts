import { YTClassType } from '../types';

// Load youtube IFrame Player API code asynchronously
const tag = document.createElement('script');
tag.onload = () => window.dispatchEvent(new Event('ytLoaded'));
tag.src = 'https://www.youtube.com/iframe_api';

const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Get video ID from youtube video URL
export function youtube_parser(url: string) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
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

  return playerObj;
}

// Load a video
export function cueVideoFromUrl(url: string, seconds: { start: number; end: number } | false = false) {
  if (seconds) playerObj.cueVideoById({ videoId: youtube_parser(url), startSeconds: seconds.start, endSeconds: seconds.end });
  else playerObj.cueVideoById({ videoId: youtube_parser(url), startSeconds: 0 });
}

export function getYoutubeVideoThumbnailUrl(url: string) {
  const id = youtube_parser(url);
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}
