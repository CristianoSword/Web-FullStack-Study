export type Subscriber = () => void;

export interface Signal<T> {
    value: T;
    subscribe: (sub: Subscriber) => void;
}

export type Computed<T> = Readonly<Signal<T>>;
