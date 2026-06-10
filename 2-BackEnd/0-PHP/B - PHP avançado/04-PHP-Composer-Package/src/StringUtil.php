<?php
namespace Study\Util;

class StringUtil
{
    public static function slugify(string $string): string
    {
        $string = strtolower($string);
        $string = preg_replace('/[^a-z0-9]+/', '-', $string);
        $string = trim($string, '-');
        return $string;
    }

    public static function truncate(string $string, int $length = 100, string $suffix = '...'): string
    {
        if (mb_strlen($string) <= $length) {
            return $string;
        }
        return mb_substr($string, 0, $length) . $suffix;
    }

    public static function random(int $length = 16): string
    {
        return bin2hex(random_bytes($length / 2));
    }

    public static function maskEmail(string $email): string
    {
        $parts = explode('@', $email);
        if (count($parts) !== 2) {
            return $email;
        }
        $name = $parts[0];
        $domain = $parts[1];
        $masked = substr($name, 0, 2) . str_repeat('*', max(0, strlen($name) - 2));
        return $masked . '@' . $domain;
    }

    public static function contains(string $haystack, string $needle, bool $caseSensitive = true): bool
    {
        if ($caseSensitive) {
            return strpos($haystack, $needle) !== false;
        }
        return stripos($haystack, $needle) !== false;
    }
}
