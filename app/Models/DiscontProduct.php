<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DiscontProduct extends Model
{
    protected $table = 'discount_product';

    protected $fillable = [
        'id_product',
        'discount',
        'date_started',
        'date_ended'
    ];
}
