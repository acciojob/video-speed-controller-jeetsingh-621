// Select elements
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const volume = document.querySelector('.volume');
const playbackSpeed = document.querySelector('.playbackSpeed');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

// Update play/pause button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip functionality
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update volume
function updateVolume() {
  video.volume = volume.value;
}

// Update playback speed
function updateSpeed() {
  video.playbackRate = playbackSpeed.value;
}

// Update progress bar
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
volume.addEventListener('input', updateVolume);
playbackSpeed.addEventListener('input', updateSpeed);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => e.buttons === 1 && scrub(e));
