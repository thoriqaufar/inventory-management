<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Andi',
            'email' => 'andi@test.com',
            'password' => 'andi1234',
            'role' => 'user'
        ]);

        User::create([
            'name' => 'Budi',
            'email' => 'budi@test.com',
            'password' => 'budi1234',
            'role' => 'user'
        ]);

        User::create([
            'name' => 'Coki',
            'email' => 'coki@test.com',
            'password' => 'coki1234',
            'role' => 'admin'
        ]);
    }
}
