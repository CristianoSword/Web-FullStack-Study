/**
 * Waifu Explorer - Core Logic
 * API: waifu.pics (Open Source & No Key Required)
 */

const BASE_URL = 'https://api.waifu.pics/sfw';

class WaifuApp {
    constructor() {
        this.currentCategory = 'waifu';
        this.favorites = JSON.parse(localStorage.getItem('waifu_favs')) || [];
        this.init();
    }

    init() {
        console.log('%c WaifuVerse Initialized ', 'background: #ff4d94; color: white; font-weight: bold;');
        this.bindEvents();
        this.fetchWaifu();
        this.updateFavCount();
    }

    bindEvents() {
        // Troca de Categoria
        $('#category-list li').on('click', (e) => {
            const $li = $(e.currentTarget);
            $('#category-list li').removeClass('active');
            $li.addClass('active');
            
            this.currentCategory = $li.data('cat');
            $('#current-category-title').text(`${this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1)} Explorer`);
            this.fetchWaifu();
        });

        // Botão Next
        $('#next-btn').on('click', () => this.fetchWaifu());

        // Like Button
        $('#like-btn').on('click', () => this.toggleFavorite());

        // Download Button
        $('#download-btn').on('click', () => this.downloadImage());
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
            console.error('Erro ao baixar:', e);
        }
    }

    async fetchWaifu() {
        const $img = $('#waifu-img');
        const $loader = $('.card-loader');

        $img.hide();
        $loader.show();
        $('#like-btn').removeClass('liked').find('i').attr('class', 'bx bx-heart');

        try {
            const response = await $.ajax({
                url: `${BASE_URL}/${this.currentCategory}`,
                method: 'GET'
            });

            // Pré-carregamento da imagem para evitar flickering
            const tempImg = new Image();
            tempImg.src = response.url;
            tempImg.onload = () => {
                $img.attr('src', response.url).fadeIn(500);
                $loader.hide();
                this.checkIfLiked(response.url);
            };

        } catch (error) {
            console.error('Erro ao buscar waifu:', error);
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
}

$(document).ready(() => new WaifuApp());
