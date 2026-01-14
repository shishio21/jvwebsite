// Mobile Menu Toggle
const toggler = document.getElementById('toggler');
const navbar = document.querySelector('.navbar');

// Don't auto-close menu when clicking navbar links on mobile
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Only close menu on mobile screens
        if(window.innerWidth <= 768) {
            toggler.checked = false;
        }
    });
});

// ===== CAROUSEL FUNCTIONALITY =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

// Change slide function
function changeSlide(direction) {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide += direction;
    
    // Loop around if at the end or beginning
    if(currentSlide >= slides.length) {
        currentSlide = 0;
    }
    if(currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Go to specific slide
function goToSlide(slideIndex) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = slideIndex;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Auto-play carousel every 5 seconds
let autoplayInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

// Pause autoplay when hovering over carousel
const carouselContainer = document.querySelector('.carousel-container');
if(carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if(e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Help Section - Search Functionality
const helpSearch = document.getElementById('helpSearch');
const helpBoxes = document.querySelectorAll('.help-box');
const faqItems = document.querySelectorAll('.faq-item');

if(helpSearch) {
    helpSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // Search through help boxes
        helpBoxes.forEach(box => {
            const title = box.querySelector('h3').textContent.toLowerCase();
            const content = box.querySelector('p').textContent.toLowerCase();
            
            if(title.includes(searchTerm) || content.includes(searchTerm)) {
                box.style.display = 'block';
                box.style.animation = 'fadeIn 0.3s';
            } else {
                box.style.display = 'none';
            }
        });
        
        // Search through FAQ items
        faqItems.forEach(item => {
            const question = item.querySelector('h4').textContent.toLowerCase();
            const answer = item.querySelector('p').textContent.toLowerCase();
            
            if(question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.3s';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show all if search is empty
        if(searchTerm === '') {
            helpBoxes.forEach(box => box.style.display = 'block');
            faqItems.forEach(item => item.style.display = 'block');
        }
    });
}

// Search button functionality
const searchBtn = document.querySelector('.search-btn');
if(searchBtn) {
    searchBtn.addEventListener('click', function() {
        const searchTerm = helpSearch.value.toLowerCase();
        if(searchTerm) {
            // Trigger the search
            helpSearch.dispatchEvent(new Event('input'));
        }
    });
}

// Add to Cart functionality
const addToCartBtns = document.querySelectorAll('.products .btn');
let cartCount = 0;

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get product details
        const productBox = this.closest('.box');
        const productName = productBox.querySelector('h3').textContent;
        const productPrice = productBox.querySelector('.price').textContent;
        
        // Increment cart count
        cartCount++;
        
        // Show notification
        showNotification(`${productName} added to cart!`);
        
        // Add animation to button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Notification function
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Contact Form Validation and Submission
const contactForm = document.querySelector('.contact form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form inputs
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        // Validate inputs
        inputs.forEach(input => {
            if(input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = 'red';
                
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
        
        if(isValid) {
            // Show success message
            showNotification('Message sent successfully! We will get back to you soon.');
            
            // Reset form
            this.reset();
        } else {
            showNotification('Please fill in all fields!');
        }
    });
}

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if(window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ Toggle (expandable answers)
faqItems.forEach(item => {
    const question = item.querySelector('h4');
    const answer = item.querySelector('p');
    
    // Initially hide answers
    answer.style.display = 'block'; // Keep visible by default
    
    question.style.cursor = 'pointer';
    question.addEventListener('click', () => {
        // Toggle answer visibility
        if(answer.style.maxHeight && answer.style.maxHeight !== '0px') {
            answer.style.maxHeight = '0px';
            answer.style.opacity = '0';
            answer.style.marginTop = '0';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            answer.style.marginTop = '1rem';
        }
    });
});

// Product hover effect
const productBoxes = document.querySelectorAll('.products .box');
productBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.box, .help-box, .icons').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});