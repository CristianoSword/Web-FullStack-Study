export enum WeatherCondition {
    SUNNY = "Ensolarado",
    CLOUDY = "Nublado",
    RAINY = "Chuvoso",
    SNOWY = "Nevando"
}

export interface WeatherData {
    city: string;
    temperature: number;
    condition: WeatherCondition;
    humidity: number;
    windSpeed: number;
}

export interface WeatherApiResponse {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
    }>;
    wind: {
        speed: number;
    };
}
