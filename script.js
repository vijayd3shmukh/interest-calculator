const amountInput = document.getElementById('amount');
const interestInput = document.getElementById('interest');
const durationInput = document.getElementById('duration');
const durationType = document.getElementById('durationType');
const totalDisplay = document.getElementById('total');
const profitDisplay = document.getElementById('profit');

function animateValue(id, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        id.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

function addMoneyEmoji() {
    const emoji = document.createElement('span');
    emoji.textContent = "💰";
    emoji.classList.add('money-emoji');
    emoji.style.left = Math.random() * 80 + "%";
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 1000);
}

function calculate() {
    let amount = parseFloat(amountInput.value) || 0;
    let rate = parseFloat(interestInput.value) || 0;
    let duration = parseFloat(durationInput.value) || 0;
    let isYears = durationType.value === "years";

    if (isYears) duration *= 12; // convert years to months

    let profit = (amount * (rate / 100) * duration) / 12;
    let total = amount + profit;

    animateValue(totalDisplay, parseInt(totalDisplay.textContent), total, 500);
    animateValue(profitDisplay, parseInt(profitDisplay.textContent), profit, 500);

    if (profit > 0) {
        for (let i = 0; i < 3; i++) {
            setTimeout(addMoneyEmoji, i * 200);
        }
    }
}

// Listen for changes instantly
[amountInput, interestInput, durationInput, durationType].forEach(el => {
    el.addEventListener('input', calculate);
});

// Initial calculation
calculate();