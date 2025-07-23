<?php

namespace App\Services\Common;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthService
{
    static function login(Request $request){
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return null;
        }

        $user = Auth::user();
        $user->token = $token;
        return $user;
    }

    static function register(Request $request){
        $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        
        $user = new User;
        $user-> fullName = $request->fullName;
        $user-> email = $request->email;
        $user-> password = Hash::make($request->password);
        $user->save();

        $token = Auth::login($user);

        $user -> token = $token;
        return $user;
        
        
    }

    static function logout(Request $request){
       Auth::logout();
       
    }

    
}
