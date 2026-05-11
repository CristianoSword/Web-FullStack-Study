/**
 * Weather Dashboard Pro - Versão Open-Meteo
 * Resolvido problema de CORS e protocolo file://
 */

const BASE_GEO = 'https://nominatim.openstreetmap.org/search';
const BASE_WEATHER = 'https://api.open-meteo.com/v1/forecast';

const weatherService = {
    // Busca coordenadas pelo nome da cidade
    async getCoords(city) {
        const data = await $.ajax({
            url: BASE_GEO,
            data: { q: city, format: 'json', limit: 1 },
            method: 'GET'
        });
        if (!data || data.length === 0) throw new Error('Cidade não encontrada');
        return { 
            lat: data[0].lat, 
            lon: data[0].lon,
            name: data[0].display_name.split(',')[0] 
        };
    },

    // Busca clima atual e previsão
    async getWeatherData(lat, lon) {
        return $.ajax({
            url: BASE_WEATHER,
            data: {
                latitude: lat,
                longitude: lon,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min',
                timezone: 'auto'
            },
            method: 'GET'
        });
    }
};

class App {
    constructor() {
        this.currentCity = null;
        $(document).ready(() => this.init());
    }

    init() {
        console.log('SkyCast Pro Online (Open-Meteo)');
        this.bindEvents();
        
        // Tentar localização ou carregar última
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
                if (city) this.searchCity(city);
                $(e.target).val('').blur();
            }
        });

        $('#history-list').on('click', 'li', (e) => {
            this.searchCity($(e.currentTarget).find('span').text());
        });
    }

    async searchCity(city) {
        this.toggleLoading(true);
        try {
            const coords = await weatherService.getCoords(city);
            const data = await weatherService.getWeatherData(coords.lat, coords.lon);
            this.updateUI(data, coords.name);
            localStorage.setItem('lastCity', coords.name);
            this.addToHistory(coords.name);
        } catch (e) {
            this.showError('Cidade não encontrada.');
        } finally {
            this.toggleLoading(false);
        }
    }

    async searchByCoords(lat, lon) {
        this.toggleLoading(true);
        try {
            const data = await weatherService.getWeatherData(lat, lon);
            this.updateUI(data, 'Sua Localização');
        } catch (e) {
            this.showError('Erro ao carregar clima local.');
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
        const current = data.current;
        const dateStr = new Date().toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long' });

        $('#hero-card').hide().html(`
            <div class="hero-info">
                <div class="date">${dateStr}</div>
                <h2>${cityName}</h2>
                <a href="https://www.openstreetmap.org/?mlat=${data.latitude}&mlon=${data.longitude}#map=12" target="_blank" class="map-link">
                    <i class='bx bx-map-alt'></i> Ver Mapa
                </a>
            </div>
            <div class="hero-temp">${Math.round(current.temperature_2m)}°</div>
            <div class="hero-condition">
                <i class='bx ${this.getWMOIcon(current.weather_code)}' id="main-icon"></i>
                <span>Sensação: ${Math.round(current.apparent_temperature)}°</span>
            </div>
        `).fadeIn(500);

        $('#stats-grid').html(`
            <div class="stat-card">
                <div class="stat-icon"><i class='bx bx-wind'></i></div>
                <div class="stat-info"><span class="label">Vento</span><span class="value">${current.wind_speed_10m} km/h</span></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class='bx bx-droplet'></i></div>
                <div class="stat-info"><span class="label">Umidade</span><span class="value">${current.relative_humidity_2m}%</span></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class='bx bx-tachometer'></i></div>
                <div class="stat-info"><span class="label">Pressão</span><span class="value">${current.surface_pressure} hPa</span></div>
            </div>
        `);

        this.renderForecast(data.daily);
    }

    renderForecast(daily) {
        const $container = $('#forecast-section').empty().append('<h3>Próximos Dias</h3>');
        const $grid = $('<div class="forecast-card-grid"></div>');
        
        for (let i = 0; i < 5; i++) {
            const d = new Date(); d.setDate(d.getDate() + i + 1);
            $grid.append(`
                <div class="forecast-day-card">
                    <span class="day">${d.toLocaleDateString('pt-br', { weekday: 'short' })}</span>
                    <i class='bx ${this.getWMOIcon(daily.weather_code[i])}'></i>
                    <div class="temps">
                        <span>${Math.round(daily.temperature_2m_max[i])}°</span>
                        <span class="min">${Math.round(daily.temperature_2m_min[i])}°</span>
                    </div>
                </div>
            `);
        }
        $container.append($grid);
    }

    getWMOIcon(code) {
        if (code === 0) return 'bx-sun';
        if (code <= 3) return 'bx-cloud';
        if (code <= 48) return 'bx-cloud-drizzle';
        if (code <= 67) return 'bx-cloud-rain';
        if (code <= 77) return 'bx-cloud-snow';
        if (code <= 99) return 'bx-cloud-lightning';
        return 'bx-cloud';
    }

    addToHistory(city) {
        const $l = $('#history-list');
        if ($l.find(`span:contains("${city}")`).length) return;
        $l.prepend(`<li class="history-item"><i class='bx bx-history'></i><span>${city}</span></li>`);
        if ($l.children().length > 5) $l.children().last().remove();
    }
}

new App();
