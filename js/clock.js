$(document).ready(function() {
  let clock;
  let targetDate;

  // Check if target date is already set in localStorage
  if (localStorage.getItem("targetDate")) {
    targetDate = new Date(localStorage.getItem("targetDate"));
  } else {
    // Set target date to 38 days from now
    targetDate = new Date(new Date().getTime() + 38 * 24 * 60 * 60 * 1000);
    // Store target date in localStorage
    localStorage.setItem("targetDate", targetDate);
  }

  // Calculate the difference in seconds between the future and current date
  let currentDate = new Date();
  let diff = targetDate.getTime() / 1000 - currentDate.getTime() / 1000;

  if (diff <= 0) {
    // If remaining countdown is 0
    clock = $(".clock").FlipClock(0, {
      clockFace: "DailyCounter",
      countdown: true,
      autostart: false
    });
    console.log("Date has already passed!");
    
  } else {
    // Run countdown timer
    clock = $(".clock").FlipClock(diff, {
      clockFace: "DailyCounter",
      countdown: true,
      callbacks: {
        stop: function() {
          console.log("Timer has ended!");
          // Clear the localStorage if the timer has ended
          localStorage.removeItem("targetDate");
        }
      }
    });
    
    // Check when timer reaches 0, then stop at 0
    setTimeout(function() {
      checktime();
    }, 1000);
    
    function checktime() {
      let t = clock.getTime();
      if (t <= 0) {
        clock.setTime(0);
      }
      setTimeout(function() {
        checktime();
      }, 1000);
    }
  }
});