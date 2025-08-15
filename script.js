function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);
        obj.textContent = Math.floor(start + range * progress).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

function calculateInterest() {
    const principal = parseFloat(document.getElementById("principal").value);
    let rate = parseFloat(document.getElementById("rate").value) / 100;
    let duration = parseFloat(document.getElementById("duration").value);
    const unit = document.getElementById("unit").value;

    if (isNaN(principal) || isNaN(rate) || isNaN(duration)) {
        alert("Please fill all fields correctly!");
        return;
    }

    // Convert duration to years
    if (unit === "days") {
        duration = duration / 365;
    } else if (unit === "months") {
        duration = duration / 12;
    }

    // Compound monthly automatically
    const n = 12;
    const amount = principal * Math.pow(1 + rate / n, n * duration);
    const profit = amount - principal;

    // Animate results
    document.getElementById("result").classList.add("glow");
    animateValue("totalAmount", 0, Math.round(amount), 1500);
    animateValue("profitAmount", 0, Math.round(profit), 1500);
}