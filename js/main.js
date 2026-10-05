document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. СЛАЙДЕР HERO
  // ==========================================
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((s) => s.classList.remove('active'));
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    if (slides[currentSlide]) {
      slides[currentSlide].classList.add('active');
    }
  }

  function nextSlide() { showSlide(currentSlide + 1); }
  function prevSlide() { showSlide(currentSlide - 1); }

  function startInterval() {
    slideInterval = setInterval(nextSlide, 4500);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    startInterval();
  }

  // ==========================================
  // 2. ТАЙМЕР АКЦІЇ
  // ==========================================
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 3);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = saleEndDate - now;
    if (distance <= 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    const d = document.getElementById('days');
    const h = document.getElementById('hours');
    const m = document.getElementById('minutes');
    const s = document.getElementById('seconds');

    if (d) d.innerText = pad(days);
    if (h) h.innerText = pad(hours);
    if (m) m.innerText = pad(minutes);
    if (s) s.innerText = pad(seconds);
  }

  setInterval(updateTimer, 1000);
  updateTimer();

  // ==========================================
  // 3. ПЕРЕМИКАННЯ КАТЕГОРІЙ
  // ==========================================
  const genderButtons = document.querySelectorAll('.switch-btn');
  const womenGroup = document.getElementById('women-group');
  const menGroup = document.getElementById('men-group');

  genderButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      genderButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selected = btn.getAttribute('data-gender');
      if (selected === 'women') {
        if (womenGroup) womenGroup.style.display = 'block';
        if (menGroup) menGroup.style.display = 'none';
      } else {
        if (womenGroup) womenGroup.style.display = 'none';
        if (menGroup) menGroup.style.display = 'block';
      }
    });
  });

  document.querySelectorAll('.pill-btn').forEach((pill) => {
    pill.addEventListener('click', function () {
      const parent = this.closest('.categories-pills');
      if (parent) {
        parent.querySelectorAll('.pill-btn').forEach((p) => p.classList.remove('active'));
      }
      this.classList.add('active');
    });
  });

  // ============================================================
  // 4. ВІКНО «ОБЕРІТЬ РОЗМІР» -> ВІКНО «КОШИК ЗАМОВЛЕНЬ»
  // ============================================================
  const sizeModal = document.getElementById('sizeModal');
  const closeSizeModalBtn = document.getElementById('closeSizeModal');
  const sizeOptions = document.querySelectorAll('.size-pill-option');

  const cartModal = document.getElementById('cartModal');
  const closeCartModalBtn = document.getElementById('closeCartModal');
  const continueShoppingBtn = document.getElementById('continueShoppingBtn');
  const openCartFromHeaderBtn = document.getElementById('openCartFromHeader');
  const cartBadge = document.getElementById('cartBadge');

  const cartItemImg = document.getElementById('cartItemImg');
  const cartItemName = document.getElementById('cartItemName');
  const cartItemMeta = document.getElementById('cartItemMeta');
  const cartItemPrice = document.getElementById('cartItemPrice');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotal = document.getElementById('cartTotal');
  const removeCartItemBtn = document.getElementById('removeCartItem');

  let cartCount = 0;
  let selectedProduct = {
    title: '',
    price: '',
    imgSrc: ''
  };

  const buyButtons = document.querySelectorAll('.buy-pill-btn');
  buyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');

      selectedProduct.title = card.getAttribute('data-title') || card.querySelector('.product-title-row')?.innerText.trim();
      selectedProduct.price = card.getAttribute('data-price') || card.querySelector('.price-current')?.innerText.trim();
      selectedProduct.imgSrc = card.querySelector('.product-image img')?.src || '';

      if (sizeModal) {
        sizeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeSizePopup() {
    if (sizeModal) {
      sizeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeSizeModalBtn) closeSizeModalBtn.addEventListener('click', closeSizePopup);
  if (sizeModal) {
    sizeModal.addEventListener('click', (e) => {
      if (e.target === sizeModal) closeSizePopup();
    });
  }

  sizeOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
      const chosenSize = opt.getAttribute('data-size');
      closeSizePopup();

      cartCount++;
      if (cartBadge) cartBadge.innerText = cartCount;

      if (cartItemImg) cartItemImg.src = selectedProduct.imgSrc;
      if (cartItemName) cartItemName.innerText = `${selectedProduct.title} (Розмір ${chosenSize})`;
      if (cartItemMeta) cartItemMeta.innerText = `1 ШТ x ${selectedProduct.price}`;
      if (cartItemPrice) cartItemPrice.innerText = selectedProduct.price;
      if (cartSubtotal) cartSubtotal.innerText = selectedProduct.price;
      if (cartTotal) cartTotal.innerText = selectedProduct.price;

      if (cartModal) {
        cartModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeCartPopup() {
    if (cartModal) {
      cartModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeCartModalBtn) closeCartModalBtn.addEventListener('click', closeCartPopup);
  if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeCartPopup);
  if (openCartFromHeaderBtn) {
    openCartFromHeaderBtn.addEventListener('click', () => {
      if (cartModal) {
        cartModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) closeCartPopup();
    });
  }

  if (removeCartItemBtn) {
    removeCartItemBtn.addEventListener('click', () => {
      if (cartItemName) cartItemName.innerText = 'Кошик порожній';
      if (cartItemMeta) cartItemMeta.innerText = '0 ШТ';
      if (cartItemPrice) cartItemPrice.innerText = '0 грн';
      if (cartSubtotal) cartSubtotal.innerText = '0 грн';
      if (cartTotal) cartTotal.innerText = '0 грн';
      cartCount = Math.max(0, cartCount - 1);
      if (cartBadge) cartBadge.innerText = cartCount;
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSizePopup();
      closeCartPopup();
    }
  });

});
