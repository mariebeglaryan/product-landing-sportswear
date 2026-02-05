// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ——— Lightbox ———
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const lightboxPrev = lightbox?.querySelector(".lightbox-prev");
const lightboxNext = lightbox?.querySelector(".lightbox-next");
const galleryImages = document.querySelectorAll(".gallery-img");

let currentIndex = 0;

function openLightbox(index) {
  if (!lightbox || !lightboxImg || !galleryImages.length) return;
  currentIndex = index;
  const img = galleryImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showPrev() {
  if (galleryImages.length === 0) return;
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  const img = galleryImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

function showNext() {
  if (galleryImages.length === 0) return;
  currentIndex = (currentIndex + 1) % galleryImages.length;
  const img = galleryImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", (e) => {
    e.preventDefault();
    openLightbox(index);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

lightboxPrev?.addEventListener("click", (e) => {
  e.stopPropagation();
  showPrev();
});

lightboxNext?.addEventListener("click", (e) => {
  e.stopPropagation();
  showNext();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox?.classList.contains("is-open")) return;
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    showPrev();
  } else if (e.key === "ArrowRight") {
    showNext();
  }
});
