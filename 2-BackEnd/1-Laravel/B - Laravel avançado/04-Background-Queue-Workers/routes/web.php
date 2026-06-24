<?php

use App\Http\Controllers\QueueLabController;
use Illuminate\Support\Facades\Route;

Route::get('/', [QueueLabController::class, 'index'])->name('queue.index');
