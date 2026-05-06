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

        // Tentar Geolocalização
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => this.searchByCoords(pos.coords.latitude, pos.coords.longitude),
                () => this.loadLastCity()
            );
        } else {
            this.loadLastCity();
        }
    }

    loadLastCity() {
        const lastCity = localStorage.getItem('lastCity') || 'São Paulo';
        this.searchCity(lastCity);
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

    async searchByCoords(lat, lon) {
        this.toggleLoading(true);
        try {
            const data = await weatherService.getWeatherByCoords(lat, lon);
            this.searchCity(data.name); // Busca completa pela cidade encontrada
        } catch (error) {
            this.loadLastCity();
        }
    }

    async searchCity(city) {
        if (!city) return;
        this.toggleLoading(true);

        try {
            const currentData = await weatherService.getCurrentWeather(city);
            const forecastData = await weatherService.getForecast(city);
            
            this.updateUI(currentData);
            this.renderForecast(forecastData);
            
            // Salvar no storage
            localStorage.setItem('lastCity', city);
        } catch (error) {
            this.showError('Cidade não encontrada. Verifique o nome e tente novamente.');
            console.error('Erro na busca:', error);
        } finally {
            this.toggleLoading(false);
        }
    }

    toggleLoading(show) {
        if (show) {
            $('#weather-grid').css('opacity', '0.5');
            // Poderia adicionar um spinner aqui
        } else {
            $('#weather-grid').css('opacity', '1');
        }
    }

    showError(message) {
        // Alerta simples com jQuery (poderia ser um modal no futuro)
        const $alert = $(`<div class="error-alert">${message}</div>`);
        $('body').append($alert);
        $alert.fadeIn().delay(3000).fadeOut(() => $alert.remove());
    }

    updateUI(data) {
        const { name, main, weather, dt, sys, timezone } = data;
        
        // Calcula a hora local baseada no timezone da API (em segundos)
        const localDate = new Date((dt + timezone + new Date().getTimezoneOffset() * 60) * 1000);
        const dateStr = localDate.toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long' });
        const timeStr = localDate.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' });

        // Hero Card
        $('#hero-card').hide().html(`
            <div class="hero-info">
                <div class="date">${dateStr} • ${timeStr}</div>
                <h2>${name}, ${sys.country}</h2>
            </div>
            <div class="hero-temp">${Math.round(main.temp)}°</div>
            <div class="hero-condition">
                <i class='bx ${this.getIconClass(weather[0].icon)}' id="main-icon"></i>
                <span>${weather[0].description}</span>
            </div>
        `).slideDown(500);

        // Stats Grid
        $('#stats-grid').html(`
            <div class="stat-card">
                <div class="stat-icon"><i class='bx bx-wind'></i></div>
                <div class="stat-info">
                    <span class="label">Vento</span>
                    <span class="value">${data.wind.speed} km/h</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class='bx bx-droplet'></i></div>
                <div class="stat-info">
                    <span class="label">Umidade</span>
                    <span class="value">${main.humidity}%</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class='bx bx-tachometer'></i></div>
                <div class="stat-info">
                    <span class="label">Pressão</span>
                    <span class="value">${main.pressure} hPa</span>
                </div>
            </div>
        `);
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
