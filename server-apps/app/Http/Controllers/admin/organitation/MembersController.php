<?php

namespace App\Http\Controllers\admin\organitation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\membersModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use App\Models\OrganitationModel;
use App\Models\PositionModel;

class MembersController extends Controller
{
    /**
     * Get all members with image details.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDataMembers()
    {
        try {
            // Get all members
            $members = membersModel::all();
            Log::info("cek All data members: " . json_encode($members));

            // Retrieve image details and names for each member
            $membersWithImagesAndNames = $members->map(function ($member) {
                // Get organization name
                $organization = OrganitationModel::where('organitation_id', $member->organitation_id)->first();
                $organizationName = $organization ? $organization->name_organitation : null;

                // Get position name
                $position = PositionModel::where('position_id', $member->position_id)->first();
                $positionName = $position ? $position->position_name : null;

                $imagePath = 'storage/members/' . $member->image;

                // Check if the file exists before getting the size
                if (File::exists($imagePath)) {
                    return [
                        'member_id' => $member->member_id,
                        'organitation_id' => $member->organitation_id,
                        'organitation_name' => $organizationName,
                        'position_id' => $member->position_id,
                        'position_name' => $positionName,
                        'members_name' => $member->members_name,
                        'born_date' => $member->born_date,
                        'address' => $member->address,
                        'image' => [
                            'url' => asset($imagePath),
                            'path' => $imagePath,
                            'size' => File::size($imagePath),
                        ],
                    ];
                } else {
                    // Log a warning if the file does not exist
                    Log::warning('Image not found: ' . $imagePath);
                    return null; // or handle it as needed
                }
            })->filter(); // Filter out null values (non-existent images)

            Log::info("cek All data members with images and names: " . json_encode($membersWithImagesAndNames));

            return response()->json(['data' => $membersWithImagesAndNames], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error getting all members:', ['error' => $e->getMessage()]);

            // Return a JSON response with an error message
            return response()->json(['error' => 'Terjadi kesalahan saat mengambil data.'], 500);
        }
    }

    /**
     * Get details for a specific member by ID, including image details and organization/position names.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDataMembersById($id)
    {
        try {
            // Get a specific member by ID
            $member = membersModel::find($id);

            if (!$member) {
                // Return a JSON response indicating that the member with the provided ID was not found
                return response()->json(['error' => 'Member not found.'], 404);
            }

            // Get organization name
            $organization = OrganitationModel::where('organitation_id', $member->organitation_id)->first();
            $organizationName = $organization ? $organization->name_organitation : null;

            // Get position name
            $position = PositionModel::where('position_id', $member->position_id)->first();
            $positionName = $position ? $position->position_name : null;

            // Retrieve image details for the member
            $imagePath = 'storage/members/' . $member->image;

            // Check if the file exists before getting the size
            if (File::exists($imagePath)) {
                $memberWithDetails = [
                    'member_id' => $member->member_id,
                    'organitation_id' => $member->organitation_id,
                    'organitation_name' => $organizationName,
                    'position_id' => $member->position_id,
                    'position_name' => $positionName,
                    'members_name' => $member->members_name,
                    'born_date' => $member->born_date,
                    'address' => $member->address,
                    'image' => [
                        'url' => asset($imagePath),
                        'path' => $imagePath,
                        'size' => File::size($imagePath),
                    ],
                ];

                // Return the member data as a JSON response
                return response()->json(['data' => $memberWithDetails], 200);
            } else {
                // Log a warning if the file does not exist
                Log::warning('Image not found: ' . $imagePath);

                // Return a JSON response with an error message
                return response()->json(['error' => 'Image not found.'], 500);
            }
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error getting member by ID:', ['error' => $e->getMessage()]);

            // Return a JSON response with an error message
            return response()->json(['error' => 'Terjadi kesalahan saat mengambil data.'], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'organitation_id' => 'required|uuid',
            'position_id' => 'required|uuid',
            'members_name' => 'required|string|max:255',
            'born_date' => 'required|date',
            'address' => 'required|string',
            'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:2080',
        ]);

        Log::info('Check date: ' . json_encode($request->all()));

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $image = $request->file('image');
            $image->storeAs('public/members', $image->hashName());

            $memberData = $request->except('image');
            $memberData['image'] = $image->hashName();

            $member = membersModel::create($memberData);

            DB::commit();

            return response()->json(['member' => $member, 'message' => 'Member created successfully.', 'status' => 'success'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('cek error server' . $e->getMessage());
            return response()->json(['message' => 'Error occurred while creating the member.', 'status' => 'error'], 500);
        }
    }

    /**
     * Update a resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $memberId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $memberId)
    {
        $validator = Validator::make($request->all(), [
            'organitation_id' => 'required|uuid',
            'position_id' => 'required|uuid',
            'members_name' => 'required|string|max:255',
            'born_date' => 'required|date',
            'address' => 'required|string',
            'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:2080',
        ]);

        Log::info('Check date for update: ' . json_encode($request->all()));

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $member = membersModel::find($memberId);

            if (!$member) {
                return response()->json(['message' => 'Member not found'], 404);
            }

            if ($request->hasFile('image')) {
                // If a new image is provided, upload and update the image
                $image = $request->file('image');
                $image->storeAs('public/members', $image->hashName());
                $member->image = $image->hashName();
            }

            // Update other fields if provided in the request
            $member->fill($request->except('image'));
            $member->save();

            DB::commit();

            return response()->json(['member' => $member, 'message' => 'Member updated successfully.', 'status' => 'success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating member: ' . $e->getMessage());
            return response()->json(['message' => 'Error occurred while updating the member.', 'status' => 'error'], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\membersModel  $member
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(membersModel $member)
    {
        try {
            DB::beginTransaction();

            $member->delete();

            DB::commit();

            return response()->json(['message' => 'Member deleted successfully.', 'status' => 'success']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error occurred while deleting the member.', 'status' => 'error'], 500);
        }
    }
}
