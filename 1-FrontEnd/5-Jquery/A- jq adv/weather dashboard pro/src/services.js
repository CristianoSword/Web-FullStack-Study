/**
 * WeatherService
 * Gerencia todas as chamadas AJAX para a API do OpenWeather
 */

const API_KEY = 'YOUR_API_KEY_HERE'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
    constructor() {
        this.unit = 'metric';
    }

    setUnit(unit) {
        this.unit = unit === 'f' ? 'imperial' : 'metric';
    }

    async getCurrentWeather(city) {
        return $.ajax({
            url: `${BASE_URL}/weather`,
            data: {
                q: city,
                appid: API_KEY,
                units: this.unit,
                lang: 'pt_br'
            },
            method: 'GET'
        });
    }

    async getForecast(city) {
        return $.ajax({
            url: `${BASE_URL}/forecast`,
            data: {
                q: city,
                appid: API_KEY,
                units: this.unit,
                lang: 'pt_br'
            },
            method: 'GET'
        });
    }

    async getWeatherByCoords(lat, lon) {
        return $.ajax({
            url: `${BASE_URL}/weather`,
            data: {
                lat,
                lon,
                appid: API_KEY,
                units: this.unit,
                lang: 'pt_br'
            },
            method: 'GET'
        });
    }
}

export const weatherService = new WeatherService();
