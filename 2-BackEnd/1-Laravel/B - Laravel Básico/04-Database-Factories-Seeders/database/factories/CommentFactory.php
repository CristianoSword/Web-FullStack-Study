<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        return [
            'author_name' => fake()->name(),
            'author_email' => fake()->safeEmail(),
            'body' => fake()->paragraph(3),
            'is_approved' => fake()->boolean(85),
        ];
    }
}
