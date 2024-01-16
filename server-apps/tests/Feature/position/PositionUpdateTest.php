<?php

namespace Tests\Feature\position;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\PositionModel;

class PositionUpdateTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test update method.
     *
     * @return void
     */
    public function testUpdate()
    {
        // Create a position in the database
        $position = PositionModel::create([
            'position_name' => 'Initial Position',
        ]);

        // New data for the update request
        $updateData = [
            'position_name' => 'Updated Position',
        ];

        // Send a PUT request to the update method
        $response = $this->json('PUT', route('admin.positions.update', ['position' => $position->position_id]), $updateData);

        // Assert that the response has a 200 status code (OK)
        $response->assertStatus(200);

        // Refresh the position model from the database
        $position->refresh();

        // Assert that the position data matches the updated data
        $this->assertEquals('Updated Position', $position->position_name);

        // Decode the JSON response
        $responseData = $response->decodeResponseJson();

        // Assert that the response contains the updated position data
        $this->assertArrayHasKey('position', $responseData);
        $this->assertArrayHasKey('message', $responseData);

        // Assert that the position data matches the updated position
        $this->assertEquals('Updated Position', $responseData['position']['position_name']);

        // Assert that the message indicates success
        $this->assertEquals('Position updated successfully.', $responseData['message']);
    }
}
