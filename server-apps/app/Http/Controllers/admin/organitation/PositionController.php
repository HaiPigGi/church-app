<?php

namespace App\Http\Controllers\admin\organitation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\positionModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $positions = PositionModel::all();
        return response()->json(['positions' => $positions], 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PositionModel  $position
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PositionModel $position)
    {
        return response()->json(['position' => $position], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'position_name' => 'required|string|max:255',
        ]);

        try {
            DB::beginTransaction();

            $position = PositionModel::create([
                'position_id' => (string) \Illuminate\Support\Str::uuid(),
                'position_name' => $request->input('position_name'),
            ]);

            Log::info('result' . $position);

            DB::commit();

            return response()->json(['position' => $position, 'message' => 'Position created successfully.'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error For Storing' . $e->getMessage());
            return response()->json(['message' => 'Error occurred while creating the position.'], 500);
        }
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string $id 
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'position_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            // Log validation errors for debugging
            Log::error('Validation Error', ['error' => $validator->errors()->all()]);
            return response()->json(['status' => 'error', 'message' => 'Data is not valid', 'errors' => $validator->errors()], 422);
        }

        Log::info('Request Data for Update:', ['request_data' => $request->all()]);

        try {
            DB::beginTransaction();

            // find id
            $position = PositionModel::where('position_id', $id)->firstOrFail();

            $position->update([
                'position_name' => $request->input('position_name'),
            ]);

            DB::commit();

            return response()->json(['position' => $position, 'message' => 'Position updated successfully.'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('' . $e->getMessage());
            return response()->json(['message' => 'Error occurred while updating the position.'], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PositionModel  $position
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(PositionModel $position)
    {
        try {
            DB::beginTransaction();

            $position->delete();

            DB::commit();

            return response()->json(['message' => 'Position deleted successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error occurred while deleting the position.'], 500);
        }
    }
}
