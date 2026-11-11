document.addEventListener('DOMContentLoaded', () => {
    const totalValEl = document.getElementById('checkout-total-val');
    const form = document.getElementById('checkout-form');
    const statusBox = document.getElementById('payment-status');
    const statusContent = document.getElementById('status-content');
    const paySpinner = document.getElementById('pay-spinner');

    const cart = getCart();
    const total = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    totalValEl.innerText = formatCurrency(total);

    document.querySelectorAll('.pay-method').forEach(method => {
        method.addEventListener('click', () => {
            document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
            method.querySelector('input[type="radio"]').checked = true;
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.classList.add('hidden');
        statusBox.classList.remove('hidden');

        setTimeout(() => {
            paySpinner.classList.add('hidden');
            statusContent.innerHTML = `
                <i class="fa-solid fa-circle-check" style="font-size: 4rem; color: var(--success); margin-bottom: 1rem;"></i>
                <h3>Pagamento Aprovado com Sucesso!</h3>
                <p>Obrigado por comprar na Traspadini UV. O comprovante foi enviado para o seu e-mail.</p>
                <a href="loja.html" class="btn-primary mt-4">Voltar para a Loja</a>
            `;
            clearCart();
        }, 2500);
    });
});
