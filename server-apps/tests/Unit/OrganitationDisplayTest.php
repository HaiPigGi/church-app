<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\organitationModel;
class OrganitationDisplayTest extends TestCase
{
    use RefreshDatabase;

    // /**
    //  * Test the getAllOrganitation method.
    //  */
    // public function test_get_all_organitation(): void
    // {
    //     // Create a fake organitationModel instance using Laravel's factory or any other method
    //     $fakeOrganisations = organitationModel::factory(5)->create();

    //     // Mock the organitationModel::all() method to return a fake result
    //     $this->mock(organitationModel::class)
    //         ->shouldReceive('all')
    //         ->andReturn($fakeOrganisations);

    //     // Create an instance of the organitationController
    //     $organitationController = new organitationModel();

    //     // Call the getAllOrganitation method
    //     $response = $organitationController->getAllOrganitation();

    //     // Assertions
    //     $response->assertStatus(200);

    //     $responseData = $response->json();
    //     $this->assertArrayHasKey('organitation', $responseData);
    //     $this->assertEquals($fakeOrganisations->toArray(), $responseData['organitation']);
    // }
 
}
