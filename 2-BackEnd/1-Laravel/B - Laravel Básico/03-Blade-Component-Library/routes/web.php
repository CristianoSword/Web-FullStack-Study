<?php

use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SiteController::class, 'home'])->name('site.home');
Route::get('/servicos', [SiteController::class, 'services'])->name('site.services');
Route::get('/contato', [SiteController::class, 'contact'])->name('site.contact');
Route::post('/contato', [SiteController::class, 'submitContact'])->name('site.contact.submit');
