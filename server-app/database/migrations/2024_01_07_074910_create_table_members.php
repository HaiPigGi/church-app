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
        Schema::create('members', function (Blueprint $table) {
            $table->uuid('member_id')->primary();
            $table->uuid('organitation_id');
            $table->uuid('position_id');
            $table->string('members_name');
            $table->date('born_date');
            $table->string('address');
            $table->string('image')->nullable();
            $table->timestamps();

            $table->foreign('organitation_id')
                ->references('organitation_id')
                ->on('organitation')
                ->onDelete('cascade');

            $table->foreign('position_id')
                ->references('position_id')
                ->on('position')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
