import { Schema, QueryResult } from "./types";

export class QueryBuilder<T extends Schema, Table extends keyof T & string> {
    private selectedColumns: (keyof T[Table])[] = [];
    private tableName: Table;

    constructor(tableName: Table) {
        this.tableName = tableName;
    }

    select<K extends keyof T[Table] & string>(...columns: K[]): QueryBuilder<T, Table> {
        this.selectedColumns = columns;
        return this;
    }

    build(): string {
        const cols = this.selectedColumns.length > 0 ? this.selectedColumns.join(", ") : "*";
        return `SELECT ${cols} FROM ${this.tableName}`;
    }

    // Mock execution to show typing
    execute(): QueryResult<T, Table, any>[] {
        console.log(`Executando: ${this.build()}`);
        return [];
    }
}
