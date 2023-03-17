/* Timer - Toggle Timer Type */
const timerOptions = ['pomodoro', 'short break', 'long break'];

/* Timer - Progress Ring Display */
let timerDuration = 10;
let timeElapsed = 0;
let timeRemaining = timerDuration;
let timerProgress = Math.floor((timeRemaining / timerDuration) * 100);
let count;

/* Timer - Timer Status */
let timerStatus = document.querySelector('.current-status');
const statusOptions = ['pause', 'start', 'restart'];
let currentStatus = null || statusOptions[1];

/* Timer - Current Time */
let currentTime = document.getElementById('current-time');
let minutes = Math.floor(timeRemaining / 60);
let seconds = timeRemaining % 60;

function updateTimerUI() {
  minutes = Math.floor(timeRemaining / 60);
  seconds = timeRemaining % 60;
  currentTime.innerHTML = `${minutes}:${seconds}`;
  timerStatus.innerHTML = currentStatus;
}

function pauseTimer() {
  currentStatus = statusOptions[2];
  clearInterval(count);
  updateTimerUI();
}

function startTimer() {
  currentStatus = statusOptions[0];
  timeElapsed = timeRemaining > 0 ? timeElapsed + 1 : timeElapsed;
  timeRemaining = timeRemaining > 0 ? timerDuration - timeElapsed : 0;
  timerProgress =
    timerProgress > 0 ? Math.floor((timeRemaining / timerDuration) * 100) : 0;
   updateTimerUI();
   
  if (timeRemaining === 0) {
    clearInterval(count);
    currentStatus = statusOptions[1];
    timeElapsed = 0;
    timeRemaining = timerDuration;
    timerProgress = Math.floor((timeRemaining / timerDuration) * 100);
    setTimeout(updateTimerUI, 3000)
    };
}

function restartTimer() {
  updateTimerUI();
  count = setInterval(
    startTimer,
    1000,
    timeElapsed,
    timeRemaining,
    timerProgress
  );
}

function updateStatus() {
  if (currentStatus === 'pause') pauseTimer();
  else restartTimer();
}

updateTimerUI();
