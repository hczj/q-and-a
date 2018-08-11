const el = document.documentElement;

document.fullscreenEnabled =
  document.fullscreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.mozFullScreenEnabled ||
  document.msFullscreenEnabled;

document.exitFullscreen =
  document.exitFullscreen ||
  document.webkitExitFullscreen ||
  document.mozCancelFullScreen ||
  document.msExitFullscreen;

el.requestFullscreen =
  el.requestFullscreen ||
  el.webkitRequestFullscreen ||
  el.mozRequestFullScreen ||
  el.msRequestFullScreen;

export default () => {
  if (document.fullscreenEnabled) {
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
      ? document.exitFullscreen()
      : el.requestFullscreen();
  }
};
