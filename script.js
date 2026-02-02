document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const maybeBtn = document.getElementById('maybe-btn');
    const yesBtn = document.getElementById('yes-btn');
    const overlay = document.getElementById('overlay');
    const audioToggle = document.getElementById('audio-toggle');
    const bgMusic = document.getElementById('bg-music');
    const closeOverlay = document.getElementById('close-overlay');

    // 1. Create Floating Hearts with variety
    const heartSymbols = ['❤️', '💖', '💗', '💓', '💕'];
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 3 + 4 + 's';
        heart.style.animationDuration = duration;
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.filter = `blur(${Math.random() * 2}px)`;
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, parseFloat(duration) * 1000);
    }

    setInterval(createHeart, 300);

    // 2. Playful Moving Button
    maybeBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - maybeBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - maybeBtn.offsetHeight);

        maybeBtn.style.position = 'fixed';
        maybeBtn.style.left = x + 'px';
        maybeBtn.style.top = y + 'px';
    });

    // 3. Audio Toggle
    let isPlaying = false;
    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            audioToggle.querySelector('.icon').innerText = '🔇';
        } else {
            bgMusic.play().catch(e => console.log("Audio play blocked by browser"));
            audioToggle.querySelector('.icon').innerText = '🎵';
        }
        isPlaying = !isPlaying;
    });

    // 4. Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 5. Final Message Overlay
    yesBtn.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        createConfetti();
    });

    closeOverlay.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });

    // 6. Confetti for the end
    function createConfetti() {
        const colors = ['#ff4d6d', '#ff85a1', '#ffb3c1', '#ffffff'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '1001';
            confetti.style.borderRadius = '50%';

            overlay.appendChild(confetti);

            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 2000,
                easing: 'cubic-bezier(0, .9, .6, 1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }
});
