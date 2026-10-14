document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. МОБІЛЬНЕ МЕНЮ (БУРГЕР)
  // ============================================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });
  }

  // ============================================================
  // 2. БАЗА ДАНИХ ТОВАРІВ
  // ============================================================
  const PRODUCTS_DATA = {
    'tracksuit-terracotta': {
      title: 'Костюм трикотажний жіночий, колір теракотовий, 244R9137',
      sku: '244R9137',
      category: 'Спортивні костюми',
      currentPrice: '1 199 грн',
      oldPrice: '3 839 грн',
      discount: '-69%',
      stock: '8 шт',
      photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#c15c3d', '#2b2b2e', '#d2b48c', '#556b2f']
    },
    'jeans-wide-leg': {
      title: 'Джинси Wide-Leg Dark Grey, вільний крій, 102R5501',
      sku: '102R5501',
      category: 'Джинси',
      currentPrice: '1 890 грн',
      oldPrice: '2 650 грн',
      discount: '-45%',
      stock: '14 шт',
      photo: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#3e424b', '#1e3a5f', '#151515', '#89a8c4']
    },
    'jacket-oversize': {
      title: 'Куртка оверсайз з водовідштовхувальним покриттям, 305J210',
      sku: '305J210',
      category: 'Куртки',
      currentPrice: '3 450 грн',
      oldPrice: '4 500 грн',
      discount: '-23%',
      stock: '5 шт',
      photo: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#1c1c1e', '#4b5320', '#f5f5dc']
    },
    'hoodie-minimalist': {
      title: 'Худі Minimalist Cotton оверсайз, 552H1200',
      sku: '552H1200',
      category: 'Толстовки',
      currentPrice: '2 150 грн',
      oldPrice: '3 100 грн',
      discount: '-30%',
      stock: '11 шт',
      photo: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#b0b3b8', '#1a1a1a', '#4a2e1b', '#e8e6df']
    },
    'sweater-soft-wool': {
      title: "В'язаний светр Soft Wool, пудровий відтінок, 881W320",
      sku: '881W320',
      category: 'Светри та кофти',
      currentPrice: '1 650 грн',
      oldPrice: '2 200 грн',
      discount: '-25%',
      stock: '6 шт',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#e4a853', '#333333', '#d9c5b2', '#7b8794']
    },
    'jeans-mom-fit': {
      title: 'Джинси Mom Fit Dark, бавовна, 104R4400',
      sku: '104R4400',
      category: 'Джинси',
      currentPrice: '1 920 грн',
      oldPrice: '2 500 грн',
      discount: '-23%',
      stock: '9 шт',
      photo: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#232b38', '#5b708b', '#111111']
    },
    'sweatshirt-heavy': {
      title: 'Чоловічий світшот Heavy Cotton Charcoal, 773M110',
      sku: '773M110',
      category: 'Чоловічий одяг',
      currentPrice: '1 490 грн',
      oldPrice: '1 990 грн',
      discount: '-25%',
      stock: '12 шт',
      photo: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#3a3d40', '#1c1c1c', '#a6a8aa']
    },
    'denim-jacket-vintage': {
      title: 'Джинсова куртка Vintage Indigo, 442D991',
      sku: '442D991',
      category: 'Чоловічий одяг',
      currentPrice: '2 750 грн',
      oldPrice: '3 500 грн',
      discount: '-21%',
      stock: '4 шт',
      photo: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#2f4460', '#1f2a38', '#8fa9c4']
    },
    'leather-jacket-classic': {
      title: 'Шкіряна косуха Classic Black, 909L710',
      sku: '909L710',
      category: 'Хіти продажу',
      currentPrice: '3 999 грн',
      oldPrice: '4 999 грн',
      discount: '-20%',
      stock: '3 шт',
      photo: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#111111', '#3b2f2f', '#555555']
    },
    'cargo-pants-olive': {
      title: 'Штани Cargo Olive з накладними кишенями, 663C210',
      sku: '663C210',
      category: 'Хіти продажу',
      currentPrice: '1 850 грн',
      oldPrice: '2 300 грн',
      discount: '-19%',
      stock: '7 шт',
      photo: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=80',
      colorPalette: ['#59634f', '#2a2a2a', '#b0a084']
    },
    'body-black': {
      title: 'Боді з вирізом на блискавці Black Classic',
      sku: '701B22',
      category: 'Сезонні знижки',
      currentPrice: '899 грн',
      oldPrice: '1 799 грн',
      discount: '-50%',
      stock: '15 шт',
      photo: 'img/top.jpg',
      colorPalette: ['#111111', '#f5f5f5', '#c2a382', '#6b3e26']
    }
  };

  // ============================================================
  // 3. СИНХРОНІЗОВАНИЙ ТАЙМЕР
  // ============================================================
  const CYCLE_DURATION = 3 * 24 * 60 * 60 * 1000;
  let saleEndTime = localStorage.getItem('clothes_sale_deadline');
  const now = new Date().getTime();

  if (!saleEndTime || parseInt(saleEndTime, 10) <= now) {
    saleEndTime = now + CYCLE_DURATION;
    localStorage.setItem('clothes_sale_deadline', saleEndTime.toString());
  } else {
    saleEndTime = parseInt(saleEndTime, 10);
  }

  function updateSyncTimer() {
    let currentMoment = new Date().getTime();
    let distance = saleEndTime - currentMoment;

    if (distance <= 0) {
      saleEndTime = currentMoment + CYCLE_DURATION;
      localStorage.setItem('clothes_sale_deadline', saleEndTime.toString());
      distance = CYCLE_DURATION;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    ['days', 'pdpDays'].forEach(id => { const el = document.getElementById(id); if (el) el.innerText = pad(days); });
    ['hours', 'pdpHours'].forEach(id => { const el = document.getElementById(id); if (el) el.innerText = pad(hours); });
    ['minutes', 'pdpMinutes'].forEach(id => { const el = document.getElementById(id); if (el) el.innerText = pad(minutes); });
    ['seconds', 'pdpSeconds'].forEach(id => { const el = document.getElementById(id); if (el) el.innerText = pad(seconds); });
  }

  setInterval(updateSyncTimer, 1000);
  updateSyncTimer();

  // ============================================================
  // 4. СЛАЙДЕР НА ГОЛОВНІЙ
  // ============================================================
  const heroSlides = document.querySelectorAll('.slide');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');
  let activeSlide = 0;

  function showSlide(idx) {
    heroSlides.forEach((s) => s.classList.remove('active'));
    if (idx >= heroSlides.length) activeSlide = 0;
    else if (idx < 0) activeSlide = heroSlides.length - 1;
    else activeSlide = idx;

    if (heroSlides[activeSlide]) heroSlides[activeSlide].classList.add('active');
  }

  if (nextSlideBtn && prevSlideBtn) {
    nextSlideBtn.addEventListener('click', () => { showSlide(activeSlide + 1); });
    prevSlideBtn.addEventListener('click', () => { showSlide(activeSlide - 1); });
    setInterval(() => showSlide(activeSlide + 1), 4500);
  }

  // ============================================================
  // 5. ПЕРЕМИКАННЯ СТАТІ ТА МАРШРУТИЗАЦІЯ
  // ============================================================
  function switchGender(gender) {
    const womenBtn = document.querySelector('.switch-btn[data-gender="women"]');
    const menBtn = document.querySelector('.switch-btn[data-gender="men"]');
    const womenGroup = document.getElementById('women-group');
    const menGroup = document.getElementById('men-group');

    if (!womenBtn || !menBtn) return;

    if (gender === 'women') {
      womenBtn.classList.add('active');
      menBtn.classList.remove('active');
      if (womenGroup) womenGroup.style.display = 'block';
      if (menGroup) menGroup.style.display = 'none';
      const firstPill = womenGroup?.querySelector('.pill-btn[data-filter="all"]');
      if (firstPill) firstPill.click();
    } else if (gender === 'men') {
      menBtn.classList.add('active');
      womenBtn.classList.remove('active');
      if (menGroup) menGroup.style.display = 'block';
      if (womenGroup) womenGroup.style.display = 'none';
      const firstPill = menGroup?.querySelector('.pill-btn[data-filter="all"]');
      if (firstPill) firstPill.click();
    }

    if (typeof filterAndSortCatalog === 'function') {
      filterAndSortCatalog();
    }
  }

  document.querySelectorAll('.switch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchGender(btn.getAttribute('data-gender'));
    });
  });

  const currentParams = new URLSearchParams(window.location.search);
  const targetGender = currentParams.get('gender');
  if (targetGender) {
    switchGender(targetGender);
  }

  // ============================================================
  // 6. КАРУСЕЛЬ КАТАЛОГУ
  // ============================================================
  function initCarouselScroll(prevBtnId, nextBtnId, carouselId) {
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const carousel = document.getElementById(carouselId);

    if (prevBtn && nextBtn && carousel) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -carousel.clientWidth * 0.75, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: carousel.clientWidth * 0.75, behavior: 'smooth' });
      });
    }
  }

  initCarouselScroll('womenPrev', 'womenNext', 'women-grid');
  initCarouselScroll('menPrev', 'menNext', 'men-grid');

  function initCategoryFilters(groupId, carouselId, emptyId, prevBtnId, nextBtnId) {
    const group = document.getElementById(groupId);
    if (!group) return;

    const filterBtns = group.querySelectorAll('.pill-btn');
    const carousel = document.getElementById(carouselId);
    const carouselWrapper = carousel ? carousel.closest('.carousel-wrapper') : null;
    const emptyMsg = document.getElementById(emptyId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    function updateCarouselLayout(visibleCount) {
      if (!carousel) return;
      const singleCard = carousel.querySelector('.product-card:not(.hidden-card)');
      const cardWidth = singleCard ? singleCard.offsetWidth : 280;
      const totalWidth = visibleCount * (cardWidth + 16);
      const screenWidth = window.innerWidth;

      if (visibleCount <= 1 || totalWidth <= screenWidth) {
        carousel.classList.add('centered');
        if (prevBtn) prevBtn.classList.add('hidden');
        if (nextBtn) nextBtn.classList.add('hidden');
      } else {
        carousel.classList.remove('centered');
        if (prevBtn) prevBtn.classList.remove('hidden');
        if (nextBtn) nextBtn.classList.remove('hidden');
      }
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        const cards = carousel.querySelectorAll('.product-card');
        let visibleCount = 0;

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCat === filterValue) {
            card.classList.remove('hidden-card');
            visibleCount++;
          } else {
            card.classList.add('hidden-card');
          }
        });

        carousel.scrollTo({ left: 0, behavior: 'smooth' });

        if (visibleCount === 0) {
          if (emptyMsg) emptyMsg.style.display = 'block';
          if (carouselWrapper) carouselWrapper.style.display = 'none';
        } else {
          if (emptyMsg) emptyMsg.style.display = 'none';
          if (carouselWrapper) carouselWrapper.style.display = 'block';
          updateCarouselLayout(visibleCount);
        }
      });
    });

    const initialVisible = carousel.querySelectorAll('.product-card').length;
    updateCarouselLayout(initialVisible);
  }

  initCategoryFilters('women-group', 'women-grid', 'women-empty', 'womenPrev', 'womenNext');
  initCategoryFilters('men-group', 'men-grid', 'men-empty', 'menPrev', 'menNext');

  // ============================================================
  // 7. СТОРІНКА ТОВАРУ (PRODUCT.HTML)
  // ============================================================
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId && PRODUCTS_DATA[productId]) {
    const item = PRODUCTS_DATA[productId];

    const pdpTitle = document.getElementById('pdpTitle');
    const pdpSku = document.getElementById('pdpSku');
    const breadcrumbCat = document.getElementById('breadcrumbCategory');
    const breadcrumbCur = document.getElementById('breadcrumbCurrent');
    const pdpPriceCur = document.getElementById('pdpPriceCurrent');
    const pdpPriceOld = document.getElementById('pdpPriceOld');
    const pdpDiscountBadge = document.getElementById('pdpDiscountBadge');
    const pdpStock = document.getElementById('pdpStockCount');
    const pdpMainImage = document.getElementById('pdpMainImage');
    const colorSwatchesBox = document.getElementById('pdpColorSwatches');

    if (pdpTitle) pdpTitle.innerText = item.title;
    if (pdpSku) pdpSku.innerText = item.sku;
    if (breadcrumbCat) breadcrumbCat.innerText = item.category;
    if (breadcrumbCur) breadcrumbCur.innerText = item.title;
    if (pdpPriceCur) pdpPriceCur.innerText = item.currentPrice;
    if (pdpPriceOld) pdpPriceOld.innerText = item.oldPrice;
    if (pdpDiscountBadge) pdpDiscountBadge.innerText = item.discount;
    if (pdpStock) pdpStock.innerText = item.stock;
    if (pdpMainImage) pdpMainImage.src = item.photo;

    if (colorSwatchesBox && item.colorPalette) {
      colorSwatchesBox.innerHTML = '';
      item.colorPalette.forEach((hexColor) => {
        const circle = document.createElement('div');
        circle.className = 'pdp-color-circle';
        circle.style.backgroundColor = hexColor;
        colorSwatchesBox.appendChild(circle);
      });
    }

    const qtyValue = document.getElementById('pdpQtyValue');
    const btnPlus = document.getElementById('pdpQtyPlus');
    const btnMinus = document.getElementById('pdpQtyMinus');
    let quantity = 1;

    if (btnPlus && btnMinus && qtyValue) {
      btnPlus.addEventListener('click', () => {
        quantity++;
        qtyValue.innerText = quantity;
      });
      btnMinus.addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          qtyValue.innerText = quantity;
        }
      });
    }

    const pdpSizeButtons = document.querySelectorAll('.pdp-size-btn');
    pdpSizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        pdpSizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    const pdpBuyBtn = document.getElementById('pdpMainBuyBtn');
    if (pdpBuyBtn) {
      pdpBuyBtn.addEventListener('click', () => {
        const activeSize = document.querySelector('.pdp-size-btn.active')?.innerText.trim() || 'S';
        addToCart(item.title, item.currentPrice, item.photo, activeSize, quantity);
      });
    }

    const quickBuyBtn = document.getElementById('pdpQuickBuyBtn');
    const quickPhoneInput = document.getElementById('quickBuyPhone');
    if (quickBuyBtn && quickPhoneInput) {
      quickBuyBtn.addEventListener('click', () => {
        const phone = quickPhoneInput.value.trim();
        if (phone.length < 9) {
          alert('Введіть коректний 9-значний номер телефону');
          return;
        }
        const activeSize = document.querySelector('.pdp-size-btn.active')?.innerText.trim() || 'S';
        alert(`Дякуємо! Замовлення на "${item.title}" (Розмір ${activeSize}) оформлено.\nНомер: +380${phone}. Менеджер зв'яжеться з вами.`);
        quickPhoneInput.value = '';
      });
    }
  }

  // ============================================================
  // 8. КОШИК ТА LOCALSTORAGE
  // ============================================================
  const cartModal = document.getElementById('cartModal');
  const closeCartBtn = document.getElementById('closeCartModal');
  const continueBtn = document.getElementById('continueShoppingBtn');
  const headerCartBtn = document.getElementById('openCartFromHeader');
  const cartBadge = document.getElementById('cartBadge');
  const sizeModal = document.getElementById('sizeModal');
  const closeSizeBtn = document.getElementById('closeSizeModal');

  const cartContainer = document.getElementById('cartItemsContainer');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartFooter = document.getElementById('cartFooter');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');

  let cart = JSON.parse(localStorage.getItem('user_cart') || '[]');
  let tempSelectedProduct = {};

  function parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(String(priceStr).replace(/\D/g, ''), 10) || 0;
  }

  function renderCart() {
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    let totalSum = 0;
    let totalCount = 0;

    if (cart.length === 0) {
      if (cartEmptyState) cartEmptyState.style.display = 'block';
      if (cartFooter) cartFooter.style.display = 'none';
    } else {
      if (cartEmptyState) cartEmptyState.style.display = 'none';
      if (cartFooter) cartFooter.style.display = 'flex';

      cart.forEach((item, index) => {
        const itemSum = item.price * item.quantity;
        totalSum += itemSum;
        totalCount += item.quantity;

        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
          <div class="cart-item-thumb">
            <img src="${item.img}" alt="${item.title}">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.title} (Розмір: ${item.size})</h4>
            <p class="cart-item-meta">${item.quantity} шт. × ${item.price.toLocaleString('uk-UA')} грн</p>
            <p class="cart-item-price">${itemSum.toLocaleString('uk-UA')} грн</p>
          </div>
          <button class="cart-item-remove" data-index="${index}" aria-label="Видалити">&#10005;</button>
        `;
        cartContainer.appendChild(row);
      });
    }

    if (cartSubtotalEl) cartSubtotalEl.innerText = `${totalSum.toLocaleString('uk-UA')} грн`;
    if (cartTotalEl) cartTotalEl.innerText = `${totalSum.toLocaleString('uk-UA')} грн`;
    if (cartBadge) cartBadge.innerText = totalCount;

    localStorage.setItem('user_cart', JSON.stringify(cart));
  }

  function addToCart(title, priceStr, img, size = 'S', qty = 1) {
    const numericPrice = parsePrice(priceStr);
    const existingIndex = cart.findIndex(i => i.title === title && i.size === size);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        title,
        price: numericPrice,
        img,
        size,
        quantity: qty
      });
    }

    renderCart();
    openModal(cartModal);
  }

  function openModal(modal) {
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay.open, .cart-modal-overlay.open, .size-modal-overlay.open').forEach(m => closeModal(m));
  }

  if (cartContainer) {
    cartContainer.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.cart-item-remove');
      if (removeBtn) {
        const itemIndex = parseInt(removeBtn.getAttribute('data-index'), 10);
        cart.splice(itemIndex, 1);
        renderCart();
      }
    });
  }

  if (closeCartBtn) closeCartBtn.addEventListener('click', () => closeModal(cartModal));
  if (continueBtn) continueBtn.addEventListener('click', () => closeModal(cartModal));
  if (closeSizeBtn) closeSizeBtn.addEventListener('click', () => closeModal(sizeModal));
  if (headerCartBtn) headerCartBtn.addEventListener('click', () => { renderCart(); openModal(cartModal); });

  const buyPillButtons = document.querySelectorAll('.buy-pill-btn');
  buyPillButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const pId = btn.getAttribute('data-id');
      const item = PRODUCTS_DATA[pId];
      if (item) {
        tempSelectedProduct = { title: item.title, price: item.currentPrice, img: item.photo };
      } else {
        const card = btn.closest('.product-card');
        tempSelectedProduct = {
          title: card.querySelector('.product-title-row')?.innerText.trim(),
          price: card.querySelector('.price-current')?.innerText.trim(),
          img: card.querySelector('.product-image img')?.src
        };
      }

      if (sizeModal) openModal(sizeModal);
    });
  });

  const sizePills = document.querySelectorAll('.size-pill-option');
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const chosenSize = pill.getAttribute('data-size');
      closeModal(sizeModal);
      addToCart(tempSelectedProduct.title, tempSelectedProduct.price, tempSelectedProduct.img, chosenSize, 1);
    });
  });

  // ============================================================
  // 9. CHECKOUT ТА ОПЛАТА
  // ============================================================
  const checkoutBtn = document.querySelector('.btn-checkout');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutModal = document.getElementById('closeCheckoutModal');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutFinalTotal = document.getElementById('checkoutFinalTotal');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentCart = JSON.parse(localStorage.getItem('user_cart') || '[]');
      const totalPrice = currentCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

      if (totalPrice === 0) {
        alert('Ваш кошик порожній! Оберіть товари для замовлення.');
        return;
      }

      closeModal(cartModal);
      if (checkoutFinalTotal) checkoutFinalTotal.innerText = `${totalPrice.toLocaleString('uk-UA')} грн`;
      openModal(checkoutModal);
    });
  }

  if (closeCheckoutModal) {
    closeCheckoutModal.addEventListener('click', () => closeModal(checkoutModal));
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('orderName').value;
      const phone = document.getElementById('orderPhone').value;
      const total = checkoutFinalTotal.innerText;
      const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
      const paymentText = paymentMethod === 'card' ? 'Оплата картою онлайн' : 'Післяплата у відділенні';

      alert(`Дякуємо за замовлення, ${name}!\nСума до сплати: ${total}\nСпосіб оплати: ${paymentText}\nМенеджер зв'яжеться з вами за номером: ${phone}`);
      
      cart = [];
      renderCart();
      checkoutForm.reset();
      closeModal(checkoutModal);
    });
  }

  // ============================================================
  // 10. ТАБЛИЦЯ РОЗМІРІВ ТА ІНФО-МОДАЛКИ
  // ============================================================
  const sizeGuideModal = document.getElementById('sizeGuideModal');
  const closeSizeGuideModal = document.getElementById('closeSizeGuideModal');

  document.querySelectorAll('.size-guide-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(sizeGuideModal);
    });
  });

  if (closeSizeGuideModal) {
    closeSizeGuideModal.addEventListener('click', () => closeModal(sizeGuideModal));
  }

  const infoDeliveryModal = document.getElementById('infoDeliveryModal');
  const closeDeliveryModal = document.getElementById('closeDeliveryModal');

  document.querySelectorAll('.footer-delivery-link, a[href="#delivery"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(infoDeliveryModal);
    });
  });

  if (closeDeliveryModal) {
    closeDeliveryModal.addEventListener('click', () => closeModal(infoDeliveryModal));
  }

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // ============================================================
  // 11. ФІЛЬТРАЦІЯ ТА СОРТУВАННЯ У КАТАЛОЗІ КОЛЕКЦІЙ
  // ============================================================
  const filterCat = document.getElementById('filterCategory');
  const priceMinInput = document.getElementById('priceMin');
  const priceMaxInput = document.getElementById('priceMax');
  const sortPriceSelect = document.getElementById('sortPrice');
  const resetBtn = document.getElementById('resetFilterBtn');

  function filterAndSortCatalog() {
    const minVal = parseFloat(priceMinInput?.value) || 0;
    const maxVal = parseFloat(priceMaxInput?.value) || Infinity;
    const selectedCategory = filterCat?.value || 'all';

    const activeGroup = document.querySelector('.category-group:not([style*="display: none"])');
    if (!activeGroup) return;

    const activeCarousel = activeGroup.querySelector('.products-carousel');
    const emptyMsg = activeGroup.querySelector('.empty-category-msg');
    const carouselWrapper = activeGroup.querySelector('.carousel-wrapper');
    const cards = activeCarousel?.querySelectorAll('.product-card');

    if (!cards) return;

    let visibleCount = 0;

    cards.forEach(card => {
      const priceText = card.querySelector('.price-current')?.innerText || '0';
      const price = parseFloat(priceText.replace(/\D/g, '')) || 0;
      const category = card.dataset.category || 'all';

      const matchPrice = price >= minVal && price <= maxVal;
      const matchCat = (selectedCategory === 'all' || category === selectedCategory);

      if (matchPrice && matchCat) {
        card.classList.remove('hidden-card');
        visibleCount++;
      } else {
        card.classList.add('hidden-card');
      }
    });

    const sortVal = sortPriceSelect?.value;
    if (activeCarousel && (sortVal === 'asc' || sortVal === 'desc')) {
      const cardsArray = Array.from(cards);
      cardsArray.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price-current')?.innerText.replace(/\D/g, '')) || 0;
        const priceB = parseFloat(b.querySelector('.price-current')?.innerText.replace(/\D/g, '')) || 0;
        return sortVal === 'asc' ? priceA - priceB : priceB - priceA;
      });
      cardsArray.forEach(card => activeCarousel.appendChild(card));
    }

    if (visibleCount === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (carouselWrapper) carouselWrapper.style.display = 'none';
    } else {
      if (emptyMsg) emptyMsg.style.display = 'none';
      if (carouselWrapper) carouselWrapper.style.display = 'block';
      if (visibleCount <= 2) {
        activeCarousel.classList.add('centered');
      } else {
        activeCarousel.classList.remove('centered');
      }
    }
  }

  if (filterCat) filterCat.addEventListener('change', filterAndSortCatalog);
  if (priceMinInput) priceMinInput.addEventListener('input', filterAndSortCatalog);
  if (priceMaxInput) priceMaxInput.addEventListener('input', filterAndSortCatalog);
  if (sortPriceSelect) sortPriceSelect.addEventListener('change', filterAndSortCatalog);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (filterCat) filterCat.value = 'all';
      if (priceMinInput) priceMinInput.value = '';
      if (priceMaxInput) priceMaxInput.value = '';
      if (sortPriceSelect) sortPriceSelect.value = 'default';
      
      document.querySelectorAll('.categories-pills .pill-btn').forEach(b => {
        if (b.dataset.filter === 'all') b.classList.add('active');
        else b.classList.remove('active');
      });

      filterAndSortCatalog();
    });
  }
  // ============================================================
  // 12. ПОШУК ТОВАРІВ ПО САЙТУ
  // ============================================================
  const openSearchBtn = document.getElementById('openSearchBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearchModal = document.getElementById('closeSearchModal');
  const siteSearchInput = document.getElementById('siteSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchResultsContainer = document.getElementById('searchResultsContainer');

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        siteSearchInput?.focus();
      }, 100);
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearch);
  if (closeSearchModal) closeSearchModal.addEventListener('click', closeSearch);

  // Очищення інпута
  if (clearSearchBtn && siteSearchInput) {
    clearSearchBtn.addEventListener('click', () => {
      siteSearchInput.value = '';
      clearSearchBtn.style.display = 'none';
      if (searchResultsContainer) {
        searchResultsContainer.innerHTML = '<div class="search-hint">Почніть вводити назву, артикул або категорію одягу...</div>';
      }
      siteSearchInput.focus();
    });
  }

  // Обробка введення пошукового запиту
  if (siteSearchInput && searchResultsContainer) {
    siteSearchInput.addEventListener('input', () => {
      const query = siteSearchInput.value.trim().toLowerCase();

      if (query.length > 0) {
        if (clearSearchBtn) clearSearchBtn.style.display = 'block';
      } else {
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';
        searchResultsContainer.innerHTML = '<div class="search-hint">Почніть вводити назву, артикул або категорію одягу...</div>';
        return;
      }

      // Шукаємо по об'єкту PRODUCTS_DATA
      const matches = Object.entries(PRODUCTS_DATA).filter(([id, item]) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const skuMatch = item.sku.toLowerCase().includes(query);
        const catMatch = item.category.toLowerCase().includes(query);
        return titleMatch || skuMatch || catMatch;
      });

      if (matches.length === 0) {
        searchResultsContainer.innerHTML = `
          <div class="search-hint">
            <span style="font-size: 32px; display: block; margin-bottom: 8px;">🔍</span>
            За запитом <strong>«${siteSearchInput.value}»</strong> нічого не знайдено.<br>
            Спробуйте інше слово або категорію.
          </div>
        `;
        return;
      }

      // Виводимо знайдені товари
      searchResultsContainer.innerHTML = matches.map(([id, item]) => `
        <a href="product.html?id=${id}" class="search-item-card">
          <img src="${item.photo}" alt="${item.title}" class="search-item-thumb">
          <div class="search-item-info">
            <div class="search-item-title">${item.title}</div>
            <div class="search-item-category">${item.category} • Арт: ${item.sku}</div>
          </div>
          <div class="search-item-price">${item.currentPrice}</div>
        </a>
      `).join('');
    });
  }

  // Віджет знижки
  const giftWidget = document.getElementById('giftWidget');
  const giftBubble = document.getElementById('giftBubble');
  const copyPromoBtn = document.getElementById('copyPromoBtn');
  const promoCodeEl = document.getElementById('giftPromoCode');

  if (giftBubble && giftWidget) {
    giftBubble.addEventListener('click', (e) => {
      e.stopPropagation();
      giftWidget.classList.toggle('active');
    });
  }

  if (copyPromoBtn && promoCodeEl) {
    copyPromoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(promoCodeEl.innerText.trim()).then(() => {
        copyPromoBtn.innerText = 'Скопійовано!';
        setTimeout(() => copyPromoBtn.innerText = 'Копіювати', 2000);
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (giftWidget && !giftWidget.contains(e.target)) {
      giftWidget.classList.remove('active');
    }
  });

  // Ініціалізація кошика
  renderCart();

});
