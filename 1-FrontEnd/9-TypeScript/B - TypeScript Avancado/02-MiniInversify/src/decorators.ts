import "reflect-metadata";

export function Injectable(): ClassDecorator {
    return (target: any) => {
        // Apenas para disparar a emisso de metadados
    };
}

export function Inject(token: any): ParameterDecorator {
    return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
        const existingInjections = Reflect.getMetadata("custom:injections", target) || [];
        existingInjections.push({ index: parameterIndex, token });
        Reflect.defineMetadata("custom:injections", existingInjections, target);
    };
}
