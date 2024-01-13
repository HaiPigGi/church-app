<?php

namespace Tests\Feature\berita;

use App\Models\beritaModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BeritaStoreTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test the store method in beritaController
     *
     * @return void 
     */
    public function testBerita()
    {
        // Fake the storage disk
        Storage::fake("public");

        // Valid data
        $fakeImage = UploadedFile::fake()->image("test_image.jpg");
        $data = [
            'image' => $fakeImage,
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'event' => $this->faker->word,
        ];

        // Try with valid data
        $response = $this->json('POST', route('admin.berita.store'), $data);

        // Check for a successful scenario
        $response->assertStatus(200)
            ->assertJson(['status' => 'success', 'message' => 'Data Successfully Added']);

        // Invalid data (empty in this case)
        $invalidData = [];

        // Try with invalid data
        $invalidResponse = $this->json('POST', route('admin.berita.store'), $invalidData);

        // Check for a validation failure scenario
        $invalidResponse->assertStatus(422)
            ->assertJson(['status' => 'error', 'message' => 'Data is not Valid']);

        // Assert the file exists in the fake storage
        $hashedFileName = $fakeImage->hashName();
        // Assert the file exists in the fake storage
        $this->assertFileExists(storage_path('app/public/berita/' . $hashedFileName));

        // Assert the data is in the database
        $this->assertDatabaseHas('berita', [
            'image' => $hashedFileName,
            'title' => $data['title'],
            'content' => $data['content'],
            'event' => $data['event'],
        ]);
    }

    /**
     * Test Validation in beritaController store metode
     *
     *@return void
     */
    public function testBeritaStoreValidation()
    {
        $response = $this->json('POST', route('admin.berita.store'), []);

        $response->assertStatus(422)
            ->assertJson([
                'status' => 'error',
                'message' => 'Data is not Valid' // Update the expected validation error message
            ]);
    }


    /**
     * Test the beritaModel
     * 
     * @return void
     */

    public function testBeritaModel()
    {
        $berita = beritaModel::factory()->create();

        $this->assertDatabaseHas('berita', [
            'id' => $berita->id,
            'image' => $berita->image,
            'title' => $berita->title,
            'content' => $berita->content,
            'event' => $berita->event,
        ]);
    }
}
