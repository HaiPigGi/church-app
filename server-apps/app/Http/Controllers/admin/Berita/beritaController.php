<?php

namespace App\Http\Controllers\admin\Berita;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\beritaModel;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class beritaController extends Controller
{

    /**
     * Get all posts with image details.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllBerita()
    {
        try {
            // Get all posts
            $posts = beritaModel::all();
            Log::info("cek All data post : " . json_encode($posts));

            // Retrieve image details for each post
            $postsWithImages = $posts->map(function ($post) {
                $imagePath = 'storage/berita/' . $post->image;

                // Check if the file exists before getting the size
                if (File::exists($imagePath)) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'content' => $post->content,
                        'event' => $post->event,
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
    public function getAllBeritaById($id)
    {
        try {
            // Get a specific post by ID
            $post = beritaModel::find($id);

            if (!$post) {
                // Return a JSON response indicating that the post with the provided ID was not found
                return response()->json(['error' => 'Post not found.'], 404);
            }

            // Retrieve image details for the post
            $imagePath = 'storage/berita/' . $post->image;
            $postWithImage = [
                'id'      => $post->id,
                'title'   => $post->title,
                'content' => $post->content,
                'event'   => $post->event,
                'image'   => [
                    'url'  => asset($imagePath),
                    'path' => $imagePath,
                    'size' => File::size($imagePath),
                ],
            ];
            // Return the post data as a JSON response
            return response()->json(['datas' => $postWithImage], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Error getting post by ID:', ['error' => $e->getMessage()]);

            // Return a JSON response with an error message
            return response()->json(['error' => 'Terjadi kesalahan saat mengambil data.'], 500);
        }
    }
    /**
     * store some new berita to resource in storage
     * 
     * @param \Illuminate\Http\Request $request
     * @param \Illuminate\Http\JsonResponse
     */
    protected function store(Request $request)
    {
        try {
            DB::beginTransaction();

            Log::info("Check Request Data: ", $request->all());

            // Validate form
            $validator = Validator::make($request->all(), [
                'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:2080',
                'title'   => 'required|min:5',
                'content' => 'required|min:10',
                'event'   => 'required',
            ]);

            if ($validator->fails()) {
                Log::error('Validation Error', ['error' => $validator->errors()->all()]);
                return response()->json(['status' => 'error', 'message' => 'Data is not Valid'], 422);
            }

            $image = $request->file('image');
            $image->storeAs('public/berita', $image->hashName());

            // Create Post Using Berita Model
            beritaModel::create([
                'image'   => $image->hashName(),
                'title'   => $request->title,
                'content' => $request->content,
                'event'   => $request->event,
            ]);

            // Commit the database transaction
            DB::commit();

            return response()->json(['status' => 'success', 'message' => 'Data Successfully Added'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            // Log::error('Server Error', ['error' => $th->getMessage()]);
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    protected function update(Request $request, beritaModel $beritaModel)
    {
        try {
            DB::beginTransaction();

            // Log request data for debugging
            Log::info('Request data in controller: ', $request->all());
            // Validate form data
            $validator = Validator::make($request->all(), [
                'image'   => 'image|mimes:jpeg,png,jpg,svg|max:20480',
                'title'   => 'required|min:5',
                'content' => 'required|min:10',
                'event'   => 'required',
            ]);

            if ($validator->fails()) {
                // Log validation errors for debugging
                Log::error('Validation Error', ['error' => $validator->errors()->all()]);
                return response()->json(['status' => 'error', 'message' => 'Data is not valid', 'errors' => $validator->errors()], 422);
            }

            // Check if an image is uploaded
            if ($request->hasFile('image')) {
                // Upload new image
                $image = $request->file('image');
                $image->storeAs('public/berita/', $image->hashName());

                // Delete old image
                Storage::delete('public/berita/' . $beritaModel->image);

                // Update berita with new image
                $beritaModel->update([
                    'image'   => $image->hashName(),
                    'title'   => $request->title,
                    'content' => $request->content,
                    'event'   => $request->event,
                ]);
            } else {
                // Update berita without image
                $beritaModel->update([
                    'title'   => $request->title,
                    'content' => $request->content,
                    'event'   => $request->event,
                ]);
            }

            // Commit the database transaction
            DB::commit();

            // Return success response
            return response()->json(['status' => 'success', 'message' => 'Data has been updated'], 200);
        } catch (\Throwable $th) {
            // Roll back the database transaction on error
            DB::rollBack();

            // Log the error for debugging
            Log::error('Error during update', ['error' => $th->getMessage()]);

            // Return error response
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
    /**
     * Remove the specified resource from storage
     *
     *@return \Illuminate\Http\JsonResponse
     */
    public function destroy(beritaModel $beritaModel)
    {
        try {
            DB::beginTransaction();

            Storage::delete('public/berita/' . $beritaModel->image);

            $beritaModel->delete();

            DB::commit();

            return response()->json(['status' => 'success', 'message' => 'Successfull Delete'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
}
