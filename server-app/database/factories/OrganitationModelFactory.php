<?php

namespace Database\Factories;

use App\Models\organitationModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrganitationModelFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = organitationModel::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name_organitation' => $this->faker->name,
            'description' => $this->faker->paragraph,
            'date_of_establishment' => $this->faker->date,
            'image' => $this->faker->image(),
        ];
    }
}
