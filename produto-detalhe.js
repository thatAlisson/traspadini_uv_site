document.addEventListener('DOMContentLoaded', () => {
    // Pegar o ID da URL (ex: ?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Lista de produtos (certifique-se de manter a mesma lista ou centralizá-la)
    const products = [
        { id: 1, name: "Camisa UV Protection Pro 50+", price: 89.90, category: "camisas", img: "https://images.tcdn.com.br/img/img_prod/1045934/camisa_protecao_uv_50_masculina_manga_longa_preto_lisa_161_1_ee5d8aa1368b6da4d6421bb860d5bfa6.jpg", desc: "Camisa com proteção solar permanente FPS 50+, ideal para atividades ao ar livre, pesca e esporte." },
        { id: 2, name: "Camisa Dry Fit Esportiva", price: 59.90, category: "camisas", img: "https://img.elo7.com.br/product/original/2CD4603/camiseta-dry-fit-lisa-masculina-poliester.jpg", desc: "Tecido leve de poliéster com secagem rápida e alta respirabilidade para treinos intensos." },
        { id: 3, name: "Calça Jeans Tradicional Comfort", price: 149.90, category: "calcas", img: "https://images.tcdn.com.br/img/img_prod/1077755/calca_jeans_masculina_tradicional_reta_com_elastano_53_1_48e7ba6c03dc82b1c43f324dfbd777de.jpg", desc: "Calça jeans confortável com elastano, corte tradicional e alta durabilidade para o dia a dia." },
        { id: 4, name: "Calça Sarja Slim Fit Bege", price: 159.90, category: "calcas", img: "https://images.yampi.me/assets/stores/modamix/uploads/images/calca-masculina-sarja-bege-636ad90b0e502-medium.jpg", desc: "Calça de sarja modelagem slim fit, elegante e versátil para ocasiões casuais ou corporativas." },
        { id: 5, name: "Perfume Masculino Imponente 100ml", price: 199.90, category: "perfume", img: "https://http2.mlstatic.com/D_NQ_NP_868311-MLB50123512343_052022-O.webp", desc: "Fragrância marcante e sofisticada com excelente fixação." },
        { id: 6, name: "Carteira em Couro Legítimo Slim", price: 79.90, category: "carteiras", img: "https://http2.mlstatic.com/D_NQ_NP_912345-MLB48765432109_112021-O.webp", desc: "Carteira compacta em couro legítimo com compartimentos para cartões e documentos." },
        { id: 7, name: "Boné Dad Hat Minimalista Preto", price: 49.90, category: "bones", img: "https://http2.mlstatic.com/D_NQ_NP_789012-MLB49876543210_012022-O.webp", desc: "Boné estilo Dad Hat com regulagem traseira e acabamento premium." }
    ];

    const product = products.find(p => p.id === productId);
    const container = document.getElementById('product-detail-container');

    if (!product) {
        container.innerHTML = '<h2>Produto não encontrado</h2><p><a href="index.html" class="btn-primary mt-3">Voltar à Loja</a></p>';
        return;
    }

    container.innerHTML = `
        <div class="product-detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
            <div class="product-detail-img" style="background: #1e293b; border-radius: 12px; display: flex; justify-content: center; align-items: center; padding: 2rem;">
                <img src="${product.img}" alt="${product.name}" style="max-width: 100%; max-height: 350px; object-fit: contain;">
            </div>
            <div class="product-detail-info">
                <span class="subtitle">${product.category.toUpperCase()}</span>
                <h1 style="font-size: 2rem; margin: 0.5rem 0 1rem 0;">${product.name}</h1>
                <div class="product-price" style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem;">${formatCurrency(product.price)}</div>
                <p style="color: var(--text-muted); margin-bottom: 2rem; line-height: 1.6;">${product.desc || 'Produto oficial Traspadini UV com garantia de qualidade e alta performance.'}</p>
                
                <button class="btn-primary" id="btn-add-detail" style="width: 100%;">
                    <i class="fa-solid fa-cart-shopping"></i> Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;

    document.getElementById('btn-add-detail').addEventListener('click', () => {
        addToCart(product);
    });
});
