// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Product Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        productItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !service || !message) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
    
    // Clear form
    this.reset();
    
    // In a real implementation, you would send this data to your server
    console.log('Form data:', { name, email, service, message });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .product-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects to product items
productItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 154, 158, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Product category counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.product-item');
    let count = 0;
    
    counters.forEach((item, index) => {
        if (item.style.display !== 'none') {
            count++;
        }
    });
    
    // You can add counter animation here if needed
}

// Update counter when filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTimeout(animateCounters, 300);
    });
});

// Add loading state to form submission
contactForm.addEventListener('submit', function() {
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Reset button after 3 seconds (in real app, this would be after server response)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

// Add click tracking for analytics (placeholder)
function trackEvent(eventName, element) {
    // In a real implementation, you would send this to Google Analytics or similar
    console.log(`Event: ${eventName}`, element);
}

// Track CTA button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('CTA Click', {
            text: e.target.textContent,
            href: e.target.getAttribute('href') || 'button'
        });
    });
});

// Track product item clicks
productItems.forEach(item => {
    item.addEventListener('click', () => {
        const productName = item.querySelector('h3').textContent;
        trackEvent('Product View', { productName });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Creaciones Vásquez G. website loaded successfully!');
    
    // Initialize all interactive features
    initializeTypingAnimation();
    initializeCounters();
    initializeTestimonials();
    initializeModals();
    initializeCustomizer();
    initializeProductViewer();
    
    // Add any initialization code here
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement && yearElement.textContent.includes('2024')) {
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }
});


// ========== TYPING ANIMATION ==========
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.getAttribute('data-text');
    typingElement.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// ========== ANIMATED COUNTERS ==========
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (target === 98 ? '%' : target === 500 ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ========== TESTIMONIALS CAROUSEL ==========
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function initializeTestimonials() {
    if (testimonials.length === 0) return;
    
    // Auto-advance testimonials
    setInterval(() => {
        changeTestimonial(1);
    }, 5000);
}

function changeTestimonial(direction) {
    testimonials[currentTestimonialIndex].classList.remove('active');
    dots[currentTestimonialIndex].classList.remove('active');
    
    currentTestimonialIndex += direction;
    
    if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    }
    
    testimonials[currentTestimonialIndex].classList.add('active');
    dots[currentTestimonialIndex].classList.add('active');
}

function currentTestimonial(index) {
    testimonials[currentTestimonialIndex].classList.remove('active');
    dots[currentTestimonialIndex].classList.remove('active');
    
    currentTestimonialIndex = index - 1;
    
    testimonials[currentTestimonialIndex].classList.add('active');
    dots[currentTestimonialIndex].classList.add('active');
}

// ========== MODAL SYSTEM ==========
let currentProduct = null;
const productData = {
    'ramo-rosa': {
        title: 'Ramo Eterno Rosa',
        description: 'Bouquet romántico con flores de cinta rosa y detalles dorados. Perfecto para aniversarios y ocasiones románticas.',
        price: '$25',
        basePrice: 25
    },
    'taza-personalizada': {
        title: 'Taza Personalizada',
        description: 'Taza de cerámica con diseño personalizado. Ideal para regalos corporativos o personales.',
        price: '$15',
        basePrice: 15
    },
    'arreglo-festivo': {
        title: 'Arreglo Festivo',
        description: 'Centro de mesa colorido con flores de limpiapipas. Perfecto para celebraciones y eventos.',
        price: '$30',
        basePrice: 30
    },
    'bouquet-girasoles': {
        title: 'Bouquet Girasoles',
        description: 'Arreglo inspirado en girasoles con cintas amarillas. Lleno de color y alegría.',
        price: '$35',
        basePrice: 35
    },
    'camiseta-personalizada': {
        title: 'Camiseta Personalizada',
        description: 'Playera con diseño sublimado personalizado. Algodón 100% de alta calidad.',
        price: '$20',
        basePrice: 20
    },
    'combo-romantico': {
        title: 'Combo Romántico',
        description: 'Ramo + taza personalizada para ocasiones especiales. El regalo perfecto.',
        price: '$45',
        basePrice: 45
    }
};

function initializeModals() {
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            // Check which modal is open and close it elegantly
            const productModal = document.getElementById('productModal');
            const customizerModal = document.getElementById('customizerModal');
            
            if (productModal && productModal.classList.contains('show')) {
                closeProductModal();
            }
            if (customizerModal && customizerModal.classList.contains('show')) {
                closeCustomizer();
            }
        }
    });
    
    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const productModal = document.getElementById('productModal');
            const customizerModal = document.getElementById('customizerModal');
            
            if (customizerModal && customizerModal.classList.contains('show')) {
                closeCustomizer();
            } else if (productModal && productModal.classList.contains('show')) {
                closeProductModal();
            }
        }
    });
}

function openProductModal(productId) {
    currentProduct = productId;
    const product = productData[productId];
    
    if (!product) return;
    
    // Update modal content
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = product.price;
    
    // Show modal with elegant animation
    const modal = document.getElementById('productModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Reset any closing classes
    modal.classList.remove('closing');
    modalContent.classList.remove('closing-content');
    
    // Show modal
    modal.style.display = 'flex';
    // Small delay to ensure display is set before adding show class
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Initialize color picker
    initializeColorPicker();
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Add closing animation class
    modal.classList.add('closing');
    modalContent.classList.add('closing-content');
    
    // Hide modal after animation completes
    setTimeout(() => {
        modal.classList.remove('show', 'closing');
        modalContent.classList.remove('closing-content');
        modal.style.display = 'none';
    }, 500);
}

function initializeColorPicker() {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const color = option.getAttribute('data-color');
            updateProductColor(color);
        });
    });
}

function updateProductColor(color) {
    const viewer = document.getElementById('productViewer360');
    if (viewer) {
        viewer.style.background = `linear-gradient(45deg, ${color}, ${adjustColor(color, 20)})`;
    }
}

function adjustColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// ========== CUSTOMIZER SYSTEM ==========
function initializeCustomizer() {
    // Update preview on input changes
    document.getElementById('customText')?.addEventListener('input', updatePreview);
    document.getElementById('primaryColor')?.addEventListener('change', updatePreview);
    document.getElementById('secondaryColor')?.addEventListener('change', updatePreview);
    document.getElementById('customQuantity')?.addEventListener('change', updateSummary);
}

function openCustomizer(productId = null) {
    if (!currentProduct && productId) {
        currentProduct = productId;
    }
    
    if (!currentProduct) return;
    
    const modal = document.getElementById('customizerModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Reset any closing classes
    modal.classList.remove('closing');
    modalContent.classList.remove('closing-content');
    
    // Show modal
    modal.style.display = 'flex';
    // Small delay to ensure display is set before adding show class
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Initialize preview
    updatePreview();
    updateSummary();
}

function closeCustomizer() {
    const modal = document.getElementById('customizerModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Add closing animation class
    modal.classList.add('closing');
    modalContent.classList.add('closing-content');
    
    // Hide modal after animation completes
    setTimeout(() => {
        modal.classList.remove('show', 'closing');
        modalContent.classList.remove('closing-content');
        modal.style.display = 'none';
    }, 500);
}

function updatePreview() {
    const previewItem = document.getElementById('previewItem');
    const customText = document.getElementById('customText').value;
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    
    if (!previewItem) return;
    
    // Update colors
    previewItem.style.background = `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`;
    
    // Update text
    if (customText) {
        previewItem.textContent = customText;
    } else {
        previewItem.textContent = productData[currentProduct]?.title || 'Producto';
    }
}

function updateSummary() {
    const basePrice = productData[currentProduct]?.basePrice || 25;
    const customPrice = 5; // Base customization price
    const quantity = parseInt(document.getElementById('customQuantity')?.value || 1);
    
    const total = (basePrice + customPrice) * quantity;
    
    document.getElementById('summaryBasePrice').textContent = `$${basePrice}`;
    document.getElementById('summaryCustomPrice').textContent = `$${customPrice}`;
    document.getElementById('summaryQuantity').textContent = quantity.toString();
    document.getElementById('summaryTotal').textContent = `$${total}`;
}

// ========== PRODUCT VIEWER ==========
let currentViewIndex = 0;

function initializeProductViewer() {
    const viewer = document.getElementById('productViewer360');
    if (!viewer) return;
    
    // Add drag functionality
    let isDragging = false;
    let startAngle = 0;
    let currentAngle = 0;
    
    viewer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startAngle = e.clientX;
        viewer.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        currentAngle = (e.clientX - startAngle) * 0.5;
        viewer.style.transform = `rotateY(${currentAngle}deg)`;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        viewer.style.cursor = 'grab';
    });
}

function changeProductView(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const viewer = document.getElementById('productViewer360');
    
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
    
    if (viewer) {
        const colors = ['linear-gradient(45deg, #ff6b9d, #ff8fab)', 'linear-gradient(45deg, #ffd700, #ffcc02)', 'linear-gradient(45deg, #a8edea, #fed6e3)'];
        viewer.style.background = colors[index] || colors[0];
    }
    
    currentViewIndex = index;
}

// ========== CART FUNCTIONALITY ==========
function addToCart() {
    const product = productData[currentProduct];
    if (!product) return;
    
    // Simulate adding to cart
    showNotification(`¡${product.title} agregado al carrito!`, 'success');
    
    // In a real app, you would send this to your backend
    console.log('Added to cart:', {
        productId: currentProduct,
        product: product,
        timestamp: new Date()
    });
}

function addCustomToCart() {
    const product = productData[currentProduct];
    if (!product) return;
    
    const customText = document.getElementById('customText').value;
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const quantity = parseInt(document.getElementById('customQuantity').value);
    
    showNotification(`¡${product.title} personalizado agregado al carrito!`, 'success');
    
    console.log('Added custom product to cart:', {
        productId: currentProduct,
        product: product,
        customization: { customText, primaryColor, secondaryColor, quantity },
        timestamp: new Date()
    });
    
    closeCustomizer();
}

// ========== ENHANCED INTERACTIONS ==========

// Enhanced hover effects for products
document.addEventListener('DOMContentLoaded', () => {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add subtle glow effect
            item.style.boxShadow = '0 20px 40px rgba(255, 107, 157, 0.4)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '';
        });
    });
});

// Enhanced service card interactions
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'rotateY(5deg) rotateX(5deg) translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
