import { weatherService } from './services.js';

class App {
    constructor() {
        this.init();
        this.currentCityData = null; // Armazena info da cidade atual (nome, pais)
    }

    init() {
        console.log('%c SkyCast Pro Initialized (7Timer Mode) ', 'background: #22c55e; color: white; font-weight: bold;');
        this.bindEvents();

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
        $('#city-search').on('keypress', (e) => {
            if (e.which === 13) {
                const city = $(e.target).val().trim();
                if (city) {
                    this.searchCity(city);
                    $(e.target).val('');
                    $(e.target).blur();
                }
            }
        });

        $('.unit-toggle span').on('click', (e) => {
            const $target = $(e.target);
            if ($target.hasClass('active')) return;

            const unit = $target.data('unit');
            $('.unit-toggle span').removeClass('active');
            $target.addClass('active');
            weatherService.setUnit(unit);
            
            if (this.currentCityData) {
                this.searchByCoords(this.currentCityData.lat, this.currentCityData.lon, this.currentCityData.name);
            }
        });

        $('#history-list').on('click', 'li', (e) => {
            this.searchCity($(e.currentTarget).find('span').text());
        });
    }

    async searchCity(city) {
        if (!city) return;
        this.toggleLoading(true);

        try {
            const coords = await weatherService.getCoords(city);
            this.currentCityData = { name: city, lat: coords.lat, lon: coords.lon };
            await this.searchByCoords(coords.lat, coords.lon, city);
            localStorage.setItem('lastCity', city);
            this.addToHistory(city);
        } catch (error) {
            this.showError('Não conseguimos localizar essa cidade.');
            this.toggleLoading(false);
        }
    }

    async searchByCoords(lat, lon, cityName = 'Sua Localização') {
        this.toggleLoading(true);
        try {
            const weatherData = await weatherService.getWeather(lat, lon);
            const forecastData = await weatherService.getForecast(lat, lon);
            
            this.currentCityData = { name: cityName, lat, lon };
            this.updateUI(weatherData, cityName);
            this.renderForecast(forecastData);
        } catch (error) {
            this.showError('Erro ao buscar dados climáticos.');
        } finally {
            this.toggleLoading(false);
        }
    }

    toggleLoading(show) {
        $('#weather-grid').css('opacity', show ? '0.5' : '1');
    }

    showError(message) {
        const $alert = $(`<div class="error-alert">${message}</div>`);
        $('body').append($alert);
        $alert.fadeIn().delay(3000).fadeOut(() => $alert.remove());
    }

    updateUI(data, cityName) {
        const current = data.dataseries[0];
        const date = new Date();
        const dateStr = date.toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long' });

        $('#hero-card').hide().html(`
            <div class="hero-info">
                <div class="date">${dateStr}</div>
                <h2>${cityName}</h2>
                <a href="https://www.openstreetmap.org/#map=12/${data.init.slice(0,2)}/${data.init.slice(2,4)}" target="_blank" class="map-link">
                    <i class='bx bx-map-alt'></i> Ver Mapa
                </a>
            </div>
            <div class="hero-temp">${current.temp2m}°</div>
            <div class="hero-condition">
                <i class='bx ${this.get7TimerIcon(current.weather)}' id="main-icon"></i>
                <span>${current.weather}</span>
            </div>
        `).slideDown(500);

        this.updateBackground(current.weather);

        $('#stats-grid').html(`
            <div class="stat-card">
                <div class="stat-icon"><i class='bx bx-wind'></i></div>
                <div class="stat-info">
                    <span class="label">Vento</span>
                    <span class="value">${current.wind10m.speed} level</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class='bx bx-droplet'></i></div>
                <div class="stat-info">
                    <span class="label">Umidade</span>
                    <span class="value">${current.rh2m}</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class='bx bx-cloud'></i></div>
                <div class="stat-info">
                    <span class="label">Nuvens</span>
                    <span class="value">${current.cloudcover} level</span>
                </div>
            </div>
        `);
    }

    renderForecast(data) {
        const $container = $('#forecast-section');
        $container.empty().append('<h3>Previsão para os próximos dias</h3>');
        const $grid = $('<div class="forecast-card-grid"></div>');

        data.dataseries.slice(0, 5).forEach((day, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index + 1);
            const dayName = date.toLocaleDateString('pt-br', { weekday: 'short' });
            
            const card = `
                <div class="forecast-day-card">
                    <span class="day">${dayName}</span>
                    <i class='bx ${this.get7TimerIcon(day.weather)}'></i>
                    <div class="temps">
                        <span class="max">${day.temp2m.max}°</span>
                        <span class="min">${day.temp2m.min}°</span>
                    </div>
                </div>
            `;
            $grid.append(card);
        });
        $container.append($grid);
    }

    updateBackground(condition) {
        const bgMap = {
            'clear': 'bg-sunny',
            'pcloudy': 'bg-cloudy',
            'mcloudy': 'bg-cloudy',
            'cloudy': 'bg-cloudy',
            'rain': 'bg-rainy',
            'snow': 'bg-snowy',
            'ts': 'bg-stormy'
        };
        $('body').attr('class', bgMap[condition] || '');
    }

    get7TimerIcon(condition) {
        const iconMap = {
            'clear': 'bx-sun',
            'pcloudy': 'bx-cloud-light-rain',
            'mcloudy': 'bx-cloud',
            'cloudy': 'bx-cloud',
            'rain': 'bx-cloud-rain',
            'snow': 'bx-cloud-snow',
            'ts': 'bx-cloud-lightning',
            'tsrain': 'bx-cloud-lightning',
            'humid': 'bx-water'
        };
        return iconMap[condition] || 'bx-cloud';
    }

    addToHistory(city) {
        const $list = $('#history-list');
        if ($list.find(`span:contains("${city}")`).length > 0) return;
        const item = $(`<li class="history-item"><i class='bx bx-history'></i><span>${city}</span></li>`);
        $list.prepend(item);
        if ($list.children().length > 5) $list.children().last().remove();
    }
}

$(document).ready(() => new App());
