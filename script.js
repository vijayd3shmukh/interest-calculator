// Function to animate number counting
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        obj.innerText = "₹" + Math.floor(progress * range + start).toLocaleString();
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// Main calculation
function calculateInterest() {
    const amount = parseFloat(document.getElementById("amount").value) || 0;
    const rate = parseFloat(document.getElementById("rate").value) || 0;
    const duration = parseFloat(document.getElementById("duration").value) || 0;
    const periodType = document.getElementById("periodType").value;

    let profit = 0;

    if (periodType === "Days") {
        profit = amount * (rate / 100) * duration;
    } else if (periodType === "Months") {
        profit = amount * (rate / 100) * duration;
    } else if (periodType === "Years") {
        profit = amount * (rate / 100) * duration;
    }

    const total = amount + profit;

    // Animate numbers
    animateValue("total", 0, total, 800);
    animateValue("profit", 0, profit, 800);

    // Flash effect
    const resultBox = document.getElementById("resultBox");
    resultBox.classList.add("flash");
    setTimeout(() => resultBox.classList.remove("flash"), 600);
}

// Add copyright
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.createElement("footer");
    footer.innerHTML = "© " + new Date().getFullYear() + " @vijay.d3shmukh";
    document.body.appendChild(footer);
});