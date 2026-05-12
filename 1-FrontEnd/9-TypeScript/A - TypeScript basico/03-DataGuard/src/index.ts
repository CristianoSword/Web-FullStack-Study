import { DataGuard } from "./validator";
import { required, minLength, isEmail } from "./rules";

interface User {
    name: string;
    email: string;
    age: number;
}

const userSchema = {
    name: [required, minLength(3)],
    email: [required, isEmail],
};

const validator = new DataGuard<User>(userSchema);

const invalidUser: User = {
    name: "Jo",
    email: "email-invalido",
    age: 25
};

function displayResult(res: any) {
    if (res.isValid) {
        console.log("✅ Dados Vlidos!");
    } else {
        console.log("❌ Erros encontrados:");
        res.errors.forEach((err: string) => console.log(`  - ${err}`));
    }
}

console.log("Teste 1:");
displayResult(validator.validate(invalidUser));

console.log("\nTeste 2:");
displayResult(validator.validate(validUser));
