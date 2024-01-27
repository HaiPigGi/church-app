<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\saranModel;
use Illuminate\Http\Request;

class saranController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        saranModel::create([
            'full_name' => $request->input('full_name'),
            'email' => $request->input('email'),
            'message' => $request->input('message'),
        ]);

        return response()->json(['message' => 'Saran successfully submitted.'],201);
    }

    public function getAllDataSaran()
    {
        $sarans = saranModel::all();

        return response()->json(['sarans' => $sarans],200);
    }

    public function getAllDataSaranByID($id)
    {
        $sarans = saranModel::find($id);
        return response()->json(['sarans' => $sarans],200);
    }

    public function destroy($id)
    {
        $saran = saranModel::findOrFail($id);
        $saran->delete();

        return response()->json(['message' => 'Saran successfully deleted.'],200);
    }
}
