<?php

namespace Database\Seeders;

use App\Models\DiscontProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiscountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DiscontProduct::create([
            'id_product' => '1',
            'discount' => '0.2',
            'date_started' => '2024-10-01',
            'date_ended' => '2024-11-15'
        ]);

        DiscontProduct::create([
            'id_product' => '3',
            'discount' => '0.15',
            'date_started' => '2024-10-01',
            'date_ended' => '2024-11-15'
        ]);

        DiscontProduct::create([
            'id_product' => '4',
            'discount' => '0.2',
            'date_started' => '2024-08-01',
            'date_ended' => '2024-09-15'
        ]);
    }
}
