/**
 * Personal Profile Website - Client Side Logic
 * Features:
 * 1. Dark/Light theme toggling with localStorage persistence
 * 2. 'Read More' expandable about text toggle
 * 3. Client-side contact form validation and interactive toast feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initReadMoreToggle();
  initContactForm();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const body = document.body;

  // Check saved theme in localStorage or default to 'dark'
  const savedTheme = localStorage.getItem('profile-theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('profile-theme', newTheme);
    });
  }
}

/* ==========================================================================
   2. Read More Expandable About Section
   ========================================================================== */
function initReadMoreToggle() {
  const readMoreBtn = document.getElementById('readMoreBtn');
  const moreAboutText = document.getElementById('moreAboutText');

  if (readMoreBtn && moreAboutText) {
    const btnText = readMoreBtn.querySelector('.btn-text');
    const icon = readMoreBtn.querySelector('.toggle-icon');

    readMoreBtn.addEventListener('click', () => {
      const isExpanded = moreAboutText.classList.toggle('expanded');

      if (btnText) {
        btnText.textContent = isExpanded ? 'הצג פחות' : 'קרא עוד';
      }

      if (icon) {
        icon.classList.toggle('rotate', isExpanded);
      }
    });
  }
}

/* ==========================================================================
   3. Contact Form Validation & Dynamic Toast
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotification');

  if (!contactForm) return;

  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const messageInput = document.getElementById('messageInput');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset error states
    clearErrors([
      { input: nameInput, errorEl: nameError },
      { input: emailInput, errorEl: emailError },
      { input: messageInput, errorEl: messageError }
    ]);

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'נא להזין שם מלא');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, 'השם חייב להכיל לפחות 2 תווים');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'נא להזין כתובת אימייל');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, emailError, 'כתובת אימייל אינה תקינה');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      showError(messageInput, messageError, 'נא להזין תוכן להודעה');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, messageError, 'ההודעה צריכה להכיל לפחות 10 תווים');
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission success
      contactForm.reset();
      showToast(toast);
    }
  });

  // Real-time error removal on input
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        const err = input.parentElement.querySelector('.error-msg');
        if (err) err.textContent = '';
      });
    }
  });
}

function showError(inputEl, errorEl, message) {
  if (inputEl) inputEl.classList.add('invalid');
  if (errorEl) errorEl.textContent = message;
}

function clearErrors(items) {
  items.forEach(({ input, errorEl }) => {
    if (input) input.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  });
}

function showToast(toastEl) {
  if (!toastEl) return;
  toastEl.classList.remove('hidden');

  // Auto hide after 4.5 seconds
  setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 4500);
}
