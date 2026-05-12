export abstract class BaseItem {
    constructor(
        public readonly id: string,
        public title: string,
        protected isAvailable: boolean = true
    ) {}

    abstract getDetails(): string;

    toggleAvailability(): void {
        this.isAvailable = !this.isAvailable;
    }

    get availability(): boolean {
        return this.isAvailable;
    }
}

export class Book extends BaseItem {
    constructor(
        id: string,
        title: string,
        public author: string,
        public pages: number
    ) {
        super(id, title);
    }

    getDetails(): string {
        return `Livro: ${this.title} por ${this.author} (${this.pages} pgs)`;
    }
}

export class DVD extends BaseItem {
    constructor(
        id: string,
        title: string,
        public durationMinutes: number
    ) {
        super(id, title);
    }

    getDetails(): string {
        return `DVD: ${this.title} (${this.durationMinutes} min)`;
    }
}

export class Member {
    constructor(
        public id: string,
        public name: string,
        private borrowedItems: BaseItem[] = []
    ) {}

    borrow(item: BaseItem): void {
        this.borrowedItems.push(item);
    }

    getBorrowedItems(): BaseItem[] {
        return [...this.borrowedItems];
    }
}
