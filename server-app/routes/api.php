<?php

use App\Http\Controllers\admin\jadwal_misa\JadwalMisaController;
use App\Http\Controllers\admin\jadwal_misa\JenisMisaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\Berita\beritaController;
use App\Http\Controllers\admin\organitation\organitationController;
use App\Http\Controllers\admin\organitation\PositionController;
use App\Http\Controllers\admin\organitation\MembersController;
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

        Route::middleware(['jwt'])->group(function () {
            Route::delete('/logout', [LoginController::class, 'logout']);
        });
    });



    Route::prefix('admin')->middleware(['jwt'])->group(function () {
        // Berita Routes
        Route::prefix('berita')->group(function () {
            Route::get('/',[beritaController::class,'getAllBerita']);
            Route::get('/{id}',[beritaController::class,'getAllBeritaById']);
            Route::post('/store', [BeritaController::class, 'store'])->name('admin.berita.store');
            Route::put('/{id}', [BeritaController::class, 'update'])->name('admin.berita.update');
            Route::delete('/{id}', [BeritaController::class, 'destroy'])->name('admin.berita.delete');
        });

        // Organitation Routes
        Route::prefix('organitations')->group(function () {
            Route::get('/', [OrganitationController::class, 'getAllOrganitation'])->name('admin.organitations.index');
            Route::get('/{id}', [OrganitationController::class, 'getAllOrganitationById'])->name('admin.organitations.show');
            Route::post('/', [OrganitationController::class, 'store'])->name('admin.organitations.store');
            Route::put('/{organitationId}', [OrganitationController::class, 'update'])->name('admin.organitations.update');
            Route::delete('/{organitationId}', [OrganitationController::class, 'destroy'])->name('admin.organitations.delete');
        });

        // Position Routes
        Route::prefix('positions')->group(function () {
            Route::get('/', [PositionController::class, 'index'])->name('admin.positions.index');
            Route::post('/', [PositionController::class, 'store'])->name('admin.positions.store');
            Route::get('/{position}', [PositionController::class, 'show'])->name('admin.positions.show');
            Route::put('/{position}', [PositionController::class, 'update'])->name('admin.positions.update');
            Route::delete('/{position}', [PositionController::class, 'destroy'])->name('admin.positions.destroy');
        });

        // Members Routes
        Route::prefix('members')->group(function () {
            Route::get('/', [MembersController::class, 'getAllDataMembers'])->name('admin.members.index');
            Route::get('/{member}', [MembersController::class, 'getAllDataMembersById'])->name('admin.members.show');
            Route::post('/', [MembersController::class, 'store'])->name('admin.members.store');
            Route::put('/{member}', [MembersController::class, 'update'])->name('admin.members.update');
            Route::delete('/{member}', [MembersController::class, 'destroy'])->name('admin.members.destroy');
        });

        // Jenis Misa Routes
        Route::prefix('jenis-misa')->group(function () {
            Route::get('/', [JenisMisaController::class, 'index'])->name('admin.jenis-misa.index');
            Route::get('/{id}', [JenisMisaController::class, 'show'])->name('admin.jenis-misa.show');
            Route::post('/', [JenisMisaController::class, 'store'])->name('admin.jenis-misa.store');
            Route::put('/{id}', [JenisMisaController::class, 'update'])->name('admin.jenis-misa.update');
            Route::delete('/{id}', [JenisMisaController::class, 'destroy'])->name('admin.jenis-misa.destroy');
        });

        // Jadwal Misa Routes
        Route::prefix('jadwal-misa')->group(function () {
            Route::get('/', [JadwalMisaController::class, 'index'])->name('admin.jadwal-misa.index');
            Route::get('/{id}', [JadwalMisaController::class, 'show'])->name('admin.jadwal-misa.show');
            Route::post('/', [JadwalMisaController::class, 'store'])->name('admin.jadwal-misa.store');
            Route::put('/{id}', [JadwalMisaController::class, 'update'])->name('admin.jadwal-misa.update');
            Route::delete('/{id}', [JadwalMisaController::class, 'destroy'])->name('admin.jadwal-misa.destroy');
        });
    });
});
