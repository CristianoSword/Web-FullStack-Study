import type { WeatherData } from "./types";

export class WeatherCache {
    private cache = new Map<string, { data: WeatherData, expiry: number }>();
    private TTL = 60 * 1000; // 1 minuto

    set(city: string, data: WeatherData): void {
        this.cache.set(city, {
            data,
            expiry: Date.now() + this.TTL
        });
    }

    get(city: string): WeatherData | null {
        const item = this.cache.get(city);
        if (item && item.expiry > Date.now()) {
            return item.data;
        }
        this.cache.delete(city);
        return null;
    }
}
