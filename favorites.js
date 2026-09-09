// ================================================================
//  JB STORE – FAVORITES ENGINE (Premium & Professional)
// ================================================================

(function(global) {
  'use strict';

  // ---------- Storage ----------
  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem('jb_favorites')) || [];
    } catch {
      return [];
    }
  }

  function saveFavorites(list) {
    localStorage.setItem('jb_favorites', JSON.stringify(list));
  }

  function isFavorite(id) {
    return getFavorites().includes(String(id));
  }

  // ---------- Toast (if not already defined) ----------
  if (typeof showToast !== 'function') {
    global.showToast = function(message) {
      const existing = document.querySelector('.toast-notification');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()">✕</button>`;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 350);
      }, 3000);
    };
  }

  // ---------- Toggle Favorite ----------
  function toggleFavorite(productId) {
    let favs = getFavorites();
    const idStr = String(productId);
    const idx = favs.indexOf(idStr);

    if (idx > -1) {
      favs.splice(idx, 1);
      showToast('♡ Removed from favorites');
    } else {
      favs.push(idStr);
      showToast('❤️ Added to favorites!');
    }
    saveFavorites(favs);

    // Update ALL heart buttons on the page immediately
    updateAllHeartButtons();
    updateFavBadge();

    // Re-render favorites grid if on favorites page
    if (window.location.pathname.includes('favorites.html') && typeof renderFavoritesGrid === 'function') {
      renderFavoritesGrid();
    }
  }

  // ---------- Update Favorites Badge ----------
  function updateFavBadge() {
    const count = getFavorites().length;
    document.querySelectorAll('#favBadge, .fav-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ---------- UPDATE EXISTING HEART BUTTONS ----------
  function updateAllHeartButtons() {
    const allButtons = document.querySelectorAll('.favorite-btn');
    
    allButtons.forEach(btn => {
      const productId = btn.getAttribute('data-product-id');
      if (!productId) return;

      const isFav = isFavorite(productId);
      
      btn.classList.toggle('is-fav', isFav);
      
      const icon = btn.querySelector('.fa-heart');
      if (icon) {
        icon.className = `fa-${isFav ? 'solid' : 'regular'} fa-heart`;
      }
    });
  }

  // ---------- Inject Hearts into Deal Cards ----------
  function injectHearts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.deal-card');
    cards.forEach(card => {
      if (card.querySelector('.favorite-btn')) return;

      const viewBtn = card.querySelector('.view-details-btn');
      let productId = null;
      if (viewBtn) {
        const match = (viewBtn.getAttribute('onclick') || '').match(/viewProduct\('([^']+)'\)/);
        if (match) productId = match[1];
      }

      if (!productId) {
        const nameEl = card.querySelector('h3');
        if (nameEl && global.allProducts) {
          const found = global.allProducts.find(p => p.name === nameEl.textContent.trim());
          if (found) productId = found.id;
        }
      }

      if (!productId) return;

      const isFav = isFavorite(productId);
      const btn = document.createElement('button');
      btn.className = `favorite-btn ${isFav ? 'is-fav' : ''}`;
      btn.setAttribute('data-product-id', productId);
      btn.setAttribute('aria-label', 'Toggle favorite');
      btn.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>`;
      btn.onclick = function(e) {
        e.stopPropagation();
        toggleFavorite(productId);
      };
      card.style.position = 'relative';
      card.appendChild(btn);
    });

    updateAllHeartButtons();
  }

  // ---------- Override displayProducts ----------
  function setupDisplayOverride() {
    if (typeof global.displayProducts !== 'function') {
      setTimeout(setupDisplayOverride, 200);
      return;
    }

    const original = global.displayProducts;
    global.displayProducts = function() {
      original();
      setTimeout(injectHearts, 50);
    };

    // Run once
    global.displayProducts();
  }

  // ---------- Best Sellers with Hearts (Local Products) ----------
  function renderBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    if (!grid) return;

    // ✅ Use local product arrays
    const all = [
      ...(global.mobileProducts || []),
      ...(global.refrigeratorProducts || []),
      ...(global.washingProducts || []),
      ...(global.acProducts || []),
      ...(global.tvProducts || [])
    ];

    if (all.length === 0) {
      setTimeout(renderBestSellers, 300);
      return;
    }

    const best = all.slice(0, 4);
    grid.innerHTML = '';

    best.forEach(p => {
      const isFav = isFavorite(p.id);
      const card = document.createElement('div');
      card.className = 'best-card';
      card.style.position = 'relative';
      card.style.cursor = 'pointer';
      card.setAttribute('onclick', `viewProduct('${p.id}')`);

      card.innerHTML = `
        <button class="favorite-btn ${isFav ? 'is-fav' : ''}"
                data-product-id="${p.id}"
                onclick="event.stopPropagation(); toggleFavorite('${p.id}')"
                aria-label="Toggle favorite">
          <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
        </button>
        <img src="${p.image || 'images/placeholder.png'}" alt="${p.name}" loading="lazy">
        <h3>${p.name}</h3>
        <p class="brand">${p.brand}</p>
        <div class="price-row">
          <span class="new">₹${(p.price || 0).toLocaleString('en-IN')}</span>
          <span class="old">₹${(p.oldPrice || 0).toLocaleString('en-IN')}</span>
        </div>
        <button onclick="event.stopPropagation(); viewProduct('${p.id}')">View Details</button>
      `;
      grid.appendChild(card);
    });
  }

  // ---------- Fix Call Buttons ----------
  function fixCallButtons() {
    const phone = global.STORE_PHONE || '919999999999';
    const tel = 'tel:' + phone;

    const bottomCall = document.getElementById('bottomCall');
    if (bottomCall) bottomCall.href = tel;

    const footerCall = document.getElementById('footerCallLink');
    if (footerCall) footerCall.href = tel;

    document.querySelectorAll('.call-item').forEach(el => {
      if (!el.href || el.href === '#' || el.href.endsWith('#')) {
        el.href = tel;
      }
    });
  }

  // ---------- Bottom Bar Active State ----------
  function setActiveBar() {
    const path = window.location.pathname;
    const isFavPage = path.includes('favorites.html');
    const home = document.getElementById('bottomHome');
    const fav = document.getElementById('bottomFav');

    if (isFavPage && fav) {
      fav.classList.add('active', 'fav-active');
      if (home) home.classList.remove('active');
    } else if (home) {
      home.classList.add('active');
      if (fav) fav.classList.remove('active', 'fav-active');
    }
  }

  // ---------- Back / Forward Cache Refresh ----------
  function setupPageShowRefresh() {
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        console.log('Page restored from bfcache – updating hearts');
        setTimeout(function() {
          updateAllHeartButtons();
          renderBestSellers();
          updateFavBadge();
        }, 100);
      }
    });

    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) {
        setTimeout(function() {
          updateAllHeartButtons();
          renderBestSellers();
          updateFavBadge();
        }, 200);
      }
    });
  }

  // ---------- Init ----------
  function init() {
    fixCallButtons();
    setActiveBar();
    updateFavBadge();
    renderBestSellers();
    setupDisplayOverride();
    setupPageShowRefresh();
  }

  // ---------- Expose ----------
  global.getFavorites = getFavorites;
  global.saveFavorites = saveFavorites;
  global.isFavorite = isFavorite;
  global.toggleFavorite = toggleFavorite;
  global.updateFavBadge = updateFavBadge;
  global.injectHearts = injectHearts;
  global.updateAllHeartButtons = updateAllHeartButtons;
  global.renderBestSellers = renderBestSellers;

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 100);
  } else {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
  }

})(window);
