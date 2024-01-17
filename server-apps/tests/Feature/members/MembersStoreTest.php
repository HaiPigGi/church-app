<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\membersModel;

class MembersStoreTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test store method.
     *
     * @return void
     */
    public function testStore()
    {
        // Generate random UUIDs
        $organitationId = Str::uuid()->toString();
        $positionId = Str::uuid()->toString();

        // Create fake data for the request
        $data = [
            'organitation_id' => "416e89c5-6607-4a90-b580-709cc43efc30",
            'position_id' =>"b524ab65-d452-4dae-9d09-473ec1bcb5d0",
            'members_name' => 'John Doe',
            'born_date' => '1990-01-01',
            'address' => '123 Main St',
            'image' => UploadedFile::fake()->image('avatar.jpg'),
        ];

        // Send a POST request to the store method
        $response = $this->json('POST', route('admin.members.store'), $data);

        // Assert that the response has a 201 status code (created)
        $response->assertStatus(201);

        // Assert that the member is in the database
        $this->assertDatabaseHas('members', [
            'members_name' => 'John Doe',
        ]);

        // Decode the JSON response
        $responseData = $response->decodeResponseJson();

        // Assert that the response contains the member data
        $this->assertArrayHasKey('member', $responseData);
        $this->assertArrayHasKey('message', $responseData);

        // Assert that the member data matches the created member
        $this->assertEquals('John Doe', $responseData['member']['members_name']);

        // Assert that the message indicates success
        $this->assertEquals('Member created successfully.', $responseData['message']);

    }
}
