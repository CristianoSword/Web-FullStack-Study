import { ApiDefinition } from "./types";

export class SdkClient<T extends ApiDefinition> {
    constructor(private baseUrl: string) {}

    private interceptors: ((req: any) => any)[] = [];

    addInterceptor(fn: (req: any) => any) {
        this.interceptors.push(fn);
    }

    async request<P extends keyof T & string>(
        path: P,
        ...args: T[P]["params"] extends undefined 
            ? T[P]["body"] extends undefined 
                ? [options?: { params?: any, body?: any }]
                : [options: { body: T[P]["body"], params?: any }]
            : [options: { params: T[P]["params"], body?: T[P]["body"] }]
    ): Promise<T[P]["response"]> {
        const options = args[0] || {};
        let request = { path, ...options };
        this.interceptors.forEach(fn => request = fn(request));
        
        console.log(`[SDK] Executando request para ${request.path}`);
        return {} as T[P]["response"];
    }
}
