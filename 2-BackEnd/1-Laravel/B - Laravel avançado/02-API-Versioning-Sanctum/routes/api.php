<?php

use App\Http\Controllers\VersionedApiController;
use Illuminate\Support\Facades\Route;

Route::get('/{version}/catalog', VersionedApiController::class)
    ->whereIn('version', ['v1', 'v2'])
    ->name('api.catalog');
