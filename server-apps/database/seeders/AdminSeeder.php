<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("users")->insert([
            'user_id' => \Illuminate\Support\Str::uuid(),
            'name' => 'stMarkus',
            'password' =>Hash::make('santoMarkus'),
            'status'=>1,
            'created_at' => now(),
            'updated_at' => now()
            ]);
    }
}
