let currentDisplayedAmount = 0;

function calculateDahej() {
  const profession = parseInt(document.getElementById("profession").value);
  const income = parseInt(document.getElementById("income").value || 0);
  const fairness = parseInt(document.getElementById("fairness").value);
  const car = parseInt(document.getElementById("car").value);
  const height = parseInt(document.getElementById("height").value);
  const resultEl = document.getElementById("result");

  if (income < 50000) {
    resultEl.innerText = "Enter at least ₹50,000 income to get started 😉";
    return;
  }

  let incomeScore = Math.floor(income / 50000);
  incomeScore = Math.min(incomeScore, 20);

  const totalScore = profession + fairness + car + height + incomeScore;
  const dahejAmount = totalScore * 50000;

  animateResult(dahejAmount);

  // Easter Egg 🎉
  if (profession == 5 && car == 4 && height == 3) {
    alert("🔥 High Value Groom Detected! Prepare extra 💰💰💰!");
  }

  return dahejAmount;
}

function animateResult(finalAmount) {
  let resultEl = document.getElementById("result");
  let start = currentDisplayedAmount;
  let end = finalAmount;
  let duration = 500;
  let stepTime = 15;
  let steps = Math.floor(duration / stepTime);
  let increment = (end - start) / steps;

  let step = 0;
  const counter = setInterval(() => {
    step++;
    let value = Math.round(start + increment * step);
    resultEl.innerText = "Estimated Dahej: ₹" + value.toLocaleString("en-IN") + " 💸";
    if (step >= steps) {
      clearInterval(counter);
      currentDisplayedAmount = finalAmount;
    }
  }, stepTime);
}

function generateCertificate() {
  const amount = calculateDahej();
  if (!amount) return;
  const name = prompt("Enter groom's name:");
  const html = `
    <html><body style="font-family: 'Comic Neue', cursive; text-align:center; padding:50px">
      <h1>💍 Dahej Certificate</h1>
      <p>This is to certify that <b>${name || "Unnamed Groom"}</b> is eligible for a dahej of</p>
      <h2 style="color:green">₹${amount.toLocaleString("en-IN")} 💰</h2>
      <p>Based on his charming attributes and questionable metrics 😂</p>
    </body></html>
  `;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dahej-certificate.html";
  a.click();
}

function shareDahej() {
  const amount = currentDisplayedAmount;
  const message = `I just got an estimated dahej of ₹${amount.toLocaleString("en-IN")} 💸 using the Dahej Calculator 😂`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  ["profession", "income", "fairness", "car", "height"].forEach(id => {
    document.getElementById(id).addEventListener("input", calculateDahej);
  });
});
