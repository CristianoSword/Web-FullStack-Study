import { Library } from "./library";
import { seedLibrary } from "./seed";

const myLib = new Library();
const { m1, b1, d1 } = seedLibrary(myLib);

console.log("--- Sistema de Biblioteca ---");

console.log("Itens disponveis:", myLib.listAvailableItems().map(i => i.getDetails()));

// Emprstimo
myLib.lendItem(b1.id, m1.id);
myLib.lendItem(d1.id, m1.id);

console.log("\nItens com Cristiano:", m1.getBorrowedItems().map(i => i.title));
console.log("Itens disponveis na biblioteca:", myLib.listAvailableItems().map(i => i.title));
