import { EventKey, EventMap, EventHandler } from "./types";

export class EventBus {
    private listeners: { [K in EventKey]?: EventHandler<K>[] } = {};

    on<K extends EventKey>(key: K, handler: EventHandler<K>): void {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key]!.push(handler);
    }

    emit<K extends EventKey>(key: K, payload: EventMap[K]): void {
        const handlers = this.listeners[key];
        if (handlers) {
            handlers.forEach(handler => handler(payload));
        }
    }

    off<K extends EventKey>(key: K, handler: EventHandler<K>): void {
        const handlers = this.listeners[key];
        if (handlers) {
            this.listeners[key] = handlers.filter(h => h !== handler);
        }
    }

    once<K extends EventKey>(key: K, handler: EventHandler<K>): void {
        const wrapper: EventHandler<K> = (payload) => {
            handler(payload);
            this.off(key, wrapper);
        };
        this.on(key, wrapper);
    }
}
