/**
 * ===================== WEBSITE INTERACTIVITY SCRIPT =====================
 * This script enhances the user experience of the portfolio/website by handling:
 * 
 * 1. Particle.js Background Animation
 *    - Uses the particles.js library to render a dynamic, interactive background 
 *      with floating particles that connect with lines.
 *    - Configurable options: number, color, shape, size, opacity, movement, interactivity.
 *    - Adds hover & click effects (grab, push).
 *
 * 2. Mobile Navigation (Hamburger Menu)
 *    - Toggles navigation menu visibility on small screens.
 *    - Updates the hamburger icon (bars ↔ close) when menu is opened/closed.
 *    - Automatically closes the menu when a link is clicked.
 *    - Highlights the currently active navigation link.
 *
 * 3. Smooth Scrolling
 *    - Smoothly scrolls to different sections when navigation links are clicked.
 *    - Dynamically updates the active link as the user scrolls through sections.
 *
 * 4. On-Scroll Animations
 *    - Animates skill bars, project cards, and timeline items when they enter 
 *      the viewport.
 *    - Shows/hides a "Back to Top" button based on scroll position.
 *
 * 5. Back to Top Button
 *    - Smoothly scrolls back to the top of the page when clicked.
 *
 * 6. Contact Form Handling
 *    - Simple client-side form validation (checks for empty name, email, message).
 *    - Displays a success message (placeholder for real backend integration).
 *    - Resets the form after successful submission.
 *
 * 7. Sticky Header
 *    - Adds/removes a shadow effect on the header when scrolling past 100px.
 *
 * 8. Active Navigation Highlight on Scroll
 *    - Detects the current section based on scroll position.
 *    - Updates the navbar link styling so users know which section they’re in.
 *
 * -------------------------------------------------------------------------
 * NOTE FOR DEVELOPERS:
 * - Replace the "alert" in the form submission with a real backend/API call 
 *   if you integrate contact functionality.
 * - Customize Particle.js config (color, density, interactivity) to match your theme.
 * - Ensure you include Font Awesome (for hamburger icons) and particles.js in your project.
 * - This script is modular: each section handles one specific UI/UX enhancement.
 * -------------------------------------------------------------------------
 */






document.addEventListener('DOMContentLoaded', function() {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#64ffda"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#64ffda",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        });

        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links a');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile nav when clicking on a link
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Update active nav link
                navItems.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Update active nav link
                    navItems.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Animate elements on scroll
        function animateOnScroll() {
            const skillBars = document.querySelectorAll('.skill-progress');
            const projectCards = document.querySelectorAll('.project-card');
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            // Animate skill bars
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
            
            // Animate project cards
            projectCards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (cardPosition < screenPosition) {
                    card.classList.add('visible');
                }
            });
            
            // Animate timeline items
            timelineItems.forEach(item => {
                const itemPosition = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (itemPosition < screenPosition) {
                    item.classList.add('visible');
                }
            });
            
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Initialize animations when the page loads and on scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
        
        // Back to top functionality
        document.querySelector('.back-to-top').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple form validation
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const messageInput = document.getElementById('message');
                
                if (nameInput.value.trim() === '') {
                    alert('Please enter your name');
                    nameInput.focus();
                    return;
                }
                
                if (emailInput.value.trim() === '') {
                    alert('Please enter your email');
                    emailInput.focus();
                    return;
                }
                
                if (messageInput.value.trim() === '') {
                    alert('Please enter your message');
                    messageInput.focus();
                    return;
                }
                
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            });
        }
        
        // Sticky header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
        
        // Update active nav link based on scroll position
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 100) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNavLink);