const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
const audio = document.getElementById('bdayAudio');
const typedTextElement = document.getElementById('typedText');
const slider = document.getElementById('photoSlider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const message = "С днём рождения! Желаю море счастья, океан любви и вагон здоровья! Пусть сбываются все мечты!";
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;

startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    content.classList.remove('d-none');
    document.body.style.background = "radial-gradient(circle, #2c3e50, #000000)";

    audio.play();
    shootConfetti();
    typeWriter(message, 0);
    setInterval(flyingBalloons, 600);
});

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 300}px)`;
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

setInterval(() => {
    if (!content.classList.contains('d-none')) {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
}, 4000);

function typeWriter(text, i) {
    if (i < text.length) {
        typedTextElement.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 50);
    }
}

function shootConfetti() {
    const end = Date.now() + (15 * 1000);
    const colors = ['#ff4b2b', '#ffd700', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function flyingBalloons() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const xPos = Math.random() * window.innerWidth;
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    
    balloon.style.left = xPos + 'px';
    balloon.style.backgroundColor = color;
    document.getElementById('balloon-container').appendChild(balloon);

    const animation = balloon.animate([
        { bottom: '-100px' },
        { bottom: '110vh' }
    ], {
        duration: 5000 + Math.random() * 3000,
        easing: 'linear'
    });

    animation.onfinish = () => balloon.remove();
}