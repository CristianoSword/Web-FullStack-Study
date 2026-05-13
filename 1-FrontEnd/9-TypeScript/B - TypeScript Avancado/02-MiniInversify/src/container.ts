import "reflect-metadata";
import { Constructor, Token, Provider } from "./types";

export class Container {
    private providers = new Map<Token, Provider>();
    private instances = new Map<Token, any>();

    private resolving = new Set<Token>();

    register(provider: Provider): void {
        this.providers.set(provider.token, provider);
    }

    resolve<T>(token: Token<T>): T {
        if (this.instances.has(token)) {
            return this.instances.get(token);
        }

        if (this.resolving.has(token)) {
            throw new Error(`Circular dependency detected for: ${String(token)}`);
        }

        this.resolving.add(token);

        try {
            const provider = this.providers.get(token);
            if (!provider) {
                if (typeof token === "function") {
                    return this.construct(token as Constructor<T>);
                }
                throw new Error(`No provider found for token: ${String(token)}`);
            }

            if (provider.useValue !== undefined) {
                return provider.useValue;
            }

            const instance = this.construct(provider.useClass || (token as Constructor<T>));

            if (provider.singleton) {
                this.instances.set(token, instance);
            }

            return instance;
        } finally {
            this.resolving.delete(token);
        }
    }

    private construct<T>(constructor: Constructor<T>): T {
        const paramTypes: any[] = Reflect.getMetadata("design:paramtypes", constructor) || [];
        const customInjections: any[] = Reflect.getMetadata("custom:injections", constructor) || [];

        const args = paramTypes.map((type, index) => {
            if (type === String || type === Number || type === Boolean || type === Object) {
                const custom = customInjections.find(i => i.index === index);
                if (!custom) throw new Error(`Missing @Inject for primitive parameter at index ${index} of ${constructor.name}`);
                return this.resolve(custom.token);
            }
            const custom = customInjections.find(i => i.index === index);
            return this.resolve(custom ? custom.token : type);
        });
        
        return new constructor(...args);
    }
}

export const container = new Container();

export function bootstrap<T>(root: Constructor<T>): T {
    return container.resolve(root);
}
