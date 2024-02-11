<?php

namespace App\Http\Controllers\admin\dokumentasi;

use App\Http\Controllers\Controller;
use App\Models\dokumentasiImageModel;
use App\Models\dokumentasiModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class dokumentasiController extends Controller
{

    public function create()
    {
        return view('dokumentasi.create');
    }

    /**
     * Get all data including image information
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllData()
    {
        try {
            $dokumentasiData = dokumentasiModel::with('images')->get();

            $responseData = $dokumentasiData->map(function ($dokumentasi) {
                $DokuImages = $dokumentasi->images->map(function ($img) {
                    return [
                        "url" => asset('storage/' . $img->image),
                        "path" => $img->image
                    ];
                });

                return [
                    'dokumentasi_id'   => $dokumentasi->dokumentasi_id,
                    'tahun'            => $dokumentasi->tahun,
                    'jenis_kegiatan'   => $dokumentasi->jenis_kegiatan,
                    'images'           => $DokuImages,
                ];
            });

            return response()->json(['data' => $responseData], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve data', 'error' => $e->getMessage()], 500);
        }
    }
    /**
     * Get all data including image information and filter by jenis kegiatan
     *
     * @param string $jenisKegiatan Jenis kegiatan untuk melakukan filter
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDataByJenisKegiatan($jenisKegiatan)
    {
        try {
            // Ambil semua data dokumentasi beserta informasi gambarnya
            $dokumentasiData = dokumentasiModel::with('images')->where('jenis_kegiatan', $jenisKegiatan)->get();

            // Format ulang data untuk JSON response
            $responseData = $dokumentasiData->map(function ($dokumentasi) {
                $DokuImages = $dokumentasi->images->map(function ($img) {
                    return [
                        "url" => asset('storage/' . $img->image),
                        "path" => $img->image
                    ];
                });

                return [
                    'dokumentasi_id'   => $dokumentasi->dokumentasi_id,
                    'tahun'            => $dokumentasi->tahun,
                    'jenis_kegiatan'   => $dokumentasi->jenis_kegiatan,
                    'images'           => $DokuImages,
                ];
            });

            return response()->json(['data' => $responseData], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve data', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get all data including image information and filter by jenis kegiatan and year
     *
     * @param string $jenisKegiatan Jenis kegiatan untuk melakukan filter
     * @param int $tahun Tahun untuk melakukan filter
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllDataByJenisKegiatanAndYear($jenisKegiatan, $tahun)
    {
        try {
            // Ambil semua data dokumentasi beserta informasi gambarnya
            $dokumentasiData = dokumentasiModel::with('images')
                ->where('jenis_kegiatan', $jenisKegiatan)
                ->where('tahun', $tahun)
                ->get();

            // Format ulang data untuk JSON response
            $responseData = $dokumentasiData->map(function ($dokumentasi) {
                $DokuImages = $dokumentasi->images->map(function ($img) {
                    return [
                        "url" => asset('storage/' . $img->image),
                        "path" => $img->image
                    ];
                });

                return [
                    'dokumentasi_id'   => $dokumentasi->dokumentasi_id,
                    'tahun'            => $dokumentasi->tahun,
                    'jenis_kegiatan'   => $dokumentasi->jenis_kegiatan,
                    'images'           => $DokuImages,
                ];
            });

            return response()->json(['data' => $responseData], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve data', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * store to database 
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            Log::info("cek data store dokumentasi : ", $request->all());
            $data = $request->validate([
                'tahun' => 'required',
                'jenis_kegiatan' => 'required',
                'image.*' => 'image|mimes:jpeg,png,jpg,gif', // Validate each image file with maximum size 100MB

            ]);

            // Creating Dokumentasi instance
            $dokumentasi = DB::transaction(function () use ($data) {
                $dokumentasi = dokumentasiModel::create([
                    'tahun' => $data['tahun'],
                    'jenis_kegiatan' => $data['jenis_kegiatan'],
                ]);

                if ($data['image'] && is_array($data['image'])) {
                    foreach ($data['image'] as $image) {
                        $imageName = $dokumentasi->tahun . '-image-' . time() . rand(1, 1000) . '.' . $image->extension();
                        // Store the image in the storage disk (public disk in this case)
                        $imagePath = $image->storeAs('dokumentasi', $imageName, 'public');

                        dokumentasiImageModel::create([
                            'dokumentasi_id' => $dokumentasi->dokumentasi_id,
                            'image' => $imagePath,
                        ]);
                    }
                }

                return $dokumentasi;
            });

            // Success response for JSON
            Log::info("cek data sucess : " . json_encode($dokumentasi));
            return response()->json(['message' => 'Dokumentasi added successfully', 'data' => $dokumentasi], 201);
        } catch (\Exception $e) {
            // Error response for JSON
            Log::error("Error occurred while processing dokumentasi: " . $e->getMessage() . "\n" . $e->getTraceAsString());
            return response()->json(['message' => 'Failed to add Dokumentasi', 'error' => $e->getMessage()], 500);
        }
    }
    /**
     * Delete data by dokumentasi_id
     *
     * @param string $dokumentasiId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteDataById($dokumentasiId)
    {
        try {
            // Find and delete data by dokumentasi_id
            $deleted = dokumentasiModel::where('dokumentasi_id', $dokumentasiId)->delete();

            if ($deleted) {
                return response()->json(['message' => 'Data deleted successfully'], 200);
            } else {
                return response()->json(['message' => 'No data found for the specified ID'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete data for the specified ID', 'error' => $e->getMessage()], 500);
        }
    }
}
