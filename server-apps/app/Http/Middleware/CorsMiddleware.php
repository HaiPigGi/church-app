<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Log when a request is received
        Log::info('Request received: ' . $request->url());

        $response = $next($request);

        $origin = $request->headers->get('Origin');
        if ($origin) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        } else {
            // Handle case when Origin header is not present (e.g., direct API requests)
            $response->headers->set('Access-Control-Allow-Origin', '*');
        }

        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application, x-csrf-token');

        // Handling preflight requests
        if ($request->getMethod() === 'OPTIONS') {
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application, x-csrf-token');
        }

        // Log the response headers being set
        Log::info('Response headers set: ' . json_encode($response->headers->all()));

        return $response;
    }
}
