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

    /**
     * @param array<string, mixed> $overrides
     * @return array{counts: array<string, int>, comments: array{min:int,max:int}}
     */
    public function resolve(array $overrides = []): array
    {
        $counts = $this->entityCounts();
        $commentWindow = $this->commentWindow();

        $resolvedCounts = [
            'authors' => $this->clamp((int) ($overrides['authors'] ?? $counts['authors']), 1, 50),
            'categories' => $this->clamp((int) ($overrides['categories'] ?? $counts['categories']), 1, 20),
            'posts' => $this->clamp((int) ($overrides['posts'] ?? $counts['posts']), 1, 200),
        ];

        $resolvedComments = [
            'min' => $this->clamp((int) ($overrides['comments_min'] ?? $commentWindow['min']), 0, 20),
            'max' => $this->clamp((int) ($overrides['comments_max'] ?? $commentWindow['max']), 1, 40),
        ];

        if ($resolvedComments['max'] < $resolvedComments['min']) {
            $resolvedComments['max'] = $resolvedComments['min'];
        }

        return [
            'counts' => $resolvedCounts,
            'comments' => $resolvedComments,
        ];
    }

    private function clamp(int $value, int $min, int $max): int
    {
        return max($min, min($max, $value));
    }
}
