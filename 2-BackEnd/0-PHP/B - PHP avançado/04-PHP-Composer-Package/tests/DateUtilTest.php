<?php
namespace Study\Util\Tests;

use PHPUnit\Framework\TestCase;
use Study\Util\DateUtil;

class DateUtilTest extends TestCase
{
    public function testAgo()
    {
        $now = new \DateTime();
        $this->assertEquals('just now', DateUtil::ago($now));
        
        $past = new \DateTime('-5 minutes');
        $this->assertStringContainsString('minute', DateUtil::ago($past));
        
        $past = new \DateTime('-2 hours');
        $this->assertStringContainsString('hour', DateUtil::ago($past));
    }

    public function testIsWeekend()
    {
        $saturday = new \DateTime('2024-01-06'); // Saturday
        $sunday = new \DateTime('2024-01-07'); // Sunday
        $monday = new \DateTime('2024-01-08'); // Monday
        
        $this->assertTrue(DateUtil::isWeekend($saturday));
        $this->assertTrue(DateUtil::isWeekend($sunday));
        $this->assertFalse(DateUtil::isWeekend($monday));
    }

    public function testIsWeekday()
    {
        $saturday = new \DateTime('2024-01-06'); // Saturday
        $monday = new \DateTime('2024-01-08'); // Monday
        
        $this->assertFalse(DateUtil::isWeekday($saturday));
        $this->assertTrue(DateUtil::isWeekday($monday));
    }

    public function testStartOfDay()
    {
        $date = new \DateTime('2024-01-08 15:30:00');
        $start = DateUtil::startOfDay($date);
        
        $this->assertEquals('00:00:00', $start->format('H:i:s'));
        $this->assertEquals('2024-01-08', $start->format('Y-m-d'));
    }

    public function testEndOfDay()
    {
        $date = new \DateTime('2024-01-08 15:30:00');
        $end = DateUtil::endOfDay($date);
        
        $this->assertEquals('23:59:59', $end->format('H:i:s'));
        $this->assertEquals('2024-01-08', $end->format('Y-m-d'));
    }

    public function testDiffInDays()
    {
        $date1 = new \DateTime('2024-01-01');
        $date2 = new \DateTime('2024-01-10');
        
        $this->assertEquals(9, DateUtil::diffInDays($date1, $date2));
    }
}
