/* 
    Claudia Catot, Daniel Shapoval, Jefrey Hernandez
    04/05/2023
    ASIXc1A M05 UF3
    roulette.js
    Codi javascript per el funcionament del temporitzador.
*/

const timeInput = document.getElementById('time-input');
const startButton = document.getElementById('start-time-button');
const durationHoursInput = document.getElementById('duration-hours');
const durationMinutesInput = document.getElementById('duration-minutes');
const durationSecondsInput = document.getElementById('duration-seconds');
const startDurationButton = document.getElementById('start-duration-button');
const currentTime = document.querySelector('.current-time');
const countdownDisplay = document.querySelector('.countdown');
const alarmSound = document.getElementById('alarm-sound');

let countdown;

function displayCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTimeString = `${hours}:${minutes}:${seconds}`;
    currentTime.textContent = currentTimeString;
    setTimeout(displayCurrentTime, 1000);
}

function startTimer(endTimeInMilliseconds) {
    clearInterval(countdown);

    countdown = setInterval(function () {
        const now = new Date();
        const timeLeftInMilliseconds = endTimeInMilliseconds - now.getTime();

        if (timeLeftInMilliseconds <= 0) {
            clearInterval(countdown);
            alarmSound.play();
            countdownDisplay.textContent = '00:00:00';
        } else {
            const timeLeftInSeconds = Math.floor(timeLeftInMilliseconds / 1000);
            const hoursLeft = Math.floor(timeLeftInSeconds / 3600);
            const minutesLeft = Math.floor((timeLeftInSeconds % 3600) / 60);
            const secondsLeft = timeLeftInSeconds % 60;

            countdownDisplay.textContent = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

startButton.addEventListener('click', function() {
    const endTime = new Date();
    const endTimeString = timeInput.value;
    const [endHour, endMinute] = endTimeString.split(':');
    endTime.setHours(endHour);
    endTime.setMinutes(endMinute);
    endTime.setSeconds(0);

    const endTimeInMilliseconds = endTime.getTime();
    startTimer(endTimeInMilliseconds);
});

startDurationButton.addEventListener('click', function() {
    const now = new Date();
    const durationHours = parseInt(durationHoursInput.value, 10) || 0;
    const durationMinutes = parseInt(durationMinutesInput.value, 10) || 0;
    const durationSeconds = parseInt(durationSecondsInput.value, 10) || 0;

    const durationInMilliseconds = (durationHours * 3600 + durationMinutes * 60 + durationSeconds) * 1000;
    const endTimeInMilliseconds = now.getTime() + durationInMilliseconds;
    startTimer(endTimeInMilliseconds);
});

displayCurrentTime();
