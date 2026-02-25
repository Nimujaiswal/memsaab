const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearSpan = document.querySelector('#year');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });
}

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const cartCount = document.querySelector('#cartCount');
const wishlistCount = document.querySelector('#wishlistCount');
let cart = 0;
let wishlist = 0;

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    cart += 1;
    if (cartCount) cartCount.textContent = String(cart);
  });
});

document.querySelectorAll('.add-to-wishlist').forEach((button) => {
  button.addEventListener('click', () => {
    const active = button.classList.toggle('active');
    wishlist += active ? 1 : -1;
    if (wishlistCount) wishlistCount.textContent = String(Math.max(0, wishlist));
    button.textContent = active ? 'Wishlisted' : 'Wishlist';
  });
});

const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const dotsContainer = document.querySelector('.slider-dots');

if (sliderTrack && slides.length && dotsContainer) {
  let currentIndex = 0;
  let autoSlide;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot${index === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
      restartAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.slider-dot');

  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function startAutoSlide() {
    autoSlide = setInterval(showNext, 3500);
  }

  function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  nextBtn?.addEventListener('click', () => {
    showNext();
    restartAutoSlide();
  });

  prevBtn?.addEventListener('click', () => {
    showPrev();
    restartAutoSlide();
  });

  updateSlider();
  startAutoSlide();
}
