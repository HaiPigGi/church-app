<?php

namespace App\Http\Controllers\admin\organitation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\membersModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
class MembersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDataMembers()
    {
        $members = membersModel::with(['organitation', 'position'])->get();
        return response()->json(['members' => $members]);
    }

      /**
     * Display the specified resource.
     *
     * @param  \App\Models\membersModel  $member
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDataMembersById(membersModel $member)
    {
        return response()->json(['member' => $member]);
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

            $imagePath = $this->uploadImage($request->file('image'));

            $memberData = $request->except('image');
            $memberData['image'] = $imagePath;

            $member = membersModel::create($memberData);

            DB::commit();

            return response()->json(['member' => $member, 'message' => 'Member created successfully.', 'status' => 'success'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('cek error server'.$e->getMessage());
            return response()->json(['message' => 'Error occurred while creating the member.', 'status' => 'error'], 500);
        }
    }

    /**
     * Upload image and return the relative path.
     *
     * @param \Illuminate\Http\UploadedFile $image
     * @return string
     */
    private function uploadImage($image)
    {
        $relativePath = $image->storeAs('public/members', $image->hashName());

        // Remove 'public/' to get the relative path
        return str_replace('public/', '', $relativePath);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\membersModel  $member
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, membersModel $member)
    {
        $request->validate([
            'organitation_id' => 'uuid',
            'position_id' => 'uuid',
            'members_name' => 'string|max:255',
            'born_date' => 'date',
            'address' => 'string',
            'image'   => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2080',
        ]);

        try {
            DB::beginTransaction();

            if ($request->hasFile('image')) {
                // If a new image is provided, upload it and update the image path
                $imagePath = $this->uploadImage($request->file('image'));
                $member->image = $imagePath;
            }

            $member->update($request->except('image'));

            DB::commit();

            return response()->json(['member' => $member, 'message' => 'Member updated successfully.', 'status' => 'success']);
        } catch (\Exception $e) {
            DB::rollBack();
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
