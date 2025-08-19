// Fix 100vh on mobile
function setVh(){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();
window.addEventListener('resize', setVh);

// Register SW
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(()=>{});
}

const INTRO_MS = 2000;      // time to play "Welcome Home Admin" in
const MERGE_DELAY = 150;    // small delay before starting the merge sweep
const MERGE_MS = 800;       // duration of radial reveal (matches CSS @keyframes reveal)

window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const dash = document.getElementById('dashboard');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sequence:
  // 1) Play intro
  // 2) Trigger 'merge' class to run radial reveal
  // 3) Show dashboard & fade it in
  // 4) Remove splash after animation
  const playIntro = () => {
    setTimeout(() => {
      // Start merge reveal
      document.body.classList.add('merge');
      setTimeout(() => {
        // Enter dashboard
        document.body.classList.add('show-dashboard');
        dash.hidden = false;

        // Cleanup splash after animations
        setTimeout(() => splash?.remove(), 900);
      }, prefersReduced ? 0 : MERGE_MS);
    }, prefersReduced ? 40 : INTRO_MS + MERGE_DELAY);
  };

  playIntro();

  // Nav active state (visual only)
  const allNavButtons = Array.from(document.querySelectorAll('.nav-btn'));
  function setActive(route){
    allNavButtons.forEach(b => b.classList.toggle('is-active', b.dataset.route === route));
  }
  allNavButtons.forEach(btn => btn.addEventListener('click', () => setActive(btn.dataset.route)));
});
