export default class CountdownTimer {
  constructor(settings) {
    this.isActive = false;
    this.intervalId = null;
    this.targetDate = settings.targetDate; //new Date(2021, 4, 23);
    this.refs = {
      days: document.querySelector(
        `${settings.selector} span[data-value="days"]`,
      ),
      hours: document.querySelector(
        `${settings.selector} span[data-value="hours"]`,
      ),
      mins: document.querySelector(
        `${settings.selector} span[data-value="mins"]`,
      ),
      secs: document.querySelector(
        `${settings.selector} span[data-value="secs"]`,
      ),
      //   startBtn: document.querySelector(
      //     'settings.selector button[data-action="start"]',
      //   ),
      //   stopBtn: document.querySelector(
      //     'settings.selector button[data-action="stop"]',
      // )
    };
  }
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    const targetTime = this.targetDate.getTime();
    updateTimer(0, this.refs);
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = targetTime - currentTime;
      updateTimer(timeDifference, this.refs);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
    updateTimer(0, this.refs);
  }
}

// refs.startBtn.addEventListener('click', timer.start.bind(timer));
// refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateTimer(time, refs) {
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
