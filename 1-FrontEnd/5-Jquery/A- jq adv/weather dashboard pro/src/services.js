/**
 * WeatherService - Migrado para 7Timer! (100% Gratuito)
 */

const BASE_7TIMER = 'https://www.7timer.info/bin/api.pl';
const BASE_GEO = 'https://nominatim.openstreetmap.org/search';

class WeatherService {
    constructor() {
        this.unit = 'metric';
    }

    setUnit(unit) {
        this.unit = unit === 'f' ? 'british' : 'metric'; // 7Timer usa 'british' para imperial
    }

    /**
     * Transforma Nome de Cidade em Coordenadas (Geocoding)
     */
    async getCoords(city) {
        const data = await $.ajax({
            url: BASE_GEO,
            data: {
                q: city,
                format: 'json',
                limit: 1
            },
            method: 'GET'
        });

        if (data.length === 0) throw new Error('Cidade não encontrada');
        
        return {
            lat: data[0].lat,
            lon: data[0].lon,
            displayName: data[0].display_name
        };
    }

    /**
     * Busca o clima (Civil Product - Detalhado)
     */
    async getWeather(lat, lon) {
        return $.ajax({
            url: BASE_7TIMER,
            data: {
                lon: lon,
                lat: lat,
                product: 'civil',
                output: 'json'
            },
            method: 'GET'
        });
    }

    /**
     * Busca a previsão semanal (Two Product)
     */
    async getForecast(lat, lon) {
        return $.ajax({
            url: BASE_7TIMER,
            data: {
                lon: lon,
                lat: lat,
                product: 'civillight',
                output: 'json'
            },
            method: 'GET'
        });
    }
}

export const weatherService = new WeatherService();
