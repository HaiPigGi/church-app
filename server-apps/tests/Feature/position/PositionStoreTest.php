<?php

namespace Tests\Feature\position;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\PositionModel;

class PositionStoreTest extends TestCase
{
    use RefreshDatabase;

     /**
     * Test store method.
     *
     * @return void
     */
    public function testStore()
    {
        // Create fake data for the request
        $data = [
            'position_name' => 'Test Position',
        ];

        // Send a POST request to the store method
        $response = $this->json('POST', route('admin.positions.store'), $data);

        // Assert that the response has a 201 status code (created)
        $response->assertStatus(201);

        // Assert that the position is in the database
        $this->assertDatabaseHas('position', [
            'position_name' => 'Test Position',
        ]);

        // Decode the JSON response
        $responseData = $response->decodeResponseJson();

        // Assert that the response contains the position data
        $this->assertArrayHasKey('position', $responseData);
        $this->assertArrayHasKey('message', $responseData);

        // Assert that the position data matches the created position
        $this->assertEquals('Test Position', $responseData['position']['position_name']);

        // Assert that the message indicates success
        $this->assertEquals('Position created successfully.', $responseData['message']);
    }
}
