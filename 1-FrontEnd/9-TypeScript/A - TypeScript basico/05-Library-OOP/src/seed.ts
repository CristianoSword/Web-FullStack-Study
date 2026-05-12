import { Book, DVD, Member } from "./models";
import { Library } from "./library";

export function seedLibrary(lib: Library) {
    const b1 = new Book("B1", "TypeScript Avanado", "Anders Hejlsberg", 500);
    const b2 = new Book("B2", "Clean Code", "Robert Martin", 400);
    const d1 = new DVD("D1", "The Matrix", 136);

    const m1 = new Member("M1", "Cristiano");
    const m2 = new Member("M2", "Ana");

    lib.addItem(b1);
    lib.addItem(b2);
    lib.addItem(d1);
    
    lib.addMember(m1);
    lib.addMember(m2);

    return { m1, m2, b1, b2, d1 };
}
