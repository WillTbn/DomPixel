<?php
namespace App\Services;

use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductServices
{
    public function createProduct(ProductCreateRequest $product)
    {
        $newProduct = new Product();
        $newProduct->name = $product->name;
        $newProduct->price = $product->price;
        $newProduct->quantity = $product->quantity;
        $newProduct->description = $product->description;
        $newProduct->saveOrFail();
    }

    public function updateProduct(ProductUpdateRequest $product)
    {
        $newProduct = Product::find($product->id);
        $newProduct->name = $product->name;
        $newProduct->price = $product->price;
        $newProduct->quantity = $product->quantity;
        $newProduct->description = $product->description;
        $newProduct->saveOrFail();
    }
}
