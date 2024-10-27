<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Product A',
            'stock' => '50',
            'price' => '10000'
        ]);

        Product::create([
            'name' => 'Product B',
            'stock' => '100',
            'price' => '15000'
        ]);

        Product::create([
            'name' => 'Product C',
            'stock' => '180',
            'price' => '7000'
        ]);
    }
}
