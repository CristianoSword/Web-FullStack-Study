<?php

namespace Database\Factories;

use App\Models\Author;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Author>
 */
class AuthorFactory extends Factory
{
    protected $model = Author::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'role' => fake()->randomElement([
                'editor',
                'copywriter',
                'seo-strategist',
                'product-marketer',
            ]),
            'bio' => fake()->paragraph(2),
            'is_active' => fake()->boolean(90),
        ];
    }
}
