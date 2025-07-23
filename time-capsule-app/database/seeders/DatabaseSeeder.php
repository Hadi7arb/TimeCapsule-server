<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Capsule;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        Capsule::factory()->count(50)->create();
        Capsule::factory()->count(5)->revealed()->create();
        Capsule::factory()->count(10)->private()->create();
        
    }
}
