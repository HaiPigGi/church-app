<?php

namespace Tests\Feature\organitation;

use App\Models\organitationModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class OrganitationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    // public function test_can_get_all_organitations()
    // {
    //     // Arrange
    //     organitationModel::factory()->count(5)->create();

    //     // Act
    //     $response = $this->getJson('/api/admin/organitations');

    //     // Assert
    //     $response->assertStatus(200)
    //         ->assertJsonStructure(['organitation'])
    //         ->assertJsonCount(5, 'organitation');
    // }

    // public function test_can_get_organitation_by_id()
    // {
    //     // Arrange
    //     $organitation = organitationModel::factory()->create();

    //     // Act
    //     $response = $this->getJson("/api/admin/organitations/{$organitation->id}");

    //     // Assert
    //     $response->assertStatus(200)
    //         ->assertJson(['organitation' => $organitation->toArray()]);
    // }

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

    // public function test_can_store_organitation()
    // {
    //     // Mock file upload
    //     Storage::fake('public/organitation');
    //     $fakeImage = UploadedFile::fake()->image('organitation_image.jpg');

    //     // Test data
    //     $data = [
    //         'name_organitation' => 'Testing Organitation',
    //         'description' => 'Testing description',
    //         'date_of_establishment' => now()->toDateString(),
    //         'image' => $fakeImage,
    //     ];        

    //     // Perform the test
    //     $response = $this->postJson('/api/admin/organitations', $data);

    //     // Assert response status and structure
    //     $response->assertStatus(201)
    //         ->assertJsonStructure(['organitation']);

    //     // Assert the file exists in the fake storage
    //     $hashedFileName = $fakeImage->hashName();
    //     $this->assertTrue(Storage::disk('public')->exists('organitation/' . $hashedFileName));

    //     // Assert the data is in the database
    //     $this->assertDatabaseHas('organitation', [
    //         'name_organitation' => $data['name_organitation'],
    //         'description' => $data['description'],
    //         'date_of_establishment' => $data['date_of_establishment'],
    //         'image' => $hashedFileName, 
    //     ]);

    // }

    // public function test_can_update_organitation()
    // {
    //     // Arrange
    //     $organitation = organitationModel::factory()->create();

    //     $data = [
    //         'name_organitation' => $this->faker->name,
    //         'description' => $this->faker->paragraph,
    //         'date_of_establishment' => now()->format('Y-m-d'),
    //         'image' => UploadedFile::fake()->image('updated_image.jpg'),
    //     ];

    //     // Act
    //     $response = $this->putJson("/api/admin/organitations/{$organitation->id}", $data);

    //     // Assert
    //     $response->assertStatus(200)
    //         ->assertJsonStructure(['organitation']);

    //     $this->assertDatabaseHas('organitations', [
    //         'id' => $organitation->id,
    //         'name_organitation' => $data['name_organitation'],
    //         'description' => $data['description'],
    //         'date_of_establishment' => $data['date_of_establishment'],
    //     ]);

    //     Storage::disk('public')->assertExists('organitation/' . $data['image']->hashName());
    // }

    // public function test_can_delete_organitation()
    // {
    //     // Arrange
    //     $organitation = organitationModel::factory()->create();

    //     // Act
    //     $response = $this->deleteJson("/api/admin/organitations/{$organitation->id}");

    //     // Assert
    //     $response->assertStatus(200)
    //         ->assertJson(['message' => 'Organitation deleted successfully']);

    //     $this->assertDatabaseMissing('organitations', ['id' => $organitation->id]);
    // }
}
