<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Support\BlogSeedPlan;
use Illuminate\Database\Seeder;

class BlogShowcaseSeeder extends Seeder
{
    public function run(): void
    {
        $plan = new BlogSeedPlan();
        $counts = $plan->entityCounts();
        $commentWindow = $plan->commentWindow();

        $authors = Author::factory()
            ->count($counts['authors'])
            ->create();

        $categories = Category::factory()
            ->count($counts['categories'])
            ->create();

        Post::factory()
            ->count($counts['posts'])
            ->published()
            ->make()
            ->each(function (Post $post) use ($authors, $categories, $commentWindow): void {
                $post->author()->associate($authors->random());
                $post->category()->associate($categories->random());
                $post->save();

                Comment::factory()
                    ->count(fake()->numberBetween($commentWindow['min'], $commentWindow['max']))
                    ->for($post)
                    ->create();
            });
    }
}
