<?php
namespace App;

class JWTService
{
    private string $secret;
    private string $algorithm;
    private int $ttl;

    public function __construct(string $secret, string $algorithm = 'HS256', int $ttl = 3600)
    {
        $this->secret = $secret;
        $this->algorithm = $algorithm;
        $this->ttl = $ttl;
    }

    public function encode(array $payload): string
    {
        $header = ['typ' => 'JWT', 'alg' => $this->algorithm];
        
        $payload['iat'] = time();
        $payload['exp'] = time() + $this->ttl;
        
        $base64UrlHeader = $this->base64UrlEncode(json_encode($header));
        $base64UrlPayload = $this->base64UrlEncode(json_encode($payload));
        
        $signature = $this->signature($base64UrlHeader, $base64UrlPayload);
        $base64UrlSignature = $this->base64UrlEncode($signature);
        
        return $base64UrlHeader . '.' . $base64UrlPayload . '.' . $base64UrlSignature;
    }

    public function decode(string $token): ?array
    {
        $tokenParts = explode('.', $token);
        
        if (count($tokenParts) !== 3) {
            return null;
        }
        
        [$header, $payload, $signature] = $tokenParts;
        
        if (!$this->verify($header, $payload, $signature)) {
            return null;
        }
        
        $decodedPayload = json_decode($this->base64UrlDecode($payload), true);
        
        if (isset($decodedPayload['exp']) && $decodedPayload['exp'] < time()) {
            return null;
        }
        
        return $decodedPayload;
    }

    public function validate(string $token): bool
    {
        return $this->decode($token) !== null;
    }

    private function signature(string $header, string $payload): string
    {
        $data = $header . '.' . $payload;
        
        return match ($this->algorithm) {
            'HS256' => hash_hmac('sha256', $data, $this->secret, true),
            'HS384' => hash_hmac('sha384', $data, $this->secret, true),
            'HS512' => hash_hmac('sha512', $data, $this->secret, true),
            default => throw new \InvalidArgumentException("Unsupported algorithm: {$this->algorithm}"),
        };
    }

    private function verify(string $header, string $payload, string $signature): bool
    {
        $expectedSignature = $this->signature($header, $payload);
        return hash_equals($this->base64UrlEncode($expectedSignature), $signature);
    }

    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
