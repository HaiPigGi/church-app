<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PanitiaModel;
use Illuminate\Support\Facades\DB;

class PanitiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("panitias")->insert([
            'panitia_id' => \Illuminate\Support\Str::uuid(),
            'status' => PanitiaModel::TAMPILAN_A, // Set the default status value
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
