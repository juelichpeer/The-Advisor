document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome-screen");
  const home = document.getElementById("home-screen");

  // After animation, switch to Home screen
  setTimeout(() => {
    welcome.classList.add("hidden");
    home.classList.remove("hidden");
  }, 4000); // matches fadeIn + fadeOut timing
});
