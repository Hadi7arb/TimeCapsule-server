<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Capsule;
use App\Services\User\CapsuleService;

class CapsuleController extends Controller
{
    function getAllCapsules(){
       $capsule = CapsuleService::getAllCapsules();


       return $this->responseJSON($capsule);
    }

    function addOrUpdateCapsule(Request $request, $id=null ){
        $capsule = new Caspsule;
        if($id){
           $capsule = CapsuleService::getAllCapsules($id);
        }
        
       
        $capsule = CapsuleService::createOrUpdateCapsule($request, $capsule);
        return $this->responseJSON($capsules);
    }
}
