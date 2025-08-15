function calculateLending() {
    const amount = parseFloat(document.getElementById("amount").value) || 0;
    const rate = parseFloat(document.getElementById("rate").value) || 0;
    const ratePeriod = document.getElementById("ratePeriod").value;
    const duration = parseFloat(document.getElementById("duration").value) || 0;
    const durationPeriod = document.getElementById("durationPeriod").value;

    if (amount <= 0 || rate <= 0 || duration <= 0) {
        document.getElementById("resultBox").classList.remove("show");
        return;
    }

    const periodToDays = { day: 1, month: 30, year: 365 };
    const rateDays = periodToDays[ratePeriod];
    const durationDays = periodToDays[durationPeriod];

    const dailyRate = rate / 100 / rateDays;
    const totalDays = duration * durationDays;

    const profit = amount * dailyRate * totalDays;
    const total = amount + profit;

    document.getElementById("totalAmount").innerText = `₹${total.toFixed(2)}`;
    document.getElementById("message").innerText =
        `You will receive ₹${total.toFixed(2)} total with ₹${profit.toFixed(2)} interest, at ${rate}% per ${ratePeriod} for ${duration} ${durationPeriod}(s).`;

    const resultBox = document.getElementById("resultBox");
    resultBox.classList.remove("hidden");
    setTimeout(() => resultBox.classList.add("show"), 10);
}

document.addEventListener("DOMContentLoaded", () => {
    // Live calculation on input change
    document.querySelectorAll("#amount, #rate, #ratePeriod, #duration, #durationPeriod")
        .forEach(el => el.addEventListener("input", calculateLending));

    // Add copyright
    const footer = document.createElement("footer");
    footer.innerHTML = "© " + new Date().getFullYear() + " @vijay.d3shmukh";
    document.body.appendChild(footer);
});