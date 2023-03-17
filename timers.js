/* Timer - Toggle Timer Type */
const timerOptions = ['pomodoro', 'short break', 'long break'];

/* Timer - Timer Status */
let timerStatus = document.querySelector('.current-status');
const statusOptions = ['pause', 'start', 'restart'];
let currentStatus = statusOptions[0];

// console.log(currentStatus);
timerStatus.addEventListener('click', function () {
  // console.log(currentStatus);
  currentStatus =
    currentStatus == 'pause'
      ? statusOptions[1]
      : currentStatus == 'start'
      ? statusOptions[2]
      : currentStatus == 'restart'
      ? statusOptions[0]
      : false;
  timerStatus.innerHTML = currentStatus;
});


/* Timer - Progress Ring Display */
let timerDuration = 10;
let timeElapsed = 0;
let timeRemaining = timerDuration;
let timerProgress = Math.floor((timeRemaining / timerDuration) * 100);

/* Timer - Current Time */
let currentTime = document.getElementById('current-time');
let minutes = Math.floor(timeRemaining / 60);
let seconds = timeRemaining % 60;

function countdown() {
  let startCountDown = () => {
    timeElapsed = timeRemaining > 0 ? timeElapsed + 1: timeElapsed;
    timeRemaining = timeRemaining > 0 ? timerDuration - timeElapsed : 0;
    timerProgress = timerProgress > 0 ? Math.floor((timeRemaining / timerDuration) * 100) : 0;
    minutes = Math.floor(timeRemaining / 60);
    seconds = timeRemaining % 60;
    currentTime.innerHTML = `${minutes}:${seconds}`;

if (timeRemaining === 0) {
      clearInterval(count);
    }    
    console.log(timeElapsed, timeRemaining, timerProgress);
  };

   const count = setInterval(startCountDown, 1000, timeElapsed, timeRemaining, timerProgress);
}

countdown();
// console.log(
//   timeRemaining,
//   timerDuration,
//   Math.floor((timeRemaining / timerDuration) * 100)
// );

window.onload = () => {
  timerStatus.innerHTML = currentStatus;
  currentTime.innerHTML = `${minutes}:${seconds}`;
};
