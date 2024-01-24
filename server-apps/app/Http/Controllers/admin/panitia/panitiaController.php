<?php

namespace App\Http\Controllers\admin\panitia;

use App\Http\Controllers\Controller;
use App\Models\panitiaModel;
use Illuminate\Http\Request;

class panitiaController extends Controller
{
    public function getStatus()
    {
        $status = panitiaModel::latest()->value('status') ?? panitiaModel::TAMPILAN_A;
        return response()->json(['status' => $status]);
    }

    public function toggleStatus(Request $request)
    {
        $currentStatus = panitiaModel::latest()->value('status') ?? panitiaModel::TAMPILAN_A;

        // Validate the new status from the request
        $request->validate([
            'newStatus' => 'required|integer|between:0,2',
        ]);

        // Use the validated new status value
        $newStatus = $request->input('newStatus');

        // Update the existing panitia with the new status
        panitiaModel::latest()->update(['status' => $newStatus]);

        return response()->json(['status' => $newStatus]);
    }
}
