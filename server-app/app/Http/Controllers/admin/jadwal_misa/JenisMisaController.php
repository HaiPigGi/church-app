<?php

namespace App\Http\Controllers\admin\jadwal_misa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JenisMisaModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
class JenisMisaController extends Controller
{
    /**
     * show all data from database
     *
     * @return void
     */
    public function index()
    {
        $jenisMisa = JenisMisaModel::all();
        return response()->json(['data' => $jenisMisa]);
    }
    /**
     * Show Spesifict data with search with Id
     *
     * @param JenisMisaModel $id
     * @return void
     */
    public function show($id)
    {
        $jenisMisa = JenisMisaModel::findOrFail($id);
        return response()->json(['data' => $jenisMisa]);
    }
    /**
     * Store the Jenis to DB
     * 
     * @return \Illuminate\Http\JsonResponse
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jenis' => 'required|string|unique:jenis_misa,jenis',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            DB::beginTransaction();

            $jenisMisa = JenisMisaModel::create([
                'jenis' => $request->input('jenis'),
            ]);

            DB::commit();

            return response()->json(['data' => $jenisMisa, 'message' => 'Jenis Misa created successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Jenis Misa creation failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Jenis Misa creation failed'], 500);
        }
    }

    /**
     * Update to the Jenis to DB
     * 
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'jenis' => ['required', 'string', Rule::unique('jenis_misa')->ignore($id, 'jenis_misa_id')],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            DB::beginTransaction();

            $jenisMisa = JenisMisaModel::findOrFail($id);
            $jenisMisa->update([
                'jenis' => $request->input('jenis'),
            ]);
            DB::commit();

            return response()->json(['data' => $jenisMisa, 'message' => 'Jenis Misa updated successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Jenis Misa update failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Jenis Misa update failed'], 500);
        }
    }

    /**
     * delete Jenis from DB
     * 
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $jenisMisa = JenisMisaModel::findOrFail($id);
            $jenisMisa->delete();

            DB::commit();

            return response()->json(['message' => 'Jenis Misa deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Jenis Misa deletion failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Jenis Misa deletion failed'], 500);
        }
    }
}
