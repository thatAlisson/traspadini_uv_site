const products = [
    { id: 1, name: "Camisa UV 50+ poliester", price: 59.90, category: "camisas", img: "assets/camisa uv poliester.jpg" },
    { id: 2, name: "Camisa UV 50+ poliester com capuz", price: 64.90, category: "camisas", img: "assets/camisa uv capuz.jpg" },
    { id: 3, name: "Camisa UV 50+ poliester com capuz e balaclava", price: 69.90, category: "camisas", img: "assets/camisa uv balaclava.jpg" },
    { id: 4, name: "Bermuda em Linho", price: 149.90, category: "calcas", img: "assets/bermuda linho.jpeg"},
    { id: 5, name: "Bermuda 2 em 1", price: 79.90, category: "calcas", img: "assets/bermuda 2 em 1.jpeg"},
    { id: 6, name: "Camisa Praia", price: 119.90, category: "camisas", img: "assets/Camisa havaiana.jpeg" },
    { id: 7, name: "Perfume Masculino Austin Santorini 100 ml", price: 99.90, category: "perfume", img: "assets/perfume santorini.jpeg" },
    { id: 8, name: "Perfume Masculino Austin Cedro 100 ml", price: 99.90, category: "perfume", img: "assets/perfume cedro.jpeg" },
    { id: 9, name: "Carteira em Couro Legítimo", price: 99.90, category: "carteiras", img: "assets/carteira couro.jpeg" },
    { id: 10, name: "Boné Bandeira do Brasil", price: 79.90, category: "bones", img: "assets/bone brasil.jpeg" }
];

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');
    const categoryTitle = document.getElementById('category-title');
    const subLinks = document.querySelectorAll('.sub-link');
    const mobileSelect = document.getElementById('mobile-category-select');

    function renderProducts(catFilter) {
        productsGrid.innerHTML = '';
        const filtered = catFilter === 'all' ? products : products.filter(p => p.category === catFilter);

        if (filtered.length === 0) {
            productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nenhum produto nesta categoria.</p>';
            return;
        }

        // Dentro da função que renderiza os produtos em loja.js:
filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-img" style="cursor: pointer;" onclick="verDetalhes(${p.id})">
            <span class="product-badge">Disponível</span>
            <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/400x400/1e293b/FFF?text=TRASPADINI'">
        </div>
        <div class="product-info">
            <div class="product-category">${p.category.toUpperCase()}</div>
            <h3 class="product-title" style="cursor: pointer;" onclick="verDetalhes(${p.id})">${p.name}</h3>
            <div class="product-price-row">
                <span class="product-price">${formatCurrency(p.price)}</span>
                <button class="btn-add" onclick="handleAddToCart(${p.id})">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    `;
    productsGrid.appendChild(card);
});

// Função global para redirecionar
window.verDetalhes = function(id) {
    window.location.href = `produto.html?id=${id}`;
};

        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img">
                    <span class="product-badge">Disponível</span>
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/400x400/1e293b/FFF?text=TRASPADINI'">
                </div>
                <div class="product-info">
                    <div class="product-category">${p.category.toUpperCase()}</div>
                    <h3 class="product-title">${p.name}</h3>
                    <div class="product-price-row">
                        <span class="product-price">${formatCurrency(p.price)}</span>
                        <button class="btn-add" onclick="handleAddToCart(${p.id})">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    }

    window.handleAddToCart = function(id) {
        const product = products.find(p => p.id === id);
        if (product) addToCart(product);
    };

    subLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = e.target.dataset.category;
            subLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            categoryTitle.innerText = e.target.innerText;
            renderProducts(cat);
        });
    });
    // Quando clicar no produto, abre o modal
window.openModal = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
        <div class="modal-grid">
            <img src="${product.img}" alt="${product.name}">
            <div>
                <span class="subtitle">${product.category.toUpperCase()}</span>
                <h3 style="font-size: 1.4rem; margin: 0.3rem 0 0.8rem 0;">${product.name}</h3>
                <div class="product-price" style="font-size: 1.5rem; margin-bottom: 1rem;">${formatCurrency(product.price)}</div>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Produto de alta performance da Traspadini UV com garantia de qualidade.</p>
                <button class="btn-primary w-100" onclick="addToCartFromModal(${product.id})">
                    <i class="fa-solid fa-cart-shopping"></i> Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
};

window.closeModal = function() {
    document.getElementById('product-modal').classList.add('hidden');
};

window.addToCartFromModal = function(id) {
    handleAddToCart(id);
    closeModal();
};

// Fechar modal clicando fora dele
window.addEventListener('click', (e) => {
    const modal = document.getElementById('product-modal');
    if (e.target === modal) closeModal();
});

    if (mobileSelect) {
        mobileSelect.addEventListener('change', (e) => {
            renderProducts(e.target.value);
        });
    }

    renderProducts('all');
});
