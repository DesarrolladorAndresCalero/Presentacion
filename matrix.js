const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 12;
const columns = Math.ceil(canvas.width / fontSize);

const drops = new Array(columns).fill(1);
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>{}[]()=+-*/!@#$%^&*';

function getRandomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
}

const charCanvas = document.createElement('canvas');
const charCtx = charCanvas.getContext('2d');
charCanvas.width = fontSize;
charCanvas.height = fontSize * chars.length;
charCtx.font = `${fontSize}px monospace`;
charCtx.fillStyle = '#0f0';

chars.split('').forEach((char, index) => {
    charCtx.fillText(char, 0, fontSize * (index + 1));
});

let lastTime = 0;
const fps = 60;
const interval = 1000 / fps;

function draw(currentTime) {
    if (currentTime - lastTime < interval) {
        requestAnimationFrame(draw);
        return;
    }

    lastTime = currentTime;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
        const charIndex = Math.floor(Math.random() * chars.length);
        ctx.drawImage(
            charCanvas,
            0,
            charIndex * fontSize,
            fontSize,
            fontSize,
            i * fontSize,
            drops[i] * fontSize,
            fontSize,
            fontSize
        );

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

requestAnimationFrame(draw);