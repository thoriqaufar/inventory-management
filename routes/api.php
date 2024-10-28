<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiscontProductController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware('roleCheck')->group(function () {
        Route::apiResource('/users',UserController::class);
    });

//    Route::apiResource('/products',ProductController::class);
});

Route::apiResource('/products',ProductController::class);
Route::get('/products-list', [ProductController::class, 'indexDetail']);
Route::get('/products-list/detail/{id}', [ProductController::class, 'detail']);

Route::post('login',[AuthController::class,'login']);
