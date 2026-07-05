console.log("Glowspire loaded ✨");

// ===============================
// DARK MODE TOGGLE
// ===============================

const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            darkBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            darkBtn.textContent = "🌙";
        }
    });
}

// Load saved theme
window.addEventListener("load", () => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
        if (darkBtn) darkBtn.textContent = "☀️";
    }
});


// ===============================
// SMOOTH SCROLL (anchor links)
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// ===============================
// PAGE LOADED EFFECT
// ===============================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


// ===============================
// SIMPLE DAILY QUOTE ROTATION
// ===============================

const quotes = [
    "✨ You are capable of amazing things.",
    "🌸 Small steps every day lead to big change.",
    "💖 Progress over perfection.",
    "🌷 Keep going, you’re growing.",
    "☁️ One day at a time."
];

const quoteEl = document.getElementById("dailyQuote");

if (quoteEl) {
    const day = new Date().getDate();
    quoteEl.textContent = quotes[day % quotes.length];
}
