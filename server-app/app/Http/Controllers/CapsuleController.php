<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Capsule;
use App\Services\User\CapsuleService;
use App\Http\Controllers\Controller;


class CapsuleController extends Controller
{
     function getAllCapsules(){
        $capsules = CapsuleService::getAllCapsules();
        return $this->responseJSON($capsules);
    }

    function addOrUpdateCapsule(Request $request, $id = null){
        $capsule = new Capsule;
        if($id){
            $capsule = CapsuleService::getAllCapsules($id);
        }

        $capsule = CapsuleService::addOrUpdateCapsule($request, $capsule);
        return $this->responseJSON($capsule);
    }

    function filterBy(Request $request){
        $capsule = CapsuleService::filterBy($request);
        return $this->responseJSON($capsule);
    }
}