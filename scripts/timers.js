/* Timer - Toggle Timer Type */
/* TO-DO => toggle function */
const timerOptions = ['pomodoro', 'short break', 'long break'];

/* Timer - Progress Ring Display */
/* TO-DO => progress ring functionality */
let timerDuration = 75;
let timeElapsed = 0;
let timeRemaining = timerDuration;
let timerProgress = Math.floor((timeRemaining / timerDuration) * 100);
let count;

/* Timer - Timer Status */
let timerStatus = document.querySelector('.timer__current-status');
const statusOptions = ['pause', 'start', 'restart'];
let currentStatus = statusOptions[1];

/* Timer - Current Time */
let currentTime = document.getElementById('timer__current-time');
let minutes;
let seconds;

function updateTimerUI() {
  minutes = Math.floor(timeRemaining / 60);
  seconds = timeRemaining % 60;
  currentTime.innerHTML = `${minutes > 9 ? minutes : '0' + minutes}:${
    seconds > 9 ? seconds : '0' + seconds
  }`;
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
    setTimeout(updateTimerUI, 3000);
  }
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
