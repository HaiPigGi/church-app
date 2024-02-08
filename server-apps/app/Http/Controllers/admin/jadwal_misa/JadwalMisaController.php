<?php

namespace App\Http\Controllers\admin\jadwal_misa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JadwalMisaModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class JadwalMisaController extends Controller
{

    /**
     * show data with the data Jenis Misa
     *
     * @return void
     */
    public function index()
    {
        $jadwalMisa = JadwalMisaModel::with('jenisMisa')->get();
        return response()->json(['data' => $jadwalMisa]);
    }

     /**
     * show data With spesific 
     *
     * @return void
     */

    public function show($id)
    {
        $jadwalMisa = JadwalMisaModel::with('jenisMisa')->findOrFail($id);
        return response()->json(['data' => $jadwalMisa]);
    }

    /**
     * Store to database for jadwal
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hari' => 'required|string',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_selesai' => 'required|date_format:H:i|after:waktu_mulai',
            'jenis_misa_id' => 'required|exists:jenis_misa,jenis_misa_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            DB::beginTransaction();

            $jadwalMisa = JadwalMisaModel::create([
                'hari' => $request->input('hari'),
                'waktu_mulai' => $request->input('waktu_mulai'),
                'waktu_selesai' => $request->input('waktu_selesai'),
                'jenis_misa_id' => $request->input('jenis_misa_id'),
            ]);

            DB::commit();

            return response()->json(['data' => $jadwalMisa, 'message' => 'Jadwal Misa created successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Jadwal Misa creation failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Jadwal Misa creation failed'], 500);
        }
    }

    /**
     * Update data with spesifict id
     *
     * @param Request $request
     * @param JadwalMisaModel $id
     * @return void
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'hari' => 'required|string',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_selesai' => 'required|date_format:H:i|after:waktu_mulai',
            'jenis_misa_id' => 'required|exists:jenis_misa,jenis_misa_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            DB::beginTransaction();

            $jadwalMisa = JadwalMisaModel::findOrFail($id);
            $jadwalMisa->update([
                'hari' => $request->input('hari'),
                'waktu_mulai' => $request->input('waktu_mulai'),
                'waktu_selesai' => $request->input('waktu_selesai'),
                'jenis_misa_id' => $request->input('jenis_misa_id'),
            ]);

            DB::commit();

            return response()->json(['data' => $jadwalMisa, 'message' => 'Jadwal Misa updated successfully'],201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Jadwal Misa update failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Jadwal Misa update failed'], 500);
        }
    }
    /**
     * Undocumented function
     *
     * @param JadwalMisaModel $id
     * @return void
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $jadwalMisa = JadwalMisaModel::findOrFail($id);
            $jadwalMisa->delete();

            DB::commit();

            return response()->json(['message' => 'Jadwal Misa deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Jadwal Misa deletion failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Jadwal Misa deletion failed'], 500);
        }
    }
}
