<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class csrf_token extends Controller
{
    public function getSessionData(Request $request)
    {
        $sessionData = $request->session()->all();

        if (!empty($sessionData)) {
            $token = $sessionData['_token'];
            return response()->json([
                'csrf_token' => $token,
                'session_data' => $sessionData,
            ]);
        } else {
            return response()->json([
                'error' => 'Session data not found.',
            ], 404);
        }
    }
}
