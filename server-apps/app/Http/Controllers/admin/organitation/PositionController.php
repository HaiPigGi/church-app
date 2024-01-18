<?php

namespace App\Http\Controllers\admin\organitation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\positionModel;
use Illuminate\Support\Facades\Log;

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
        return response()->json(['positions' => $positions]);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PositionModel  $position
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PositionModel $position)
    {
        return response()->json(['position' => $position]);
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

            Log::info('result'. $position);

            DB::commit();

            return response()->json(['position' => $position, 'message' => 'Position created successfully.'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error For Storing'.$e->getMessage());
            return response()->json(['message' => 'Error occurred while creating the position.'], 500);
        }
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PositionModel  $position
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, PositionModel $position)
    {
        $request->validate([
            'position_name' => 'required|string|max:255',
        ]);

        try {
            DB::beginTransaction();

            $position->update([
                'position_name' => $request->input('position_name'),
            ]);

            DB::commit();

            return response()->json(['position' => $position, 'message' => 'Position updated successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
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
