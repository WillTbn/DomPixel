<?php

use App\Http\Controllers\ProductContoller;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/products', [ProductContoller::class, 'index'])->name('product');
Route::post('/product/register', [ProductContoller::class, 'created'])->name('product.create');
Route::put('/product/register/{id}', [ProductContoller::class, 'updated'])->name('product.update');
Route::delete('/product/{product}', [ProductContoller::class, 'deleted'])->name('product.delete');
