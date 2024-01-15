<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{


    /** its for Registration user 
     * 
     * @param \Illuminate\Http\JsonResponse
     */

    public function register(Request $request)
    {
        // Validasi menggunakan Validator
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:3'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Check if the password meets the minimum length requirement
        if (strlen($request->name) < 3) {
            return response()->json(['error' => 'Name must be at least 3 characters long'], 400);
        }

        // Check if the username already exists
        $cekName = User::where('name', $request->name)->first();

        if ($cekName) {
            return response()->json(['error' => 'Username already exists'], 400);
        }

        // Check if the password meets the minimum length requirement
        if (strlen($request->password) < 8) {
            return response()->json(['error' => 'Password must be at least 8 characters long'], 400);
        }

        // Check if the password and password confirmation match
        if ($request->password !== $request->password_confirmation) {
            return response()->json(['error' => 'Password and password confirmation do not match'], 400);
        }

        try {
            DB::beginTransaction();

            // Create a new user instance
            $user = User::create([
                'name' =>  $request->name,
                'password' => Hash::make($request->password),
            ]);

            // Optionally generate a JWT token for the newly registered user
            $token = JWTAuth::fromUser($user);
            Log::info('cek isi token register', ['token' => $token]);

            // Commit the transaction
            DB::commit();

            // Return a JSON response
            return response()->json([
                'message' => 'Successfully created account',
                'token' => $token,
                'status' => 0,
            ], 201);
        } catch (\Exception $e) {
            // An error occurred, rollback the transaction
            DB::rollBack();

            // Log the error
            Log::error('Registration failed', ['error' => $e->getMessage()]);

            // Return an error response in JSON format
            return response()->json(['error' => 'Registration failed: ' . $e->getMessage()], 500);
        }
    }
}
