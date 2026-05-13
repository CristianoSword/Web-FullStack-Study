import { ApiDefinition } from "./types";
import { SdkClient } from "./client";

// Definio da API
interface MyApi extends ApiDefinition {
    "/users": {
        method: "GET";
        response: { id: number; name: string }[];
    };
    "/users/:id": {
        method: "GET";
        params: { id: string };
        response: { id: number; name: string };
    };
    "/login": {
        method: "POST";
        body: { user: string; pass: string };
        response: { token: string };
    };
}

// Inicializao
const api = new SdkClient<MyApi>("https://api.exemplo.com");

// Interceptor de Auth
api.addInterceptor((req) => {
    console.log("[AUTH] Adicionando Token...");
    return { ...req, headers: { Authorization: "Bearer 123" } };
});

// Uso
async function run() {
    const users = await api.request("/users");
    console.log("Usuários:", users);

    const login = await api.request("/login", {
        body: { user: "cristiano", pass: "123456" }
    });
    console.log("Token:", login.token);
}

run();
