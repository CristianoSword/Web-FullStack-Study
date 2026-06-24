<?php

use App\Http\Controllers\QueueLabController;
use Illuminate\Support\Facades\Route;

Route::get('/', [QueueLabController::class, 'index'])->name('queue.index');
Route::post('/dispatch', [QueueLabController::class, 'store'])->name('queue.store');
