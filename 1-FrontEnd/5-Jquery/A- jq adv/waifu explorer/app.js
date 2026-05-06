/**
 * Waifu Explorer - Versão Waifu.im (Alinhado com a Doc Oficial 2026)
 */

const BASE_URL = 'https://api.waifu.im/images';

class WaifuApp {
    constructor() {
        this.currentTag = 'waifu';
        this.favorites = JSON.parse(localStorage.getItem('waifu_favs')) || [];
        $(document).ready(() => this.init());
    }

    init() {
        console.log('%c WaifuVerse | Official Doc Integration ', 'background: #ff4d94; color: white; font-weight: bold;');
        this.bindEvents();
        this.fetchWaifu();
        this.updateFavCount();
    }

    bindEvents() {
        $('#category-list li').on('click', (e) => {
            const $li = $(e.currentTarget);
            $('#category-list li').removeClass('active');
            $li.addClass('active');
            
            this.currentTag = $li.data('cat');
            $('#current-category-title').text(`${this.currentTag.charAt(0).toUpperCase() + this.currentTag.slice(1)} Explorer`);
            this.fetchWaifu();
        });

        $('#next-btn').on('click', () => this.fetchWaifu());
        $('#like-btn').on('click', () => this.toggleFavorite());
        $('#download-btn').on('click', () => this.downloadImage());
    }

    async fetchWaifu() {
        const $img = $('#waifu-img');
        const $loader = $('.card-loader');

        $img.hide();
        $loader.show();
        $('#like-btn').removeClass('liked').find('i').attr('class', 'bx bx-heart');

        try {
            // Seguindo a Doc: Parâmetro 'IncludedTags' e Endpoint '/images'
            const response = await $.ajax({
                url: `${BASE_URL}?IncludedTags=${this.currentTag}`,
                method: 'GET'
            });

            // Estrutura oficial: response.items[0].url
            if (response.items && response.items.length > 0) {
                const imageUrl = response.items[0].url;
                
                const tempImg = new Image();
                tempImg.src = imageUrl;
                tempImg.onload = () => {
                    $img.attr('src', imageUrl).fadeIn(500);
                    $loader.hide();
                    this.checkIfLiked(imageUrl);
                };
            }

        } catch (error) {
            console.error('Erro API:', error);
            this.showError('Não conseguimos carregar a imagem desta categoria.');
            $loader.hide();
        }
    }

    toggleFavorite() {
        const url = $('#waifu-img').attr('src');
        if (!url) return;

        const index = this.favorites.indexOf(url);
        if (index === -1) {
            this.favorites.push(url);
            $('#like-btn').addClass('liked').find('i').attr('class', 'bx bxs-heart');
        } else {
            this.favorites.splice(index, 1);
            $('#like-btn').removeClass('liked').find('i').attr('class', 'bx bx-heart');
        }

        localStorage.setItem('waifu_favs', JSON.stringify(this.favorites));
        this.updateFavCount();
    }

    checkIfLiked(url) {
        if (this.favorites.includes(url)) {
            $('#like-btn').addClass('liked').find('i').attr('class', 'bx bxs-heart');
        }
    }

    updateFavCount() {
        $('#fav-count').text(`${this.favorites.length} Favoritos`);
    }

    async downloadImage() {
        const url = $('#waifu-img').attr('src');
        if (!url) return;
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
