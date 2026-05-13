import { ApiDefinition } from "./types";

export class SdkClient<T extends ApiDefinition> {
    constructor(private baseUrl: string) {}

    private interceptors: ((req: any) => any)[] = [];

    addInterceptor(fn: (req: any) => any) {
        this.interceptors.push(fn);
    }

    async request<P extends keyof T & string>(
        path: P,
        options: {
            params?: T[P]["params"];
            body?: T[P]["body"];
        } = {}
    ): Promise<T[P]["response"]> {
        let request = { path, ...options };
        this.interceptors.forEach(fn => request = fn(request));
        
        console.log(`[SDK] Executando request para ${request.path}`);
        return {} as T[P]["response"];
    }
}
