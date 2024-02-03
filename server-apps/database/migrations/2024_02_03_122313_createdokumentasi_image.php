<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dokumentasi_images', function (Blueprint $table) {
            $table->uuid('dokumentasi_images_id')->primary();
            $table->uuid('dokumentasi_id'); // Use UUID here
            $table->foreign('dokumentasi_id')->references('dokumentasi_id')->on('dokumentasi')->onDelete('cascade');
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumentasi_images');
    }
};
