<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>JB Store Script - Hero Slider Fixed</title>
</head>
<body>
<pre style="white-space:pre-wrap;word-wrap:break-word;">// ==========================================
// JB STORE - MAIN JAVASCRIPT
// ==========================================

// ==========================================
// 1. BANNER SLIDER
// ==========================================

const slides = document.querySelectorAll(&quot;.slide&quot;);
const dots = document.querySelectorAll(&quot;.dot&quot;);

let current = 0;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach(slide =&gt; {
    slide.classList.remove(&quot;active&quot;);
  });

  dots.forEach(dot =&gt; {
    dot.classList.remove(&quot;active&quot;);
  });

  slides[index].classList.add(&quot;active&quot;);

  if (dots[index]) {
    dots[index].classList.add(&quot;active&quot;);
  }
}

if (slides.length &gt; 1) {
  setInterval(() =&gt; {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 3500);
}

// ==========================================
// MAIN HERO IMAGE SLIDER
// ==========================================

const heroSlides = document.querySelectorAll(&quot;.hero-slide&quot;);

let heroCurrent = 0;

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) =&gt; {
        slide.classList.toggle(&quot;active&quot;, i === index);
    });
}

// Only auto-slide when there is more than 1 image
if (heroSlides.length &gt; 1) {

    setInterval(() =&gt; {
        heroCurrent = (heroCurrent + 1) % heroSlides.length;
        showHeroSlide(heroCurrent);
    }, 5000);

}

// ==========================================
// 2. ALL PRODUCTS
// SUPABASE PRODUCTS ONLY
// ==========================================

const allProducts = [];

console.log(&#x27;Supabase products only. Waiting for products...&#x27;);



// ==========================================
// 3. BRAND DATA
// ==========================================

const brands = {
  mobiles: [&quot;iPhone&quot;, &quot;OnePlus&quot;, &quot;Samsung&quot;, &quot;Google Pixel&quot;, &quot;Vivo&quot;, &quot;OPPO&quot;, &quot;Realme&quot;, &quot;Nothing&quot;, &quot;Motorola&quot;, &quot;Iqoo&quot;, &quot;Poco&quot;, &quot;Infinix&quot;, &quot;Lava&quot;],
  fridge: [&quot;LG&quot;, &quot;Samsung&quot;, &quot;Godrej&quot;, &quot;Haier&quot;, &quot;Whirlpool&quot;],
  washing: [&quot;LG&quot;, &quot;Samsung&quot;, &quot;IFB&quot;, &quot;Bosch&quot;, &quot;Haier&quot;, &quot;Whirlpool&quot;],
  ac: [&quot;Daikin&quot;, &quot;LG&quot;, &quot;Voltas&quot;, &quot;Blue Star&quot;, &quot;Samsung&quot;],
  tv: [&quot;Sony&quot;, &quot;Samsung&quot;, &quot;LG&quot;, &quot;TCL&quot;, &quot;Xiaomi&quot;]
};

// ==========================================
// 4. CURRENT FILTER
// ==========================================

let currentCategory = &quot;mobiles&quot;;
let selectedBrand = null;

// ==========================================
// 5. ELEMENTS
// ==========================================

const brandBox = document.getElementById(&quot;brandFilters&quot;);
const productGrid = document.getElementById(&quot;productGrid&quot;);
const productTitle = document.getElementById(&quot;productTitle&quot;);
const clearFilter = document.getElementById(&quot;clearFilter&quot;);

// ==========================================
// 6. LOAD BRAND BUTTONS
// ==========================================

function loadBrands(category) {
  if (!brandBox) return;

  brandBox.innerHTML = &quot;&quot;;
  selectedBrand = null;

  let brandCategory = category;
  if (category === &#x27;sealpack&#x27; || category === &#x27;sealcut&#x27; || category === &#x27;second&#x27;) {
    brandCategory = &#x27;mobiles&#x27;;
  }

  const categoryBrands = brands[brandCategory] || [];
  const uniqueBrands = [...new Set(categoryBrands)];

  uniqueBrands.forEach(brand =&gt; {
    const chip = document.createElement(&quot;button&quot;);
    chip.type = &quot;button&quot;;
    chip.className = &quot;chip&quot;;

    const logoMap = {
      &quot;iPhone&quot;: &quot;images/apple.png&quot;,
      &quot;OnePlus&quot;: &quot;images/oneplus.png&quot;,
      &quot;Samsung&quot;: &quot;images/samsung-logo.png&quot;,
      &quot;Google Pixel&quot;: &quot;images/google.png&quot;,
      &quot;Vivo&quot;: &quot;images/vivo.png&quot;,
      &quot;OPPO&quot;: &quot;images/oppo.png&quot;,
      &quot;Realme&quot;: &quot;images/realme.png&quot;,
      &quot;Nothing&quot;: &quot;images/nothing.png&quot;,
      &quot;Motorola&quot;: &quot;images/motorola.png&quot;,
      &quot;Iqoo&quot;: &quot;images/iqoo.png&quot;,
      &quot;Poco&quot;: &quot;images/poco.png&quot;,
      &quot;Infinix&quot;: &quot;images/infinix.png&quot;,
      &quot;Lava&quot;: &quot;images/lava.png&quot;,
      &quot;LG&quot;: &quot;images/lg.png&quot;,
      &quot;Godrej&quot;: &quot;images/godrej.png&quot;,
      &quot;Haier&quot;: &quot;images/haier.png&quot;,
      &quot;Whirlpool&quot;: &quot;images/whirlpool.png&quot;,
      &quot;IFB&quot;: &quot;images/ifb.png&quot;,
      &quot;Bosch&quot;: &quot;images/bosch.png&quot;,
      &quot;Daikin&quot;: &quot;images/daikin.png&quot;,
      &quot;Voltas&quot;: &quot;images/voltas.png&quot;,
      &quot;Blue Star&quot;: &quot;images/bluestar.png&quot;,
      &quot;Sony&quot;: &quot;images/sony.png&quot;,
      &quot;TCL&quot;: &quot;images/tcl.png&quot;,
      &quot;Xiaomi&quot;: &quot;images/xiaomi.png&quot;
    };

    const logo = document.createElement(&quot;img&quot;);
    logo.src = logoMap[brand] || &quot;&quot;;
    logo.alt = brand;

    const name = document.createElement(&quot;span&quot;);
    name.textContent = brand;

    chip.appendChild(logo);
    chip.appendChild(name);

    chip.addEventListener(&quot;click&quot;, () =&gt; {
      document.querySelectorAll(&quot;.chip&quot;).forEach(c =&gt; c.classList.remove(&quot;on&quot;));
      chip.classList.add(&quot;on&quot;);
      selectedBrand = brand;
      displayProducts();
    });

    brandBox.appendChild(chip);
  });
}

// ==========================================
// 7. GET FIRST VARIANT
// ==========================================

function getFirstVariant(product) {
  if (product.variants &amp;&amp; product.variants.length &gt; 0) {
    return product.variants[0].label;
  }
  return null;
}

// ==========================================
// 8. DISPLAY PRODUCTS
// ==========================================

function displayProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = &quot;&quot;;

  let products = [];

  if (currentCategory === &quot;mobiles&quot;) {
    products = allProducts.filter(product =&gt; product.category === &quot;mobiles&quot;);
  } else if (currentCategory === &quot;sealpack&quot;) {
    products = allProducts.filter(product =&gt; product.category === &quot;mobiles&quot; &amp;&amp; product.condition === &quot;Seal Pack&quot;);
  } else if (currentCategory === &quot;sealcut&quot;) {
    products = allProducts.filter(product =&gt; product.category === &quot;mobiles&quot; &amp;&amp; product.condition === &quot;Seal Cut&quot;);
  } else if (currentCategory === &quot;second&quot;) {
    products = allProducts.filter(product =&gt; product.category === &quot;mobiles&quot; &amp;&amp; product.condition === &quot;2nd Hand&quot;);
  } else {
    products = allProducts.filter(product =&gt; product.category === currentCategory);
  }

  const condFilter = document.getElementById(&#x27;conditionFilter&#x27;);
  if (condFilter &amp;&amp; condFilter.value) {
    const cond = condFilter.value;
    products = products.filter(product =&gt; product.condition === cond);
  }

  if (selectedBrand) {
    products = products.filter(product =&gt; product.brand === selectedBrand);
  }

  if (products.length === 0) {
    productGrid.innerHTML = `
      &lt;div class=&quot;no-products&quot;&gt;
        &lt;h3&gt;No products found&lt;/h3&gt;
        &lt;p&gt;Try changing filters.&lt;/p&gt;
      &lt;/div&gt;
    `;
    return;
  }

  products.forEach(product =&gt; {
    const card = document.createElement(&quot;div&quot;);
    card.className = &quot;deal-card&quot;;
card.style.cursor = &quot;pointer&quot;;
card.addEventListener(&quot;click&quot;, () =&gt; viewProduct(product.id));

    const firstVariant = getFirstVariant(product);
    let variantHTML = &#x27;&#x27;;
    if (firstVariant) {
      variantHTML = `&lt;div style=&quot;display:inline-block;background:rgba(212,175,55,0.12);color:#D4AF37;font-size:11px;font-weight:600;padding:2px 10px;border-radius:12px;margin:4px 0;border:1px solid rgba(212,175,55,0.15);&quot;&gt;📱 ${firstVariant}&lt;/div&gt;`;
    }

    let imgSrc = product.image || (product.images &amp;&amp; product.images[0]) || &#x27;#&#x27;;

    card.innerHTML = `
      &lt;span class=&quot;offer&quot;&gt;${product.discount || &#x27;&#x27;}&lt;/span&gt;
      &lt;img src=&quot;${imgSrc}&quot; alt=&quot;${product.name}&quot;&gt;
      &lt;h3&gt;${product.name}&lt;/h3&gt;
      &lt;p class=&quot;brand&quot;&gt;Brand: ${product.brand}&lt;/p&gt;
      &lt;p class=&quot;condition&quot;&gt;Condition: ${product.condition || &quot;New&quot;}&lt;/p&gt;
      ${variantHTML}
      &lt;div class=&quot;rating&quot;&gt;⭐ ${product.rating || &#x27;4.5&#x27;} &lt;span&gt;(${product.reviews || 0})&lt;/span&gt;&lt;/div&gt;
      &lt;div class=&quot;price-row&quot;&gt;
        &lt;p class=&quot;price&quot;&gt;₹${(product.price || 0).toLocaleString(&quot;en-IN&quot;)}&lt;/p&gt;
        &lt;p class=&quot;old-price&quot;&gt;₹${(product.oldPrice || 0).toLocaleString(&quot;en-IN&quot;)}&lt;/p&gt;
      &lt;/div&gt;
    
    `;

    productGrid.appendChild(card);
  });
}

// ==========================================
// 9. CATEGORY BUTTONS
// ==========================================

document.querySelectorAll(&quot;.cat&quot;).forEach(button =&gt; {
  button.addEventListener(&quot;click&quot;, () =&gt; {
    document.querySelectorAll(&quot;.cat&quot;).forEach(btn =&gt; btn.classList.remove(&quot;active&quot;));
    button.classList.add(&quot;active&quot;);
    currentCategory = button.dataset.cat;
    selectedBrand = null;
    loadBrands(currentCategory);
    displayProducts();
  });
});

// ==========================================
// 10. CLEAR ALL
// ==========================================

if (clearFilter) {
  clearFilter.addEventListener(&quot;click&quot;, () =&gt; {
    selectedBrand = null;
    document.querySelectorAll(&quot;.chip&quot;).forEach(chip =&gt; chip.classList.remove(&quot;on&quot;));
    
    const catFilter = document.getElementById(&#x27;categoryFilter&#x27;);
    const condFilter = document.getElementById(&#x27;conditionFilter&#x27;);
    if (catFilter) catFilter.value = &#x27;&#x27;;
    if (condFilter) condFilter.value = &#x27;&#x27;;
    
    displayProducts();
  });
}

function clearFilters() {
  const catFilter = document.getElementById(&#x27;categoryFilter&#x27;);
  const condFilter = document.getElementById(&#x27;conditionFilter&#x27;);
  const search = document.getElementById(&#x27;globalSearch&#x27;);
  
  if (catFilter) catFilter.value = &#x27;&#x27;;
  if (condFilter) condFilter.value = &#x27;&#x27;;
  if (search) search.value = &#x27;&#x27;;
  
  selectedBrand = null;
  document.querySelectorAll(&quot;.chip&quot;).forEach(chip =&gt; chip.classList.remove(&quot;on&quot;));
  displayProducts();
}

// ==========================================
// 11. VIEW PRODUCT
// ==========================================

function viewProduct(id) {
  console.log(&#x27;Viewing product with ID:&#x27;, id);
  
  const product = allProducts.find(item =&gt; item.id === id);
  
  if (!product) {
    console.error(&#x27;Product not found with ID:&#x27;, id);
    showToast(&#x27;Product not found!&#x27;);
    return;
  }
  
  sessionStorage.setItem(&#x27;selectedProduct&#x27;, JSON.stringify(product));
  
  window.location.href = `product.html?id=${product.id}`;
}

// ==========================================
// 12. CART FUNCTIONALITY
// ==========================================

function addToCart(productId, variantLabel) {
  const product = allProducts.find(item =&gt; item.id === productId);
  
  if (!product) {
    showToast(&#x27;Product not found!&#x27;);
    return;
  }
  
  let cart = JSON.parse(localStorage.getItem(&#x27;cart&#x27;)) || [];
  
  let price = product.price;
  let variantName = &#x27;&#x27;;
  
  if (variantLabel &amp;&amp; product.variants) {
    const variant = product.variants.find(v =&gt; v.label === variantLabel);
    if (variant) {
      price = variant.price;
      variantName = variantLabel;
    }
  }
  
  const uniqueId = variantName ? `${product.id}_${variantName}` : product.id;
  const existingItem = cart.find(item =&gt; item.id === uniqueId);
  const displayName = variantName ? `${product.name} (${variantName})` : product.name;
  
  if (existingItem) {
    existingItem.quantity += 1;
    showToast(`📦 ${displayName} quantity updated!`);
  } else {
    cart.push({
      id: uniqueId,
      name: product.name,
      brand: product.brand,
      price: price,
      image: product.image || product.images?.[0] || &#x27;&#x27;,
      quantity: 1,
      variant: variantName || &#x27;Default&#x27;
    });
    showToast(`✅ ${displayName} added to cart!`);
  }
  
  localStorage.setItem(&#x27;cart&#x27;, JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem(&#x27;cart&#x27;)) || [];
  const totalItems = cart.reduce((sum, item) =&gt; sum + item.quantity, 0);
  
  document.querySelectorAll(&#x27;.cart-badge&#x27;).forEach(badge =&gt; {
    badge.textContent = totalItems;
    badge.style.display = totalItems &gt; 0 ? &#x27;flex&#x27; : &#x27;none&#x27;;
  });
}

// ==========================================
// 13. TOAST
// ==========================================

function showToast(message) {
  const existingToast = document.querySelector(&#x27;.toast-notification&#x27;);
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement(&#x27;div&#x27;);
  toast.className = &#x27;toast-notification&#x27;;
  toast.innerHTML = `
    &lt;span&gt;${message}&lt;/span&gt;
    &lt;button onclick=&quot;this.parentElement.remove()&quot;&gt;✕&lt;/button&gt;
  `;
  document.body.appendChild(toast);
  
  setTimeout(() =&gt; {
    if (toast) {
      toast.classList.add(&#x27;fade-out&#x27;);
      setTimeout(() =&gt; toast.remove(), 300);
    }
  }, 3000);
}

// ==========================================
// 14. INITIAL LOAD
// ==========================================

loadBrands(&quot;mobiles&quot;);
displayProducts();

document.addEventListener(&quot;DOMContentLoaded&quot;, () =&gt; {
  updateCartBadge();
});

window.addEventListener(&quot;pageshow&quot;, () =&gt; {
  updateCartBadge();
});

// ==========================================
// 15. SHOP BY CATEGORY CARDS
// ==========================================

document.querySelectorAll(&quot;.category-card&quot;).forEach(card =&gt; {
  card.addEventListener(&quot;click&quot;, () =&gt; {
    const category = card.dataset.category;
    const categoryButton = document.querySelector(`.cat[data-cat=&quot;${category}&quot;]`);
    if (categoryButton) categoryButton.click();
    const products = document.querySelector(&quot;.deals&quot;);
    if (products) products.scrollIntoView({ behavior: &quot;smooth&quot;, block: &quot;start&quot; });
  });
});

// ==========================================
// 16. SEARCH
// ==========================================

const searchInput = document.getElementById(&quot;searchInput&quot;);
const searchButton = document.getElementById(&quot;searchButton&quot;);
const searchSuggestions = document.getElementById(&quot;searchSuggestions&quot;);

const categoryNames = {
  mobiles: &quot;Mobiles&quot;,
  fridge: &quot;Refrigerators&quot;,
  washing: &quot;Washing Machines&quot;,
  ac: &quot;AC&quot;,
  tv: &quot;TV&quot;
};

function createSearchSuggestions() {
  if (!searchInput || !searchSuggestions) return;

  const text = searchInput.value.trim().toLowerCase();
  searchSuggestions.innerHTML = &quot;&quot;;

  if (text === &quot;&quot;) {
    searchSuggestions.classList.remove(&quot;show&quot;);
    return;
  }

  const combinations = new Map();

  allProducts.forEach(product =&gt; {
    const brand = String(product.brand || &quot;&quot;).trim();
    const category = String(product.category || &quot;&quot;).trim();
    if (!brand || !category) return;

    const brandLower = brand.toLowerCase();
    const categoryLower = category.toLowerCase();

    if (brandLower.includes(text) || categoryLower.includes(text) || product.name.toLowerCase().includes(text)) {
      const key = `${brandLower}|${categoryLower}`;
      if (!combinations.has(key)) {
        combinations.set(key, {
          brand: brand,
          category: category,
          image: product.image || product.images?.[0] || &#x27;&#x27;,
          productName: product.name,
          productId: product.id
        });
      }
    }
  });

  const suggestions = Array.from(combinations.values());

  suggestions.sort((a, b) =&gt; {
    const aBrand = a.brand.toLowerCase();
    const bBrand = b.brand.toLowerCase();
    const aStarts = aBrand.startsWith(text);
    const bStarts = bBrand.startsWith(text);
    if (aStarts &amp;&amp; !bStarts) return -1;
    if (!aStarts &amp;&amp; bStarts) return 1;
    return aBrand.localeCompare(bBrand);
  });

  const finalResults = suggestions.slice(0, 10);

  if (finalResults.length === 0) {
    searchSuggestions.innerHTML = `&lt;div class=&quot;search-no-result&quot;&gt;No products found&lt;/div&gt;`;
    searchSuggestions.classList.add(&quot;show&quot;);
    return;
  }

  finalResults.forEach(item =&gt; {
    const row = document.createElement(&quot;div&quot;);
    row.className = &quot;search-suggestion&quot;;
    const displayCategory = categoryNames[item.category] || item.category;

    row.innerHTML = `
      &lt;img src=&quot;${item.image}&quot; alt=&quot;&quot;&gt;
      &lt;div class=&quot;suggestion-info&quot;&gt;
        &lt;div class=&quot;suggestion-name&quot;&gt;
          ${highlightSearch(item.brand, text)}
          ${displayCategory}
        &lt;/div&gt;
        &lt;div class=&quot;suggestion-category&quot;&gt;
          ${item.productName || item.brand + &#x27; &#x27; + displayCategory}
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;span class=&quot;suggestion-arrow&quot;&gt;↗&lt;/span&gt;
    `;

    row.addEventListener(&quot;click&quot;, () =&gt; {
      window.location.href =
        &quot;search.html?brand=&quot; +
        encodeURIComponent(item.brand) +
        &quot;&amp;category=&quot; +
        encodeURIComponent(item.category);
    });

    searchSuggestions.appendChild(row);
  });

  searchSuggestions.classList.add(&quot;show&quot;);
}

function highlightSearch(text, search) {
  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, &quot;\\$&amp;&quot;);
  return text.replace(new RegExp(`(${escaped})`, &quot;ig&quot;), &quot;&lt;strong&gt;$1&lt;/strong&gt;&quot;);
}

function openSearchResults(value) {
  if (!value) return;
  window.location.href = &quot;search.html?q=&quot; + encodeURIComponent(value);
}

if (searchInput) {
  searchInput.addEventListener(&quot;input&quot;, createSearchSuggestions);
}

if (searchButton) {
  searchButton.addEventListener(&quot;click&quot;, () =&gt; {
    const value = searchInput.value.trim();
    if (value) openSearchResults(value);
  });
}

if (searchInput) {
  searchInput.addEventListener(&quot;keydown&quot;, event =&gt; {
    if (event.key === &quot;Enter&quot;) {
      const value = searchInput.value.trim();
      if (value) openSearchResults(value);
    }
  });
}

document.addEventListener(&quot;click&quot;, event =&gt; {
  if (
    searchInput &amp;&amp;
    searchSuggestions &amp;&amp;
    !searchInput.contains(event.target) &amp;&amp;
    !searchSuggestions.contains(event.target)
  ) {
    searchSuggestions.classList.remove(&quot;show&quot;);
  }
});

// ==========================================
// 17. BOTTOM BAR
// ==========================================

const bottomItems = document.querySelectorAll(&#x27;.bottom-item&#x27;);

bottomItems.forEach(item =&gt; {
  item.addEventListener(&#x27;click&#x27;, function() {
    bottomItems.forEach(i =&gt; i.classList.remove(&#x27;active&#x27;));
    this.classList.add(&#x27;active&#x27;);
  });
});

// ==========================================
// 18. CART PAGE LOGIC
// ==========================================

function isCartPage() {
  return window.location.pathname.includes(&#x27;cart.html&#x27;);
}

function getCartElements() {
  return {
    container: document.getElementById(&#x27;cartItems&#x27;),
    summary: document.getElementById(&#x27;cartSummary&#x27;),
    empty: document.getElementById(&#x27;emptyCart&#x27;),
    count: document.getElementById(&#x27;cartCount&#x27;),
    subtotal: document.getElementById(&#x27;cartSubtotal&#x27;),
    totalPrice: document.getElementById(&#x27;cartTotalPrice&#x27;)
  };
}

function loadCart() {
  if (!isCartPage()) return;

  const cart = JSON.parse(localStorage.getItem(&#x27;cart&#x27;)) || [];
  const el = getCartElements();
  
  if (cart.length === 0) {
    el.container.innerHTML = &#x27;&#x27;;
    el.summary.style.display = &#x27;none&#x27;;
    el.empty.style.display = &#x27;block&#x27;;
    el.count.textContent = &#x27;0 items&#x27;;
    updateBadge(0);
    return;
  }
  
  el.container.innerHTML = &#x27;&#x27;;
  el.summary.style.display = &#x27;block&#x27;;
  el.empty.style.display = &#x27;none&#x27;;
  
  let subtotal = 0;
  let totalItems = 0;
  
  cart.forEach((item, index) =&gt; {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    totalItems += item.quantity;
    
    const displayName = item.variant &amp;&amp; item.variant !== &#x27;Default&#x27; 
      ? `${item.name} (${item.variant})` 
      : item.name;
    
    const cartItem = document.createElement(&#x27;div&#x27;);
    cartItem.className = &#x27;cart-item&#x27;;
    cartItem.innerHTML = `
      &lt;div class=&quot;cart-item-image&quot;&gt;
        &lt;img src=&quot;${item.image || &#x27;images/placeholder.png&#x27;}&quot; alt=&quot;${item.name}&quot;&gt;
      &lt;/div&gt;
      &lt;div class=&quot;cart-item-info&quot;&gt;
        &lt;h3&gt;${displayName}&lt;/h3&gt;
        &lt;p class=&quot;cart-item-brand&quot;&gt;${item.brand} ${item.variant &amp;&amp; item.variant !== &#x27;Default&#x27; ? &#x27;• &#x27; + item.variant : &#x27;&#x27;}&lt;/p&gt;
        &lt;p class=&quot;cart-item-price&quot;&gt;₹${item.price.toLocaleString(&quot;en-IN&quot;)}&lt;/p&gt;
      &lt;/div&gt;
      &lt;div class=&quot;cart-item-qty&quot;&gt;
        &lt;button class=&quot;qty-btn&quot; onclick=&quot;updateQuantity(${index}, -1)&quot;&gt;−&lt;/button&gt;
        &lt;span class=&quot;qty-number&quot;&gt;${item.quantity}&lt;/span&gt;
        &lt;button class=&quot;qty-btn&quot; onclick=&quot;updateQuantity(${index}, 1)&quot;&gt;+&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class=&quot;cart-item-total&quot;&gt;
        ₹${itemTotal.toLocaleString(&quot;en-IN&quot;)}
      &lt;/div&gt;
      &lt;button class=&quot;remove-btn&quot; onclick=&quot;removeItem(${index})&quot; title=&quot;Remove item&quot;&gt;✕&lt;/button&gt;
    `;
    el.container.appendChild(cartItem);
  });
  
  el.count.textContent = `${totalItems} ${totalItems === 1 ? &#x27;item&#x27; : &#x27;items&#x27;}`;
  el.subtotal.textContent = `₹${subtotal.toLocaleString(&quot;en-IN&quot;)}`;
  el.totalPrice.textContent = `₹${subtotal.toLocaleString(&quot;en-IN&quot;)}`;
  
  updateBadge(totalItems);
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem(&#x27;cart&#x27;)) || [];
  
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity &lt;= 0) {
      cart.splice(index, 1);
    }
  }
  
  localStorage.setItem(&#x27;cart&#x27;, JSON.stringify(cart));
  loadCart();
  updateCartBadge();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem(&#x27;cart&#x27;)) || [];
  const itemName = cart[index]?.name || &#x27;Item&#x27;;
  const variant = cart[index]?.variant || &#x27;&#x27;;
  const displayName = variant &amp;&amp; variant !== &#x27;Default&#x27; ? `${itemName} (${variant})` : itemName;
  cart.splice(index, 1);
  localStorage.setItem(&#x27;cart&#x27;, JSON.stringify(cart));
  loadCart();
  updateCartBadge();
  showToast(`${displayName} removed from cart`);
}

function clearCart() {
  if (confirm(&#x27;Are you sure you want to clear your cart?&#x27;)) {
    localStorage.removeItem(&#x27;cart&#x27;);
    loadCart();
    updateCartBadge();
    showToast(&#x27;Cart cleared&#x27;);
  }
}

function checkout() {
  const cart = JSON.parse(localStorage.getItem(&#x27;cart&#x27;)) || [];
  if (cart.length === 0) {
    showToast(&#x27;Your cart is empty!&#x27;);
    return;
  }
  
  let message = &#x27;🛍️ *JB STORE - New Order*%0A%0A&#x27;;
  let total = 0;
  
  cart.forEach(item =&gt; {
    const itemTotal = item.price * item.quantity;
    const displayName = item.variant &amp;&amp; item.variant !== &#x27;Default&#x27; 
      ? `${item.name} (${item.variant})` 
      : item.name;
    message += `📱 ${displayName}%0A   × ${item.quantity} = ₹${itemTotal.toLocaleString(&quot;en-IN&quot;)}%0A`;
    total += itemTotal;
  });
  
  message += `%0A💰 *Total: ₹${total.toLocaleString(&quot;en-IN&quot;)}*%0A%0A`;
  message += `📞 Please confirm my order. Thank you!`;
  
  window.open(`https://wa.me/${STORE_PHONE}?text=${message}`, &#x27;_blank&#x27;);
}

function updateBadge(count) {
  const badge = document.getElementById(&#x27;cartBadge&#x27;);
  if (badge) {
    badge.textContent = count;
    badge.style.display = count &gt; 0 ? &#x27;flex&#x27; : &#x27;none&#x27;;
  }
}

// ==========================================
// 19. INIT
// ==========================================

document.addEventListener(&#x27;DOMContentLoaded&#x27;, function() {
  if (isCartPage()) {
    loadCart();
  }
  updateCartBadge();
  
  if (typeof updateFavBadge === &#x27;function&#x27;) {
    updateFavBadge();
  }
});

// ==========================================
// 20. EXPOSE GLOBALLY
// ==========================================

window.loadCart = loadCart;
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.checkout = checkout;
window.updateCartBadge = updateCartBadge;
window.showToast = showToast;
window.viewProduct = viewProduct;
window.addToCart = addToCart;
window.displayProducts = displayProducts;
window.loadBrands = loadBrands;
window.currentCategory = currentCategory;
window.clearFilters = clearFilters;

// ==========================================
// 21. HAMBURGER MENU / SLIDE-OUT DRAWER
// ==========================================

(function() {
  &#x27;use strict&#x27;;

  const toggle = document.getElementById(&#x27;menuToggle&#x27;);
  const drawer = document.getElementById(&#x27;menuDrawer&#x27;);
  const overlay = document.getElementById(&#x27;menuOverlay&#x27;);
  const closeBtn = document.getElementById(&#x27;menuClose&#x27;);
  const body = document.body;

  if (!toggle || !drawer || !overlay || !closeBtn) {
    console.warn(&#x27;⚠️ Menu drawer elements not found. Skipping initialization.&#x27;);
    return;
  }

  function openMenu() {
    drawer.classList.add(&#x27;open&#x27;);
    overlay.classList.add(&#x27;open&#x27;);
    toggle.classList.add(&#x27;active&#x27;);
    body.classList.add(&#x27;menu-open&#x27;);
    updateMenuBadges();
  }

  function closeMenu() {
    drawer.classList.remove(&#x27;open&#x27;);
    overlay.classList.remove(&#x27;open&#x27;);
    toggle.classList.remove(&#x27;active&#x27;);
    body.classList.remove(&#x27;menu-open&#x27;);
  }

  function toggleMenu() {
    if (drawer.classList.contains(&#x27;open&#x27;)) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function updateMenuBadges() {
    const cartBadge = document.getElementById(&#x27;cartBadge&#x27;);
    const menuCart = document.getElementById(&#x27;menuCartBadge&#x27;);
    if (cartBadge &amp;&amp; menuCart) {
      const val = parseInt(cartBadge.textContent, 10) || 0;
      menuCart.textContent = val;
      menuCart.style.display = val &gt; 0 ? &#x27;flex&#x27; : &#x27;none&#x27;;
    }

    const favBadge = document.getElementById(&#x27;favBadge&#x27;);
    const menuFav = document.getElementById(&#x27;menuFavBadge&#x27;);
    if (favBadge &amp;&amp; menuFav) {
      const val = parseInt(favBadge.textContent, 10) || 0;
      menuFav.textContent = val;
      menuFav.style.display = val &gt; 0 ? &#x27;flex&#x27; : &#x27;none&#x27;;
    }
  }

  toggle.addEventListener(&#x27;click&#x27;, toggleMenu);
  closeBtn.addEventListener(&#x27;click&#x27;, closeMenu);
  overlay.addEventListener(&#x27;click&#x27;, closeMenu);

  document.addEventListener(&#x27;keydown&#x27;, function(e) {
    if (e.key === &#x27;Escape&#x27; &amp;&amp; drawer.classList.contains(&#x27;open&#x27;)) {
      closeMenu();
    }
  });

  document.querySelectorAll(&#x27;.menu-item&#x27;).forEach(function(item) {
    item.addEventListener(&#x27;click&#x27;, function(e) {
      const href = this.getAttribute(&#x27;href&#x27;);
      if (href &amp;&amp; href !== &#x27;#&#x27; &amp;&amp; href !== &#x27;javascript:void(0)&#x27;) {
        setTimeout(closeMenu, 150);
      } else {
        e.preventDefault();
        closeMenu();
      }
    });
  });

  window.updateMenuBadges = updateMenuBadges;

  setTimeout(updateMenuBadges, 200);

  const badgeObserver = new MutationObserver(function() {
    updateMenuBadges();
  });
  const cartBadge = document.getElementById(&#x27;cartBadge&#x27;);
  const favBadge = document.getElementById(&#x27;favBadge&#x27;);
  if (cartBadge) badgeObserver.observe(cartBadge, { childList: true, characterData: true, subtree: true });
  if (favBadge) badgeObserver.observe(favBadge, { childList: true, characterData: true, subtree: true });

  window.addEventListener(&#x27;load&#x27;, function() {
    setTimeout(updateMenuBadges, 300);
  });

  console.log(&#x27;✅ Menu drawer initialized.&#x27;);
})();



/* =========================================================
   JB STORE HERO SLIDER ENHANCEMENT
   - 5 second auto slide
   - full banner horizontal movement
   - dots
   - swipe left/right
   - press/hold pauses autoplay
   - release resumes
   - image keeps its natural aspect ratio
   ========================================================= */
(function () {
  const slides = Array.from(document.querySelectorAll(&quot;.hero-slide&quot;));
  const viewport = document.querySelector(&quot;.hero-slides&quot;);

  if (!slides.length || !viewport) return;

  let current = 0;
  let paused = false;
  let startX = 0;
  let startY = 0;
  let pointerId = null;
  let timer = null;

  viewport.style.overflow = &quot;hidden&quot;;
  viewport.style.position = &quot;relative&quot;;
  viewport.style.touchAction = &quot;pan-y&quot;;

  let track = viewport.querySelector(&quot;.jb-hero-track&quot;);

  if (!track) {
    track = document.createElement(&quot;div&quot;);
    track.className = &quot;jb-hero-track&quot;;

    track.style.display = &quot;flex&quot;;
    track.style.width = `${slides.length * 100}%`;
    track.style.transition = &quot;transform 0.6s ease&quot;;
    track.style.alignItems = &quot;flex-start&quot;;

    slides.forEach((slide) =&gt; {
      track.appendChild(slide);

      slide.style.flex = `0 0 ${100 / slides.length}%`;
      slide.style.width = `${100 / slides.length}%`;
      slide.style.minWidth = `${100 / slides.length}%`;
      slide.style.position = &quot;relative&quot;;
      slide.style.opacity = &quot;1&quot;;
      slide.style.pointerEvents = &quot;auto&quot;;
      slide.style.gridArea = &quot;auto&quot;;

      const img = slide.querySelector(&quot;img&quot;);
      if (img) {
        img.style.display = &quot;block&quot;;
        img.style.width = &quot;100%&quot;;
        img.style.maxWidth = &quot;100%&quot;;
        img.style.height = &quot;auto&quot;;
        img.style.objectFit = &quot;contain&quot;;
      }
    });

    viewport.appendChild(track);
  }

  let dots = viewport.parentElement.querySelector(&quot;.jb-hero-dots&quot;);

  if (!dots) {
    dots = document.createElement(&quot;div&quot;);
    dots.className = &quot;jb-hero-dots&quot;;
    dots.style.display = &quot;flex&quot;;
    dots.style.justifyContent = &quot;center&quot;;
    dots.style.alignItems = &quot;center&quot;;
    dots.style.gap = &quot;8px&quot;;
    dots.style.marginTop = &quot;10px&quot;;

    slides.forEach((_, index) =&gt; {
      const dot = document.createElement(&quot;button&quot;);
      dot.type = &quot;button&quot;;
      dot.className = &quot;jb-hero-dot&quot;;
      dot.setAttribute(&quot;aria-label&quot;, `Show banner ${index + 1}`);
      dot.style.width = &quot;8px&quot;;
      dot.style.height = &quot;8px&quot;;
      dot.style.padding = &quot;0&quot;;
      dot.style.border = &quot;0&quot;;
      dot.style.borderRadius = &quot;50%&quot;;
      dot.style.background = &quot;rgba(255,255,255,.45)&quot;;
      dot.style.cursor = &quot;pointer&quot;;

      dot.addEventListener(&quot;click&quot;, () =&gt; {
        current = index;
        update();
        restartTimer();
      });

      dots.appendChild(dot);
    });

    viewport.parentElement.appendChild(dots);
  }

  function update() {
    track.style.transform =
      `translate3d(-${current * (100 / slides.length)}%, 0, 0)`;

    Array.from(dots.children).forEach((dot, index) =&gt; {
      dot.style.background =
        index === current ? &quot;#FFD700&quot; : &quot;rgba(255,255,255,.45)&quot;;
      dot.style.transform =
        index === current ? &quot;scale(1.25)&quot; : &quot;scale(1)&quot;;
    });
  }

  function next() {
    if (paused) return;
    current = (current + 1) % slides.length;
    update();
  }

  function restartTimer() {
    clearInterval(timer);
    timer = window.setInterval(next, 5000);
  }

  restartTimer();

  viewport.addEventListener(&quot;pointerdown&quot;, (event) =&gt; {
    paused = true;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;

    try {
      viewport.setPointerCapture(event.pointerId);
    } catch (_) {}
  });

  function finishPointer(event) {
    if (pointerId !== null &amp;&amp; event.pointerId !== pointerId) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (Math.abs(dx) &gt; 50 &amp;&amp; Math.abs(dx) &gt; Math.abs(dy)) {
      if (dx &lt; 0) {
        current = (current + 1) % slides.length;
      } else {
        current = (current - 1 + slides.length) % slides.length;
      }
      update();
    }

    paused = false;
    pointerId = null;
    restartTimer();
  }

  viewport.addEventListener(&quot;pointerup&quot;, finishPointer);

  viewport.addEventListener(&quot;pointercancel&quot;, () =&gt; {
    paused = false;
    pointerId = null;
    restartTimer();
  });

  update();
})();
</pre>
</body>
</html>
