<?php

namespace App\Services\User;
use App\Models\Capsule;


class CapsuleService
{
   static function createOrUpdateCapsule($data, $capsule){

        // $capsule->user_id = 0;
        // $capsule->title = $request["title"];
        // $capsule->message = $request["message"];
        // $capsule->reveal_date = $request["reveal_date"];
        // $capsule->mood = $request["mood"];
        // $capsule->latitude = $request["latitude"];
        // $capsule->longitude = $request["longitude"]; 
        // $capsule->ip_address = $request["ip_address"];
        // $capsule->is_revealed = 0;
        // $capsule->color = $request["color"];
        // $capsule->cover_image = $request["cover_image"];
        // $capsule->image = $request["image"];
        // $capsule->voice_note = $request["voice_note"];
        // $capsule->privacy = $request["privacy"];
        // $capsule->country = $request["country"];
        // $capsule->surprise_mode = 0;
        // $capsule->save();
        return $capsule;

   } 

   static function getAllCapsules($id = null){
    if(!$id){
        return Capsule::all();
    }
        return Capsule::find($id);
   }

}
