// viewport fix
function setVh(){ document.documentElement.style.setProperty('--vh', `${window.innerHeight*0.01}px`); }
setVh(); addEventListener('resize', setVh);

// SW
if ('serviceWorker' in navigator){ navigator.serviceWorker.register('/sw.js').catch(()=>{}); }

// Timed intro → merge → show dashboard
const INTRO_MS = 1400;
const MERGE_MS = 700;

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const splash = document.getElementById('splash');
  const dash = document.getElementById('dashboard');

  // Dashboard title: "Welcome USER_PLACEHOLDER"
  const el = document.getElementById('greeting');
  if (el) el.textContent = 'Welcome USER_PLACEHOLDER';

  const go = () => {
    document.body.classList.add('merge'); // start radial
    setTimeout(() => {
      document.body.classList.add('show-dashboard');
      dash.hidden = false;
      setTimeout(() => splash?.remove(), 800);
    }, prefersReduced ? 0 : MERGE_MS);
  };
  setTimeout(go, prefersReduced ? 50 : INTRO_MS);
});

// nav active state (visual only)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.nav-btn');
  if (!btn) return;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('is-active', b === btn));
});
