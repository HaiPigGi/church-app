<?php

namespace Tests\Feature\organitation;

use App\Models\organitationModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class OrganitationStoreTest extends TestCase
{
    use RefreshDatabase, WithFaker;


    public function test_store_method_creates_organitation()
    {
        Storage::fake('public'); 

        $image = UploadedFile::fake()->image('test_image.jpg');

        $data = [
            'name_organitation' => $this->faker->company,
            'description' => $this->faker->paragraph,
            'date_of_establishment' =>  now()->toDateString(),
            'image' => $image,
        ];

        $response = $this->postJson(route('admin.organitations.store'), $data);

        $response->assertStatus(201)
            ->assertJsonStructure(['organitation']);

        $organitationData = $response->json('organitation');

        $hashedFileName = $image->hashName();

        $expectedImagePath = 'public/organitation/' . $hashedFileName;

        $this->assertDatabaseHas('organitation', [
            'organitation_id' => $organitationData['organitation_id'],
            'name_organitation' => $data['name_organitation'],
            'description' => $data['description'],
            'date_of_establishment' => $data['date_of_establishment'],
            'image' => $expectedImagePath,
        ]);
    }

}
