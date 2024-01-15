<?php

namespace App\Http\Controllers\admin\Berita;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\beritaModel;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
class beritaController extends Controller
{

    /**
     * show all berita 
     *
     * @return void
     */
    public function getAllBerita()
    {
        $berita = beritaModel::all();
        return response()->json(['data' => $berita], 200);
    }

    /**
     * show berita by id
     * 
     * @return void
     */

    public function getAllberitaById($id)
    {
        $berita = beritaModel::findOrFail($id);

        if (!$berita) {
            return response()->json(['error' => 'Organitation Not Found'], 404);
        }
        return response()->json(['data' => $berita], 200);
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

            // Log::info("Check Request Data: ", $request->all());

            // Validate form
            $validator = Validator::make($request->all(), [
                'image'   => 'required|image|mimes:jpeg,png,jpg,svg|max:2080',
                'title'   => 'required|min:5',
                'content' => 'required|min:10',
                'event'   => 'required',
            ]);

            if ($validator->fails()) {
                // Log::error('Validation Error', ['error' => $validator->errors()->all()]);
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
                 'image'   => 'image|mimes:jpeg,png,jpg,svg|max:2080',
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

            Storage::delete('public/berita/'. $beritaModel->image);

            $beritaModel->delete();

            DB::commit();

            return response()->json(['status'=> 'success', 'message'=> 'Successfull Delete'],200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['status'=> 'error', 'message'=> $th->getMessage()],500);
        }
      }
}
