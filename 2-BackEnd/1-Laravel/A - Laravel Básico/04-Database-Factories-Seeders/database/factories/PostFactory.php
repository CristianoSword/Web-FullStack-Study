<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        $title = Str::title(fake()->words(fake()->numberBetween(4, 7), true));

        return [
            'title' => $title,
            'slug' => Str::slug($title . '-' . fake()->unique()->numberBetween(10, 999)),
            'excerpt' => fake()->sentence(18),
            'content' => implode("\n\n", fake()->paragraphs(5)),
            'status' => fake()->randomElement(['draft', 'scheduled', 'published']),
            'published_at' => fake()->optional()->dateTimeBetween('-3 months', '+2 weeks'),
            'reading_time' => fake()->numberBetween(3, 12),
            'featured' => fake()->boolean(20),
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => 'published',
            'published_at' => now()->subDays(fake()->numberBetween(1, 45)),
        ]);
    }
}
