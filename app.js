// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ——— Active section highlight in navbar ———
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveNavLink() {
  const scrollY = window.scrollY;
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const id = href && href.startsWith("#") ? href.slice(1) : "";
    link.classList.toggle("nav-active", id === currentId);
  });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);

// ——— CTA Modal ———
const modal = document.getElementById("cta-modal");
const ctaForm = document.getElementById("cta-form");
const openButtons = document.querySelectorAll(".btn-cta-open");
const closeButton = modal?.querySelector(".modal-close");
const nameInput = document.getElementById("cta-name");
const emailInput = document.getElementById("cta-email");
const nameError = document.getElementById("cta-name-error");
const emailError = document.getElementById("cta-email-error");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function openModal() {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  nameInput?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function validateForm() {
  let valid = true;
  const name = nameInput?.value.trim();
  const email = emailInput?.value.trim();

  if (nameError) nameError.textContent = "";
  if (emailError) emailError.textContent = "";
  nameInput?.classList.remove("input-error");
  emailInput?.classList.remove("input-error");

  if (!name) {
    if (nameError) nameError.textContent = "Name is required.";
    nameInput?.classList.add("input-error");
    valid = false;
  }

  if (!email) {
    if (emailError) emailError.textContent = "Email is required.";
    emailInput?.classList.add("input-error");
    valid = false;
  } else if (!EMAIL_REGEX.test(email)) {
    if (emailError) emailError.textContent = "Please enter a valid email address.";
    emailInput?.classList.add("input-error");
    valid = false;
  }

  return valid;
}

openButtons?.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
});

closeButton?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) {
    closeModal();
  }
});

ctaForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  closeModal();
  ctaForm.reset();
});
