export type Constructor<T = any> = new (...args: any[]) => T;

export type Token<T = any> = string | symbol | Constructor<T>;

export interface Provider<T = any> {
    token: Token<T>;
    useClass?: Constructor<T>;
    useValue?: T;
    singleton?: boolean;
}
