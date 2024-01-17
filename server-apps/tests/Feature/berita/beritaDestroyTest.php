<?php

namespace Tests\Feature\berita;

use App\Models\beritaModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class beritaDestroyTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_can_delete_a_berita()
    {
        Storage::fake("public");
        $image = UploadedFile::fake()->image("test_image.jpg");

        // Create a beritaModel instance with specified values
        $beritaModel = beritaModel::create([
            'title' => 'Test Title',
            'content' => 'Test Content',
            'event' => 'Test Event',
            'image' => $image->hashName(),
        ]);

        // Call the forceDelete method
        $response = $this->json('DELETE', route('admin.berita.delete', $beritaModel->id));

        $response->assertStatus(200)
            ->assertJson(['status' => 'success', 'message' => 'Successfull Delete']);

        // Assert that the file is deleted from storage
        $this->assertFalse(Storage::disk('public')->exists('berita/' . $beritaModel->image));
    }
}
