<?php
namespace Study\Util;

class DateUtil
{
    public static function ago(\DateTimeInterface $date): string
    {
        $now = new \DateTime();
        $diff = $now->diff($date);
        
        if ($diff->y > 0) {
            return $diff->y . ' year' . ($diff->y > 1 ? 's' : '') . ' ago';
        }
        if ($diff->m > 0) {
            return $diff->m . ' month' . ($diff->m > 1 ? 's' : '') . ' ago';
        }
        if ($diff->d > 0) {
            return $diff->d . ' day' . ($diff->d > 1 ? 's' : '') . ' ago';
        }
        if ($diff->h > 0) {
            return $diff->h . ' hour' . ($diff->h > 1 ? 's' : '') . ' ago';
        }
        if ($diff->i > 0) {
            return $diff->i . ' minute' . ($diff->i > 1 ? 's' : '') . ' ago';
        }
        return 'just now';
    }

    public static function isWeekend(\DateTimeInterface $date): bool
    {
        return in_array($date->format('N'), [6, 7]);
    }

    public static function isWeekday(\DateTimeInterface $date): bool
    {
        return !self::isWeekend($date);
    }

    public static function startOfDay(\DateTimeInterface $date): \DateTime
    {
        $newDate = clone $date;
        $newDate->setTime(0, 0, 0);
        return $newDate;
    }

    public static function endOfDay(\DateTimeInterface $date): \DateTime
    {
        $newDate = clone $date;
        $newDate->setTime(23, 59, 59);
        return $newDate;
    }

    public static function diffInDays(\DateTimeInterface $date1, \DateTimeInterface $date2): int
    {
        return (int)abs($date1->diff($date2)->days);
    }
}
