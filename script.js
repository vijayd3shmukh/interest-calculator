const principal = document.getElementById("principal");
const rate = document.getElementById("rate");
const ratePeriod = document.getElementById("ratePeriod");
const time = document.getElementById("time");
const timeUnit = document.getElementById("timeUnit");
const result = document.getElementById("result");

function calculate() {
  const p = parseFloat(principal.value) || 0;
  const r = parseFloat(rate.value) || 0;
  const t = parseFloat(time.value) || 0;
  const rateType = ratePeriod.value;
  const timeType = timeUnit.value;

  let yearlyRate;
  if (rateType === "year") yearlyRate = r;
  else if (rateType === "month") yearlyRate = r * 12;
  else if (rateType === "day") yearlyRate = r * 365;

  let timeInYears;
  if (timeType === "years") timeInYears = t;
  else if (timeType === "months") timeInYears = t / 12;
  else if (timeType === "days") timeInYears = t / 365;

  const interest = (p * yearlyRate * timeInYears) / 100;
  const total = p + interest;

  result.innerHTML = `
    <div class="total-amount">₹${total.toFixed(2)}</div>
    <p>You will receive ₹${total.toFixed(2)} total with ₹${interest.toFixed(2)} interest,
    at ${r}% per ${rateType} for ${t} ${timeType}(s).</p>
  `;

  result.style.animation = "none";
  result.offsetHeight; // trigger reflow
  result.style.animation = "fadeInScale 0.3s ease";
}

[principal, rate, ratePeriod, time, timeUnit].forEach(input => {
  input.addEventListener("input", calculate);
});

calculate();