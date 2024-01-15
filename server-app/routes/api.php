<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\beritaController;
use App\Http\Controllers\admin\organitationController;
use App\Http\Controllers\admin\PositionController;
use App\Http\Controllers\admin\MembersController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegistrationController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['cors'])->group(function () {

    Route::prefix('auth')->group(function () {
        Route::post('/register', [RegistrationController::class, 'register'])->name('user.register');
        Route::post('/login', [LoginController::class, 'login'])->name('user.login');
    
        Route::middleware(['jwt'])->group(function() {
            Route::delete('/logout', [LoginController::class, 'logout']);
        });
    });
    
    
    
    Route::prefix('admin')->middleware(['jwt'])->group(function () {
        // its for Berita
        Route::post('/berita/store', [BeritaController::class, 'store'])->name('admin.berita.store');
        Route::put('/berita/{id}', [BeritaController::class, 'update'])->name('admin.berita.update');
        Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('admin.berita.delete');
    
        // its for Organitation
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
    
        // its for Position
        // Index
        Route::get('/positions', [PositionController::class, 'index'])->name('admin.positions.index');
        // Store
        Route::post('/positions', [PositionController::class, 'store'])->name('admin.positions.store');
        // Show
        Route::get('/positions/{position}', [PositionController::class, 'show'])->name('admin.positions.show');
        // Update
        Route::put('/positions/{position}', [PositionController::class, 'update'])->name('admin.positions.update');
        // Delete
        Route::delete('/positions/{position}', [PositionController::class, 'destroy'])->name('admin.positions.destroy');
    
        //its for Members
        // Display all members
        Route::get('/members', [MembersController::class, 'getAllDataMembers'])->name('admin.members.index');
        // Display a specific member by ID
        Route::get('/members/{member}', [MembersController::class, 'getAllDataMembersById'])->name('admin.members.show');
        // Store a new member
        Route::post('/members', [MembersController::class, 'store'])->name('admin.members.store');
        // Update a member by ID
        Route::put('/members/{member}', [MembersController::class, 'update'])->name('admin.members.update');
        // Delete a member by ID
        Route::delete('/members/{member}', [MembersController::class, 'destroy'])->name('admin.members.destroy');
    });

});


