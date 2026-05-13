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

export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type UnionToIntersection<U> = 
  (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;
