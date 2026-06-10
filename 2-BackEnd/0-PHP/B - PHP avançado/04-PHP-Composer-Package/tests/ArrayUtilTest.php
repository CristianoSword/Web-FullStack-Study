<?php
namespace Study\Util\Tests;

use PHPUnit\Framework\TestCase;
use Study\Util\ArrayUtil;

class ArrayUtilTest extends TestCase
{
    public function testFlatten()
    {
        $array = [1, [2, [3, 4], 5], 6];
        $this->assertEquals([1, 2, 3, 4, 5, 6], ArrayUtil::flatten($array));
    }

    public function testPluck()
    {
        $array = [
            ['name' => 'John', 'age' => 30],
            ['name' => 'Jane', 'age' => 25],
        ];
        $this->assertEquals(['John', 'Jane'], ArrayUtil::pluck($array, 'name'));
        $this->assertEquals([30, 25], ArrayUtil::pluck($array, 'age'));
    }

    public function testWhere()
    {
        $array = [1, 2, 3, 4, 5];
        $result = ArrayUtil::where($array, fn($n) => $n % 2 === 0);
        $this->assertEquals([2, 4], array_values($result));
    }

    public function testFirst()
    {
        $array = [1, 2, 3, 4, 5];
        $this->assertEquals(1, ArrayUtil::first($array));
        
        $result = ArrayUtil::first($array, fn($n) => $n > 3);
        $this->assertEquals(4, $result);
    }

    public function testGroupBy()
    {
        $array = [
            ['name' => 'John', 'type' => 'admin'],
            ['name' => 'Jane', 'type' => 'user'],
            ['name' => 'Bob', 'type' => 'admin'],
        ];
        $result = ArrayUtil::groupBy($array, 'type');
        
        $this->assertArrayHasKey('admin', $result);
        $this->assertArrayHasKey('user', $result);
        $this->assertCount(2, $result['admin']);
        $this->assertCount(1, $result['user']);
    }

    public function testShuffle()
    {
        $array = [1, 2, 3, 4, 5];
        $shuffled = ArrayUtil::shuffle($array);
        
        $this->assertCount(5, $shuffled);
        $this->assertEquals([1, 2, 3, 4, 5], array_values(array_intersect($array, $shuffled)));
    }
}
