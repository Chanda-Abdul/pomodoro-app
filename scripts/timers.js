const timer = {
  /* Timer Data */
  settings: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 30,
    pomodorosRemainingUntilLongBreak: 4,
    numberOfPomodoros: 4,
  },
  currentTimer: 'pomodoro' || 'shortBreak' || 'longBreak',

  status: {
    currentStatus: 'pause' || 'start' || 'restart' || 'default',
    nextStatus: 'pause' || 'start' || 'restart' || 'default',
  },
};

let remainingTime = {
  timerLength: timer.settings[timer.currentTimer] * 60,
  timeRemaining: timer.settings[timer.currentTimer] * 60,
  minutes: timer.settings[timer.currentTimer],
  seconds: 0,
  progressPercentage: 1,
};

/* Timer - Slider/Toggle Timer Type */
const timerOptions = document.querySelectorAll('input[name="timer-option"]');

timerOptions.forEach((timer) => {
  timer.addEventListener('change', handleTimerOption);
});

function handleTimerOption(e) {
  timer.currentTimer = e.target.value;
  updateTimerOption();
}

function updateTimerOption() {
  timerOptions.forEach((timerOpt) => {
    timer.currentTimer === timerOpt.value
      ? (timerOpt.checked = true)
      : (timerOpt.checked = false);
  });

  updateRemainingTime();
}

/* Set Interval, Update Timer & Status */
let interval;

function updateRemainingTime() {
  remainingTime = {
    timerLength: timer.settings[timer.currentTimer] * 60,
    timeRemaining: timer.settings[timer.currentTimer] * 60,
    minutes: timer.settings[timer.currentTimer],
    seconds: 0,
    progressPercentage: 1,
  };

  updateTimerStatus('default', 'start');
  clearAndUpdate();
}

function startTimer() {
  updateTimerStatus('start', 'pause');

  const endTime = Date.parse(new Date()) + remainingTime.timeRemaining * 1000;

  interval = setInterval(() => {
    let timeRemaining = Math.round((endTime - Date.now()) / 1000);
    remainingTime.timeRemaining = timeRemaining--;
    remainingTime.minutes = Math.floor(timeRemaining / 60);
    remainingTime.seconds = timeRemaining % 60;
    remainingTime.progressPercentage =
      remainingTime.timeRemaining / remainingTime.timerLength;

    updateTimerUI();

    if (timeRemaining <= 0) {
      resetTimer();
    }
  }, 1000);
}

function resetTimer() {
  const adjust = (decreaseOrReset) => {
    if (decreaseOrReset === 'decrease') {
      timer.settings.pomodorosRemainingUntilLongBreak--;
      timer.currentTimer = 'shortBreak';
    }
    if (decreaseOrReset === 'reset') {
      timer.settings.pomodorosRemainingUntilLongBreak =
        timer.settings.numberOfPomodoros;
      timer.currentTimer = 'longBreak';
    }
  };
  let p = timer.settings.pomodorosRemainingUntilLongBreak;

  if (timer.currentTimer === 'pomodoro') {
    p > 0 ? adjust('decrease') : adjust('reset');
  } else if (timer.currentTimer === 'shortBreak') {
    timer.currentTimer = 'pomodoro';
  } else {
    timer.currentTimer = 'longBreak';
  }
  updateTimerOption();
  startTimer();
}

function updateTimerStatus(current, next) {
  timer.status.currentStatus = current;
  timer.status.nextStatus = next;
  current === 'pause'
    ? clearAndUpdate()
    : current === 'restart'
    ? startAndUpdate()
    : null;
}

function clearAndUpdate() {
  clearInterval(interval);
  updateTimerUI();
}

function startAndUpdate() {
  startTimer();
  updateTimerUI();
}

document.addEventListener('DOMContentLoaded', () => {
  /* Set Initial Timer Status  */
  updateTimerOption('pomodoro');
  timerOptions.forEach((option) =>
    option.addEventListener('change', handleTimerOption)
  );
});

let timerStatus = document.querySelector('.timer__current-status');

function updateStatus() {
  timer.status.currentStatus === 'default'
    ? startTimer()
    : timer.status.currentStatus === 'start'
    ? updateTimerStatus('pause', 'restart')
    : timer.status.currentStatus === 'pause'
    ? startTimer()
    : updateTimerStatus('restart', 'pause');
}

timerStatus.addEventListener('change', updateStatus);

function updateTimerUI() {
  /* Set Visual */
  let visual = document.getElementById('visual');
  let pomsRemaining = '<span>🍅</span>'.repeat(
    timer.settings.pomodorosRemainingUntilLongBreak
  );
  visual.innerHTML = pomsRemaining;

  /* Set Timer */
  let currentTime = document.getElementById('current-time');
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  currentTime.innerHTML = `${minutes}:${seconds}`;
  timerStatus.innerHTML = timer.status.nextStatus;
  setProgress();
}

/* Timer - Progress Ring Display */
const circle = document.querySelector('circle');

const radius = circle.r.baseVal.value;

const circumference = radius * 2 * Math.PI;
circle.style.strokeDasharray = `${
  circumference * (1 + 0.99)
}  ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress() {
  circle.style.strokeDasharray = `${
    circumference * (1 + remainingTime.progressPercentage)
  }  ${circumference}`;
}
