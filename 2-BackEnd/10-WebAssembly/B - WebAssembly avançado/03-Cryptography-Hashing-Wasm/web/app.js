import init, { decrypt_text, encrypt_text, sha256_hex } from "../pkg/cryptography_hashing_wasm.js";
import { sampleCrypto, sampleHash } from "./sample_inputs.js";

const plaintextField = document.querySelector("#plaintext");
const keyField = document.querySelector("#key");
const nonceField = document.querySelector("#nonce");
const ciphertextField = document.querySelector("#ciphertext");
const hashField = document.querySelector("#hash-message");
const hashResult = document.querySelector("#hash-result");
const statusLabel = document.querySelector("#status");

function bootstrapSamples() {
  plaintextField.value = sampleCrypto.plaintext;
  keyField.value = sampleCrypto.keyHex;
  nonceField.value = sampleCrypto.nonceHex;
  hashField.value = sampleHash.message;
}

function updateStatus(message) {
  statusLabel.textContent = message;
}

await init();
bootstrapSamples();

document.querySelector("#encrypt").addEventListener("click", () => {
  const encrypted = encrypt_text(plaintextField.value, keyField.value, nonceField.value);
  ciphertextField.value = encrypted;
  updateStatus("Payload encrypted with AES-128-CTR.");
});

document.querySelector("#decrypt").addEventListener("click", () => {
  const decrypted = decrypt_text(ciphertextField.value, keyField.value, nonceField.value);
  plaintextField.value = decrypted;
  updateStatus("Ciphertext decrypted.");
});

document.querySelector("#hash").addEventListener("click", () => {
  hashResult.value = sha256_hex(hashField.value);
  updateStatus("SHA-256 digest generated.");
});
