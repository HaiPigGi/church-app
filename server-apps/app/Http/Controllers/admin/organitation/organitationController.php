<?php

namespace App\Http\Controllers\admin\organitation;

use App\Http\Controllers\Controller;
use App\Models\organitationModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class organitationController extends Controller
{
    /**
     * Get all posts with image details.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllOrganitation()
    {
        try {
            // Get all posts
            $posts = organitationModel::all();
            Log::info("cek All data post : " . json_encode($posts));

            // Retrieve image details for each post
            $postsWithImages = $posts->map(function ($organitation) {
                $imagePath = 'storage/organitation/' . $organitation->image;

                // Check if the file exists before getting the size
                if (File::exists($imagePath)) {
                    return [
                        'organitation_id' => $organitation->organitation_id,
                        'name_organitation' => $organitation->name_organitation,
                        'description' => $organitation->description,
                        'date_of_establishment' => $organitation->date_of_establishment,
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

            Log::info("cek All data post : " . json_encode($postsWithImages));

            return response()->json(['data' => $postsWithImages], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error getting all posts:', ['error' => $e->getMessage()]);

            // Return a JSON response with an error message
            return response()->json(['error' => 'Terjadi kesalahan saat mengambil data.'], 500);
        }
    }

    /**
     * Get all posts with image details.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllOrganitationById($id)
    {
        try {
            // Get a specific post by ID
            $organitation = organitationModel::find($id);

            if (!$organitation) {
                // Return a JSON response indicating that the post with the provided ID was not found
                return response()->json(['error' => 'organitation not found.'], 404);
            }

            // Retrieve image details for the post
            $imagePath = 'storage/organitation/' . $organitation->image;
            $postWithImage = [
                'organitation_id' => $organitation->organitation_id,
                'name_organitation' => $organitation->name_organitation,
                'description' => $organitation->description,
                'date_of_establishment' => $organitation->date_of_establishment,
                'image' => [
                    'url' => asset($imagePath),
                    'path' => $imagePath,
                    'size' => File::size($imagePath),
                ],
            ];
            // Return the post data as a JSON response
            return response()->json(['data' => $postWithImage], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error getting post by ID:', ['error' => $e->getMessage()]);

            // Return a JSON response with an error message
            return response()->json(['error' => 'Terjadi kesalahan saat mengambil data.'], 500);
        }
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
            $image->storeAs('public/organitation', $image->hashName());

            $organitationId = Str::uuid();

            $organitationData = [
                'organitation_id' => $organitationId,
                'name_organitation' => $request->input('name_organitation'),
                'description' => $request->input('description'),
                'date_of_establishment' => $request->input('date_of_establishment'),
                'image' => $image->hashName(),
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
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $organitationId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $organitationId)
    {
        $request->validate([
            'name_organitation' => 'required|string',
            'description' => 'required|string',
            'date_of_establishment' => 'required|date',
            'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:2080',
        ]);

        Log::info('cek semua data organization for update', $request->all());

        try {
            DB::beginTransaction();

            $organitation = organitationModel::where('organitation_id', $organitationId)->first();

            if (!$organitation) {
                return response()->json(['message' => 'Organization not found'], 404);
            }

            if ($request->hasFile('image')) {
                // If a new image is provided, upload and update the image
                $image = $request->file('image');
                $image->storeAs('public/organitation', $image->hashName());
                $organitation->image = $image->hashName();
            }

            $organitation->name_organitation = $request->input('name_organitation');
            $organitation->description = $request->input('description');
            $organitation->date_of_establishment = $request->input('date_of_establishment');
            $organitation->save();

            DB::commit();

            return response()->json(['organitation' => $organitation], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
            return response()->json(['message' => 'Failed to update organization'], 500);
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
