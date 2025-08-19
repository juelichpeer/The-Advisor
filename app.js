// Fix 100vh on mobile
function setVh(){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();
window.addEventListener('resize', setVh);

// Route: splash -> dashboard
const splashDuration = 1900; // total intro time before leaving splash

window.addEventListener('DOMContentLoaded', () => {
  const dash = document.getElementById('dashboard');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Register SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }

  // Reveal dashboard after splash
  const go = () => {
    document.body.classList.add('show-dashboard');
    dash.hidden = false;
    // Fully detach splash after animation (cleanup)
    setTimeout(() => {
      const splash = document.getElementById('splash');
      splash?.remove();
    }, 900);
  };

  setTimeout(go, prefersReduced ? 50 : splashDuration);
});
