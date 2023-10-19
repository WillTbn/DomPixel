<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => [
                'required',
                Rule::exists('products', 'id')->where(function($q) {
                    return $q->where('id', $this->input('id'));
                }),
            ],
            'name' => [
                'required',
                'string',
                Rule::unique('products')->ignore($this->input('id'))
            ],
            'price' => 'decimal:2|required',
            'description' => '',
            'quantity' => 'required|integer'
        ];
    }
}
