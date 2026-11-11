document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const payBtn = document.getElementById('btn-proceed-payment');

    function renderCartPage() {
        const cart = getCart();
        container.innerHTML = '';

        if (cart.length === 0) {
            container.innerHTML = '<div class="glass-card text-center"><p>Seu carrinho está vazio.</p><a href="loja.html" class="btn-primary mt-3">Ir para a Loja</a></div>';
            subtotalEl.innerText = formatCurrency(0);
            totalEl.innerText = formatCurrency(0);
            payBtn.style.display = 'none';
            return;
        }

        payBtn.style.display = 'block';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement('div');
            row.className = 'cart-page-item';
            row.innerHTML = `
                <img src="${item.img}" alt="${item.name}" onerror="this.src='https://placehold.co/100/1e293b/FFF'">
                <div class="cart-page-item-info">
                    <h4>${item.name}</h4>
                    <div class="price">${formatCurrency(item.price)}</div>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="handleQtyChange(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="handleQtyChange(${item.id}, 1)">+</button>
                </div>
                <button class="btn-remove-item" onclick="handleRemove(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            container.appendChild(row);
        });

        subtotalEl.innerText = formatCurrency(total);
        totalEl.innerText = formatCurrency(total);
    }

    window.handleQtyChange = function(id, delta) {
        updateQuantity(id, delta);
        renderCartPage();
    };

    window.handleRemove = function(id) {
        removeFromCart(id);
        renderCartPage();
    };

    renderCartPage();
});
