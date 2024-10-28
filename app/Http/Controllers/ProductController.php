<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductResourceJoin;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(
            Product::query()->orderBy('id','desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $product = Product::create($data);
        return response(new ProductResource($product),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function indexDetail()
    {
        $products = DB::table('products as p')
            ->leftJoin('discount_product as dp', 'p.id', '=', 'dp.id_product')
            ->select('p.*', 'dp.discount', 'dp.date_started', 'dp.date_ended')
            ->get();

        return ProductResource::collection($products);
    }

    public function detail(string $id)
    {
        $product = DB::table('products as p')
            ->leftJoin('discount_product as dp', 'p.id', '=', 'dp.id_product')
            ->select('p.*', 'dp.discount', 'dp.date_started', 'dp.date_ended')
            ->where('p.id', $id)
            ->first();

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $product->update($data);
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response('',204);
    }
}
