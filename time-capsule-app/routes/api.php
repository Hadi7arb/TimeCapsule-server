<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\controllers\CapsuleController;
use App\Http\Controllers\Common\AuthController;




Route::get("/Capsules", [CapsuleController::class , "getAllCapsules"]);
Route::post("/add_update_capsule/{id?}", [CapsuleController::class , "addOrUpdateCapsule"]);
Route::delete("/delete_capsule/{id}", [Capsule::class, "deleteCapsule"]);

Route::post("/register", [AuthController::class , "register"]);
Route::post("/login" , [AuthController::class, "login"]);
