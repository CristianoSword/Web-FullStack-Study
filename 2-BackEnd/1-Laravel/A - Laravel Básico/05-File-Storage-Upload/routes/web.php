<?php

use App\Http\Controllers\FileUploadController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FileUploadController::class, 'index'])->name('files.index');
Route::post('/upload', [FileUploadController::class, 'store'])->name('files.store');
Route::get('/download/{id}', [FileUploadController::class, 'download'])->name('files.download');
