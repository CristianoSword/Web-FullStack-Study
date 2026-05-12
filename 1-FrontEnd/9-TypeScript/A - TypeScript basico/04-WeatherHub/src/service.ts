import { WeatherData, WeatherApiResponse, WeatherCondition } from "./types";

export class WeatherService {
    // Simula uma chamada de API
    async fetchWeather(city: string): Promise<WeatherData> {
        console.log(`Buscando clima para ${city}...`);
        
        // Simula resposta da API
        const mockResponse: WeatherApiResponse = {
            name: city,
            main: { temp: 25, humidity: 60 },
            weather: [{ main: "Clear" }],
            wind: { speed: 10 }
        };

        return this.mapResponseToData(mockResponse);
    }

    private mapResponseToData(res: WeatherApiResponse): WeatherData {
        return {
            city: res.name,
            temperature: res.main.temp,
            humidity: res.main.humidity,
            windSpeed: res.wind.speed,
            condition: this.mapCondition(res.weather[0].main)
        };
    }

    private mapCondition(main: string): WeatherCondition {
        switch (main.toLowerCase()) {
            case "clear": return WeatherCondition.SUNNY;
            case "clouds": return WeatherCondition.CLOUDY;
            case "rain": return WeatherCondition.RAINY;
            case "snow": return WeatherCondition.SNOWY;
            default: return WeatherCondition.SUNNY;
        }
    }

    // Type Guard
    isWeatherData(data: any): data is WeatherData {
        return (data as WeatherData).city !== undefined;
    }

    toFahrenheit(celsius: number): number {
        return (celsius * 9/5) + 32;
    }
}
