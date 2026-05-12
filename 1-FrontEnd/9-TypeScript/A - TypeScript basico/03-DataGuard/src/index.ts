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

console.log("Validando usurio invlido:", validator.validate(invalidUser));

const validUser: User = {
    name: "Cristiano",
    email: "contato@cristiano.com",
    age: 30
};

console.log("Validando usurio vlido:", validator.validate(validUser));
