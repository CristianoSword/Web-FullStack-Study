pub struct CryptoPayload {
    pub plaintext: String,
    pub key_hex: String,
    pub nonce_hex: String,
}

pub struct HashPayload {
    pub message: String,
}
