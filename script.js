// Vijay D3shmukh copyright

function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById("principal").value);
    let rate = parseFloat(document.getElementById("rate").value) / 100;
    const compounding = document.getElementById("compounding").value;
    let duration = parseFloat(document.getElementById("duration").value);
    const unit = document.getElementById("unit").value;
    const rateUnit = document.getElementById("rateUnit").value; // "perYear" or "perMonth"

    if (isNaN(principal) || isNaN(rate) || isNaN(duration)) {
        document.getElementById("result").innerHTML = "⚠️ Please fill all fields correctly.";
        return;
    }

    // Convert monthly interest to annual equivalent if needed
    if (rateUnit === "perMonth") {
        rate = Math.pow(1 + rate, 12) - 1;
    }

    // Convert duration to years if entered in months
    if (unit === "Months") {
        duration /= 12;
    }

    // Determine compounding frequency
    let n = 1;
    if (compounding === "Monthly") n = 12;
    else if (compounding === "Quarterly") n = 4;
    else if (compounding === "Daily") n = 365;

    // Compound Interest Formula
    const amount = principal * Math.pow(1 + rate / n, n * duration);
    const profit = amount - principal;

    // Animated color change
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <span style="color:green; font-size:18px;">💰 Total to receive: ₹${amount.toFixed(2)}</span><br>
        <span style="color:blue; font-size:16px;">📈 Profit: ₹${profit.toFixed(2)}</span>
    `;
    resultDiv.style.transition = "background-color 0.6s ease";
    resultDiv.style.backgroundColor = "#e0ffe0";
    setTimeout(() => { resultDiv.style.backgroundColor = "transparent"; }, 800);
}