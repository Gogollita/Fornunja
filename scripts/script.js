const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const mainContainer = document.getElementById('main-container');
const audio = document.getElementById('bdayAudio');
const slider = document.getElementById('photoSlider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const starContainer = document.getElementById('star-container');

const catMessage = document.getElementById('catMessage');
const nextCatBtn = document.getElementById('nextCatBtn');
const seerFrame = document.querySelector('.seer-frame');
const oracleContent = document.querySelector('.oracle-content');

const spinBtn = document.getElementById('spinBtn');
const slotResult = document.getElementById('slotResult');
const reels = [
    document.querySelector('#reel1 .reel-strip'),
    document.querySelector('#reel2 .reel-strip'),
    document.querySelector('#reel3 .reel-strip')
];

const predictions = [
    "Аферист-долбаеб уверен: все вокруг недруги пидорасы и хуесосы, тупые долбаёбы",
    "Вижу будущее: депнуть в казик батю",
    "Звезды сошлись: мы тоже сопьёмся",
    "Карты говорят: не верь в карты, верь в себя, родная",
    "Мистический знак: кому-то насрали под дверь, твой заказ выполнен.",
    "Я тебя люблю, кисик",
    "Самая сочная сися, самая любимая пися",
    "Здоровья, как у быка",
    "Открой глаза ты кекнула, а это к деньгам",
    "Мистический знак: чтоб имена всех твоих детей в крусайдер кингс не передались тебе"
];

const slotIcons = ['💰', '🎁', '🎉', '🎂', '👑', '🚀', '🥂', '💖'];

startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    mainContainer.classList.remove('d-none');
    document.body.classList.remove('body-locked');
    audio.play().catch(() => {});
    shootConfettiOrange();
    createStarrySky();
    setInterval(createBalloon, 2500);
    initSlotMachine();
});

nextCatBtn.addEventListener('click', () => {
    nextCatBtn.disabled = true;
    oracleContent.classList.add('fade-out');
    seerFrame.classList.add('seer-active');
    
    setTimeout(() => {
        const r = predictions[Math.floor(Math.random() * predictions.length)];
        catMessage.innerText = r;
        oracleContent.classList.remove('fade-out');
        
        setTimeout(() => {
            seerFrame.classList.remove('seer-active');
            nextCatBtn.disabled = false;
        }, 1000);
    }, 600);
});

function initSlotMachine() {
    reels.forEach(strip => {
        strip.innerHTML = '';
        [...slotIcons, ...slotIcons].forEach(icon => {
            const div = document.createElement('div');
            div.className = 'slot-icon';
            div.innerText = icon;
            strip.appendChild(div);
        });
    });
}

spinBtn.addEventListener('click', () => {
    if (spinBtn.disabled) return;
    spinBtn.disabled = true;
    slotResult.innerText = "Судьба решается...";
    
    reels.forEach((strip, index) => {
        strip.classList.add('spinning');
        setTimeout(() => {
            strip.classList.remove('spinning');
            const randomIndex = Math.floor(Math.random() * slotIcons.length);
            const targetPos = -(randomIndex * 60);
            strip.style.transform = `translateY(${targetPos}px)`;
            
            if (index === 2) {
                setTimeout(() => {
                    spinBtn.disabled = false;
                    slotResult.innerText = "Ты всегда в выигрыше, родная 🏆";
                    shootConfettiOrange();
                }, 500);
            }
        }, 1500 + index * 500);
    });
});

function shootConfettiOrange() {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#ff8c00', '#1eff00ff', '#000000'] });
}

function createStarrySky() {
    const symbols = ['✧', '✦', '☆', '★'];
    for (let i = 0; i < 40; i++) {
        const star = document.createElement('div');
        star.className = 'star-symbol';
        star.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `starTwinkle ${Math.random() * 3 + 2}s infinite`;
        starContainer.appendChild(star);
    }
}

let flowerCount = 0;
document.getElementById('addFlowerBtn').addEventListener('click', () => {
    flowerCount++;
    document.getElementById('bouquetCount').innerText = `Цветов в букете: ${flowerCount}`;
    const f = document.createElement('div');
    f.className = 'flower-item pos-abs';
    f.innerText = ['🌹', '🌸', '💐', '🌺', '🌷', '🌻'][Math.floor(Math.random() * 6)];
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 100;
    f.style.left = (Math.cos(angle) * radius + 110) + 'px';
    f.style.top = (Math.sin(angle) * radius + 110) + 'px';
    document.getElementById('flowers-container').appendChild(f);
    if (flowerCount % 5 === 0) shootConfettiOrange();
});

function createBalloon() {
    const b = document.createElement('div');
    b.className = 'balloon';
    const size = 50 + Math.random() * 30;
    b.style.left = Math.random() * 90 + 'vw';
    b.style.width = size + 'px';
    b.style.height = (size * 1.2) + 'px';
    b.style.backgroundColor = Math.random() > 0.5 ? '#ff8c00' : '#1a1a1a';
    b.style.border = '1px solid rgba(255,255,255,0.2)';
    document.getElementById('balloon-container').appendChild(b);
    const a = b.animate([{transform:'translateY(0)'},{transform:'translateY(-120vh)'}], {duration:8000+Math.random()*4000});
    a.onfinish = () => b.remove();
}

let currentSlide = 0;
const totalSlides = 4;
function updateSlider() { slider.style.transform = `translateX(-${currentSlide * 350}px)`; }
nextBtn.addEventListener('click', () => { currentSlide = (currentSlide + 1) % totalSlides; updateSlider(); });
prevBtn.addEventListener('click', () => { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateSlider(); });

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.wish-item').forEach(item => item.classList.add('visible'));
            if (entry.target.querySelector('#matrixCanvas')) startMatrixEffect();
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.section').forEach(s => observer.observe(s));

function startMatrixEffect() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const words = "ДЕНЬГИ ТЁЛКИ ТАЧКИ СЧАСТЬЯ ЗДОРОВЬЯ АЛКОГОЛЯ".split(" ");
    const drops = Array(Math.floor(canvas.width / 20)).fill(0);
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#39f27cff'; ctx.font = '25px monospace';
        drops.forEach((y, i) => {
            ctx.fillText(words[Math.floor(Math.random()*words.length)], i * 30, y * 10);
            if (y * 10 > canvas.height && Math.random() > 0.975) 
                drops[i] = 0;
            drops[i]++;
        });
        requestAnimationFrame(draw);
    }
    draw();
}