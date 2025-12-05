// ===== PARTICLE SYSTEM =====
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        else if (this.x < 0) this.x = this.canvas.width;

        if (this.y > this.canvas.height) this.y = 0;
        else if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    particlesContainer.appendChild(canvas);

    const particles = [];
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize particles when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

if (searchButton && searchInput) {
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        // You can customize this to redirect to your search page
        window.location.href = `/?search=${encodeURIComponent(query)}`;
    }
}

// ===== ENHANCED ANIMATIONS =====
// Add intersection observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.error-actions, .search-container, .quick-links').forEach(el => {
    observer.observe(el);
});

// ===== MOUSE TRAIL EFFECT =====
let mouseTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }

    drawMouseTrail();
});

function drawMouseTrail() {
    // Remove old trail elements
    document.querySelectorAll('.mouse-trail').forEach(el => {
        const age = Date.now() - parseInt(el.dataset.time);
        if (age > 500) {
            el.remove();
        }
    });
}

// ===== DYNAMIC BACKGROUND MOVEMENT =====
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 20;

    const glitchWrapper = document.querySelector('.glitch-wrapper');
    if (glitchWrapper) {
        glitchWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Press 'H' to go home
    if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) {
        const homeBtn = document.querySelector('.btn-primary');
        if (homeBtn && document.activeElement.tagName !== 'INPUT') {
            homeBtn.click();
        }
    }

    // Press 'B' to go back
    if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.metaKey) {
        const backBtn = document.querySelector('.btn-secondary');
        if (backBtn && document.activeElement.tagName !== 'INPUT') {
            backBtn.click();
        }
    }

    // Press '/' to focus search
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        searchInput?.focus();
    }
});

// ===== RANDOM COLOR SHIFT =====
function randomColorShift() {
    const root = document.documentElement;
    const hue = Math.random() * 60 + 260; // Range: 260-320
    root.style.setProperty('--primary-h', hue);

    setTimeout(randomColorShift, 10000); // Change every 10 seconds
}

// Start color shift after a delay
setTimeout(randomColorShift, 5000);

// ===== FLOATING ELEMENTS INTERACTION =====
const floatingElements = document.querySelectorAll('.float-element');

floatingElements.forEach((element, index) => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.5) rotate(360deg)';
        element.style.filter = 'blur(0)';
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = '';
        element.style.filter = 'blur(1px)';
    });
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect styles dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== EASTER EGG: KONAMI CODE =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 10000);

    showNotification('🎉 Easter egg activated! Enjoy the rainbow!');
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.9));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 3s;
        backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3500);
}

const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===== PAGE LOADED MESSAGE =====
console.log('%c404 Page Loaded! 🚀', 'font-size: 20px; color: #a855f7; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'font-size: 14px; color: #ec4899;');
console.log('  Press H → Go Home');
console.log('  Press B → Go Back');
console.log('  Press / → Focus Search');
console.log('%cTry the Konami Code! ↑↑↓↓←→←→BA', 'font-size: 12px; color: #60a5fa;');

// Show welcome notification after a short delay
setTimeout(() => {
    showNotification('💡 Tip: Press "H" to go home or "/" to search!');
}, 2000);
