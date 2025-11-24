
        // Sticky Header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.sticky-header');
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = item.querySelector('.faq-content');

                document.querySelectorAll('.faq-item').forEach(el => {
                    if (el !== item) {
                        el.querySelector('.faq-header').classList.remove('active');
                        el.querySelector('.faq-content').classList.remove('active');
                    }
                });

                header.classList.toggle('active');
                content.classList.toggle('active');
            });
        });

        // Form Submission
        document.getElementById('quoteForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const contact = document.getElementById('contact').value.trim();
            const gdpr = document.getElementById('gdpr').checked;

            let isValid = true;

            if (!fullName) {
                document.getElementById('fullNameError').classList.add('active');
                isValid = false;
            } else {
                document.getElementById('fullNameError').classList.remove('active');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{9,}$/;

            if (!contact || (!emailRegex.test(contact) && !phoneRegex.test(contact))) {
                document.getElementById('contactError').classList.add('active');
                isValid = false;
            } else {
                document.getElementById('contactError').classList.remove('active');
            }

            if (isValid && gdpr) {
                alert('Demande envoyée ! Vous allez être redirigé vers WhatsApp.');
                window.location.href = 'https://wa.me/+8615622172617?text=Bonjour%20NAVAIR%2C%20j%27ai%20soumis%20le%20formulaire%20de%20devis';
            }
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    