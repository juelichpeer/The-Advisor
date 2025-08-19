// Fix 100vh on mobile
function setVh(){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();
window.addEventListener('resize', setVh);

// Register SW
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
}

const splashDuration = 1900;

window.addEventListener('DOMContentLoaded', () => {
  const dash = document.getElementById('dashboard');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = () => {
    document.body.classList.add('show-dashboard');
    dash.hidden = false;
    setTimeout(() => document.getElementById('splash')?.remove(), 900);
  };
  setTimeout(go, prefersReduced ? 50 : splashDuration);

  // Nav active state (visual only)
  const allNavButtons = Array.from(document.querySelectorAll('.nav-btn'));
  function setActive(route){
    allNavButtons.forEach(b => b.classList.toggle('is-active', b.dataset.route === route));
  }
  allNavButtons.forEach(btn => {
    btn.addEventListener('click', () => setActive(btn.dataset.route));
  });
});
