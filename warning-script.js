// ===================================
// WARNING PAGE - JAVASCRIPT
// ===================================

// ===================================
// DARK/LIGHT MODE TOGGLE
// ===================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ===================================
// CHRISTMAS SNOWFALL EFFECT
// ===================================
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

    document.querySelector('.snowfall-container').appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// Create snowflakes periodically
setInterval(createSnowflake, 200);

// ===================================
// CHRISTMAS LIGHTS
// ===================================
const lightsContainer = document.querySelector('.christmas-lights');
for (let i = 0; i < 30; i++) {
    const light = document.createElement('div');
    light.classList.add('light');
    lightsContainer.appendChild(light);
}

// ===================================
// ACCEPT BUTTON FUNCTIONALITY
// ===================================
const acceptBtn = document.getElementById('acceptBtn');

acceptBtn.addEventListener('click', () => {
    // Store acceptance in localStorage
    localStorage.setItem('warningAccepted', 'true');
    localStorage.setItem('warningAcceptedDate', new Date().toISOString());

    // Show confirmation notification
    showNotification('✅ Thank you! You can now proceed safely. Happy Holidays! 🎄');

    // Optional: Redirect to home after a delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4), 0 0 20px rgba(255, 215, 0, 0.5);
        z-index: 3000;
        animation: slideInUp 0.3s ease;
        font-weight: 600;
        border: 2px solid #ffd700;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all warning cards
document.querySelectorAll('.warning-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// BUTTON CLICK EFFECTS
// ===================================
const allButtons = document.querySelectorAll('.action-btn, .support-btn');

allButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        // Don't create ripple if it's a link that navigates
        if (this.classList.contains('back') || this.classList.contains('support-btn')) {
            return;
        }

        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===================================
// CHRISTMAS CURSOR TRAIL (STARS)
// ===================================
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 12px;
            pointer-events: none;
            z-index: 9999;
            animation: starFade 1s ease-out forwards;
        `;
        document.body.appendChild(star);

        setTimeout(() => star.remove(), 1000);
    }
});

// Add star fade animation
const starStyle = document.createElement('style');
starStyle.textContent = `
    @keyframes starFade {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-30px);
        }
    }
`;
document.head.appendChild(starStyle);

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// WARNING CARD INTERACTION
// ===================================
const warningCards = document.querySelectorAll('.warning-card');

warningCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// CHECK IF WARNING WAS ALREADY ACCEPTED
// ===================================
window.addEventListener('load', () => {
    const warningAccepted = localStorage.getItem('warningAccepted');
    const acceptedDate = localStorage.getItem('warningAcceptedDate');

    if (warningAccepted === 'true' && acceptedDate) {
        const date = new Date(acceptedDate);
        const now = new Date();
        const daysDifference = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        // Show a different message if they already accepted within the last 7 days
        if (daysDifference < 7) {
            setTimeout(() => {
                showNotification(`Welcome back! You accepted the warning ${daysDifference} day(s) ago. 🎄`);
            }, 1000);
        }
    }
});

// ===================================
// CONSOLE CHRISTMAS MESSAGE
// ===================================
console.log('%c🎄 Warning Page Loaded! 🎅', 'font-size: 24px; font-weight: bold; color: #c41e3a; text-shadow: 2px 2px 4px #ffd700;');
console.log('%c⚠️ Please read all warnings carefully! ⚠️', 'font-size: 16px; color: #f59e0b; font-weight: bold;');
console.log('%c🎁 Stay safe and Happy Holidays! 🎁', 'font-size: 14px; color: #10b981;');

// ===================================
// INITIALIZE
// ===================================
console.log('🎄 Warning page initialized successfully');
console.log('❄️ Snowfall animations active');
console.log('⭐ Christmas lights twinkling');
console.log('🎅 All systems ready - Stay safe!');
