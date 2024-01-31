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
            // Retrieve image details for each post
            $postsWithImages = $posts->map(function ($post) {
                $imagePath = 'storage/berita/' . $post->image;

                // Check if the file exists before getting the size
                if (File::exists($imagePath)) {
                    return [
                        'berita_id' => $post->berita_id,
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
                'berita_id'      => $post->berita_id,
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
                'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:20480',
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
     * @param  \App\Models\beritaModel  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, beritaModel $post)
    {
        try {
            // Start the database transaction
            DB::beginTransaction();
            Log::info('Request data update :', $request->all());

            // Validate form
            $validator = Validator::make($request->all(), [
                'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:20480',
                'title'   => 'required|min:5',
                'content' => 'required|min:10',
                'event'   => 'required',
            ]);

            if ($validator->fails()) {
                // Log validation errors
                Log::error('Validation errors:', ['errors' => $validator->errors()->all()]);

                return response()->json(['error' => 'Data yang diberikan tidak valid.'], 422);
            }

            // Check if image is uploaded
            if ($request->hasFile('image')) {
                // Upload new image
                $image = $request->file('image');
                $image->storeAs('public/post', $image->hashName());

                // Delete old image
                Storage::delete('public/post/' . $post->image);

                // Update post with new image
                $post->update([
                    'image'   => $image->hashName(),
                    'title'   => $request->title,
                    'content' => $request->content,
                    'event'   => $request->event
                ]);
            } else {
                // Update post without image
                $post->update([
                    'title'   => $request->title,
                    'content' => $request->content,
                    'event'   => $request->event
                ]);
            }

            // Commit the database transaction
            DB::commit();

            return response()->json(['message' => 'Data Berhasil Diubah!'], 200);
        } catch (\Exception $e) {
            // An error occurred, rollback the transaction
            DB::rollBack();

            // Log the error
            Log::error('Error updating post:', ['error' => $e->getMessage()]);

            // Return a JSON response with an error message
            return response()->json(['error' => 'Terjadi kesalahan saat mengubah data.'], 500);
        }
    }


    /**
     * Remove the specified resource from storage
     *
     * @param  string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $beritaModel = beritaModel::findOrFail($id);
            Storage::delete('public/berita/' . $beritaModel->image);

            $beritaModel->delete();

            DB::commit();

            return response()->json(['status' => 'success', 'message' => 'Successfully Deleted'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
}
