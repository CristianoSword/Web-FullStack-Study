<?php
namespace Study\Util;

class ArrayUtil
{
    public static function flatten(array $array): array
    {
        $result = [];
        foreach ($array as $value) {
            if (is_array($value)) {
                $result = array_merge($result, self::flatten($value));
            } else {
                $result[] = $value;
            }
        }
        return $result;
    }

    public static function pluck(array $array, string $key): array
    {
        return array_map(fn($item) => $item[$key] ?? null, $array);
    }

    public static function where(array $array, callable $callback): array
    {
        return array_filter($array, $callback);
    }

    public static function first(array $array, callable $callback = null)
    {
        if ($callback === null) {
            return reset($array) ?: null;
        }
        foreach ($array as $item) {
            if ($callback($item)) {
                return $item;
            }
        }
        return null;
    }

    public static function groupBy(array $array, string $key): array
    {
        $result = [];
        foreach ($array as $item) {
            $value = $item[$key] ?? null;
            $result[$value][] = $item;
        }
        return $result;
    }

    public static function shuffle(array $array): array
    {
        $shuffled = $array;
        shuffle($shuffled);
        return $shuffled;
    }
}
