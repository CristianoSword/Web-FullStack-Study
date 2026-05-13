export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface Endpoint {
    method: HttpMethod;
    params?: Record<string, any>;
    body?: any;
    response: any;
}

export type ApiDefinition = {
    [path: string]: Endpoint;
};

export type PathParams<Path extends string> = Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | PathParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
    ? Param
    : never;
