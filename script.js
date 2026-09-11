// ==========================================
// SEMINARS & WEBINARS SLIDER
// ==========================================
let currentSlide = 1;
const totalSlides = 7;

function showSlide(index) {
  const slides = document.querySelectorAll('.seminar-slide');
  
  if (index > totalSlides) currentSlide = 1;
  if (index < 1) currentSlide = totalSlides;

  slides.forEach(slide => slide.classList.remove('active'));

  const activeSlide = document.querySelector(`.seminar-slide[data-slide="${currentSlide}"]`);
  if (activeSlide) {
    activeSlide.classList.add('active');
  }

  const currentFormatted = currentSlide < 10 ? `0${currentSlide}` : currentSlide;
  const totalFormatted = totalSlides < 10 ? `0${totalSlides}` : totalSlides;

  document.getElementById('currentSlideNum').textContent = currentFormatted;
  document.getElementById('totalSlidesNum').textContent = totalFormatted;
}

function changeSlide(direction) {
  currentSlide += direction;
  showSlide(currentSlide);
}


// ==========================================
// GENERIC CAROUSEL LOGIC (Certificates & Badges)
// ==========================================

// Certificates Carousel State
let currentCertIndex = 0;

function initCertCarousel() {
  const certCards = document.querySelectorAll('#certificates .badge-item-card');
  const dotsContainer = document.getElementById('certDots');
  if (!dotsContainer) return;
  
  dotsContainer.innerHTML = '';

  certCards.forEach((_, idx) => {
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
  const cards = document.querySelectorAll('#certificates .badge-item-card');
  const dots = document.querySelectorAll('#certDots .dot');
  const total = cards.length;
  if (total === 0) return;

  if (currentCertIndex >= total) currentCertIndex = 0;
  if (currentCertIndex < 0) currentCertIndex = total - 1;

  cards.forEach((card, idx) => {
    card.classList.remove('active', 'prev', 'next', 'hidden');

    if (idx === currentCertIndex) {
      card.classList.add('active');
    } else if (idx === (currentCertIndex - 1 + total) % total) {
      card.classList.add('prev');
    } else if (idx === (currentCertIndex + 1) % total) {
      card.classList.add('next');
    } else {
      card.classList.add('hidden');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === currentCertIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function changeCertSlide(direction) {
  currentCertIndex += direction;
  updateCertCarousel();
}


// NetAcad Badges Carousel State
let currentBadgeIndex = 0;

function initBadgeCarousel() {
  const badgeCards = document.querySelectorAll('#badges .badge-item-card');
  const dotsContainer = document.getElementById('badgeDots');
  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';

  badgeCards.forEach((_, idx) => {
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
  const cards = document.querySelectorAll('#badges .badge-item-card');
  const dots = document.querySelectorAll('#badgeDots .dot');
  const total = cards.length;
  if (total === 0) return;

  if (currentBadgeIndex >= total) currentBadgeIndex = 0;
  if (currentBadgeIndex < 0) currentBadgeIndex = total - 1;

  cards.forEach((card, idx) => {
    card.classList.remove('active', 'prev', 'next', 'hidden');

    if (idx === currentBadgeIndex) {
      card.classList.add('active');
    } else if (idx === (currentBadgeIndex - 1 + total) % total) {
      card.classList.add('prev');
    } else if (idx === (currentBadgeIndex + 1) % total) {
      card.classList.add('next');
    } else {
      card.classList.add('hidden');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === currentBadgeIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function changeBadgeSlide(direction) {
  currentBadgeIndex += direction;
  updateBadgeCarousel();
}


// Initialization
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
  initCertCarousel();
  initBadgeCarousel();
});
// ==========================================
// PROOF LIGHTBOX GALLERY LOGIC
// ==========================================
function openProofModal(imagesArray) {
  const modal = document.getElementById('proofModal');
  const gallery = document.getElementById('proofGallery');
  
  // Clear previous images
  gallery.innerHTML = '';

  // Append new images
  imagesArray.forEach((imgSrc) => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Proof Documentation';
    gallery.appendChild(img);
  });

  // Display modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeProofModal() {
  const modal = document.getElementById('proofModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable background scrolling
}

// Close modal when clicking outside of modal-content
window.addEventListener('click', (event) => {
  const modal = document.getElementById('proofModal');
  if (event.target === modal) {
    closeProofModal();
  }
});