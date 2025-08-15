document.getElementById("calcBtn").addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("amount").value) || 0;
    const rate = parseFloat(document.getElementById("rate").value) || 0;
    const time = parseFloat(document.getElementById("time").value) || 0;
    const unit = document.getElementById("timeUnit").value;

    let years = time;
    if (unit === "months") years = time / 12;
    if (unit === "days") years = time / 365;

    const profit = amount * (rate / 100) * years;
    const total = amount + profit;

    document.getElementById("total").textContent = total.toFixed(2);
    document.getElementById("profit").textContent = profit.toFixed(2);

    // Emoji animation
    for (let i = 0; i < 10; i++) {
        const emoji = document.createElement("div");
        emoji.textContent = "💸";
        emoji.classList.add("emoji");
        emoji.style.left = Math.random() * 100 + "vw";
        document.getElementById("emojiRain").appendChild(emoji);

        setTimeout(() => emoji.remove(), 2000);
    }
});