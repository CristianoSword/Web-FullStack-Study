import { HashService } from "./services/hash-service.js";

const hashService = new HashService();
console.log(hashService.hashText({ payload: "hello-blockchain", salt: "study" }));
