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
                const city = $(e.target).val().trim();
                if (city) {
                    this.searchCity(city);
                    $(e.target).val(''); // Limpa o campo
                    $(e.target).blur(); // Remove o foco
                }
            }
        });

        // Toggle de Unidades
        $('.unit-toggle span').on('click', (e) => {
            const $target = $(e.target);
            if ($target.hasClass('active')) return;

            const unit = $target.data('unit');
            $('.unit-toggle span').removeClass('active');
            $target.addClass('active');
            
            weatherService.setUnit(unit);
            
            // Re-busca a cidade atual
            const currentCity = $('#hero-card h2').text().split(',')[0];
            if (currentCity) this.searchCity(currentCity);
        });
    }

    async searchCity(city) {
        if (!city) return;

        try {
            const currentData = await weatherService.getCurrentWeather(city);
            const forecastData = await weatherService.getForecast(city);
            
            this.updateUI(currentData);
            this.renderForecast(forecastData);
        } catch (error) {
            this.showError('Cidade não encontrada. Verifique o nome e tente novamente.');
            console.error('Erro na busca:', error);
        }
    }

    showError(message) {
        // Alerta simples com jQuery (poderia ser um modal no futuro)
        const $alert = $(`<div class="error-alert">${message}</div>`);
        $('body').append($alert);
        $alert.fadeIn().delay(3000).fadeOut(() => $alert.remove());
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

    renderForecast(data) {
        const $container = $('#forecast-section');
        $container.empty().append('<h3>Previsão para 5 dias</h3>');
        
        const $grid = $('<div class="forecast-card-grid"></div>');
        
        // Filtra para pegar apenas uma medição por dia (ex: 12:00)
        const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        dailyData.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('pt-br', { weekday: 'short' });
            
            const card = `
                <div class="forecast-day-card">
                    <span class="day">${dayName}</span>
                    <i class='bx ${this.getIconClass(day.weather[0].icon)}'></i>
                    <div class="temps">
                        <span class="max">${Math.round(day.main.temp_max)}°</span>
                        <span class="min">${Math.round(day.main.temp_min)}°</span>
                    </div>
                </div>
            `;
            $grid.append(card);
        });

        $container.append($grid);
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
