export interface UserLoginPayload {
    userId: string;
    timestamp: number;
}

export interface MessagePayload {
    from: string;
    text: string;
}

export interface EventMap {
    "user:login": UserLoginPayload;
    "user:logout": { userId: string };
    "chat:message": MessagePayload;
}

export type EventKey = keyof EventMap;
export type EventHandler<K extends EventKey> = (payload: EventMap[K]) => void;
