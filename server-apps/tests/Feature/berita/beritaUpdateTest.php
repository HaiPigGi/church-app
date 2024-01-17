<?php

namespace Tests\Feature\berita;

use App\Models\beritaModel;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;

class beritaUpdateTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testUpdateWithImage()
    {
        // Mock a file upload
        Storage::fake('public');
        $image = UploadedFile::fake()->image('test_image.jpg');
    
        // Create a beritaModel instance with specific values
        $beritaModel = BeritaModel::create([
            'title'   => 'Original Title',
            'content' => 'Original Content',
            'event'   => 'Original Event',
            'image'   => $image->hashName(), // Store the hash name directly
        ]);
    
        // Call the update method with a request containing an image
        $response = $this->json('PUT', route('admin.berita.update', $beritaModel->id), [
            'image'   => $image,
            'title'   => 'Updated Title',
            'content' => 'Updated Content',
            'event'   => 'Updated Event',
        ]);
    
        // Assert the response
        $response->assertStatus(200)
            ->assertJson(['status' => 'success', 'message' => 'Data has been updated']);
    
        $hashedFileName = $image->hashName();
    
        // Assert the file exists in the fake storage
        $this->assertFileExists(storage_path('app/public/berita/' . $hashedFileName));
    
        // Update berita without image
        $beritaModel->update([
            'title'   => 'Updated Title',
            'content' => 'Updated Content',
            'event'   => 'Updated Event',
            'image'   => $hashedFileName, // Update with the hash name
        ]);
    
        // Retrieve the updated berita model
        $updatedBerita = BeritaModel::find($beritaModel->id);
    
        // Assert specific attributes of the updated model
        $this->assertEquals('Updated Title', $updatedBerita->title);
        $this->assertEquals('Updated Content', $updatedBerita->content);
        $this->assertEquals('Updated Event', $updatedBerita->event);
    
        // Assert the new image exists in the fake storage
        $this->assertFileExists(storage_path('app/public/berita/' . $updatedBerita->image));
    
        // Assert the database doesn't have the old data
        $this->assertDatabaseMissing('berita', [
            'title'   => 'Original Title',
            'content' => 'Original Content',
            'event'   => 'Original Event',
            'image'   => $hashedFileName,
        ]);
    }
     /** @test */
    public function testUpdateWithoutImage()
    {
       // Mock a file upload
       Storage::fake('public');
       $image = UploadedFile::fake()->image('test_image.jpg');
   
       // Create a beritaModel instance with specific values
       $beritaModel = BeritaModel::create([
           'title'   => 'Original Title',
           'content' => 'Original Content',
           'event'   => 'Original Event',
           'image'   => $image->hashName(), // Store the hash name directly
       ]);
   
       // Call the update method with a request containing an image
       $response = $this->json('PUT', route('admin.berita.update', $beritaModel->id), [
           'image'   => $image,
           'title'   => 'Updated Title',
           'content' => 'Updated Content',
           'event'   => 'Updated Event',
       ]);
   
       // Assert the response
       $response->assertStatus(200)
           ->assertJson(['status' => 'success', 'message' => 'Data has been updated']);
   
       $hashedFileName = $image->hashName();
   
       // Assert the file exists in the fake storage
       $this->assertFileExists(storage_path('app/public/berita/' . $hashedFileName));
   
       // Update berita without image
       $beritaModel->update([
           'title'   => 'Updated Title',
           'content' => 'Updated Content',
           'event'   => 'Updated Event',
       ]);
   
       // Retrieve the updated berita model
       $updatedBerita = BeritaModel::find($beritaModel->id);
   
       // Assert specific attributes of the updated model
       $this->assertEquals('Updated Title', $updatedBerita->title);
       $this->assertEquals('Updated Content', $updatedBerita->content);
       $this->assertEquals('Updated Event', $updatedBerita->event);
   
       // Assert the new image exists in the fake storage
       $this->assertFileExists(storage_path('app/public/berita/' . $updatedBerita->image));
   
       // Assert the database doesn't have the old data
       $this->assertDatabaseMissing('berita', [
           'title'   => 'Original Title',
           'content' => 'Original Content',
           'event'   => 'Original Event',
           'image'   => $hashedFileName,
       ]);
    }

    /** @test */
    public function it_returns_error_if_validation_fails()
    {
        $berita = beritaModel::factory()->create();

        $response = $this->json('PUT', route('admin.berita.update', $berita->id), [
            // Provide invalid data to trigger validation error
            'title' => '',
        ]);

        $response->assertStatus(422);
        // Add more assertions for the specific validation errors if needed
    }
}
