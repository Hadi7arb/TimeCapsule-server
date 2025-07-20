<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Models\User;



class UserController extends Controller
{
    
    function getAllUsers(){
        $users = User::all();
        
        return $this->responseJSON($users);
    }
}
