<?php

namespace Tests\Feature\organitation;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\organitationModel;
use App\Http\Controllers\Admin\OrganitationController; // Adjust namespace accordingly

class OrganitationDestroyTest extends TestCase
{
    use RefreshDatabase;
    public function testDeleteOrganization()
    {
        // Assuming you have an existing organization in the database
        $organization = organitationModel::factory()->create();

        $response = $this->json('DELETE', route('admin.organitations.delete', ['organitationId' => $organization->organitation_id]));

        $response->assertStatus(200)
            ->assertJson(['message' => 'Organitation deleted successfully']);

        // Assert that the organization has been deleted from the database
        $this->assertDatabaseMissing('organitation', ['organitation_id' => $organization->organitation_id]);
    }



    public function testDeleteNonExistingOrganization()
{
    // Try to delete an organization that doesn't exist
    $response = $this->json('DELETE', route('admin.organitations.delete', ['organitationId' => 'nonexistent_id']));

    $response->assertStatus(404)
        ->assertJson(['message' => 'Organization not found']);
}

}
