// --- DATA ---
const products = [
    { id: 1, title: "Cyberghost Vpn - 1 Year", price: 5.00, theme: "theme-yellow", icon: "fa-ghost", image: "images/cyberghost.png" },
    { id: 2, title: "VPS Ubuntu 24.04 LTS", price: 8.00, theme: "theme-orange", icon: "fa-ubuntu", image: "images/vps_ubuntu.png" },
    { id: 3, title: "Spotify Premium", price: 2.50, theme: "theme-purple", icon: "fa-spotify", image: "images/spotify.png" },
    { id: 4, title: "Netflix 4K Shared", price: 3.50, theme: "theme-pink", icon: "fa-play", image: "images/netflix.png" },
    { id: 5, title: "Canva Pro Lifetime", price: 4.00, theme: "theme-blue", icon: "fa-pen-nib", image: "images/canva.png" },
    { id: 6, title: "Youtube Premium", price: 2.00, theme: "theme-orange", icon: "fa-youtube", image: "images/youtube.png" },
    { id: 7, title: "ChatGPT Plus", price: 6.50, theme: "theme-yellow", icon: "fa-robot", image: null },
    { id: 8, title: "Adobe Creative Cloud", price: 7.00, theme: "theme-blue", icon: "fa-adobe", image: null }
];

let cart = [];
let currentPaymentMethod = null;

// --- QR CODE SWITCHING (USD/KHR) ---
function switchQR(currency) {
    const qrUSD = document.getElementById('qrUSD');
    const qrKHR = document.getElementById('qrKHR');
    const tabUSD = document.getElementById('tabUSD');
    const tabKHR = document.getElementById('tabKHR');

    if (currency === 'usd') {
        qrUSD.style.display = 'block';
        qrKHR.style.display = 'none';
        tabUSD.classList.add('active');
        tabKHR.classList.remove('active');
    } else {
        qrUSD.style.display = 'none';
        qrKHR.style.display = 'block';
        tabUSD.classList.remove('active');
        tabKHR.classList.add('active');
    }
}

// --- NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// --- MOBILE MENU TOGGLE ---
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenuOverlay');
    mobileMenu.classList.toggle('active');

    // Prevent body scroll when mobile menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Update mobile cart count when cart changes
function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const countBadge = document.getElementById('cartCount');
    const mobileCountBadge = document.getElementById('mobileCartCount');
    const totalDisplay = document.getElementById('cartTotalDisplay');

    countBadge.innerText = cart.length;
    // Update mobile cart count as well
    if (mobileCountBadge) {
        mobileCountBadge.innerText = cart.length;
    }

    let total = 0;
    let html = '';

    if (cart.length === 0) {
        html = '<div class="kh-text" style="text-align:center; margin-top:50px;">មិនទាន់មានទំនិញ</div>';
    } else {
        cart.forEach(item => {
            total += item.price;
            html += `
                <div class="cart-item">
                    <div class="item-icon"><i class="fa-brands ${item.icon}"></i></div>
                    <div style="flex-grow:1;">
                        <div style="font-weight:bold;">${item.title}</div>
                        <div style="color:#06b6d4;">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="item-remove" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></div>
                </div>
            `;
        });
    }
    container.innerHTML = html;
    totalDisplay.innerText = "$" + total.toFixed(2);
}

// Products are now rendered in static HTML

// --- STATS COUNTER ANIMATION ---
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Run counter animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateCounters, 500);
});

// --- CART LOGIC ---
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('open');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : 'auto';
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (cart.find(item => item.id === id)) {
        showNotification("ទំនិញនេះមានរួចហើយនៅក្នុងកន្រ្តក!");
    } else {
        cart.push(product);
        updateCartUI();
        document.getElementById('cartSidebar').classList.add('open');
        showNotification(`✓ បានបន្ថែម ${product.title}`);
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}


function showNotification(msg) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.innerText = msg;
    document.body.appendChild(notif);
    setTimeout(() => { notif.remove(); }, 3000);
}

// --- CHECKOUT ---
const modal = document.getElementById('checkoutModal');
const confirmBtn = document.getElementById('confirmBtn');
const uploadText = document.getElementById('uploadText');

function proceedToCheckout() {
    if (cart.length === 0) return showNotification("សូមបន្ថែមទំនិញសិន!");
    toggleCart();
    modal.classList.add('active');

    let listHtml = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        listHtml += `<div class="order-row"><span>${item.title}</span><span>$${item.price.toFixed(2)}</span></div>`;
    });
    document.getElementById('checkoutOrderList').innerHTML = listHtml;
    document.getElementById('checkoutTotal').innerText = "$" + total.toFixed(2);
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('telegramUsername').value = '';
    currentPaymentMethod = null;
    confirmBtn.classList.remove('active');
}

function handleFileSelect(input) {
    if (input.files[0]) {
        uploadText.innerText = "✓ " + input.files[0].name.substring(0, 15) + "...";
        currentPaymentMethod = 'upload';
        validateCheckout();
    }
}

function sendPaymentToBot() {
    if (!document.getElementById('telegramUsername').value) return showNotification("សូមបំពេញ Telegram Username!");
    currentPaymentMethod = 'bot';
    uploadText.innerText = "✓ Sent to Bot";
    validateCheckout();
    alert("បានជ្រើសរើសការទូទាត់តាម Bot");
}

function validateCheckout() {
    const telegram = document.getElementById('telegramUsername').value;
    if (telegram && currentPaymentMethod) confirmBtn.classList.add('active');
    else confirmBtn.classList.remove('active');
}

async function finishPurchase() {
    alert("✅ ការកម្មង់បានជោគជ័យ! យើងនឹងទំនាក់ទំនងទៅអ្នកឆាប់ៗ។");
    cart = [];
    updateCartUI();
    closeModal();
}