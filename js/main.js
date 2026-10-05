document.addEventListener('DOMContentLoaded', () => {

  // --- 1. СЛАЙДЕР ДЛЯ ОФЕРУ (Hero Section) ---
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    
    // Зациклюємо слайди
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
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
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, 4500); // зміна кожні 4.5 секунди
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  startInterval();


  // --- 2. ТАЙМЕР ЗВОРОТНОГО ВІДЛІКУ ДЛЯ АКЦІЇ ---
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 3); // Акція діє 3 дні вперед

  function updateTimer() {
    const now = new Date().getTime();
    const distance = saleEndDate - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    document.getElementById('days').innerText = pad(days);
    document.getElementById('hours').innerText = pad(hours);
    document.getElementById('minutes').innerText = pad(minutes);
    document.getElementById('seconds').innerText = pad(seconds);
  }

  setInterval(updateTimer, 1000);
  updateTimer();


  // --- 3. ПЕРЕМИКАННЯ ВЕРХНІХ ВКЛАДОК: ЖІНОЧИЙ / ЧОЛОВІЧИЙ ОДЯГ ---
  const genderButtons = document.querySelectorAll('.switch-btn');
  const womenGroup = document.getElementById('women-group');
  const menGroup = document.getElementById('men-group');

  genderButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      genderButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selected = btn.getAttribute('data-gender');
      if (selected === 'women') {
        womenGroup.style.display = 'block';
        menGroup.style.display = 'none';
      } else {
        womenGroup.style.display = 'none';
        menGroup.style.display = 'block';
      }
    });
  });

  // --- 4. ПЕРЕМИКАННЯ ПІДКАТЕГОРІЙ (Кнопки-пігулки) ---
  const pillButtons = document.querySelectorAll('.pill-btn');
  pillButtons.forEach((pill) => {
    pill.addEventListener('click', function () {
      // Знаходимо батьківську групу кнопок
      const parent = this.closest('.categories-pills');
      parent.querySelectorAll('.pill-btn').forEach((p) => p.classList.remove('active'));
      this.classList.add('active');
    });
  });

});
