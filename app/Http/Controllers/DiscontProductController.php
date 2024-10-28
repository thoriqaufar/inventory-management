<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\DiscountProductResource;
use App\Http\Resources\ProductResource;
use App\Models\DiscontProduct;
use Illuminate\Http\Request;
use MongoDB\BSON\Int64;

class DiscontProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DiscountProductResource::collection(
            DiscontProduct::query()->orderBy('id','desc')->get()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
//        $discount = DiscontProduct::findOrFail($id);
        $discount = DiscontProduct::with('products')->findOrFail($id);

        return new DiscountProductResource($discount);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DiscontProduct $discontProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DiscontProduct $discontProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DiscontProduct $discontProduct)
    {
        //
    }
}
