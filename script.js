// ===================
// THEME TOGGLE
// ===================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ===================
// MOBILE NAVIGATION
// ===================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ===================
// SMOOTH SCROLLING
// ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===================
// HEADER SCROLL EFFECT
// ===================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// ===================
// ACTIVE NAVIGATION LINK
// ===================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (scrollY >= (section.offsetTop - 200)) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ===================
// SKILLS & TECH STACK ANIMATIONS
// ===================
function animateSkills() {
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        const skillValue = parseInt(item.dataset.skill);
        const skillColor = item.dataset.color;
        const circle = item.querySelector('.circle-progress');
        const percentage = item.querySelector('.skill-percentage');

        circle.style.stroke = skillColor;
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (skillValue / 100) * circumference;

        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
            let current = 0;
            const increment = skillValue / 100;
            const timer = setInterval(() => {
                current += increment;
                percentage.textContent = Math.floor(current) + '%';
                if (current >= skillValue) {
                    clearInterval(timer);
                    percentage.textContent = skillValue + '%';
                }
            }, 20);
        }, index * 200);
    });
}

function animateTechStack() {
    document.querySelectorAll('.tech-item').forEach((item, index) => {
        setTimeout(() => item.classList.add('animate'), index * 200);
    });
}

// ===================
// INTERSECTION OBSERVER
// ===================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'skills') animateSkills();
            if (entry.target.id === 'tech') animateTechStack();
            entry.target.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('animated'));
        }
    });
}, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

sections.forEach(section => observer.observe(section));

// ===================
// ADD CLASSES ON LOAD
// ===================
document.addEventListener('DOMContentLoaded', () => {
    ['.about-text', '.about-image', '.skill-item', '.tech-item', '.project-card', '.contact-info', '.contact-form']
        .forEach(selector => document.querySelectorAll(selector).forEach(el => el.classList.add('animate-on-scroll')));

    document.body.classList.add('loading');
    document.querySelectorAll('.circle-progress').forEach(circle => {
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
    });

    console.log('Portfolio loaded successfully! 🚀');
});

// ===================
// CONTACT FORM (EMAILJS)
// ===================
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('service_6vgalnq', 'template_pj2ove1', this)
        .then(() => alert('Message sent successfully!'))
        .catch(error => {
            alert('Failed to send message. Please try again.');
            console.error('Error:', error);
        });
});

// ===================
// NOTIFICATION SYSTEM
// ===================
function showNotification(message, type = 'info') {
    // (your notification code stays the same)
}

// ===================
// BACK TO TOP BUTTON
// ===================
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 500));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===================
// HERO TYPING ANIMATION
// ===================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    (function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i++);
            setTimeout(type, speed);
        }
    })();
}
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    setTimeout(() => typeWriter(heroTitle, heroTitle.textContent, 50), 500);
});

// ===================
// PARALLAX SHAPES
// ===================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.shape').forEach((shape, i) => {
        const speed = (i + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// ===================
// PROJECT CARD HOVER
// ===================
// Project hover effect
document.querySelectorAll('.project-item').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px) scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

