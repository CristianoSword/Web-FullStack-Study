export type ColumnType = "string" | "number" | "boolean" | "date";

export type Schema = {
    [table: string]: {
        [column: string]: ColumnType;
    };
};

export type TableColumns<T extends Schema, Table extends keyof T> = keyof T[Table];

export type QueryResult<T extends Schema, Table extends keyof T, Selected extends keyof T[Table]> = {
    [K in Selected]: T[Table][K] extends "string" ? string :
                   T[Table][K] extends "number" ? number :
                   T[Table][K] extends "boolean" ? boolean :
                   T[Table][K] extends "date" ? Date : never;
};
