// ==========================================
// PAGE SWITCHING ROUTER
// ==========================================
function switchPage(pageId) {
  // Update Body CSS Class for Background Theme
  document.body.className = `page-${pageId}`;

  // Toggle Visibility of Sections
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(sec => sec.classList.remove('active'));

  const targetSection = document.getElementById(`page-${pageId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update Navigation Bar Buttons
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Scroll View to Top
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
// PROOF GALLERY LIGHTBOX
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

// Initial Setup Execution
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
});
