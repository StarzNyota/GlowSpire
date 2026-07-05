/* ==================================================
   GLOWSPIRE REWARDS SYSTEM
================================================== */

const DEFAULT_DATA = {
    xp: 0,
    level: 1,
    streak: 0,
    badges: [],
    lastVisit: null
};

// ===============================
// LOAD USER DATA
// ===============================

function getUserData() {

    const saved = localStorage.getItem("glowspireUser");

    if (saved) {

        return JSON.parse(saved);

    }

    localStorage.setItem(
        "glowspireUser",
        JSON.stringify(DEFAULT_DATA)
    );

    return { ...DEFAULT_DATA };

}

// ===============================
// SAVE USER DATA
// ===============================

function saveUserData(data) {

    localStorage.setItem(
        "glowspireUser",
        JSON.stringify(data)
    );

}

// ===============================
// ADD XP
// ===============================

function addXP(amount) {

    const data = getUserData();

    data.xp += amount;

    while (data.xp >= data.level * 100) {

        data.xp -= data.level * 100;

        data.level++;

        alert("🎉 Level Up! You reached Level " + data.level);

    }

    saveUserData(data);

    updateDashboard();

}

// ===============================
// BADGES
// ===============================

function unlockBadge(name) {

    const data = getUserData();

    if (!data.badges.includes(name)) {

        data.badges.push(name);

        alert("🏆 Badge Unlocked: " + name);

        saveUserData(data);

        updateDashboard();

    }

}

// ===============================
// DAILY STREAK
// ===============================

function updateStreak() {

    const data = getUserData();

    const today = new Date().toDateString();

    if (!data.lastVisit) {

        data.streak = 1;

    }

    else {

        const previous = new Date(data.lastVisit);

        const current = new Date(today);

        const difference =
        Math.floor(
            (current - previous) /
            (1000 * 60 * 60 * 24)
        );

        if (difference === 1) {

            data.streak++;

        }

        else if (difference > 1) {

            data.streak = 1;

        }

    }

    data.lastVisit = today;

    saveUserData(data);

}

// ===============================
// UPDATE DASHBOARD
// ===============================

function updateDashboard() {

    const data = getUserData();

    const xp = document.getElementById("xp");

    const level = document.getElementById("level");

    const streak = document.getElementById("streak");

    const totalXP = document.getElementById("totalXP");

    const badgeCount =
    document.getElementById("badgeCount");

    const currentStreak =
    document.getElementById("currentStreak");

    const bar =
    document.getElementById("xpBar");

    if (xp) {

        xp.textContent = data.xp;

    }

    if (level) {

        level.textContent = data.level;

    }

    if (streak) {

        streak.textContent =
        data.streak + " Days";

    }

    if (totalXP) {

        totalXP.textContent =
        data.xp;

    }

    if (badgeCount) {

        badgeCount.textContent =
        data.badges.length;

    }

    if (currentStreak) {

        currentStreak.textContent =
        data.streak;

    }

    if (bar) {

        const percent =
        (data.xp / (data.level * 100)) * 100;

        bar.style.width =
        percent + "%";

    }

}

// ===============================
// PAGE REWARDS
// ===============================

const page =
window.location.pathname
.split("/")
.pop();

switch(page){

    case "study.html":

        unlockBadge("Study Starter");

        break;

    case "wellness.html":

        unlockBadge("Healthy Habits");

        break;

    case "beauty.html":

        unlockBadge("Beauty Lover");

        break;

    case "fashion.html":

        unlockBadge("Fashion Fan");

        break;

    case "music.html":

        unlockBadge("Music Lover");

        break;

}

// ===============================
// DAILY LOGIN BONUS
// ===============================

window.addEventListener("load",()=>{

    updateStreak();

    addXP(5);

});
