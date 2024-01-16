<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{

    public function index()
    {
        return response()->json(['message' => 'Oke']);
    }
    /** its for login user 
     * 
     * @param \Illuminate\Http\JsonResponse
     */

    public function login(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'password' => 'required|string',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Check if the user exists
        $user = User::where('name', $request->name)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Check if the entered password matches the password from the database
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid Password'], 401);
        }

        try {
            // Attempt to generate a token for the user
            $credentials = $request->only('name', 'password');
            if (!$token = JWTAuth::attempt($credentials)) {
                // If the login attempt fails
                Log::info('Login failed: Invalid credentials', ['name' => $request->input('name')]);
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            // Get the authenticated user
            $user = JWTAuth::user();

            // Check user status
            if ($user->status == 1) {
                // Admin login
                return response()->json(['message' => 'Admin Login Successfully', 'token' => $token, 'role' => $user->status, 'name' => $user->name], 200);
            } else {
                // Regular user login
                return response()->json(['message' => 'User Login Successfully', 'token' => $token, 'role' => $user->status, 'name' => $user->name], 200);
            }
        } catch (JWTException $e) {
            // If an exception occurs while attempting to create a token
            Log::error('Token creation failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Could not create token'], 500);
        }
    }



    /** its for logout user 
     * 
     * @param \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try {
            // Get the authenticated user using the JWT token
            $token = JWTAuth::getToken();

            if (!$token) {
                return response()->json(['message' => 'Token not provided.'], 401);
            }

            $user = JWTAuth::toUser($token);

            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }

            // Invalidate the JWT token
            JWTAuth::invalidate($token);

            return response()->json(['message' => 'User logged out successfully.'], 200);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            Log::error("Error during logout: " . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Failed to logout. Please try again later.'], 500);
        }
    }
}
