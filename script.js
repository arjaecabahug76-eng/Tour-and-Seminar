// ==========================================
// INTRO SCREEN & TYPEWRITER ANIMATION (UNCHANGED)
// ==========================================
const typewriterText = "BSIT Student • Seminars & Certification Portfolio";
let typeIndex = 0;

function typeWriter() {
  const element = document.querySelector(".typewriter-text");
  if (element && typeIndex < typewriterText.length) {
    element.textContent += typewriterText.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 40);
  }
}

function enterPortfolio() {
  const splash = document.getElementById("intro-splash");
  if (splash) {
    splash.classList.add("fade-out");
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
// MULTI-SLIDER ROUTER (SEMINARS, CERTS, BADGES)
// ==========================================
const sliderState = {
  seminar: { current: 1, total: 7 },
  cert: { current: 1, total: 7 },
  badge: { current: 1, total: 7 }
};

function renderSlide(type) {
  const state = sliderState[type];

  if (state.current > state.total) state.current = 1;
  if (state.current < 1) state.current = state.total;

  // Hide all items for this type
  const slides = document.querySelectorAll(`.${type}-slide`);
  slides.forEach(s => s.classList.remove('active'));

  // Show Active Slide
  const activeSlide = document.querySelector(`.${type}-slide[data-${type}="${state.current}"]`);
  if (activeSlide) {
    activeSlide.classList.add('active');
  }

  // Format Counter Label with Leading Zero
  const currentFormatted = state.current < 10 ? `0${state.current}` : state.current;
  const totalFormatted = state.total < 10 ? `0${state.total}` : state.total;

  const currentLabel = document.getElementById(`current${capitalize(type)}Num`);
  const totalLabel = document.getElementById(`total${capitalize(type)}Num`);

  if (currentLabel) currentLabel.textContent = currentFormatted;
  if (totalLabel) totalLabel.textContent = totalFormatted;
}

function changeSlide(type, direction) {
  sliderState[type].current += direction;
  renderSlide(type);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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

window.addEventListener('click', (e) => {
  const modal = document.getElementById('proofModal');
  if (e.target === modal) closeProofModal();
});

// Initial Setup Execution
document.addEventListener('DOMContentLoaded', () => {
  renderSlide('seminar');
  renderSlide('cert');
  renderSlide('badge');
  setTimeout(typeWriter, 500);
});
