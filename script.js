"use strict";

// quotes //
const quotes = [
  "The successful warrior is the average man, with laser-like focus",
  "The key to success is to focus on goals, not obstacles.",
  "Focus on the step in front of you, not the whole staircase.",
  "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.",
  "Where focus goes, energy flows.",
  "Focus on what you can control, not what you can't.",
  "Distractions will always be there, but so will your ability to overcome them. Stay focused.",
  "The more you focus, the more you accomplish.",
  "Lack of direction, not lack of time, is the problem. We all have twenty-four hour days.",
  "Focus is the gateway to all thinking: perception, memory, learning, reasoning, problem-solving, and decision making.",
  "Your life is controlled by what you focus on.",
  "To do two things at once is to do neither.",
  "You will never reach your destination if you stop and throw stones at every dog that barks.",
  "The best way to get things done is to simply begin.",
  "Focus on being productive instead of busy.",
  "What you stay focused on will grow.",
  "Do not be embarrassed by your failures, learn from them and start again.",
  "It's not that I'm so smart, it's just that I stay with problems longer. - Albert Einstein",
  "Focus on the journey, not the destination. Joy is found not in finishing an activity but in doing it.",
  "Your time is limited, don't waste it living someone else's life.",
  "The successful man is the one who finds out what is the matter with his business before his competitors do.",
  "Success demands singleness of purpose.",
  "The more focused and refined your vibration, the more effortless and powerful your manifesting becomes.",
  "You can do anything as long as you have the passion, the drive, the focus, and the support.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The only thing worse than being blind is having sight but no vision.",
  "The best way to predict the future is to create it.",
  "Stay focused, go after your dreams and keep moving toward your goals.",
  "The successful mind is disciplined and focused on the long-term goals, not short-term gratifications.",
  "Focus on the process, not the outcome. The process is where you learn, grow, and become.",
  "To achieve greatness, start where you are, use what you have, and do what you can.",
  "The more you focus on the positive, the more positive results you will see.",
  "Focus is the foundation of all great achievements.",
  "Clarity comes from action, not thought. Get clear by doing.",
  "A clear vision, backed by definite plans, gives you a tremendous feeling of confidence and personal power.",
  "Don't be distracted by criticism. Remember, the only taste of success some people get is to take a bite out of you.",
  "Focus on your goals, not your fear. Focus like a laser beam on your goals.",
  "The secret to success is to know something nobody else knows.",
  "Focus on making yourself better, not on thinking that you are better.",
  "Your future is created by what you do today, not tomorrow.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Don't let the noise of others' opinions drown out your own inner voice.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Focus on what matters and let go of what doesn't.",
  "Success is not in what you have, but who you are.",
  "The journey of a thousand miles begins with one step.",
];
///// selection elements /////
const settingBtn = document.querySelector(".setting");
const date = document.querySelector(".date");
const pomodoro = document.querySelector(".pom");
const shortBreak = document.querySelector(".short");
const longBreak = document.querySelector(".long");
const timer = document.querySelector(".timer");
const startBtn = document.querySelector(".button");
const counter = document.querySelector(".counter");
const counterNumber = document.querySelector(".counterNumber");
const quotesGenerator = document.querySelector(".generator");
const body = document.querySelector("body");
const modesElements = [pomodoro, shortBreak, longBreak];

const durations = [25 * 60, 5 * 60, 60 * 60];
// const durations = [10, 20, 30];
let counters = [1, 1, 1];

// let pomColor = "#ea4242";
// let shortBreakColor = "#0077b6";
// let longBreakColor = "#023e8a";
let interval = 4;
let timerName;
let time = durations[0];
let startFlag = false;
let currentMode = pomodoro;
const modesElemnetsColors = ["#ea4242", "#0077b6", "#023e8a"];

//// handle Date ////
const options = {
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
const now = new Date();
date.textContent = new Intl.DateTimeFormat("en-GB", options).format(now);
setInterval(function () {
  const now = new Date();
  date.textContent = new Intl.DateTimeFormat("en-GB", options).format(now);
}, 1000);

// handle modes

const timerMaker = function (time) {
  const minutes = String(Math.trunc(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const quotesIndex = [0];
const quotesGeneratorFunc = function () {
  let index = Math.floor(Math.random() * quotes.length);

  if (quotesIndex.length === quotes.length) return 0;

  while (quotesIndex.includes(index)) {
    index = Math.floor(Math.random() * quotes.length);
  }
  quotesIndex.push(index);

  return index;
};

// just handle the timer first ///
timer.textContent = timerMaker(time);

const modesFunc = function (e, mode) {
  clearInterval(timerName);
  // console.log(e);
  let targetedElemnet;
  if (!mode) {
    targetedElemnet = e.target;
  } else {
    targetedElemnet = mode;
  }
  const indexOfElement = modesElements.indexOf(targetedElemnet);

  document.documentElement.style.setProperty(
    "--mainBackGroundColor",
    `${modesElemnetsColors[indexOfElement]}`
  );

  timer.textContent = timerMaker(durations[indexOfElement]);
  time = durations[indexOfElement];
  counterNumber.textContent = `#${counters[indexOfElement]}`;
  currentMode = modesElements[indexOfElement];

  const selected = document.querySelector(".selected");
  selected.classList.remove("selected");
  targetedElemnet.classList.add("selected");
};

modesElements.forEach(function (mode) {
  mode.addEventListener("click", modesFunc);
});

/// play audio function
const playAudioOfFinsih = function () {
  const audio = new Audio("clock-alarm-8761.mp3");
  audio.play();
};

const playAudioOfStart = function () {
  const audio = new Audio("click-button-140881.mp3");
  audio.play();
};
/// handle timer

const timerFunc = function (flag) {
  const tick = function () {
    timer.textContent = timerMaker(time);

    if (time === 0) {
      clearInterval(timerName);
      startBtn.style.height = currentHeight;
      startBtn.textContent = "Start";
      startFlag = !startFlag;
      playAudioOfFinsih();
      if (currentMode === pomodoro) {
        counters[0] += 1;
        quotesGenerator.textContent = `${quotes[quotesGeneratorFunc()]}`;
        if (counters[0] % interval === 0) {
          modesFunc(0, modesElements[2]);
        } else {
          modesFunc(0, modesElements[1]);
        }
      } else {
        counters[modesElements.indexOf(currentMode)] += 1;
        modesFunc(0, modesElements[0]);
      }
    }

    time--;
  };

  if (flag) {
    // tick();
    timerName = setInterval(tick, 1000);
  } else {
    clearInterval(timerName);
  }
};

// handle start and pause button

const currentHeight = getComputedStyle(startBtn).height;
startBtn.addEventListener("click", function () {
  startFlag = !startFlag;
  playAudioOfStart();
  if (startFlag) {
    startBtn.style.height = `${Number.parseFloat(currentHeight) - 10}px`;
    startBtn.textContent = "Pause";
  } else {
    startBtn.style.height = currentHeight;
    startBtn.textContent = "Start";
  }
  timerFunc(startFlag);
});

counterNumber.addEventListener("click", function () {
  const confirmVar = confirm("Do you want to refresh the pomodoro count?");
  if (confirmVar) {
    counters = [1, 1, 1];
    counter.textContent = `#1`;
  }
});

/// handle form
const formEl = document.getElementById("form");
const overlay = document.querySelector(".overlay");
const cancelBtn = document.querySelector(".cancel");
const changeBtn = document.querySelector(".change");
const inputsNum = document.querySelectorAll('input[type="number"]');
const intervalInput = inputsNum[3];
const inputsColors = document.querySelectorAll('input[type="color"]');

const openModal = function () {
  formEl.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  formEl.classList.add("hidden");
  overlay.classList.add("hidden");
};

const init = function () {
  inputsNum.forEach(function (input, i) {
    inputsNum[i].value = durations[i] / 60;
  });

  inputsColors.forEach(function (input, i) {
    inputsColors[i].value = modesElemnetsColors[i];
  });

  intervalInput.value = interval;
};

changeBtn.addEventListener("click", function () {
  const approval = confirm("the current pomodoro is gonna be reseted");
  if (approval) {
    clearInterval(timerName);
    durations.forEach(function (d, i) {
      durations[i] = Number(inputsNum[i].value) * 60;
    });

    console.log(durations);

    modesElemnetsColors.forEach(function (c, i) {
      modesElemnetsColors[i] = inputsColors[i].value;
    });
    interval = intervalInput.value;
    time = durations[modesElements.indexOf(currentMode)];
    console.log(durations);
    timer.textContent = timerMaker(time);
    document.documentElement.style.setProperty(
      "--mainBackGroundColor",
      `${modesElemnetsColors[modesElements.indexOf(currentMode)]}`
    );
    closeModal();
  } else {
    init();
  }
});
cancelBtn.addEventListener("click", function () {
  const approval = confirm("your adjustments is gonna be reseted");
  if (approval) {
    init();
    closeModal();
  }
});

settingBtn.addEventListener("click", openModal);
overlay.addEventListener("click", function () {
  init();
  closeModal();
});
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    init();
    closeModal();
  }
});
