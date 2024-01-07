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
        Schema::create('organitation', function (Blueprint $table) {
            $table->uuid('organitation_id')->primary();
            $table->string('name_organitation');
            $table->string('description');
            $table->date('date_of_establishment');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organitation');
    }
};
