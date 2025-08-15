document.getElementById("interestRate").addEventListener("change", function() {
    const customRateInput = document.getElementById("customRate");
    if (this.value === "custom") {
        customRateInput.style.display = "block";
    } else {
        customRateInput.style.display = "none";
    }
});

document.getElementById("calculateBtn").addEventListener("click", function() {
    const amount = parseFloat(document.getElementById("amount").value);
    let rate = document.getElementById("interestRate").value;
    if (rate === "custom") {
        rate = parseFloat(document.getElementById("customRate").value);
    } else {
        rate = parseFloat(rate);
    }
    const timeValue = parseFloat(document.getElementById("timeValue").value);
    const timeUnit = document.getElementById("timeUnit").value;

    if (isNaN(amount) || isNaN(rate) || isNaN(timeValue)) {
        alert("Please fill all fields!");
        return;
    }

    // Convert time to years
    let years = timeValue;
    if (timeUnit === "month") years = timeValue / 12;
    if (timeUnit === "day") years = timeValue / 365;

    // Compound interest formula
    const n = 1; // yearly compounding
    const total = amount * Math.pow((1 + (rate / 100) / n), n * years);
    const profit = total - amount;

    animateValue("totalAmount", 0, total, 1000);
    animateValue("profit", 0, profit, 1000);
    showEmojis();
});

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = "₹" + (start + (end - start) * progress).toFixed(2);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function showEmojis() {
    const emojis = ["💰", "🤑", "🎉", "💵"];
    for (let i = 0; i < 10; i++) {
        const emoji = document.createElement("div");
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = "fixed";
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.top = Math.random() * 100 + "vh";
        emoji.style.fontSize = "24px";
        emoji.style.opacity = "1";
        emoji.style.transition = "all 1s ease";
        document.body.appendChild(emoji);

        setTimeout(() => {
            emoji.style.transform = "translateY(-50px)";
            emoji.style.opacity = "0";
        }, 100);

        setTimeout(() => emoji.remove(), 1100);
    }
}