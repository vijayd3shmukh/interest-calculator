function calculateLending() {
    const amount = parseFloat(document.getElementById("amount").value) || 0;
    const rate = parseFloat(document.getElementById("rate").value) || 0;
    const ratePeriod = document.getElementById("ratePeriod").value;
    const duration = parseFloat(document.getElementById("duration").value) || 0;
    const durationPeriod = document.getElementById("durationPeriod").value;

    if (amount <= 0 || rate <= 0 || duration <= 0) {
        document.getElementById("message").innerText = "Please fill all fields correctly.";
        return;
    }

    // Convert all to days for calculation
    const periodToDays = { day: 1, month: 30, year: 365 };
    const rateDays = periodToDays[ratePeriod];
    const durationDays = periodToDays[durationPeriod];

    // Daily interest rate based on rate period
    const dailyRate = rate / 100 / rateDays;

    // Total days of lending
    const totalDays = duration * durationDays;

    // Interest calculation (simple interest)
    const profit = amount * dailyRate * totalDays;
    const total = amount + profit;

    // Clear cache by resetting fields
    document.getElementById("amount").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("ratePeriod").selectedIndex = 0;
    document.getElementById("durationPeriod").selectedIndex = 0;

    // Output message
    document.getElementById("message").innerText = 
        `You will receive ₹${total.toFixed(2)} total with ₹${profit.toFixed(2)} interest, at ${rate}% per ${ratePeriod} for ${duration} ${durationPeriod}(s).`;

    // Flash animation
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