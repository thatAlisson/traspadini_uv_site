let addedItems = [];

document.addEventListener('DOMContentLoaded', () => {
    const btnAddItem = document.getElementById('btn-add-item-list');
    const itemsSummaryList = document.getElementById('items-summary-list');
    const customForm = document.getElementById('custom-form');
    const logoFileInput = document.getElementById('logo-file');
    const fileLabel = document.getElementById('file-label');

    logoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.name.toLowerCase().endsWith('.svg')) {
                alert('Apenas arquivos no formato .SVG são aceitos!');
                logoFileInput.value = '';
                fileLabel.innerText = 'Arraste seu arquivo .SVG aqui ou clique para selecionar';
                return;
            }
            fileLabel.innerHTML = `<strong style="color: var(--success);"><i class="fa-solid fa-check"></i> Arquivo:</strong> ${file.name}`;
        }
    });

    btnAddItem.addEventListener('click', () => {
        const model = document.getElementById('item-model').value;
        const color = document.getElementById('item-color').value;
        const method = document.getElementById('item-method').value;

        const sizeInputs = document.querySelectorAll('.size-qty');
        let sizesObj = {};
        let totalQtyItem = 0;

        sizeInputs.forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                sizesObj[input.dataset.size] = qty;
                totalQtyItem += qty;
            }
        });

        if (totalQtyItem === 0) {
            alert('Informe a quantidade para pelo menos um tamanho.');
            return;
        }

        if (model.includes('Camisa') && totalQtyItem < 10) {
            alert(`O modelo "${model}" exige pedido mínimo de 10 unidades.`);
            return;
        }

        addedItems.push({
            id: Date.now(),
            model, color, method,
            sizes: sizesObj,
            totalQty: totalQtyItem
        });

        renderSummary();
        sizeInputs.forEach(input => input.value = '0');
    });

    function renderSummary() {
        if (addedItems.length === 0) {
            itemsSummaryList.innerHTML = '<p class="empty-list-text">Nenhum item adicionado ainda.</p>';
            return;
        }

        itemsSummaryList.innerHTML = '';
        addedItems.forEach((item, index) => {
            const sizesFormatted = Object.entries(item.sizes).map(([s, q]) => `${s}: ${q}und`).join(' | ');
            const card = document.createElement('div');
            card.className = 'summary-item-card';
            card.innerHTML = `
                <div class="summary-item-info">
                    <strong>${item.model} (${item.color})</strong>
                    <span>Aplicação: ${item.method}</span>
                    <small>Tamanhos: ${sizesFormatted} (Total: ${item.totalQty} und)</small>
                </div>
                <button type="button" class="btn-remove-item" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            itemsSummaryList.appendChild(card);
        });
    }

    window.removeItem = function(index) {
        addedItems.splice(index, 1);
        renderSummary();
    };

    customForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (addedItems.length === 0) {
            alert('Adicione pelo menos um item configurado ao resumo.');
            return;
        }

        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;
        const email = document.getElementById('cust-email').value;
        const logoFile = logoFileInput.files[0];

        let hasCustomization = addedItems.some(i => i.method !== 'Sem Personalização (Liso)');
        if (hasCustomization && !logoFile) {
            alert('Como há itens personalizados, é obrigatório o envio da logo em .SVG.');
            return;
        }

        let msg = `*PEDIDO DE UNIFORMES - TRASPADINI UV*

`;
        msg += `👤 *Nome:* ${name}
📞 *WhatsApp:* ${phone}
📧 *E-mail:* ${email}

`;
        msg += `📦 *ITENS:* 
`;

        addedItems.forEach((item, i) => {
            const sizesStr = Object.entries(item.sizes).map(([s, q]) => `${s}:${q}`).join(', ');
            msg += `
*${i + 1}. ${item.model}*
`;
            msg += `   • Cor: ${item.color}
   • Aplicação: ${item.method}
   • Tamanhos: ${sizesStr}
   • Total: ${item.totalQty} und
`;
        });

        if (logoFile) msg += `
📁 *Logo Vetorial:* .SVG Anexado (${logoFile.name})
`;

        window.open(`https://wa.me/5527999999999?text=${encodeURIComponent(msg)}`, '_blank');
    });
});
