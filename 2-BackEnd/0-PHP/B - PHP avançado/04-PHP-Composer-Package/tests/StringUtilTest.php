<?php
namespace Study\Util\Tests;

use PHPUnit\Framework\TestCase;
use Study\Util\StringUtil;

class StringUtilTest extends TestCase
{
    public function testSlugify()
    {
        $this->assertEquals('hello-world', StringUtil::slugify('Hello World'));
        $this->assertEquals('test-string', StringUtil::slugify('Test String!!!'));
        $this->assertEquals('php-is-awesome', StringUtil::slugify('PHP is Awesome'));
    }

    public function testTruncate()
    {
        $this->assertEquals('Hello...', StringUtil::truncate('Hello World', 5));
        $this->assertEquals('Hello World', StringUtil::truncate('Hello World', 20));
        $this->assertEquals('Test...', StringUtil::truncate('Test', 2));
    }

    public function testRandom()
    {
        $random1 = StringUtil::random(16);
        $random2 = StringUtil::random(16);
        
        $this->assertNotEmpty($random1);
        $this->assertNotEmpty($random2);
        $this->assertNotEquals($random1, $random2);
        $this->assertEquals(32, strlen($random1));
    }

    public function testMaskEmail()
    {
        $this->assertEquals('jo***@example.com', StringUtil::maskEmail('john@example.com'));
        $this->assertEquals('te***@test.com', StringUtil::maskEmail('test@test.com'));
    }

    public function testContains()
    {
        $this->assertTrue(StringUtil::contains('Hello World', 'World'));
        $this->assertFalse(StringUtil::contains('Hello World', 'world'));
        $this->assertTrue(StringUtil::contains('Hello World', 'world', false));
    }
}
