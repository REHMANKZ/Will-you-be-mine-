const mainContent = document.getElementById("mainContent");
const resultContent = document.getElementById("resultContent");
const noBtn = document.getElementById("noBtn");
const buttonArea = document.getElementById("buttonArea");
const music = document.getElementById("bgMusic");
const heartsContainer = document.getElementById("hearts");
const funnyPopup = document.getElementById("funnyPopup");

let noAttemptCount = 0;

/* 🎵 Start music */
document.body.addEventListener("click", function () {
    music.play();
}, { once: true });

document.body.addEventListener("touchstart", function () {
    music.play();
}, { once: true });

/* 💖 Floating Hearts */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}
setInterval(createHeart, 300);

/* 😈 Move Button + Count Attempts */
function moveButton() {

    noAttemptCount++;   // Count every time user tries

    const areaRect = buttonArea.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = areaRect.width - btnWidth;
    const maxY = areaRect.height - btnHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    if (noAttemptCount === 3) {
        showFunnyMessage();
    }
}

/* Desktop */
noBtn.addEventListener("mouseenter", moveButton);

/* Mobile */
noBtn.addEventListener("touchstart", function (e) {
    e.preventDefault();
    moveButton();
});

/* 😂 Funny Popup */
function showFunnyMessage() {

    funnyPopup.style.display = "block";

    setTimeout(() => {
        funnyPopup.style.display = "none";
    }, 3000);
}

/* 🎆 YES BUTTON */
function propose() {

    mainContent.style.display = "none";
    resultContent.style.display = "block";

    document.body.style.background =
        "linear-gradient(135deg, #ff758c, #ff7eb3)";

    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 6,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 6,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
