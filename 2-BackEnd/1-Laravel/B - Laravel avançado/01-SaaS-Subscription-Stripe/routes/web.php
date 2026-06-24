<?php

use App\Http\Controllers\BillingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [BillingController::class, 'pricing'])->name('billing.pricing');
Route::get('/dashboard', [BillingController::class, 'dashboard'])->name('billing.dashboard');
Route::post('/checkout', [BillingController::class, 'checkout'])->name('billing.checkout');
