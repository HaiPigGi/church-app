<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            // Attempt to authenticate the user based on the token in the request
            $user = JWTAuth::parseToken()->authenticate();

            // Attach the authenticated user to the request
            $request->merge(['auth_user' => $user]);
        } catch (\Exception $e) {
            // Token invalid or user not found
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
