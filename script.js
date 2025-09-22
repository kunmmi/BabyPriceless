// BabyWikiCat JavaScript Functions

// Copy contract address to clipboard with improved error handling
function copyContract() {
    try {
        const contractAddress = document.getElementById('contractAddress').textContent;

        // Modern clipboard API with fallback
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(contractAddress).then(() => {
                showCopyFeedback(true);
            }).catch(() => {
                fallbackCopyText(contractAddress);
            });
        } else {
            fallbackCopyText(contractAddress);
        }
    } catch (error) {
        console.warn('Copy failed:', error);
        showCopyFeedback(false);
    }
}

// Fallback copy method for older browsers
function fallbackCopyText(text) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyFeedback(true);
    } catch (error) {
        console.warn('Fallback copy failed:', error);
        showCopyFeedback(false);
    }
}

// Show copy feedback
function showCopyFeedback(success) {
    const copyBtn = document.querySelector('.copy-btn');
    if (!copyBtn) return;

    const originalText = copyBtn.innerHTML;

    if (success) {
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#FACA04';
    } else {
        copyBtn.innerHTML = '<i class="fas fa-exclamation"></i> Failed';
        copyBtn.style.background = '#ef4444';
    }

    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '#FCAA61';
    }, 2000);
}

// Add smooth scrolling for any anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Performance optimization: Use passive listeners where possible
    const passiveSupported = supportsPassive();

    // Animate elements on scroll with improved performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
                // Stop observing once animated to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .community-section, .contract-section, .team-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Optimized click ripple effect to buttons
    const buttons = document.querySelectorAll('.link-btn, .copy-btn, .audit-link, .social-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent multiple ripples
            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) existingRipple.remove();

            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute !important;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Throttled mouse trail effect for better performance
    let mouseTrail = [];
    const trailLength = 3;
    let trailTimeout;

    document.addEventListener('mousemove', function(e) {
        // Throttle mouse trail updates
        clearTimeout(trailTimeout);
        trailTimeout = setTimeout(() => {
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY
            });

            if (mouseTrail.length > trailLength) {
                mouseTrail.shift();
            }

            // Create subtle trail elements with improved cleanup
            mouseTrail.forEach((point, index) => {
                const trail = document.createElement('div');
                trail.className = 'mouse-trail';
                trail.style.cssText = `
                    position: fixed;
                    left: ${point.x}px;
                    top: ${point.y}px;
                    width: ${6 - index * 2}px;
                    height: ${6 - index * 2}px;
                    background: radial-gradient(circle, rgba(236, 72, 153, ${0.4 - index * 0.1}), transparent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                `;

                document.body.appendChild(trail);

                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.remove();
                    }
                }, 80);
            });
        }, 10); // Throttle to every 10ms
    }, passiveSupported ? {
        passive: true
    } : false);

    // Optimized floating hearts effect
    let heartInterval;

    function createFloatingHeart() {
        // Limit number of hearts on screen
        const existingHearts = document.querySelectorAll('.floating-heart');
        if (existingHearts.length >= 12) return;

        const heart = document.createElement('div');
        heart.innerHTML = '👶';
        heart.className = 'floating-heart';
        heart.style.cssText = `
            position: fixed;
            left: ${Math.random() * (window.innerWidth - 50)}px;
            top: 100vh;
            font-size: ${0.9 + Math.random() * 1.2}rem;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 6s ease-out forwards;
            opacity: 0.7;
        `;

        document.body.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 6000);
    }

    // Start heart animation with longer intervals
    heartInterval = setInterval(() => {
        // spawn 1-3 babies per tick for a lively effect
        const spawnCount = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < spawnCount; i++) {
            setTimeout(createFloatingHeart, i * 250);
        }
    }, 2500);

    // Optimized scroll effects with throttling
    let scrollTimeout;
    document.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrolled = window.pageYOffset;
            const sections = document.querySelectorAll('.contract-section, .community-section');

            sections.forEach((section, index) => {
                const speed = 0.01 + (index * 0.005); // Reduced intensity
                section.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }, 10); // Throttle scroll events
    }, passiveSupported ? {
        passive: true
    } : false);

    // Optimized typing effect with error handling
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        let charIndex = 0;

        function typeEffect() {
            if (charIndex < originalText.length) {
                mainTitle.textContent = originalText.slice(0, charIndex + 1);
                charIndex++;
                setTimeout(typeEffect, 100);
            }
        }

        // Start typing effect after a delay
        setTimeout(() => {
            mainTitle.textContent = '';
            typeEffect();
        }, 500);
    }

    // Add wobble effect to feature icons on hover with improved performance
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'wobble 0.5s ease-in-out';
        });

        icon.addEventListener('animationend', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    });

    console.log('🐱 Baby WikiCat loaded successfully! Welcome to the cutest memecoin! 🚀');
});

// Add CSS animations dynamically to avoid render-blocking
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute !important;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
        z-index: 1;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes wobble {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
        100% { transform: rotate(0deg); }
    }
`;
document.head.appendChild(style);

// Check for passive event listener support
function supportsPassive() {
    let passiveSupported = false;
    try {
        const options = {
            get passive() {
                passiveSupported = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passiveSupported = false;
    }
    return passiveSupported;
}