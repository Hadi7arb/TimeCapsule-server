<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\controllers\CapsuleController;
use App\Http\Controllers\Common\AuthController;
use App\Http\controllers\MediaController;





Route::get("/capsules/{id?}", [CapsuleController::class , "getAllCapsules"]);
Route::post("/add_update_capsule/{id?}", [CapsuleController::class , "addOrUpdateCapsule"]);
// Route::delete("/delete_capsule/{id}", [CapsuleController::class, "deleteCapsule"]);
Route::get("/filter_by", [CapsuleController::class , "filterBy"]);



Route::post("/register", [AuthController::class , "register"]);
Route::post("/login" , [AuthController::class, "login"]);
Route::post("/logout", [AuthController::class, "logout"]);

