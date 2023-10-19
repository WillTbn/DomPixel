<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use App\Services\ProductServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductContoller extends Controller
{
    private ProductServices $productService;
    public function __construct(
        ProductServices $productService
    )
    {
        $this->productService = $productService;
    }

    public function index():JsonResponse
    {
        $list = Product::all();

        return response()->json(['success' => 'Lista obtida com sucesso!', 'products' =>  $list], 200);
    }

    public function created(ProductCreateRequest $request)
    {
        $request->validated();

        $newProduct  = $this->productService->createProduct($request);
        return response()->json(['success' => 'Produto adicionado com sucesso!', 'product' =>  $newProduct], 200);

    }

    public function updated(ProductUpdateRequest $request)
    {
        $request->validated();
        $up  = $this->productService->updateProduct($request);
        return response()->json(['success' => 'Produto atualizado com sucesso!', 'product' =>  $up], 200);

    }

    public function deleted(Product $product):JsonResponse
    {

        $pro = Product::find($product->id);
        $pro->delete();

        return response()->json(['success' => 'Produto deletedo com sucesso!!'], 200);
    }
}
