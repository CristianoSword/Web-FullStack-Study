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
            this.updateUI(data);
        } catch (error) {
            console.error('Erro na busca:', error);
        }
    }

    updateUI(data) {
        const { name, main, weather, dt, sys } = data;
        const date = new Date(dt * 1000).toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long' });

        // Hero Card
        $('#hero-card').html(`
            <div class="hero-info">
                <div class="date">${date}</div>
                <h2>${name}, ${sys.country}</h2>
            </div>
            <div class="hero-temp">${Math.round(main.temp)}°</div>
            <div class="hero-condition">
                <i class='bx ${this.getIconClass(weather[0].icon)}' id="main-icon"></i>
                <span>${weather[0].description}</span>
            </div>
        `).fadeIn();
    }

    getIconClass(iconCode) {
        const iconMap = {
            '01d': 'bx-sun',
            '01n': 'bx-moon',
            '02d': 'bx-cloud-light-rain',
            '02n': 'bx-cloud-moon',
            '03d': 'bx-cloud',
            '03n': 'bx-cloud',
            '04d': 'bx-cloud',
            '04n': 'bx-cloud',
            '09d': 'bx-cloud-drizzle',
            '10d': 'bx-cloud-rain',
            '11d': 'bx-cloud-lightning',
            '13d': 'bx-cloud-snow',
            '50d': 'bx-water'
        };
        return iconMap[iconCode] || 'bx-cloud';
    }
}

$(document).ready(() => new App());
