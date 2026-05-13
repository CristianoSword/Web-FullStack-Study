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

    private conditions: string[] = [];

    where<K extends keyof T[Table] & string>(
        column: K, 
        operator: "=" | "!=" | ">" | "<", 
        value: T[Table][K] extends "string" ? string :
               T[Table][K] extends "number" ? number :
               T[Table][K] extends "boolean" ? boolean :
               T[Table][K] extends "date" ? Date : any
    ): this {
        this.conditions.push(`${column} ${operator} ${JSON.stringify(value)}`);
        return this;
    }

    build(): string {
        const cols = this.selectedColumns.length > 0 ? this.selectedColumns.join(", ") : "*";
        let query = `SELECT ${cols} FROM ${this.tableName}`;
        if (this.conditions.length > 0) {
            query += ` WHERE ${this.conditions.join(" AND ")}`;
        }
        return query;
    }

    // Mock execution to show typing
    execute(): QueryResult<T, Table, any>[] {
        console.log(`Executando: ${this.build()}`);
        return [];
    }
}
