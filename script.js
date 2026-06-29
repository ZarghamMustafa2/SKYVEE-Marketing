/**
 * Skyvee Marketing Solution - Advanced Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================
       0. Mobile Menu Toggle
       ======================================================== */
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('is-active');
            const icon = mobileToggle.querySelector('i');
            if (mobileNav.classList.contains('is-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('is-active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    /* ========================================================
       1. Scroll Revel Animations (Intersection Observer)
       ======================================================== */
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine existing inline delay or fallback to 0
                const delay = entry.target.style.transitionDelay || '0s';
                entry.target.style.animationDelay = delay;

                entry.target.classList.add('animated');

                // If this is a metric card, trigger the counter animation
                if (entry.target.classList.contains('metric-card')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter) {
                        animateCounter(counter);
                    }
                }

                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    // Animated Counter Logic
    function animateCounter(counterElement) {
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counterElement.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.innerText = target;
            }
        };
        updateCounter();
    }


    /* ========================================================
       2. Header Glassmorphism Scroll Effect
       ======================================================== */
    const header = document.querySelector('.glass-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0';
            header.style.width = '100%';
            header.style.top = '0';
            header.style.borderRadius = '0 0 var(--radius-lg) var(--radius-lg)';
            header.style.background = 'rgba(255, 255, 255, 0.85)';
        } else {
            header.style.padding = '';
            header.style.width = 'calc(100% - 40px)';
            header.style.top = '15px';
            header.style.borderRadius = 'var(--radius-xl)';
            header.style.background = 'var(--glass-bg)';
        }
    });


    /* ========================================================
       3. Smooth Scrolling for Nav Links
       ======================================================== */
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* ========================================================
       4. 3D Tilt Effect for Service Cards
       ======================================================== */
    const cards3D = document.querySelectorAll('.3d-card');

    cards3D.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            // Calculate rotation (max 15 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });


    /* ========================================================
       5. Automation Form Submission Simulations
       ======================================================== */

    // Lead Form (Multi-Step)
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');
        const processingState = leadForm.querySelector('.processing-state');
        const progressBar = leadForm.querySelector('.progress-fill');

        const nextBtn = leadForm.querySelector('.next-step-btn');
        const prevBtn = leadForm.querySelector('.prev-step-btn');

        // Navigation Logic
        nextBtn.addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            if (name && email && phone) {
                step1.classList.remove('active');
                step2.classList.add('active');
            } else {
                alert('Please complete all identification fields to proceed.');
            }
        });

        prevBtn.addEventListener('click', () => {
            step2.classList.remove('active');
            step1.classList.add('active');
        });

        // Submission Logic
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get selected service
            const selectedService = leadForm.querySelector('input[name="service"]:checked').value;

            // UI Transition
            step2.classList.remove('active');
            processingState.style.display = 'flex';

            // Animate Progress Bar
            progressBar.style.width = '100%';
            progressBar.style.transition = 'width 2.5s ease-in-out';

            // Simulate CRM API sync delay
            setTimeout(() => {
                const title = processingState.querySelector('.processing-title');
                const sub = processingState.querySelector('.processing-sub');

                title.innerHTML = '<i class="fa-solid fa-check-circle" style="color: #10B981;"></i> Strategy Initialized';
                title.style.color = '#10B981';
                sub.innerText = 'Redirecting to Skyvee Secure Channel...';

                // Construct WhatsApp Message
                const name = document.getElementById('name').value;
                const message = encodeURIComponent(`Hello Skyvee Marketing! I am ${name}. I have selected the "${selectedService}" package and want to schedule a Free Strategy Session.`);

                setTimeout(() => {
                    window.open(`https://wa.me/923268585661?text=${message}`, '_blank');
                    // Reset form after redirect
                    setTimeout(() => {
                        leadForm.reset();
                        processingState.style.display = 'none';
                        step1.classList.add('active');
                        progressBar.style.width = '0%';
                        progressBar.style.transition = 'none';
                        title.innerHTML = 'Processing Strategy...';
                        title.style.color = 'var(--navy-dark)';
                        sub.innerText = 'Compiling objective maps and redirecting securely to Skyvee HQ.';
                    }, 1000);
                }, 1500);
            }, 2500);
        });
    }

    // Career Form (AI Scanner)
    const careerForm = document.getElementById('career-form');
    if (careerForm) {
        const fileInput = document.getElementById('cv-upload');
        const scannerUI = careerForm.querySelector('.scanner-ui');
        const uploadText = careerForm.querySelector('.upload-text');
        const submitBtn = careerForm.querySelector('.scanner-submit');
        const resultsContainer = careerForm.querySelector('.scanner-results');
        const scanStatus = careerForm.querySelector('.scan-status');
        const resultView = careerForm.querySelector('.categorization-result');
        const deptSpan = careerForm.querySelector('.highlight-dept');

        // File Selection Logic
        fileInput.addEventListener('change', function () {
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                uploadText.textContent = `Target Acquired: ${fileName}`;
                uploadText.style.color = 'var(--brand-blue)';
                submitBtn.disabled = false;
            }
        });

        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Disable interactions
            submitBtn.style.display = 'none';
            scannerUI.classList.add('is-scanning'); // Activates laser CSS
            resultsContainer.style.display = 'block';

            // Departments Array
            const departments = ['Social Media Mgmt.', 'Web Development', 'Creative Graphics', 'Ad Buying Operations'];
            const assignedDept = departments[Math.floor(Math.random() * departments.length)];

            // Simulate Scanning Process
            setTimeout(() => {
                scannerUI.classList.remove('is-scanning');

                scanStatus.style.display = 'none';
                resultView.style.display = 'flex';
                resultView.style.flexDirection = 'column';
                resultView.style.alignItems = 'flex-start';
                deptSpan.innerText = assignedDept;

                setTimeout(() => {
                    // Reset
                    careerForm.reset();
                    submitBtn.style.display = 'inline-flex';
                    submitBtn.disabled = true;
                    resultsContainer.style.display = 'none';
                    scanStatus.style.display = 'flex';
                    resultView.style.display = 'none';
                    uploadText.textContent = 'Drag CV here or Click to Browse';
                    uploadText.style.color = '';
                }, 4000);
            }, 3000);
        });
    }

});
