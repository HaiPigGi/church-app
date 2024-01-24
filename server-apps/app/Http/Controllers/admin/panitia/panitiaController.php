<?php

namespace App\Http\Controllers\admin\panitia;

use App\Http\Controllers\Controller;
use App\Models\panitiaModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class panitiaController extends Controller
{
    public function getStatus()
    {
        $status = panitiaModel::latest()->value('status') ?? panitiaModel::TAMPILAN_A;
        return response()->json(['status' => $status]);
    }

    public function toggleStatus(Request $request)
    {
        Log::info('cek data masuk ', $request->all());

        // Validate the new status from the request
        $request->validate([
            'newStatus' => 'required|integer|between:0,2',
        ]);

        // Use the validated new status value
        $newStatus = $request->input('newStatus');

        // Get the latest panitia or create a new one if not exists
        $latestPanitia = panitiaModel::latest()->firstOrNew();

        // If the panitia is newly created, set default values
        if (!$latestPanitia->exists) {
            $latestPanitia->status = 0; // Set default status for a new panitia
            $latestPanitia->save();
        }

        // Update the panitia status
        $latestPanitia->update(['status' => $newStatus]);

        return response()->json(['status' => $newStatus]);
    }
}
