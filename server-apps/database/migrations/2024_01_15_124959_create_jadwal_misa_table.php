<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jadwal_misa', function (Blueprint $table) {
            $table->uuid('jadwal_misa_id')->primary()->default(Str::uuid());
            $table->string('hari');
            $table->time('waktu_mulai');
            $table->time('waktu_selesai');
            $table->uuid('jenis_misa_id');
            $table->timestamps();

            $table->foreign('jenis_misa_id')
            ->references('jenis_misa_id')
            ->on('jenis_misa')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_misa');
    }
};
