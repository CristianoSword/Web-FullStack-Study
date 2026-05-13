import { ApiDefinition } from "./types";

export class SdkClient<T extends ApiDefinition> {
    constructor(private baseUrl: string) {}

    async request<P extends keyof T & string>(
        path: P,
        options: {
            params?: T[P]["params"];
            body?: T[P]["body"];
        } = {}
    ): Promise<T[P]["response"]> {
        console.log(`[SDK] ${T[path]["method"]} ${this.baseUrl}${path}`);
        // Mock de chamada fetch/axios
        return {} as T[P]["response"];
    }
}
