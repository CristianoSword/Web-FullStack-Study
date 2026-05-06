import { weatherService } from './services.js';

/**
 * App Controller
 * Gerencia a interação entre a UI e o WeatherService
 */
class App {
    constructor() {
        this.init();
    }

    init() {
        console.log('%c SkyCast Pro Initialized ', 'background: #3b82f6; color: white; font-weight: bold;');
        this.bindEvents();
    }

    bindEvents() {
        // Busca ao pressionar Enter
        $('#city-search').on('keypress', (e) => {
            if (e.which === 13) {
                this.searchCity($(e.target).val());
            }
        });

        // Toggle de Unidades
        $('.unit-toggle span').on('click', (e) => {
            const unit = $(e.target).data('unit');
            $('.unit-toggle span').removeClass('active');
            $(e.target).addClass('active');
            weatherService.setUnit(unit);
            // Re-busca a cidade atual para atualizar unidades
            const currentCity = $('#hero-card h2').text();
            if (currentCity) this.searchCity(currentCity);
        });
    }

    async searchCity(city) {
        if (!city) return;

        try {
            const data = await weatherService.getCurrentWeather(city);
            console.log('Dados recebidos:', data);
            // Próximo Commit: Renderizar dados
        } catch (error) {
            console.error('Erro na busca:', error);
        }
    }
}

$(document).ready(() => new App());
