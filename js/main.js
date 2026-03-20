// ===== NAVBAR & HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== CONTACT FORM VALIDATION & SUBMISSION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const clearErrors = () => {
    Object.values(formInputs).forEach(input => {
      const formGroup = input.closest('.form-group');
      formGroup.classList.remove('error');
    });
  };

  const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.textContent = message;
    }
  };

  const validateForm = () => {
    clearErrors();
    let isValid = true;

    // Validate name
    if (!formInputs.name.value.trim()) {
      showError(formInputs.name, 'Le nom est requis');
      isValid = false;
    } else if (formInputs.name.value.trim().length < 2) {
      showError(formInputs.name, 'Le nom doit contenir au moins 2 caractères');
      isValid = false;
    }

    // Validate email
    if (!formInputs.email.value.trim()) {
      showError(formInputs.email, 'L\'email est requis');
      isValid = false;
    } else if (!validateEmail(formInputs.email.value.trim())) {
      showError(formInputs.email, 'Veuillez entrer une adresse email valide');
      isValid = false;
    }

    // Validate subject
    if (!formInputs.subject.value.trim()) {
      showError(formInputs.subject, 'Le sujet est requis');
      isValid = false;
    }

    // Validate message
    if (!formInputs.message.value.trim()) {
      showError(formInputs.message, 'Le message est requis');
      isValid = false;
    } else if (formInputs.message.value.trim().length < 10) {
      showError(formInputs.message, 'Le message doit contenir au moins 10 caractères');
      isValid = false;
    }

    return isValid;
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would normally send the form data to a server
      // For now, we'll just show a success message

      const formMessage = contactForm.querySelector('.form-message');
      formMessage.classList.remove('error');
      formMessage.classList.add('success');
      formMessage.textContent = 'Message envoyé avec succès! Je vous recontacterai bientôt.';
      formMessage.style.display = 'block';

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    } else {
      const formMessage = contactForm.querySelector('.form-message');
      formMessage.classList.remove('success');
      formMessage.classList.add('error');
      formMessage.textContent = 'Veuillez corriger les erreurs ci-dessus.';
      formMessage.style.display = 'block';
    }
  });

  // Clear error on input focus
  Object.values(formInputs).forEach(input => {
    input.addEventListener('focus', () => {
      const formGroup = input.closest('.form-group');
      if (formGroup.classList.contains('error')) {
        formGroup.classList.remove('error');
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card, .highlight-card').forEach(el => {
  observer.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const skillBarsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.skill-progress');
      if (progressBar && !progressBar.classList.contains('animated')) {
        const width = progressBar.style.width;
        progressBar.style.width = '0';
        progressBar.classList.add('animated');
        
        setTimeout(() => {
          progressBar.style.transition = 'width 1.5s ease';
          progressBar.style.width = width;
        }, 100);
      }
      skillBarsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
  skillBarsObserver.observe(card);
});

// ===== FAST ANIMATIONS STYLES =====
const style = document.createElement('style');
style.textContent = `
  .skill-progress {
    transition-timing-function: cubic-bezier(0.32, 0.51, 0.28, 0.97);
  }
`;
document.head.appendChild(style);

// ===== ACTIVE NAV LINK =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ===== MOBILE RESPONSIVENESS =====
const handleResize = () => {
  const hamburger = document.getElementById('hamburger');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (window.innerWidth > 768) {
    navbarMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
};

window.addEventListener('resize', handleResize);
