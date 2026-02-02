document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const maybeBtn = document.getElementById('maybe-btn');
    const yesBtn = document.getElementById('yes-btn');
    const overlay = document.getElementById('overlay');
    const audioToggle = document.getElementById('audio-toggle');
    const bgMusic = document.getElementById('bg-music');
    const closeOverlay = document.getElementById('close-overlay');

    // New Landing Page Elements
    const landingPage = document.getElementById('landing-page');
    const enterBtn = document.getElementById('enter-btn');
    const container = document.querySelector('.container');

    // Pre-load audio
    bgMusic.load();

    // 1. Landing Page Transition & Audio Start
    const startExperience = () => {
        console.log("Starting experience...");

        // Try playing multiple ways
        forcePlayAudio();

        landingPage.classList.add('exit');
        container.classList.remove('hidden-content');

        setTimeout(() => {
            landingPage.style.display = 'none';
        }, 1200);
    };

    function forcePlayAudio() {
        bgMusic.muted = false; // Ensure not muted
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Playback started successfully");
                isPlaying = true;
                audioToggle.classList.add('playing');
            }).catch(error => {
                console.error("Playback failed:", error);
                // If it fails, try one more time on another click
                document.addEventListener('click', () => {
                    if (!isPlaying) {
                        bgMusic.play().then(() => {
                            isPlaying = true;
                            audioToggle.classList.add('playing');
                        });
                    }
                }, { once: true });
            });
        }
    }

    enterBtn.addEventListener('click', startExperience);
    document.querySelector('.heart-lock').addEventListener('click', startExperience);

    // 2. Create Floating Hearts
    const heartSymbols = ['❤️', '💖', '💗', '💓', '💕', '🌸', '✨'];
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 3 + 4 + 's';
        heart.style.animationDuration = duration;
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.filter = `blur(${Math.random() * 1}px)`;
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, parseFloat(duration) * 1000);
    }
    setInterval(createHeart, 400);

    // 3. Playful Moving Button
    maybeBtn.addEventListener('mouseover', () => {
        const padding = 50;
        const x = Math.random() * (window.innerWidth - maybeBtn.offsetWidth - padding * 2) + padding;
        const y = Math.random() * (window.innerHeight - maybeBtn.offsetHeight - padding * 2) + padding;

        maybeBtn.style.position = 'fixed';
        maybeBtn.style.left = x + 'px';
        maybeBtn.style.top = y + 'px';
        maybeBtn.style.zIndex = '999';
    });

    // 4. Audio Toggle Logic
    let isPlaying = false;

    audioToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            bgMusic.pause();
            audioToggle.classList.remove('playing');
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                isPlaying = true;
                audioToggle.classList.add('playing');
            }).catch(e => console.log("Manual play failed"));
        }
    });

    // 5. Fade-in Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 6. Overlay & Confetti
    yesBtn.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        createConfetti();
    });

    closeOverlay.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });

    function createConfetti() {
        const colors = ['#ff4d6d', '#ff85a1', '#ffb3c1', '#ffffff', '#ffccd5'];
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -20px;
                z-index: 1001;
                border-radius: 50%;
                opacity: ${Math.random()};
            `;
            overlay.appendChild(confetti);

            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 1, 0.1, 1)'
            }).onfinish = () => confetti.remove();
        }
    }
});
