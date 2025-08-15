function updateAmountLabel() {
    const principal = document.getElementById("principal").value || 0;
    document.getElementById("amount-display").textContent = `Amount: ₹${parseFloat(principal).toFixed(2)}`;
}

function calculateInterest() {
    let principal = parseFloat(document.getElementById("principal").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let time = parseFloat(document.getElementById("time").value);
    let interestRateType = document.getElementById("interestRateType").value;
    let timeType = document.getElementById("timeType").value;

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        document.getElementById("result").textContent = "";
        return;
    }

    // Adjust rate per year
    if (interestRateType === "month") {
        rate = rate * 12;
    } else if (interestRateType === "day") {
        rate = rate * 365;
    }

    // Adjust time in years
    if (timeType === "month") {
        time = time / 12;
    } else if (timeType === "day") {
        time = time / 365;
    }

    let amount = principal * Math.pow((1 + (rate / 100)), time);
    let profit = amount - principal;

    document.getElementById("result").innerHTML = `
        You will receive <span style="color:green">₹${amount.toFixed(2)}</span> 
        with a profit of <span style="color:blue">₹${profit.toFixed(2)}</span>
    `;
}