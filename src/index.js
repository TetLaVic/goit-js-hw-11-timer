import refs from './refs.js';
import './styles.css';

const timer = {
  isActive: false,
  intervalId: null,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    const targetDate = new Date(2021, 4, 23);
    const targetTime = targetDate.getTime();
    updateTimer(0);
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = targetTime - currentTime;
      updateTimer(timeDifference);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
    updateTimer(0);
  },
};

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateTimer(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}
