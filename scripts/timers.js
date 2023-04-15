/* Timer Data */
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 30,
  pomodorosRemainingUntilLongBreak: 4,
  remainingTime: {
    timerLength: 25 * 60,
    timeRemaining: 25 * 60,
    minutes: 25,
    seconds: 0,
    progressPercentage: 0,
  },
  statusOptions: 'pause' || 'start' || 'restart',
  currentStatus: 'restart',
  nextStatus: 'start',
};

/* Timer - Toggle Timer Type */
let timerOptions = document.querySelectorAll('.slider__input');

for (let i = 0; i < timerOptions.length; i++) {
  timerOptions[i].addEventListener('change', handleTimerOption);
}

function handleTimerOption(e) {
  let option = e.target.value;
  updateTimerOption(option);
}

function updateTimerOption(option) {
  timer.option = option;

  timer.remainingTime = {
    timerLength: timer[option] * 60,
    timeRemaining: timer[option] * 60,
    minutes: timer[option],
    seconds: 0,
  };
  timer.currentStatus= 'restart';
  timer.nextStatus= 'start';

  updateTimerUI();
}

/* Timer - Current Time */
let currentTime = document.getElementById('current-time');

function updateTimerUI() {
  const { remainingTime } = timer;
  setProgress();
  // console.log(timer.remainingTime);
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  currentTime.innerHTML = `${minutes}:${seconds}`;
  timerStatus.innerHTML = timer.nextStatus;
}

/* Set Initial Timer Status  */
document.addEventListener('DOMContentLoaded', () => {
  updateTimerOption('pomodoro');
});

/* Timer Status */
let timerStatus = document.querySelector('.timer__current-status');

function updateStatus() {
  // console.log(timer.currentStatus);
  timer.nextStatus === 'start'
    ? startTimer()
    : timer.nextStatus === 'pause'
    ? pauseTimer()
    : restartTimer();
}

/* Set Interval, Update Timer & Status */
let interval;

function startTimer() {
  timer.currentStatus = 'start';
  timer.nextStatus = 'pause';

  // let { minutes, seconds, timeRemaining } = timer.remainingTime;
  const endTime =
    Date.parse(new Date()) + timer.remainingTime.timeRemaining * 1000;
  const currentTime = Date.parse(new Date());
  // console.log(endTime, currentTime);
  // console.log(endTime - currentTime);
  //  remainder = endTime - currentTime;

  let timeRemaining = Number.parseInt((endTime - currentTime) / 1000, 10);

  // time = timer.remainingTime.timeRemaining
  // console.log(timer.remainingTime);

  interval = setInterval(function () {
    timeRemaining--;
    timer.remainingTime.timeRemaining = timeRemaining;
    timer.remainingTime.minutes = Number.parseInt(
      (timeRemaining / 60) % 60,
      10
    );
    timer.remainingTime.seconds = Number.parseInt(timeRemaining % 60, 10);
    timer.remainingTime.progressPercentage =  timer.remainingTime.timeRemaining/timer.remainingTime.timerLength;

    updateTimerUI();
 

    if (timeRemaining <= 0) {
      timer.currentStatus = 'restart';
      timer.nextStatus = 'pause';
      clearInterval(interval);
    }
  }, 1000);
}

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = Number.parseInt(difference / 1000, 10);
  const minutes = Number.parseInt((total / 60) % 60, 10);
  const seconds = Number.parseInt(total % 60, 10);

  return {
    total,
    minutes,
    seconds,
  };
}

function pauseTimer() {
  timer.currentStatus = 'pause';
  timer.nextStatus = 'restart';
  clearInterval(interval);
  updateTimerUI();
}
function restartTimer() {
  timer.currentStatus = 'restart';
  timer.nextStatus = 'pause';
  startTimer();
  updateTimerUI();
}

/* Timer - Progress Ring Display */
const circle = document.querySelector('circle');

const radius = circle.r.baseVal.value;

const circumference = radius * 2 * Math.PI;
circle.style.strokeDasharray = `${circumference * (1 + .99)}  ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress() {
circle.style.strokeDasharray = `${circumference * (1 + timer.remainingTime.progressPercentage)}  ${circumference}`;
}



