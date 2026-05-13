import { Schema } from "./types";
import { QueryBuilder } from "./builder";

// Definio do banco de dados
interface MyDatabase extends Schema {
    users: {
        id: "number";
        name: "string";
        email: "string";
        active: "boolean";
    };
    posts: {
        id: "number";
        title: "string";
        content: "string";
        authorId: "number";
    };
}

// Uso do Builder
const usersQuery = new QueryBuilder<MyDatabase, "users">("users");

const sql = usersQuery
    .select("id", "name", "email")
    .where("active", "=", true)
    .where("id", ">", 10)
    .build();

console.log("SQL Gerado:", sql);

// Teste de Erro de Tipagem (Descomente para ver o TS reclamar)
// usersQuery.select("coluna_inexistente"); 
// usersQuery.where("name", "=", 123); // Validao de tipo de valor pendente
