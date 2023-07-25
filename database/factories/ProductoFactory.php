<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use \App\Models\Categoria;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombreProducto' => fake()->text($maxNbChars = 10),
            'cantidad' => fake()->numberBetween($min = 1, $max = 400),
            'categoria_id' => Categoria::factory(),
            'estado' => 'A'
        ];
    }
}
