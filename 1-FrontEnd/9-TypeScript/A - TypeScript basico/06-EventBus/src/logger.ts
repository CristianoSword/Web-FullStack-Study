import { EventBus } from "./bus";
import { EventKey, EventMap } from "./types";

export class EventLogger {
    constructor(private bus: EventBus) {
        this.setupListeners();
    }

    private setupListeners() {
        this.bus.on("user:login", (p) => this.log("Login", p));
        this.bus.on("chat:message", (p) => this.log("Message", p));
    }

    private log(type: string, payload: any) {
        console.log(`[EVENT] ${type}:`, payload);
    }
}
