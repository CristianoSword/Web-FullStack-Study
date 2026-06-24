<?php

use App\Http\Controllers\TenancyController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TenancyController::class, 'index'])->name('tenancy.index');
