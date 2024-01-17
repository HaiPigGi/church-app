<?php

namespace Tests\Feature\position;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\PositionModel;

class PositionDestroyTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test destroy method.
     *
     * @return void
     */
    public function testDestroy()
    {
        // Create a position in the database
        $position = PositionModel::create([
            'position_name' => 'Position to be deleted',
        ]);

        // Send a DELETE request to the destroy method
        $response = $this->json('DELETE', route('admin.positions.destroy', ['position' => $position->position_id]));

        // Assert that the response has a 200 status code (OK)
        $response->assertStatus(200);

        // Assert that the position is not in the database after deletion
        $this->assertDatabaseMissing('position', [
            'position_name' => 'Position to be deleted',
        ]);

        // Decode the JSON response
        $responseData = $response->decodeResponseJson();

        // Assert that the response contains the message indicating success
        $this->assertArrayHasKey('message', $responseData);
        $this->assertEquals('Position deleted successfully.', $responseData['message']);
    }
}
