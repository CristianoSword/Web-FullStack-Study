import { Subscriber } from "./types";

let context: Subscriber[] = [];

export function signal<T>(initialValue: T) {
    let value = initialValue;
    const subscribers = new Set<Subscriber>();

    return {
        get value() {
            const currentSubscriber = context[context.length - 1];
            if (currentSubscriber) {
                subscribers.add(currentSubscriber);
            }
            return value;
        },
        set value(newValue: T) {
            value = newValue;
            subscribers.forEach(sub => sub());
        },
        subscribe(sub: Subscriber) {
            subscribers.add(sub);
            return () => subscribers.delete(sub);
        }
    };
}

export function effect(fn: Subscriber) {
    const subscriber = () => {
        context.push(subscriber);
        try {
            fn();
        } finally {
            context.pop();
        }
    };
    subscriber();
}

export function computed<T>(fn: () => T) {
    const s = signal<T>(undefined as any);
    effect(() => {
        s.value = fn();
    });
    return s;
}
