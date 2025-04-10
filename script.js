// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem';
        navbar.style.backgroundColor = '#f98c72';
    } else {
        navbar.style.padding = '1rem';
        navbar.style.backgroundColor = '#fdac98';
    }
});

// Project card animation on scroll
const projectCards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.animation = 'fadeIn 0.5s ease-in forwards';
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => observer.observe(card));