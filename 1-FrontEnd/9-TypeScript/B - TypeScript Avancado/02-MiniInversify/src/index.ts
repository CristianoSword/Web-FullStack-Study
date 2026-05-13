import "reflect-metadata";
import { Injectable, Inject } from "./decorators";
import { container, bootstrap } from "./container";

@Injectable()
class Logger {
    log(msg: string) {
        console.log(`[LOG] ${msg}`);
    }
}

@Injectable()
class ApiService {
    constructor(private logger: Logger) {}

    fetchData() {
        this.logger.log("Buscando dados da API...");
        return { id: 1, name: "TypeScript" };
    }
}

@Injectable()
class App {
    constructor(private api: ApiService) {}

    run() {
        console.log("App iniciando...");
        const data = this.api.fetchData();
        console.log("Dados recebidos:", data);
    }
}

// Registro de Singleton (opcional, o resolve j instancia se for classe)
container.register({ token: Logger, useClass: Logger, singleton: true });

const app = bootstrap(App);
app.run();
