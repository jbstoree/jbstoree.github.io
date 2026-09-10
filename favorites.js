// ==========================================
// JB STORE - FAVORITES ENGINE
// FIXED VERSION
// ==========================================

const FAVORITES_KEY = 'jb_favorites';

// ------------------------------------------
// Normalize Product ID
// ------------------------------------------
function normalizeFavoriteId(id) {
    return String(id ?? '').trim();
}

// ------------------------------------------
// Get Favorites
// ------------------------------------------
function getFavorites() {
    try {
        const raw = localStorage.getItem(FAVORITES_KEY);

        if (!raw) {
            return [];
        }

        const list = JSON.parse(raw);

        if (!Array.isArray(list)) {
            return [];
        }

        return [
            ...new Set(
                list
                    .map(normalizeFavoriteId)
                    .filter(Boolean)
            )
        ];

    } catch (error) {
        console.error(
            'JB FAVORITES: Unable to read favorites',
            error
        );

        return [];
    }
}

// ------------------------------------------
// Save Favorites
// ------------------------------------------
function saveFavorites(list) {

    const normalized = [
        ...new Set(
            (Array.isArray(list) ? list : [])
                .map(normalizeFavoriteId)
                .filter(Boolean)
        )
    ];

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(normalized)
    );

    updateFavBadge();
    updateAllHeartButtons();

    return normalized;
}

// ------------------------------------------
// Check Favorite
// ------------------------------------------
function isFavorite(id) {

    const targetId = normalizeFavoriteId(id);

    if (!targetId) {
        return false;
    }

    return getFavorites().some(
        favoriteId =>
            normalizeFavoriteId(favoriteId) === targetId
    );
}

// ------------------------------------------
// Toggle Favorite
// ------------------------------------------
function toggleFavorite(productId) {

    const id = normalizeFavoriteId(productId);

    if (!id) {
        console.warn(
            'JB FAVORITES: Invalid product ID'
        );

        return false;
    }

    const favorites = getFavorites();

    const index = favorites.findIndex(
        favoriteId =>
            normalizeFavoriteId(favoriteId) === id
    );

    let added;

    // ADD
    if (index === -1) {

        favorites.push(id);

        added = true;

        console.log(
            'JB FAVORITES: Added product',
            id
        );

    }

    // REMOVE
    else {

        favorites.splice(index, 1);

        added = false;

        console.log(
            'JB FAVORITES: Removed product',
            id
        );
    }

    saveFavorites(favorites);

    updateAllHeartButtons();
    updateFavBadge();

    // ------------------------------------------
    // Refresh Favorites Page
    // ------------------------------------------
    if (
        window.location.pathname
            .toLowerCase()
            .includes('favorites.html')
    ) {

        if (
            typeof window.renderFavoritesGrid ===
            'function'
        ) {

            window.renderFavoritesGrid();
        }
    }

    return added;
}

// ------------------------------------------
// Favorites Badge
// ------------------------------------------
function updateFavBadge() {

    const count = getFavorites().length;

    const badges = document.querySelectorAll(
        '#favBadge, .fav-badge, [data-fav-badge]'
    );

    badges.forEach(badge => {

        badge.textContent = count;

    });
}

// ------------------------------------------
// Update All Favorite Hearts
// ------------------------------------------
function updateAllHeartButtons() {

    const buttons = document.querySelectorAll(
        '.favorite-btn, .product-fav-btn'
    );

    buttons.forEach(button => {

        const id =
            button.dataset.productId ||
            button.getAttribute(
                'data-product-id'
            );

        if (!id) {
            return;
        }

        const active = isFavorite(id);

        button.classList.toggle(
            'is-fav',
            active
        );

        button.classList.toggle(
            'active',
            active
        );

        button.setAttribute(
            'aria-pressed',
            active ? 'true' : 'false'
        );

        // --------------------------------------
        // Font Awesome icon
        // --------------------------------------
        const icon = button.querySelector('i');

        if (icon) {

            icon.classList.toggle(
                'fa-regular',
                !active
            );

            icon.classList.toggle(
                'fa-solid',
                active
            );
        }

        // --------------------------------------
        // Text / heart icon
        // --------------------------------------
        const heartIcon =
            button.querySelector(
                '.heart-icon, .favorite-icon, .fav-icon'
            );

        if (
            heartIcon &&
            !heartIcon.querySelector('svg')
        ) {

            heartIcon.textContent =
                active ? '❤️' : '♡';
        }
    });
}

// ------------------------------------------
// Inject Hearts Into Deal Cards
// ------------------------------------------
function injectHearts() {

    const cards =
        document.querySelectorAll(
            '.deal-card'
        );

    cards.forEach(card => {

        if (
            card.querySelector(
                '.favorite-btn'
            )
        ) {
            return;
        }

        const id =
            card.dataset.productId ||
            card.getAttribute(
                'data-product-id'
            );

        if (!id) {
            return;
        }

        const button =
            document.createElement('button');

        button.type = 'button';

        button.className =
            'favorite-btn';

        button.dataset.productId = id;

        button.setAttribute(
            'aria-label',
            'Add to favorites'
        );

        button.innerHTML =
            '<span class="heart-icon">♡</span>';

        button.addEventListener(
            'click',
            function(event) {

                event.preventDefault();

                event.stopPropagation();

                toggleFavorite(id);
            }
        );

        card.appendChild(button);
    });

    updateAllHeartButtons();
}

// ------------------------------------------
// Initialize Favorites
// ------------------------------------------
function initFavorites() {

    updateFavBadge();

    updateAllHeartButtons();

    setTimeout(
        function() {

            updateFavBadge();

            updateAllHeartButtons();

            injectHearts();

        },
        100
    );

    setTimeout(
        function() {

            updateFavBadge();

            updateAllHeartButtons();

        },
        500
    );
}

// ------------------------------------------
// Global Functions
// ------------------------------------------
window.getFavorites =
    getFavorites;

window.saveFavorites =
    saveFavorites;

window.isFavorite =
    isFavorite;

window.toggleFavorite =
    toggleFavorite;

window.updateFavBadge =
    updateFavBadge;

window.updateAllHeartButtons =
    updateAllHeartButtons;

window.injectHearts =
    injectHearts;


// ==========================================
// AUTO SYNC WHEN RETURNING TO FAVORITES PAGE
// ==========================================

function refreshFavoritesPage() {

    // Latest count from localStorage
    updateFavBadge();

    // Update hearts
    updateAllHeartButtons();

    // Favorites HTML lo renderFavoritesGrid unte
    // latest products ni malli render cheyyi
    if (
        typeof window.renderFavoritesGrid === 'function'
    ) {
        window.renderFavoritesGrid();
    }
}


// ------------------------------------------
// Browser BACK / FORWARD
// ------------------------------------------
window.addEventListener('pageshow', function () {

    setTimeout(function () {
        refreshFavoritesPage();
    }, 100);

});


// ------------------------------------------
// Page/tab ki malli return ayinappudu
// ------------------------------------------
document.addEventListener('visibilitychange', function () {

    if (!document.hidden) {

        setTimeout(function () {
            refreshFavoritesPage();
        }, 100);

    }

});


// ------------------------------------------
// Window focus
// ------------------------------------------
window.addEventListener('focus', function () {

    setTimeout(function () {
        refreshFavoritesPage();
    }, 100);

});

// ------------------------------------------
// Start
// ------------------------------------------
if (
    document.readyState === 'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        initFavorites
    );

} else {

    initFavorites();

}
