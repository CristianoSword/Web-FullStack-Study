<?php

namespace App\Support;

use App\Contracts\SeedPlanSource;

class BlogSeedPlan implements SeedPlanSource
{
    public function defaults(): array
    {
        return config('seeding', []);
    }

    /**
     * @return array<string, int>
     */
    public function entityCounts(): array
    {
        $counts = $this->defaults()['counts'] ?? [];

        return [
            'authors' => (int) ($counts['authors'] ?? 0),
            'categories' => (int) ($counts['categories'] ?? 0),
            'posts' => (int) ($counts['posts'] ?? 0),
        ];
    }

    /**
     * @return array{min:int,max:int}
     */
    public function commentWindow(): array
    {
        $range = $this->defaults()['counts']['comments_per_post'] ?? [];

        return [
            'min' => (int) ($range['min'] ?? 0),
            'max' => (int) ($range['max'] ?? 0),
        ];
    }
}
