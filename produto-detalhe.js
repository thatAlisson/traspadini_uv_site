document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));
    const product = PRODUCTS.find(item => item.id === productId);
    const container = document.getElementById('product-detail-container');

    if (!container) return;

    if (!product) {
        container.innerHTML = '<h2>Produto não encontrado</h2><p><a href="index.html" class="btn-primary mt-3">Voltar à Loja</a></p>';
        return;
    }

    container.innerHTML = `
        <div class="product-detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
            <div class="product-detail-img" style="background: #1e293b; border-radius: 12px; display: flex; justify-content: center; align-items: center; padding: 2rem;">
                <img src="${product.img}" alt="${product.name}" style="max-width: 100%; max-height: 350px; object-fit: contain;" onerror="this.src='https://placehold.co/400x400/1e293b/FFF?text=TRASPADINI'">
            </div>
            <div class="product-detail-info">
                <span class="subtitle">${product.category.toUpperCase()}</span>
                <h1 style="font-size: 2rem; margin: 0.5rem 0 1rem 0;">${product.name}</h1>
                <div class="product-price" style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem;">${formatCurrency(product.price)}</div>
                <p style="color: var(--text-muted); margin-bottom: 2rem; line-height: 1.6;">${product.desc}</p>
                <button class="btn-primary" id="btn-add-detail" style="width: 100%;">
                    <i class="fa-solid fa-cart-shopping"></i> Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;

    document.getElementById('btn-add-detail').addEventListener('click', () => addToCart(product));
});
