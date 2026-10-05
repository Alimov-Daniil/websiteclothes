document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. СЛАЙДЕР ГОЛОВНОГО ОФЕРУ (Hero Section)
  // ==========================================
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));

    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, 4500);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });

    startInterval();
  }


  // ==========================================
  // 2. ТАЙМЕР ЗВОРОТНОГО ВІДЛІКУ АКЦІЇ
  // ==========================================
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 3);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = saleEndDate - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerText = pad(days);
    if (hoursEl) hoursEl.innerText = pad(hours);
    if (minutesEl) minutesEl.innerText =Ось оновлений повний скрипт `js/main.js`, у якому об'єднано роботу головного слайдера, таймера акцій, фільтрації категорій, а також повний інтерактив для модального вікна товару (відкриття при кліку, галерея ракурсів, вибір кольору/розміру та акордеони).

```javascript
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. ГОЛОВНИЙ СЛАЙДЕР (HERO SECTION)
  // ==========================================
  const heroSlides = document.querySelectorAll('.slide');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');
  let activeSlideIndex = 0;
  let heroAutoPlayTimer;

  function displaySlide(targetIndex) {
    heroSlides.forEach((slide) => slide.classList.remove('active'));

    if (targetIndex >= heroSlides.length) {
      activeSlideIndex = 0;
    } else if (targetIndex < 0) {
      activeSlideIndex = heroSlides.length - 1;
    } else {
      activeSlideIndex = targetIndex;
    }

    if (heroSlides[activeSlideIndex]) {
      heroSlides[activeSlideIndex].classList.add('active');
    }
  }

  function advanceToNextSlide() {
    displaySlide(activeSlideIndex + 1);
  }

  function returnToPrevSlide() {
    displaySlide(activeSlideIndex - 1);
  }

  function startAutoPlay() {
    heroAutoPlayTimer = setInterval(advanceToNextSlide, 4500);
  }

  function restartAutoPlay() {
    clearInterval(heroAutoPlayTimer);
    startAutoPlay();
  }

  if (nextSlideBtn && prevSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      advanceToNextSlide();
      restartAutoPlay();
    });

    prevSlideBtn.addEventListener('click', () => {
      returnToPrevSlide();
      restartAutoPlay();
    });
  }

  if (heroSlides.length > 0) {
    startAutoPlay();
  }


  // ==========================================
  // 2. ТАЙМЕР ЗВОРОТНОГО ВІДЛІКУ АКЦІЇ
  // ==========================================
  const promotionEndDate = new Date();
  promotionEndDate.setDate(promotionEndDate.getDate() + 3);

  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  function refreshCountdown() {
    const currentTime = new Date().getTime();
    const remainingTime = promotionEndDate - currentTime;

    if (remainingTime <= 0) return;

    const daysCount = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hoursCount = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesCount = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const secondsCount = Math.floor((remainingTime % (1000 * 60)) / 1000);

    const formatNumber = (num) => String(num).padStart(2, '0');

    if (daysElement) daysElement.innerText = formatNumber(daysCount);
    if (hoursElement) hoursElement.innerText = formatNumber(hoursCount);
    if (minutesElement) minutesElement.innerText = formatNumber(minutesCount);
    if (secondsElement) secondsElement.innerText = formatNumber(secondsCount);
  }

  setInterval(refreshCountdown, 1000);
  refreshCountdown();


  // ==========================================
  // 3. ФІЛЬТРАЦІЯ РОЗДІЛІВ ТА ПІДКАТЕГОРІЙ
  // ==========================================
  const genderTabButtons = document.querySelectorAll('.switch-btn');
  const womenSection = document.getElementById('women-group');
  const menSection = document.getElementById('men-group');

  genderTabButtons.forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      genderTabButtons.forEach((btn) => btn.classList.remove('active'));
      tabBtn.classList.add('active');

      const selectedGender = tabBtn.getAttribute('data-gender');
      if (selectedGender === 'women') {
        if (womenSection) womenSection.style.display = 'block';
        if (menSection) menSection.style.display = 'none';
      } else {
        if (womenSection) womenSection.style.display = 'none';
        if (menSection) menSection.style.display = 'block';
      }
    });
  });

  const filterPillButtons = document.querySelectorAll('.pill-btn');
  filterPillButtons.forEach((pill) => {
    pill.addEventListener('click', function () {
      const parentContainer = this.closest('.categories-pills');
      if (parentContainer) {
        parentContainer.querySelectorAll('.pill-btn').forEach((p) => p.classList.remove('active'));
      }
      this.classList.add('active');
    });
  });


  // ==========================================
  // 4. ДЕТАЛЬНЕ ВІКНО ТОВАРУ (MODAL POPUP)
  // ==========================================
  const modalOverlay = document.getElementById('productModal');
  const modalCloseTrigger = document.getElementById('closeModal');
  const catalogProductCards = document.querySelectorAll('.product-card');

  // Елементи всередині модального вікна
  const modalImgElement = document.getElementById('mainProductImage');
  const modalTitleElement = document.getElementById('modalTitle');
  const modalPriceElement = document.getElementById('modalPrice');
  const thumbnailItems = document.querySelectorAll('.thumb-btn');
  const colorOptions = document.querySelectorAll('.swatch');
  const colorNameDisplay = document.getElementById('selectedColorName');
  const sizeOptionButtons = document.querySelectorAll('.size-btn');
  const accordionTriggers = document.querySelectorAll('.accordion-header');

  // Відкриття модалки при кліку на картку
  catalogProductCards.forEach((card) => {
    card.addEventListener('click', () => {
      const cardTitle = card.querySelector('.product-title')?.innerText || 'Обраний товар';
      const cardPrice = card.querySelector('.product-price')?.innerText || '';
      const cardImage = card.querySelector('.product-image img')?.src;

      if (modalTitleElement) modalTitleElement.innerText = cardTitle;
      if (modalPriceElement && cardPrice) modalPriceElement.innerText = cardPrice;
      if (modalImgElement && cardImage) modalImgElement.src = cardImage;

      if (modalOverlay) {
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Закриття модального вікна
  function dismissProductModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseTrigger) {
    modalCloseTrigger.addEventListener('click', dismissProductModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) {
        dismissProductModal();
      }
    });
  }

  // Закриття на клавішу Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalOverlay?.classList.contains('open')) {
      dismissProductModal();
    }
  });

  // Перемикання мініатюр у галереї
  thumbnailItems.forEach((thumb) => {
    thumb.addEventListener('click', (event) => {
      event.stopPropagation();
      thumbnailItems.forEach((item) => item.classList.remove('active'));
      thumb.classList.add('active');

      const fullImageSource = thumb.getAttribute('data-img');
      if (fullImageSource && modalImgElement) {
        modalImgElement.src = fullImageSource;
      }
    });
  });

  // Вибір кольору
  colorOptions.forEach((swatch) => {
    swatch.addEventListener('click', (event) => {
      event.stopPropagation();
      colorOptions.forEach((item) => item.classList.remove('active'));
      swatch.classList.add('active');

      const chosenColor = swatch.getAttribute('data-color');
      if (colorNameDisplay && chosenColor) {
        colorNameDisplay.innerText = chosenColor;
      }
    });
  });

  // Вибір розміру
  sizeOptionButtons.forEach((sizeBtn) => {
    sizeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      sizeOptionButtons.forEach((btn) => btn.classList.remove('active'));
      sizeBtn.classList.add('active');
    });
  });

  // Розгортання / згортання акордеонів (Опис / Склад)
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const contentId = trigger.getAttribute('data-target');
      const contentPanel = document.getElementById(contentId);
      const indicatorArrow = trigger.querySelector('.accordion-arrow');

      if (contentPanel) {
        const isAlreadyOpen = contentPanel.classList.contains('open');
        contentPanel.classList.toggle('open');

        if (indicatorArrow) {
          indicatorArrow.innerHTML = isAlreadyOpen ? '&#9662;' : '&#9652;';
        }
      }
    });
  });

});
