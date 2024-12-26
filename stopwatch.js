let startTime = 0;
let updatedTime = 0;
let difference = 0;
let running = false;
let lapCount = 0;
let timerInterval;

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatTime(time) {
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor(time % 1000);
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
    return number.toString().padStart(length, '0');
}

function startStop() {
    if (running) {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - difference;
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
    }
    running = !running;
}

function updateTime() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;
    timeDisplay.textContent = formatTime(difference);
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    timeDisplay.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapList.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}
