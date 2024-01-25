<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSaransTable extends Migration
{
    public function up()
    {
        Schema::create('sarans', function (Blueprint $table) {
            $table->uuid('saran_id')->primary();
            $table->string('full_name');
            $table->string('email');
            $table->text('message');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sarans');
    }
}
