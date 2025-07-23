<?php
namespace App\Services\User;

use App\Models\Capsule;
use Stevebauman\Location\Facades\Location;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class CapsuleService
{
   const Moods = ['happy', 'sad', 'neutral', 'excited', 'calm']; 
    const Privacies = ['private', 'public'];

    

    static function getAllCapsules($id = null){
        if(!$id){
            return Capsule::all();
        }
        return Capsule::find($id);
    }

    static function addOrUpdateCapsule(Request $request){
        $moods = self::Moods;
        $privacies = self::Privacies;

        $userIp = $request->ip() === '127.0.0.1' ? '8.8.8.8' : $request->ip();
        // $userIp=$request->ip();
        $location = Location::get($userIp);

        $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'mood'=> ['required' , 'string' , Rule::in($moods)],            
            'color' => 'required|string|max:50',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'privacy' => ['required' , 'string' , Rule::in($privacies)],
            'media_url' => 'nullable|file|mimes:jpg,jpeg,png,mp3,mp4|max:20240',
            'is_revealed' => 'boolean',
            'reveal_date' => 'required|date|after_or_equal:now',
            'media' => 'nullable|file|mimes:jpg,jpeg,png|max:2024',
        ]);

        $capsule = new Capsule();

        $capsule->user_id = Auth::id(); 
        $capsule->title = $request->title;
        $capsule->message = $request->message;
        $capsule->mood = $request->mood;
        $capsule->color = $request->color;
        $capsule->privacy = $request->privacy;
        $capsule->surprise_mode = $request->surprise_mode;
        $capsule->is_revealed = Carbon::parse($request->reveal_date)->isPast();
        $capsule->reveal_date = $request->reveal_date;
        $capsule->media_url = $request ->media_url;
        $capsule->ip_address = $userIp;
        $capsule->latitude = $location->latitude;
        $capsule->longitude = $location->longitude;
        $capsule->country = $location->countryName;
        $capsule->save();
        return $capsule;
    }

    static function filterBy(Request $request)
        {
            
            $query = Capsule::query();

            $query->when($request->has('mood'), function ($q) use ($request) {
                $q->where('mood', $request->input('mood'));
            });

            $query->when($request->has('country'), function ($q) use ($request) {
                $q->where('country', $request->input('country'));
            });

            $query->when($request->has(['start_date', 'end_date']), function ($q) use ($request) {
                $startDate = $request->input('start_date');
                $endDate = $request->input('end_date');
                if (strtotime($startDate) && strtotime($endDate)) {
                    $q->whereBetween('reveal_date', [$startDate, $endDate]);
                }
            });

            $capsules = $query->get();

            return $capsules;
        }

} 