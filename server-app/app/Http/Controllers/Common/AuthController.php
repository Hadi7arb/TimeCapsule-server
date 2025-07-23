<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Common\AuthService;

 

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = AuthService::login($request);
        if($user)
            return $this->responseJSON($user);
        return $this->responseJSON(null, "error", 401);
    }
    public function register(Request $request)
    {
        $user = AuthService::register($request);
        return $this->responseJSON($user);
    }
    public function logout(Request $request)
    {
        $user = AuthService::logout($request);
        return $this->responseJSON($user, "Successfully logged out");
        
    }

    
}
