<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\beritaModel;
use Illuminate\Support\Facades\Validator;
class beritaController extends Controller
{
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
            Log::error('Server Error', ['error' => $th->getMessage()]);
            return response()->json(['status' => 'error', 'message' => $th->getMessage()], 500);
        }
    }
    
}
