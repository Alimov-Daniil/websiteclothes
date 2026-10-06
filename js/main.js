document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. МОБІЛЬНЕ ГАМБУРГЕР-МЕНЮ (ПРАЦЮЄ НА INDEX ТА PRODUCT)
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
  // 2. БАЗА ДАНИХ ТОВАРІВ (УНІКАЛЬНІ ДАНІ ДЛЯ КОЖНОГО ТОВАРУ)
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
      title: 'Боді',
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
  // 3. СИНХРОНІЗОВАНИЙ ТАЙМЕР НА 3 ДНІ
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

    const d = document.getElementById('days');
    const h = document.getElementById('hours');
    const m = document.getElementById('minutes');
    const s = document.getElementById('seconds');
    if (d) d.innerText = pad(days);
    if (h) h.innerText = pad(hours);
    if (m) m.innerText = pad(minutes);
    if (s) s.innerText = pad(seconds);

    const pdpD = document.getElementById('pdpDays');
    const pdpH = document.getElementById('pdpHours');
    const pdpM = document.getElementById('pdpMinutes');
    const pdpS = document.getElementById('pdpSeconds');
    if (pdpD) pdpD.innerText = pad(days);
    if (pdpH) pdpH.innerText = pad(hours);
    if (pdpM) pdpM.innerText = pad(minutes);
    if (pdpS) pdpS.innerText = pad(seconds);
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
  // 5. ФУНКЦІЯ ПЕРЕМИКАННЯ СТАТІ ТА МАРШРУТИЗАЦІЯ
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
  }

  // Перемикання статі кнопками безпосередньо в каталозі
  const genderTabs = document.querySelectorAll('.switch-btn');
  genderTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isWomen = btn.getAttribute('data-gender') === 'women';
      switchGender(isWomen ? 'women' : 'men');
    });
  });

  // Обробка параметра URL ?gender=women або ?gender=men при переході з інших сторінок
  const currentParams = new URLSearchParams(window.location.search);
  const targetGender = currentParams.get('gender');
  if (targetGender) {
    switchGender(targetGender);

    if (window.location.hash === '#categories') {
      setTimeout(() => {
        const catSection = document.getElementById('categories');
        if (catSection) {
          const isMobile = window.innerWidth <= 768;
          const headerOffset = isMobile ? 65 : 75;
          const targetY = catSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }, 150);
    }
  }

  // Обробка переходів у шапці на поточній сторінці
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (href && href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          e.preventDefault();

          const genderTarget = link.getAttribute('data-gender-target');
          if (genderTarget) {
            switchGender(genderTarget);
          }

          const isMobile = window.innerWidth <= 768;
          const headerOffset = isMobile ? 65 : 75;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ============================================================
  // 6. ГОРИЗОНТАЛЬНИЙ СКРОЛ ТА ФІЛЬТРАЦІЯ КАТАЛОГУ
  // ============================================================
  function initCarouselScroll(prevBtnId, nextBtnId, carouselId) {
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const carousel = document.getElementById(carouselId);

    if (prevBtn && nextBtn && carousel) {
      prevBtn.addEventListener('click', () => {
        const scrollStep = carousel.clientWidth * 0.75;
        carousel.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        const scrollStep = carousel.clientWidth * 0.75;
        carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
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

      const singleCard = carousel.querySelector('.product-card');
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
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
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

    window.addEventListener('resize', () => {
      const activeBtn = group.querySelector('.pill-btn.active');
      const filterValue = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      let count = 0;
      carousel.querySelectorAll('.product-card').forEach((c) => {
        const cat = c.getAttribute('data-category');
        if (filterValue === 'all' || cat === filterValue) count++;
      });
      updateCarouselLayout(count);
    });

    const initialVisible = carousel.querySelectorAll('.product-card').length;
    updateCarouselLayout(initialVisible);
  }

  initCategoryFilters('women-group', 'women-grid', 'women-empty', 'womenPrev', 'womenNext');
  initCategoryFilters('men-group', 'men-grid', 'men-empty', 'menPrev', 'menNext');

  // ============================================================
  // 7. ЛОГІКА СТОРІНКИ ТОВАРУ (PRODUCT.HTML)
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

    if (pdpMainImage) {
      pdpMainImage.src = item.photo;
    }

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
        const activeSize = document.querySelector('.pdp-size-btn.active')?.innerText || 'S';
        openCartModal(item.title, item.currentPrice, item.photo, activeSize, quantity);
      });
    }
  }

  // ============================================================
  // 8. МОДАЛЬНІ ВІКНА КОШИКА ТА РОЗМІРУ
  // ============================================================
  const cartModal = document.getElementById('cartModal');
  const closeCartBtn = document.getElementById('closeCartModal');
  const continueBtn = document.getElementById('continueShoppingBtn');
  const headerCartBtn = document.getElementById('openCartFromHeader');
  const cartBadge = document.getElementById('cartBadge');
  const sizeModal = document.getElementById('sizeModal');
  const closeSizeBtn = document.getElementById('closeSizeModal');

  let totalCartItems = 0;
  let tempSelectedProduct = {};

  function openCartModal(title, price, img, size = 'S', qty = 1) {
    const cartImg = document.getElementById('cartItemImg');
    const cartName = document.getElementById('cartItemName');
    const cartMeta = document.getElementById('cartItemMeta');
    const cartPrice = document.getElementById('cartItemPrice');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');

    if (cartImg) cartImg.src = img;
    if (cartName) cartName.innerText = `${title} (Розмір: ${size})`;
    if (cartMeta) cartMeta.innerText = `${qty} ШТ x ${price}`;
    if (cartPrice) cartPrice.innerText = price;
    if (cartSubtotal) cartSubtotal.innerText = price;
    if (cartTotal) cartTotal.innerText = price;

    totalCartItems += qty;
    if (cartBadge) cartBadge.innerText = totalCartItems;

    if (cartModal) {
      cartModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllModals() {
    if (cartModal) cartModal.classList.remove('open');
    if (sizeModal) sizeModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeCartBtn) closeCartBtn.addEventListener('click', closeAllModals);
  if (continueBtn) continueBtn.addEventListener('click', closeAllModals);
  if (closeSizeBtn) closeSizeBtn.addEventListener('click', closeAllModals);

  if (headerCartBtn) {
    headerCartBtn.addEventListener('click', () => {
      if (cartModal) {
        cartModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  const buyPillButtons = document.querySelectorAll('.buy-pill-btn');
  buyPillButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const pId = btn.getAttribute('data-id');
      const item = PRODUCTS_DATA[pId];
      if (item) {
        tempSelectedProduct = {
          title: item.title,
          price: item.currentPrice,
          img: item.photo
        };
      } else {
        const card = btn.closest('.product-card');
        tempSelectedProduct = {
          title: card.querySelector('.product-title-row')?.innerText.trim(),
          price: card.querySelector('.price-current')?.innerText.trim(),
          img: card.querySelector('.product-image img')?.src
        };
      }

      if (sizeModal) {
        sizeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const sizePills = document.querySelectorAll('.size-pill-option');
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const chosenSize = pill.getAttribute('data-size');
      if (sizeModal) sizeModal.classList.remove('open');
      openCartModal(tempSelectedProduct.title, tempSelectedProduct.price, tempSelectedProduct.img, chosenSize);
    });
  });

  // Віджет знижки у вигляді подарунка
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

});
