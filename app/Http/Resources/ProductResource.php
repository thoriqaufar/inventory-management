<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $today = Carbon::today();

        $dateStarted = Carbon::parse($this->date_started);
        $dateEnded = Carbon::parse($this->date_ended);

        $isDiscountActive = $today->between($dateStarted, $dateEnded);

        $discountedPrice = $isDiscountActive ? $this->price * (1 - $this->discount) : $this->price;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'stock' => $this->stock,
            'price' => $this->price,

            'discount' => $this->discount,
            'date_started' => $this->date_started,
            'date_ended' => $this->date_ended,

            'is_discount_active' => $isDiscountActive,
            'discounted_price' => $discountedPrice,
        ];
    }
}
