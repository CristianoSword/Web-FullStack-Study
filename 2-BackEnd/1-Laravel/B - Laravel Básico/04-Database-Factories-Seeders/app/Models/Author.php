<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'role',
        'bio',
        'is_active',
    ];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}
