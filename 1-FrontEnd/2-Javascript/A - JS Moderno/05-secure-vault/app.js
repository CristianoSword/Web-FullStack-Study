/**
 * Secure Vault
 * Criptografia moderna com SubtleCrypto
 */

// Utilitários para conversão
const bufferToBase64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const base64ToBuffer = (base64) => Uint8Array.from(atob(base64), c => c.charCodeAt(0));

// Função para derivar uma chave a partir de um password
async function deriveKey(password) {
    const encoder = new TextEncoder();
    const passwordBuf = encoder.encode(password);
    
    // Importa o password como uma chave bruta
    const baseKey = await crypto.subtle.importKey(
        'raw', passwordBuf, 'PBKDF2', false, ['deriveKey']
    );

    // Deriva a chave real usando PBKDF2
    return await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode('some-static-salt'), // Em produção, use um salt aleatório
            iterations: 100000,
            hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

async function encryptMessage() {
    const text = document.getElementById('message').value;
    const password = document.getElementById('encrypt-password').value;
    
    if (!text || !password) return alert('Preencha mensagem e senha!');

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const key = await deriveKey(password);
    
    // IV (Initialization Vector) para AES-GCM
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        data
    );

    // Combina IV e Dados Criptografados em uma string Base64
    const result = bufferToBase64(iv) + '.' + bufferToBase64(encrypted);
    document.getElementById('cipher-output').textContent = result;
}

async function decryptMessage() {
    const cipherText = document.getElementById('cipher-input').value;
    const password = document.getElementById('decrypt-password').value;

    if (!cipherText || !password) return alert('Preencha o código e a senha!');

    try {
        const [ivBase64, dataBase64] = cipherText.split('.');
        const iv = base64ToBuffer(ivBase64);
        const data = base64ToBuffer(dataBase64);
        
        const key = await deriveKey(password);
        
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            data
        );

        const decoder = new TextDecoder();
        document.getElementById('clear-output').textContent = decoder.decode(decrypted);
    } catch (e) {
        alert('Senha incorreta ou código corrompido!');
    }
}

// Event Listeners
document.getElementById('encrypt-btn').addEventListener('click', encryptMessage);
document.getElementById('decrypt-btn').addEventListener('click', decryptMessage);
document.getElementById('copy-btn').addEventListener('click', () => {
    const text = document.getElementById('cipher-output').textContent;
    navigator.clipboard.writeText(text);
    alert('Copiado!');
});
