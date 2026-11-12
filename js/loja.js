const products = PRODUCTS;

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');
    const categoryTitle = document.getElementById('category-title');
    const subLinks = document.querySelectorAll('.sub-link');
    const mobileSelect = document.getElementById('mobile-category-select');

    function renderProducts(catFilter = 'all') {
        if (!productsGrid) return;

        const filtered = catFilter === 'all'
            ? products
            : products.filter(product => product.category === catFilter);

        productsGrid.innerHTML = '';

        if (filtered.length === 0) {
            productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum produto nesta categoria.</p>';
            return;
        }

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img" style="cursor: pointer;" onclick="verDetalhes(${product.id})">
                    <span class="product-badge">Disponível</span>
                    <img src="${product.img}" alt="${product.name}" onerror="this.src='https://placehold.co/400x400/1e293b/FFF?text=TRASPADINI'">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category.toUpperCase()}</div>
                    <h3 class="product-title" style="cursor: pointer;" onclick="verDetalhes(${product.id})">${product.name}</h3>
                    <div class="product-price-row">
                        <span class="product-price">${formatCurrency(product.price)}</span>
                        <button class="btn-add" onclick="handleAddToCart(${product.id})" aria-label="Adicionar ${product.name} ao carrinho">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    }

    window.verDetalhes = function(id) {
        window.location.href = `produto.html?id=${id}`;
    };

    window.handleAddToCart = function(id) {
        const product = products.find(item => item.id === id);
        if (product) addToCart(product);
    };

    window.openModal = function(id) {
        const product = products.find(item => item.id === id);
        const modal = document.getElementById('product-modal');
        const content = document.getElementById('modal-content');
        if (!product || !modal || !content) return;

        content.innerHTML = `
            <div class="modal-grid">
                <img src="${product.img}" alt="${product.name}">
                <div>
                    <span class="subtitle">${product.category.toUpperCase()}</span>
                    <h3 style="font-size: 1.4rem; margin: 0.3rem 0 0.8rem 0;">${product.name}</h3>
                    <div class="product-price" style="font-size: 1.5rem; margin-bottom: 1rem;">${formatCurrency(product.price)}</div>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">${product.desc}</p>
                    <button class="btn-primary w-100" onclick="addToCartFromModal(${product.id})">
                        <i class="fa-solid fa-cart-shopping"></i> Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
    };

    window.closeModal = function() {
        document.getElementById('product-modal')?.classList.add('hidden');
    };

    window.addToCartFromModal = function(id) {
        handleAddToCart(id);
        closeModal();
    };

    window.addEventListener('click', event => {
        const modal = document.getElementById('product-modal');
        if (modal && event.target === modal) closeModal();
    });

    subLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const category = event.currentTarget.dataset.category;
            subLinks.forEach(item => item.classList.remove('active'));
            event.currentTarget.classList.add('active');
            if (categoryTitle) categoryTitle.innerText = event.currentTarget.innerText;
            if (mobileSelect) mobileSelect.value = category;
            renderProducts(category);
        });
    });

    if (mobileSelect) {
        mobileSelect.addEventListener('change', event => renderProducts(event.target.value));
    }

    renderProducts();
});
