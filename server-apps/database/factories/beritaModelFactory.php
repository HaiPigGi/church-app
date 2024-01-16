<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\beritaModel;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\beritaModel>
 */
class beritaModelFactory extends Factory
{
    protected $model = beritaModel::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image' => $this->faker->image(),
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'event' => $this->faker->word,
        ];
    }
}
