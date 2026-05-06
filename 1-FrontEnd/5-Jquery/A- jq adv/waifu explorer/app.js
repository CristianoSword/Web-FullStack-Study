/**
 * Waifu Explorer - Versão Galeria Multi-Image
 * API: Waifu.im
 */

const BASE_URL = 'https://api.waifu.im/images';

class WaifuApp {
    constructor() {
        this.currentTag = 'waifu';
        this.favorites = JSON.parse(localStorage.getItem('waifu_favs')) || [];
        $(document).ready(() => this.init());
    }

    init() {
        console.log('%c WaifuVerse Gallery Online ', 'background: #ff4d94; color: white; font-weight: bold;');
        this.bindEvents();
        this.fetchGallery(); // Carrega inicial
        this.updateFavCount();
    }

    bindEvents() {
        // Troca de Categoria
        $('#category-list li').on('click', (e) => {
            const $li = $(e.currentTarget);
            $('#category-list li').removeClass('active');
            $li.addClass('active');
            
            this.currentTag = $li.data('cat');
            $('#current-category-title').text(`${this.currentTag.replace('-', ' ').toUpperCase()} Gallery`);
            
            $('#waifu-grid').empty(); // Limpa grid ao trocar categoria
            this.fetchGallery();
        });

        // Botão Next (Carrega mais)
        $('#next-btn').on('click', () => this.fetchGallery());

        // Eventos delegados para botões dentro dos cards
        $('#waifu-grid').on('click', '.like-btn', (e) => {
            const $btn = $(e.currentTarget);
            const url = $btn.data('url');
            this.toggleFavorite(url, $btn);
        });

        $('#waifu-grid').on('click', '.download-btn', (e) => {
            const url = $(e.currentTarget).data('url');
            this.downloadImage(url);
        });
    }

    async fetchGallery() {
        const $loader = $('.loader-container');
        $loader.show();

        try {
            // Buscando várias imagens de uma vez (many=true)
            const response = await $.ajax({
                url: `${BASE_URL}?IncludedTags=${this.currentTag}&many=true`,
                method: 'GET'
            });

            if (response.items) {
                response.items.forEach(item => {
                    this.renderCard(item.url);
                });
            }

        } catch (error) {
            console.error('Erro API:', error);
            this.showError('Erro ao carregar galeria.');
        } finally {
            $loader.hide();
        }
    }

    renderCard(url) {
        const isLiked = this.favorites.includes(url);
        const cardHtml = `
            <div class="waifu-card" style="display: none;">
                <img src="${url}" alt="Waifu">
                <div class="card-overlay">
                    <button class="like-btn ${isLiked ? 'liked' : ''}" data-url="${url}">
                        <i class='bx ${isLiked ? 'bxs-heart' : 'bx-heart'}'></i>
                    </button>
                    <button class="download-btn" data-url="${url}">
                        <i class='bx bx-download'></i>
                    </button>
                </div>
            </div>
        `;
        
        const $card = $(cardHtml);
        $('#waifu-grid').append($card);
        $card.fadeIn(800);
    }

    toggleFavorite(url, $btn) {
        const index = this.favorites.indexOf(url);
        if (index === -1) {
            this.favorites.push(url);
            $btn.addClass('liked').find('i').attr('class', 'bx bxs-heart');
        } else {
            this.favorites.splice(index, 1);
            $btn.removeClass('liked').find('i').attr('class', 'bx bx-heart');
        }

        localStorage.setItem('waifu_favs', JSON.stringify(this.favorites));
        this.updateFavCount();
    }

    updateFavCount() {
        $('#fav-count').text(`${this.favorites.length} Favoritos`);
    }

    async downloadImage(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `waifu-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            this.showError('Erro no download.');
        }
    }

    showError(msg) {
        const $alert = $(`<div class="error-alert">${msg}</div>`);
        $('body').append($alert);
        $alert.fadeIn().delay(3000).fadeOut(() => $alert.remove());
    }
}

new WaifuApp();
