// script.js for TANJO Foods

// Navbar scroll effect with enhanced animation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for hero elements
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.image-container');
    
    if (heroContent && scrollY < 500) {
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
    
    if (heroImage && scrollY < 500) {
        heroImage.style.transform = `translateY(${scrollY * 0.1}px) perspective(1000px) rotateY(-5deg) rotateX(2deg)`;
    }
});

// Smooth scrolling for anchor links with enhanced effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Add scroll animation
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Add active class to section
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('active-section');
            });
            targetElement.classList.add('active-section');
            
            // Close mobile navbar if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Enhanced product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-20px) scale(1.02)';
        this.style.boxShadow = '0 40px 80px rgba(255, 107, 53, 0.25)';
        
        // Add glow effect
        this.style.borderColor = 'var(--primary-orange)';
        this.style.borderWidth = '3px';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 20px 50px rgba(139, 69, 19, 0.1)';
        
        // Remove glow effect
        this.style.borderColor = 'var(--primary-cream)';
        this.style.borderWidth = '2px';
    });
});

// Enhanced retailer card hover effects
document.querySelectorAll('.retailer-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)';
        this.style.boxShadow = '0 40px 80px rgba(255, 107, 53, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 20px 50px rgba(139, 69, 19, 0.1)';
    });
});

// Animate elements on scroll with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('product-card') || 
                entry.target.classList.contains('retailer-card')) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            } else if (entry.target.classList.contains('feature-item')) {
                entry.target.style.animation = 'slideInRight 0.6s ease forwards';
            } else if (entry.target.classList.contains('quality-image')) {
                entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
            } else if (entry.target.classList.contains('quality-content')) {
                entry.target.style.animation = 'slideInRight 0.8s ease forwards';
            }
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .retailer-card, .feature-item, .quality-image, .quality-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .active-section {
        animation: highlightSection 0.5s ease;
    }
    
    @keyframes highlightSection {
        0% { background-color: transparent; }
        50% { background-color: rgba(255, 107, 53, 0.05); }
        100% { background-color: transparent; }
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Floating image animation enhancement
const floatingImages = document.querySelectorAll('.floating-image');
floatingImages.forEach((image, index) => {
    image.style.animationDelay = `${index * 2}s`;
    
    // Add random rotation on hover
    image.addEventListener('mouseenter', function() {
        const randomRotation = Math.random() * 20 - 10;
        this.style.transform = `scale(1.2) rotate(${randomRotation}deg)`;
    });
    
    image.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Form submission for contact page
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state with animation
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';
        
        // Add form validation
        const formData = new FormData(this);
        let isValid = true;
        
        // Simple validation
        formData.forEach((value, key) => {
            if (!value.trim() && key !== 'company') {
                isValid = false;
                const input = this.querySelector(`[name="${key}"]`);
                input.classList.add('is-invalid');
            }
        });
        
        if (!isValid) {
            // Show error message
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-4';
            alertDiv.innerHTML = `
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>Error!</strong> Please fill in all required fields.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            // Insert alert after form
            this.parentNode.insertBefore(alertDiv, this.nextSibling);
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-4 animate__animated animate__fadeIn';
            alertDiv.innerHTML = `
                <i class="bi bi-check-circle-fill me-2"></i>
                <strong>Thank you!</strong> Your message has been sent. We'll contact you soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            // Insert alert after form
            this.parentNode.insertBefore(alertDiv, this.nextSibling);
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            // Add confetti effect on success
            createConfetti();
            
            // Auto-hide alert after 5 seconds
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    const bsAlert = new bootstrap.Alert(alertDiv);
                    bsAlert.close();
                }
            }, 5000);
        }, 1500);
    });
    
    // Remove invalid class on input
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
}

// Confetti effect for success messages
function createConfetti() {
    const colors = ['#FF6B35', '#C44536', '#FFD166', '#2A9D8F'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            opacity: ${Math.random() * 0.5 + 0.5};
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Page load animation with enhanced effects
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Animate hero elements sequentially
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s forwards`;
                el.style.opacity = '1';
            }, 100);
        });
    }, 100);
});

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="bi bi-chevron-up"></i>';
scrollToTopBtn.className = 'btn-scroll-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
`;

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(100px)';
    }
});

document.body.appendChild(scrollToTopBtn);

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-10px) scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = window.scrollY > 500 ? 'translateY(0) scale(1)' : 'translateY(100px)';
    scrollToTopBtn.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.3)';
});