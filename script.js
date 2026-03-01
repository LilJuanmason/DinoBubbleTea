/*
====================================================================
Dino Bubble Tea Lite - Interaction Scripts
====================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove FOUC loading state
    // Timeout added slightly just to ensure CSS parses
    setTimeout(() => {
        document.body.classList.remove('loading');

        // Trigger initial hero animations
        const heroElements = document.querySelectorAll('#hero .fade-up, #hero .fade-in');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after revealing to prevent re-animating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements outside of hero
    document.querySelectorAll('.scroll-reveal, section:not(#hero) .fade-up').forEach(el => {
        scrollObserver.observe(el);
    });

    // 3. Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle icon (List -> X)
    const toggleIcon = () => {
        const icon = mobileToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    };

    mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        toggleIcon();
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            toggleIcon();

            // Handle Active state
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for fixed header
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 5. Menu Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(t => t.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const tabCategory = btn.getAttribute('data-tab');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Animate out
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    if (tabCategory === 'all' || cardCategory === tabCategory) {
                        card.style.display = 'block';
                        // Small timeout to allow display:block to apply before animating opacity
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300); // Wait for fade out animation
            });
        });
    });

    // 6. Promo Slider Logic
    const promoTrack = document.getElementById('promo-track');
    if (promoTrack) {
        let currentSlide = 0;
        const totalSlides = 3;

        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            promoTrack.style.transform = `translateX(-${currentSlide * 33.33333}%)`;
        }, 3000);
    }
});
