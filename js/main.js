// Prevent page from reloading at previous scroll position (especially on mobile)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Menu icon functionality
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;

// Toggle mobile menu
const toggleMenu = () => {
    navbar.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
};

menuIcon.addEventListener('click', toggleMenu);

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking overlay
menuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking outside (desktop edge case)
document.addEventListener('click', (e) => {
    if (navbar.classList.contains('active') && !navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        toggleMenu();
    }
});

// Handle scroll events - only for shadow effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    // Add/remove shadow based on scroll
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Create Intersection Observer to handle section visibility
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Observe all sections
sections.forEach(section => observer.observe(section));

// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

// Show button when scrolled down 300px
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

// Smooth scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Save theme preference
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
}); 