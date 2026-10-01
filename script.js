// ==========================================
// INTRO SCREEN & TYPEWRITER ANIMATION
// ==========================================
const typewriterText = "BSIT Student • Seminars & Certification Portfolio";
let typeIndex = 0;

function typeWriter() {
  const element = document.querySelector(".typewriter-text");
  if (element && typeIndex < typewriterText.length) {
    element.textContent += typewriterText.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 45);
  }
}

function enterPortfolio() {
  const splash = document.getElementById("intro-splash");
  if (splash) {
    splash.classList.add("fade-out");
  }
}

// ==========================================
// PROFILE PHOTO HOVER SWITCH LOGIC
// ==========================================
function hoverProfileImg() {
  const img = document.getElementById('profileImage');
  if (img) {
    img.src = 'Arjae-hover.jpg'; // Path to secondary hover photo
  }
}

function resetProfileImg() {
  const img = document.getElementById('profileImage');
  if (img) {
    img.src = 'Arjae.jpg'; // Path back to original photo
  }
}

// ==========================================
// PAGE SWITCHING ROUTER
// ==========================================
function switchPage(pageId) {
  // Update Body Theme Accent Class
  document.body.className = `page-${pageId}`;

  // Toggle Section Visibility
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

  // Smooth Scroll View to Top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// SEMINAR SLIDER LOGIC
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
// PROOF LIGHTBOX MODAL
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

// Initial Setup Execution
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
  setTimeout(typeWriter, 500);
});
