<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\beritaController;
use App\Http\Controllers\admin\organitationController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('admin')->group(function () {
    Route::post('/berita/store', [BeritaController::class, 'store'])->name('admin.berita.store');
    Route::put('/berita/{id}', [BeritaController::class, 'update'])->name('admin.berita.update');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('admin.berita.delete');

    // Show all organitations
    Route::get('/organitations', [organitationController::class, 'getAllOrganitation'])->name('admin.organitations.index');
    // Show organitation by ID
    Route::get('/organitations/{id}', [organitationController::class, 'getAllOrganitationById'])->name('admin.organitations.show');
    // Store organitation to the database
    Route::post('/organitations', [organitationController::class, 'store'])->name('admin.organitations.store');
    // Update organitation in the database
    Route::put('/organitations/{organitationId}', [organitationController::class, 'update'])->name('admin.organitations.update');
    // Delete organitation using ID
    Route::delete('/organitations/{organitationId}', [organitationController::class, 'destroy'])->name('admin.organitations.delete');
});
