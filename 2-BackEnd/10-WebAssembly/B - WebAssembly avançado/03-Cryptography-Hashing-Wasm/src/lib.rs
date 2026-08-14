mod models;

use aes::Aes128;
use ctr::cipher::{KeyIvInit, StreamCipher};
use models::{CryptoPayload, HashPayload};
use sha2::{Digest, Sha256};
use wasm_bindgen::prelude::*;

type Aes128Ctr = ctr::Ctr128BE<Aes128>;

#[wasm_bindgen]
pub fn encrypt_text(plaintext: &str, key_hex: &str, nonce_hex: &str) -> Result<String, JsValue> {
    ensure_not_empty(plaintext, "plaintext")?;

    let payload = CryptoPayload {
        plaintext: plaintext.to_owned(),
        key_hex: key_hex.to_owned(),
        nonce_hex: nonce_hex.to_owned(),
    };

    let key = decode_16_byte_hex(&payload.key_hex)?;
    let nonce = decode_16_byte_hex(&payload.nonce_hex)?;
    let mut buffer = payload.plaintext.into_bytes();
    let mut cipher = Aes128Ctr::new(&key.into(), &nonce.into());
    cipher.apply_keystream(&mut buffer);

    Ok(hex::encode(buffer))
}

#[wasm_bindgen]
pub fn decrypt_text(ciphertext_hex: &str, key_hex: &str, nonce_hex: &str) -> Result<String, JsValue> {
    ensure_not_empty(ciphertext_hex, "ciphertext")?;

    let key = decode_16_byte_hex(key_hex)?;
    let nonce = decode_16_byte_hex(nonce_hex)?;
    let mut buffer = hex::decode(ciphertext_hex).map_err(|error| JsValue::from_str(&error.to_string()))?;
    let mut cipher = Aes128Ctr::new(&key.into(), &nonce.into());
    cipher.apply_keystream(&mut buffer);

    String::from_utf8(buffer).map_err(|error| JsValue::from_str(&error.to_string()))
}

#[wasm_bindgen]
pub fn sha256_hex(message: &str) -> String {
    let payload = HashPayload {
        message: message.to_owned(),
    };

    let digest = Sha256::digest(payload.message.as_bytes());
    hex::encode(digest)
}

fn decode_16_byte_hex(value: &str) -> Result<[u8; 16], JsValue> {
    let bytes = hex::decode(value).map_err(|error| JsValue::from_str(&error.to_string()))?;

    bytes
        .try_into()
        .map_err(|_| JsValue::from_str("expected 16-byte hex value"))
}

fn ensure_not_empty(value: &str, field_name: &str) -> Result<(), JsValue> {
    if value.trim().is_empty() {
        return Err(JsValue::from_str(&format!("{field_name} cannot be empty")));
    }

    Ok(())
}
