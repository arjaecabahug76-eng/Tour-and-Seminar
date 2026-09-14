// ==========================================
// PAGE SWITCHING ROUTER
// ==========================================
function switchPage(pageId) {
  // Update Body Theme Class
  document.body.className = `page-${pageId}`;

  // Hide/Show Section Pages
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(sec => sec.classList.remove('active'));

  const targetSection = document.getElementById(`page-${pageId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update Navigation Active State
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Re-trigger Carousel Adjustments
  if (pageId === 'certificates') updateCertCarousel();
  if (pageId === 'badges') updateBadgeCarousel();
}

// ==========================================
// SEMINARS SLIDER LOGIC
// ==========================================
let currentSlide = 1;
const totalSlides = 7;

function showSlide(index) {
  if (index > totalSlides) currentSlide = 1;
  if (index < 1) currentSlide = totalSlides;

  const slides = document.querySelectorAll('.seminar-slide');
  slides.forEach(slide => slide.classList.remove('active'));

  const activeSlide = document.querySelector(`.seminar-slide[data-slide="${currentSlide}"]`);
  if (activeSlide) activeSlide.classList.add('active');

  document.getElementById('currentSlideNum').textContent = currentSlide < 10 ? `0${currentSlide}` : currentSlide;
  document.getElementById('totalSlidesNum').textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;
}

function changeSlide(direction) {
  currentSlide += direction;
  showSlide(currentSlide);
}

// ==========================================
// CERTIFICATE CAROUSEL LOGIC
// ==========================================
let currentCertIndex = 0;

function initCertCarousel() {
  const cards = document.querySelectorAll('#page-certificates .badge-item-card');
  const dotsContainer = document.getElementById('certDots');
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';

  cards.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentCertIndex = idx;
      updateCertCarousel();
    });
    dotsContainer.appendChild(dot);
  });
  updateCertCarousel();
}

function updateCertCarousel() {
  const cards = document.querySelectorAll('#page-certificates .badge-item-card');
  const dots = document.querySelectorAll('#certDots .dot');
  const total = cards.length;
  if (total === 0) return;

  if (currentCertIndex >= total) currentCertIndex = 0;
  if (currentCertIndex < 0) currentCertIndex = total - 1;

  cards.forEach((card, idx) => {
    card.classList.remove('active', 'prev', 'next');
    if (idx === currentCertIndex) {
      card.classList.add('active');
    } else if (idx === (currentCertIndex - 1 + total) % total) {
      card.classList.add('prev');
    } else if (idx === (currentCertIndex + 1) % total) {
      card.classList.add('next');
    }
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentCertIndex);
  });
}

function changeCertSlide(dir) {
  currentCertIndex += dir;
  updateCertCarousel();
}

// ==========================================
// NETACAD BADGES CAROUSEL LOGIC
// ==========================================
let currentBadgeIndex = 0;

function initBadgeCarousel() {
  const cards = document.querySelectorAll('#page-badges .badge-item-card');
  const dotsContainer = document.getElementById('badgeDots');
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';

  cards.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentBadgeIndex = idx;
      updateBadgeCarousel();
    });
    dotsContainer.appendChild(dot);
  });
  updateBadgeCarousel();
}

function updateBadgeCarousel() {
  const cards = document.querySelectorAll('#page-badges .badge-item-card');
  const dots = document.querySelectorAll('#badgeDots .dot');
  const total = cards.length;
  if (total === 0) return;

  if (currentBadgeIndex >= total) currentBadgeIndex = 0;
  if (currentBadgeIndex < 0) currentBadgeIndex = total - 1;

  cards.forEach((card, idx) => {
    card.classList.remove('active', 'prev', 'next');
    if (idx === currentBadgeIndex) {
      card.classList.add('active');
    } else if (idx === (currentBadgeIndex - 1 + total) % total) {
      card.classList.add('prev');
    } else if (idx === (currentBadgeIndex + 1) % total) {
      card.classList.add('next');
    }
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentBadgeIndex);
  });
}

function changeBadgeSlide(dir) {
  currentBadgeIndex += dir;
  updateBadgeCarousel();
}

// ==========================================
// LIGHTBOX GALLERY LOGIC
// ==========================================
function openProofModal(imagesArray) {
  const modal = document.getElementById('proofModal');
  const gallery = document.getElementById('proofGallery');
  gallery.innerHTML = '';

  imagesArray.forEach(imgSrc => {
    const img = document.createElement('img');
    img.src = imgSrc;
    gallery.appendChild(img);
  });

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProofModal() {
  const modal = document.getElementById('proofModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('proofModal');
  if (e.target === modal) closeProofModal();
});

// Initialize Setup
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
  initCertCarousel();
  initBadgeCarousel();
});
