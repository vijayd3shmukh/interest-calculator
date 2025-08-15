// Elements
const amount = document.getElementById('amount');
const rate = document.getElementById('rate');
const duration = document.getElementById('duration');
const unit = document.getElementById('unit');
const freq = document.getElementById('freq');
const calcBtn = document.getElementById('calc');
const totalEl = document.getElementById('total');
const profitEl = document.getElementById('profit');
const resultCard = document.getElementById('resultCard');

const bP = document.getElementById('breakdownP');
const bR = document.getElementById('breakdownR');
const bT = document.getElementById('breakdownT');
const bN = document.getElementById('breakdownN');

const confettiLayer = document.getElementById('confetti');
const coinLayer = document.getElementById('coins');

const fmtINR = n => n.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

// Quick rate chips
document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click', ()=> { rate.value = chip.dataset.rate; pulse(rate); });
});

function pulse(el){
  el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
}

// Button ripple
calcBtn.addEventListener('click', (e)=>{
  const span = document.createElement('span');
  span.className = 'r';
  span.style.left = `${e.offsetX}px`;
  span.style.top = `${e.offsetY}px`;
  calcBtn.appendChild(span);
  setTimeout(()=>span.remove(), 700);
});

// Compound interest
function compound(P, rPct, years, n){
  const r = rPct/100;
  return P * Math.pow(1 + r/n, n*years);
}

function toYears(value, unit){
  if (unit === 'month') return value/12;
  if (unit === 'day') return value/365;
  return value; // year
}

// Count-up easing
function animateNumber(el, to, ms=900){
  const from = Number((el.textContent || '0').replace(/[^\d.-]/g,'')) || 0;
  const start = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3);
  function tick(now){
    const p = Math.min(1, (now - start)/ms);
    const val = from + (to - from) * ease(p);
    el.textContent = fmtINR(val);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// FX: confetti + coins
function burstConfetti(xRatio){
  const colors = ['#34ef97','#10b981','#eab308','#38bdf8','#f472b6'];
  const count = 60;
  const xBase = Math.max(6, Math.min(94, xRatio*100));
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'confetti';
    p.style.left = (xBase + (Math.random()*40-20)) + 'vw';
    p.style.top = (10 + Math.random()*5) + 'vh';
    p.style.background = colors[i%colors.length];
    p.style.animationDelay = (Math.random()*0.25)+'s';
    p.style.transform = `translateY(-10px) rotate(${Math.random()*180}deg)`;
    confettiLayer.appendChild(p);
    setTimeout(()=>p.remove(), 1400);
  }
}

function flyCoins(xRatio){
  const count = 10;
  const xBase = Math.max(6, Math.min(94, xRatio*100));
  for(let i=0;i<count;i++){
    const c = document.createElement('div');
    c.className = 'coin';
    c.textContent = Math.random() < .8 ? '💰' : '🪙';
    c.style.left = (xBase + (Math.random()*20-10)) + 'vw';
    c.style.bottom = (12 + Math.random()*6) + 'vh';
    c.style.animationDelay = (i*0.05)+'s';
    coinLayer.appendChild(c);
    setTimeout(()=>c.remove(), 1500);
  }
}

// Main calculate
function calculate(clickEvent){
  const P = +amount.value || 0;
  const r = +rate.value || 0;
  const t = toYears(+duration.value || 0, unit.value);
  const n = +freq.value || 1;

  const A = compound(P, r, t, n);
  const profit = Math.max(0, A - P);

  animateNumber(totalEl, A, 900);
  animateNumber(profitEl, profit, 900);

  // flash + micro-bounce
  resultCard.classList.remove('flash'); void resultCard.offsetWidth; resultCard.classList.add('flash');

  bP.textContent = `P = ${fmtINR(P)}`;
  bR.textContent = `r = ${r}%`;
  bT.textContent = `t = ${t.toFixed(3)} yr`;
  bN.textContent = `n = ${n}/yr`;

  // FX originating near button click (fallback to center)
  const xr = clickEvent ? (clickEvent.clientX / window.innerWidth) : 0.5;
  burstConfetti(xr);
  flyCoins(xr);
}

calcBtn.addEventListener('click', (e)=> calculate(e));

// Optional: Enter key triggers calculate
[amount, rate, duration].forEach(inp=>{
  inp.addEventListener('keydown', (e)=>{ if(e.key==='Enter') calculate(); });
});

// Initial pretty print
totalEl.textContent  = fmtINR(0);
profit