// ==========================================
// MODERN PORTFOLIO FUNCTIONALITY
// ==========================================

// 1. THEME TOGGLE
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// 2. MOBILE NAVIGATION
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// 3. SMOOTH SCROLLING FOR NAVIGATION LINKS
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 4. ACTIVE NAVIGATION HIGHLIGHTING
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navHeight = document.querySelector('nav').offsetHeight;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkTarget = link.getAttribute('href').substring(1);

        if (linkTarget === currentSection) {
            link.classList.add('active');
        }
    });
}

// 5. INTERSECTION OBSERVER FOR ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('section, .project-card, .testimonial-card, .timeline-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// 6. SKILL BARS ANIMATION
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// 7. PROJECT CARDS HOVER EFFECTS
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 8. CONTACT FORM HANDLING
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Basic form validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (replace with actual form handling)
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');

        // Reset form
        this.reset();
    });
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    if (type === 'success') {
        notification.style.background = '#10b981';
    } else {
        notification.style.background = '#ef4444';
    }

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// 9. SCROLL TO TOP BUTTON
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 10. TYPING ANIMATION FOR HERO
function initTypingAnimation() {
    const heroDescription = document.querySelector('.hero-description');
    if (!heroDescription) return;

    const text = heroDescription.textContent;
    heroDescription.textContent = '';
    heroDescription.style.borderRight = '2px solid white';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroDescription.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            heroDescription.style.borderRight = 'none';
        }
    };

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// 11. PARTICLE BACKGROUND EFFECT (Optional)
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        pointer-events: none;
        z-index: -1;
    `;

    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.floor(window.innerWidth / 20);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// 12. KEYBOARD SHORTCUTS
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Could implement search functionality here
    }

    // H key to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
    }

    // C key to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }

    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        document.querySelector('.nav-links')?.classList.remove('active');
        document.getElementById('navToggle')?.classList.remove('active');
    }
});

// 13. PERFORMANCE OPTIMIZATIONS
function initPerformanceOptimizations() {
    // Lazy load images (if any)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce scroll events
    let scrollTimeout;
    const debouncedScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 10);
    };

    window.addEventListener('scroll', debouncedScroll);
}

// 14. ACCESSIBILITY IMPROVEMENTS
function initAccessibility() {
    // Add focus indicators
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Announce page changes to screen readers
    const announcePageChange = (pageTitle) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';

        announcement.textContent = `Navigated to ${pageTitle}`;
        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    };

    // Skip to main content link (add to HTML if needed)
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

// 15. ANALYTICS AND TRACKING (Optional)
function initAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }

    // Track button clicks
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', () => {
            // Track clicks (implement based on your analytics setup)
            console.log('Clicked:', element.textContent.trim() || element.getAttribute('aria-label'));
        });
    });
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    updateActiveNav();
    animateSkillBars();
    initContactForm();
    initScrollToTop();
    initTypingAnimation();
    initParticleBackground();
    initPerformanceOptimizations();
    initAccessibility();
    initAnalytics();

    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNav);

    // Handle window resize
    window.addEventListener('resize', () => {
        // Close mobile menu on resize if open
        if (window.innerWidth > 768) {
            document.querySelector('.nav-links')?.classList.remove('active');
            document.getElementById('navToggle')?.classList.remove('active');
        }
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .keyboard-navigation a:focus,
    .keyboard-navigation button:focus {
        outline: 2px solid var(--accent-primary);
        outline-offset: 2px;
    }

    .nav-links.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        border-top: 1px solid var(--border-color);
        flex-direction: column;
        padding: 1rem;
        box-shadow: var(--shadow-lg);
    }

    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }

        .nav-links.active {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c🚀 Welcome to Trish Kabudura\'s Portfolio!', 'font-size: 18px; color: #3b82f6; font-weight: bold;');
console.log('%c💻 Built with modern web technologies', 'font-size: 14px; color: #64748b;');
console.log('%c🎨 Featuring dark mode, smooth animations, and responsive design', 'font-size: 14px; color: #64748b;');

// 2. ACTIVE NAVIGATION HIGHLIGHTING
function updateActiveNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.style.opacity = "1";
        link.style.fontWeight = "500";

        const linkTarget = link.getAttribute("href").substring(1);
        if (linkTarget === currentSection) {
            link.style.opacity = "0.85";
            link.style.fontWeight = "700";
        }
    });
}

window.addEventListener("scroll", updateActiveNav);

// 3. INTERSECTION OBSERVER FOR SECTION ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll("section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
});

// 4. PROJECT CARDS INTERACTION
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mouseenter", function () {
        this.style.boxShadow = "0 14px 28px rgba(15, 76, 129, 0.25)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.boxShadow = "";
    });
});

// 5. HEADER SHADOW ON SCROLL
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    if (!header) return;
    if (window.scrollY > 40) {
        header.style.boxShadow = "0 18px 34px rgba(15, 76, 129, 0.33)";
    } else {
        header.style.boxShadow = "0 14px 32px rgba(15, 76, 129, 0.25)";
    }
});

// 6. SCROLL TO TOP BUTTON
function createScrollToTopButton() {
    const button = document.createElement("button");
    button.id = "scrollToTop";
    button.innerHTML = "Top";
    button.style.cssText = `
        position: fixed;
        bottom: 22px;
        right: 22px;
        background: linear-gradient(135deg, #0f4c81 0%, #1f7dbf 100%);
        color: white;
        border: none;
        padding: 11px 16px;
        border-radius: 999px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 700;
        display: none;
        z-index: 1000;
        box-shadow: 0 8px 20px rgba(15, 76, 129, 0.35);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(button);

    window.addEventListener("scroll", function () {
        button.style.display = window.scrollY > 280 ? "block" : "none";
    });

    button.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

createScrollToTopButton();

// 7. CONTACT LINK TRACKING
document.querySelectorAll("a").forEach(link => {
    if (
        link.href.includes("mailto:") ||
        link.href.includes("github") ||
        link.href.includes("linkedin") ||
        link.href.includes("wa.me")
    ) {
        link.addEventListener("click", function () {
            console.log("Contact link clicked:", this.href);
        });
    }
});

// 8. WHATSAPP INTERACTION
function initWhatsAppInteraction() {
    const whatsappBtn = document.getElementById("whatsappBtn");
    const messageField = document.getElementById("whatsappMessage");

    if (!whatsappBtn || !messageField) return;

    whatsappBtn.addEventListener("click", function () {
        const whatsappNumber = whatsappBtn.dataset.whatsappNumber;
        const typedMessage = messageField.value.trim();
        const defaultMessage = "Hi Trish, I would like to connect with you about a project.";
        const message = typedMessage || defaultMessage;

        if (!whatsappNumber || whatsappNumber === "263000000000") {
            alert("Please update your real WhatsApp number in data-whatsapp-number first.");
            return;
        }

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    });
}

initWhatsAppInteraction();

// 9. PAGE LOAD ANIMATION
window.addEventListener("load", function () {
    document.body.style.opacity = "1";
});

document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";
setTimeout(function () {
    document.body.style.opacity = "1";
}, 100);

// 10. RESPONSIVE NAV MENU (Mobile support)
function createMobileMenu() {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const navList = nav.querySelector("ul");
    if (!navList) return;

    const existingButton = document.getElementById("mobileMenuToggle");
    if (existingButton) return;

    const toggleBtn = document.createElement("button");
    toggleBtn.id = "mobileMenuToggle";
    toggleBtn.innerHTML = "Menu";
    toggleBtn.style.cssText = `
        display: none;
        background: #0a3a63;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 9px 14px;
        font-size: 15px;
        cursor: pointer;
        border-radius: 8px;
        margin: 8px auto;
        font-weight: 700;
    `;

    function syncMenuForViewport() {
        if (window.innerWidth <= 768) {
            toggleBtn.style.display = "block";
            if (!toggleBtn.dataset.open) {
                navList.style.display = "none";
            }
            navList.style.flexDirection = "column";
            navList.style.alignItems = "center";
        } else {
            toggleBtn.style.display = "none";
            navList.style.display = "flex";
            navList.style.flexDirection = "row";
        }
    }

    toggleBtn.addEventListener("click", function () {
        const isHidden = navList.style.display === "none";
        navList.style.display = isHidden ? "flex" : "none";
        toggleBtn.dataset.open = isHidden ? "yes" : "";
    });

    nav.insertBefore(toggleBtn, navList);
    syncMenuForViewport();
    window.addEventListener("resize", syncMenuForViewport);
}

createMobileMenu();

// 11. KEYBOARD NAVIGATION
document.addEventListener("keydown", function (e) {
    if (e.key === "h" || e.key === "H") {
        document.querySelector("header")?.scrollIntoView({ behavior: "smooth" });
    }
    if (e.key === "c" || e.key === "C") {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }
});

// 12. CONSOLE MESSAGE
console.log("%cWelcome to Trish Kabudura's Portfolio!", "font-size: 18px; color: #0f4c81; font-weight: bold;");
console.log("%cLet's build something meaningful together.", "font-size: 14px; color: #475569;");
