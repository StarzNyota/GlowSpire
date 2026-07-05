/* ==================================================
   GLOWSPIRE DASHBOARD
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

});

// ===============================
// LOAD DASHBOARD
// ===============================

function loadDashboard() {

    loadProfile();

    updateDashboard();

    animateXPBar();

    loadBadges();

}

// ===============================
// LOAD PROFILE
// ===============================

function loadProfile() {

    const username = document.getElementById("username");

    const profilePicture =
        document.querySelector(".profile-picture");

    const savedUsername =
        localStorage.getItem("glowspireUsername");

    const savedPicture =
        localStorage.getItem("glowspireProfilePicture");

    if (username) {

        username.textContent =
            savedUsername || "Guest";

    }

    if (profilePicture && savedPicture) {

        profilePicture.src = savedPicture;

    }

}

// ===============================
// XP BAR
// ===============================

function animateXPBar() {

    const data = getUserData();

    const xpBar =
        document.getElementById("xpBar");

    if (!xpBar) return;

    const percent =
        (data.xp / (data.level * 100)) * 100;

    setTimeout(() => {

        xpBar.style.width = percent + "%";

    }, 300);

}

// ===============================
// LOAD BADGES
// ===============================

function loadBadges() {

    const data = getUserData();

    const badgeGrid =
        document.querySelector(".badge-grid");

    if (!badgeGrid) return;

    badgeGrid.innerHTML = "";

    if (data.badges.length === 0) {

        badgeGrid.innerHTML =
        "<p>No badges unlocked yet. 🌸</p>";

        return;

    }

    data.badges.forEach(badge => {

        const badgeCard =
            document.createElement("div");

        badgeCard.className = "badge";

        badgeCard.innerHTML = `
            🏆
            <br>
            ${badge}
        `;

        badgeGrid.appendChild(badgeCard);

    });

}

// ===============================
// SAVE USERNAME
// ===============================

function saveUsername(name) {

    localStorage.setItem(
        "glowspireUsername",
        name
    );

}

// ===============================
// SAVE PROFILE PICTURE
// ===============================

function saveProfilePicture(file) {

    const reader = new FileReader();

    reader.onload = function(e) {

        localStorage.setItem(
            "glowspireProfilePicture",
            e.target.result
        );

        loadProfile();

    };

    reader.readAsDataURL(file);

}

// ===============================
// RESET PROGRESS (OPTIONAL)
// ===============================

function resetGlowspireProgress() {

    const confirmReset = confirm(
        "Reset all Glowspire progress?"
    );

    if (!confirmReset) return;

    localStorage.removeItem("glowspireUser");
    localStorage.removeItem("glowspireUsername");
    localStorage.removeItem("glowspireProfilePicture");

    location.reload();

}

console.log("Dashboard Loaded ✨");
