<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class VallidationJWTController extends Controller
{
    /**
     * Validate JWT token for the authenticated user.
     *
     * @param \Illuminate\Http\JsonResponse
     */
    public function validateToken(Request $request)
    {
        try {
            // Get the token from the request
            $token = JWTAuth::parseToken();

            // Check if the token is valid
            if (!$token->check()) {
                return response()->json(['error' => 'Invalid token'], 401);
            }

            // Get the authenticated user
            $user = $token->authenticate();

            // Return user information with a success response
            return response()->json([
                'message' => 'Token is valid',
                'user' => [
                    'name' => $user->name,
                    'status' => $user->status,
                ],
            ], 200);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Token validation failed', ['error' => $e->getMessage()]);

            // Return an error response in JSON format
            return response()->json(['error' => 'Token validation failed: ' . $e->getMessage()], 500);
        }
    }
}
