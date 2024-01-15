<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\organitationModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class organitationController extends Controller
{
    /**
     * show all organitation 
     *
     * @return void
     */
    public function getAllOrganitation() 
    {
        $organisations = organitationModel::all();
        return response()->json(['organitation' => $organisations], 200);
    }

    /**
     * show organitation by id
     * 
     * @return void
     */

    public function getAllOrganitationById($id)
    {
        $organitation = organitationModel::findOrFail($id);

        if (!$organitation) {
            return response()->json(['error' => 'Organitation Not Found'], 404);
        }
        return response()->json(['organitation' => $organitation], 200);
    }

    /**
     * store to database 
     * @return \Illuminate\Http\JsonResponse
     */
    protected function store(Request $request)
    {
        $request->validate([
            'name_organitation' => 'required|string',
            'description' => 'required|string',
            'date_of_establishment' => 'required|date',
            'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:2080',
        ]);
        Log::info('cek semua data organitation', $request->all());

        try {
            DB::beginTransaction();

            $image = $request->file('image');
            $imagePath = $image->storeAs('public/organitation', $image->hashName());

            $organitationId = Str::uuid();

            $organitationData = [
                'organitation_id' => $organitationId,
                'name_organitation' => $request->input('name_organitation'),
                'description' => $request->input('description'),
                'date_of_establishment' => $request->input('date_of_establishment'),
                'image' => $imagePath,
            ];
            $organitation = organitationModel::create($organitationData);
            DB::commit();
            return response()->json(['organitation' => $organitation], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            return response()->json(['message' => $organitation], 500);
        }
    }

    /**
     * Update organization in the database
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $organitationId
     * @return \Illuminate\Http\JsonResponse
     */
    protected function update(Request $request, $organitationId)
    {
        $request->validate([
            'name_organitation' => 'required|string',
            'description' => 'required|string',
            'date_of_establishment' => 'required|date',
            'image'   => 'image|mimes:jpeg,png,jpg,svg|max:2080',
        ]);

        

        try {
            DB::beginTransaction();

            $organitation = organitationModel::findOrFail($organitationId);
            $organitation->organitation_id = $organitationId;
            $organitation->name_organitation = $request->input('name_organitation');
            $organitation->description = $request->input('description');
            $organitation->date_of_establishment = $request->input('date_of_establishment');

            if ($request->hasFile('image')) {
                // Update the image if a new one is provided
                $image = $request->file('image');
                $imagePath = $image->storeAs('public/organitation', $image->hashName());
                $organitation->image = $imagePath;
            }

            $organitation->save();

            DB::commit();

            return response()->json(['organitation' => $organitation], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            return response()->json(['message' => 'Error updating organization'], 500);
        }
    }



    /**
     * Delete organization from the database
     * @return \Illuminate\Http\JsonResponse
     */
    protected function destroy($organitationId)
    {
        try {
            DB::beginTransaction();
    
            $organitation = organitationModel::find($organitationId);
    
            if (!$organitation) {
                return response()->json(['message' => 'Organization not found'], 404);
            }
    
            // Delete associated image from storage
            Storage::delete('public/organitation/' . $organitation->image);
    
            $organitation->delete();
    
            DB::commit();
    
            return response()->json(['message' => 'Organitation deleted successfully'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            return response()->json(['message' => 'Error deleting Organitation'], 500);
        }
    }
    
}
