const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const headerCta = document.getElementById('header-cta');
const countrySelect = document.getElementById('country');
const otherCountryGroup = document.getElementById('other-country-group');
const quantitySelect = document.getElementById('quantity');
const otherQuantityGroup = document.getElementById('other-quantity-group');



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
    const country = document.getElementById('country').value.trim();
    const quantity = document.getElementById('quantity').value.trim();
    const otherCountry = document.getElementById('other-country') ? document.getElementById('other-country').value.trim() : "";
    const otherQuantity = document.getElementById('other-quantity') ? document.getElementById('other-quantity').value.trim() : "";
    const gdpr = document.getElementById('gdpr').checked;

    let isValid = true;

    // Full Name validation
    if (!fullName) {
        document.getElementById('fullNameError').classList.add('active');
        isValid = false;
    } else {
        document.getElementById('fullNameError').classList.remove('active');
    }

    // Contact validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{9,}$/;

    if (!contact || (!emailRegex.test(contact) && !phoneRegex.test(contact))) {
        document.getElementById('contactError').classList.add('active');
        isValid = false;
    } else {
        document.getElementById('contactError').classList.remove('active');
    }

    if (isValid && gdpr) {

        // Construction du message WhatsApp
        const finalCountry = country === "autre" ? otherCountry : country;
        const finalQuantity = quantity === "autre" ? otherQuantity : quantity;

        const message =
            "Bonjour NAVAIR DISTRIBUTION,%0A" +
            "Je viens de soumettre une demande de devis.%0A%0A" +
            "*Nom complet :* " + fullName + "%0A" +
            "*Contact :* " + contact + "%0A" +
            "*Pays :* " + (finalCountry || "Non spécifié") + "%0A" +
            "*Quantité :* " + (finalQuantity || "Non spécifiée") + "%0A%0A" +
            "Merci de me revenir.";

        // Redirection vers WhatsApp (message auto-rempli)
        const whatsappUrl = "https://wa.me/8615622172617?text=" + message;

        window.location.href = whatsappUrl;
    }
});


countrySelect.addEventListener('change', function () {
    if (this.value === 'autre') {
        otherCountryGroup.style.display = 'block';
    } else {
        otherCountryGroup.style.display = 'none';
    }
});
quantitySelect.addEventListener('change', function () {
    if (this.value === 'autre') {
        otherQuantityGroup.style.display = 'block';
    } else {
        otherQuantityGroup.style.display = 'none';
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

// Fonction pour fermer le menu
function closeMenu() {
    navMenu.classList.remove('active');
    if (headerCta) {
        headerCta.classList.remove('active');
    }
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}

// Toggle menu au clic sur le bouton
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
        closeMenu();
    } else {
        navMenu.classList.add('active');
        if (headerCta) {
            headerCta.classList.add('active');
        }
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
});

// Fermer le menu au clic sur un lien de navigation
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
    });
});

// Fermer le menu au clic sur un bouton CTA
if (headerCta) {
    document.querySelectorAll('#header-cta .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    });
}

// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
    const header = document.querySelector('.sticky-header');
    const isClickInMenu = navMenu.contains(e.target);
    const isClickOnMenuBtn = menuBtn.contains(e.target);
    
    if (!isClickInMenu && !isClickOnMenuBtn && header.contains(e.target)) {
        closeMenu();
    }
});
