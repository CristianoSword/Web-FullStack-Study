<?php

use App\Http\Controllers\SeedPreviewController;
use Illuminate\Support\Facades\Route;

Route::get('/', SeedPreviewController::class)->name('seed.preview');
