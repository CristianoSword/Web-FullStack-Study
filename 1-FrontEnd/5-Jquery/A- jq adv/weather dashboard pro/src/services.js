/**
 * WeatherService
 * Gerencia todas as chamadas AJAX para a API do OpenWeather
 */

const API_KEY = 'YOUR_API_KEY_HERE'; // O usuário deve substituir pela dele
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
    constructor() {
        this.unit = 'metric'; // metric = Celsius, imperial = Fahrenheit
    }

    setUnit(unit) {
        this.unit = unit === 'f' ? 'imperial' : 'metric';
    }

    /**
     * Busca o clima atual de uma cidade
     */
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

    /**
     * Busca a previsão de 5 dias
     */
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
}

export const weatherService = new WeatherService();
