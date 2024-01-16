<?php

namespace Tests\Feature\organitation;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\organitationModel;
use Illuminate\Support\Str;
use Illuminate\Foundation\Testing\WithFaker;
class OrganitationUpdateTest extends TestCase
{
    use RefreshDatabase,WithFaker;
  
    public function testUpdateOrganization()
    {
        // Assuming you have an existing organization in the database
        $organization = organitationModel::factory()->create();

        $updatedData = [
            'organitation_id' => $organization->organitation_id, // Add the organization_id
            'name_organitation' => 'Updated Organization Name',
            'description' => 'Updated Organization Description',
            'date_of_establishment' => '2024-01-13',
        ];

        // Simulate updating with a new image
        $file = UploadedFile::fake()->image('new_image.jpg');

        $response = $this->json('PUT', "/api/admin/organitations/{$organization->organitation_id}", $updatedData + ['image' => $file]);

        $response->assertStatus(200)
            ->assertJson([
                'organitation' => [
                    'organitation_id' => $organization->organitation_id,
                    'name_organitation' => 'Updated Organization Name',
                    'description' => 'Updated Organization Description',
                    'date_of_establishment' => '2024-01-13',
                ],
            ]);

        // Assert that the image has been updated in the storage
        Storage::assertExists('public/organitation/' . $file->hashName());
    }

}
