<?php

namespace Database\Factories;

use App\Models\Capsule;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CapsuleFactory extends Factory
{
    protected $model = Capsule::class;

    public function definition()
    {

        $type = $this->faker->randomElement(['image', 'video', 'audio', 'pdf']);

        return [
            'user_id' => User::factory(),
            'title' => $this->faker->realText(40),
            'message' => $this->faker->sentences(2, true),
            'reveal_date' => $this->faker->dateTimeBetween('-1 month', '+5 years'),
            'mood' => $this->faker->randomElement(['happy', 'sad', 'excited', 'calm', 'angry', 'thoughtful', 'playful']),
            'latitude' => $this->faker->latitude(30, 40),
            'longitude' => $this->faker->longitude(-100, -70),
            'ip_address' => $this->faker->ipv4(),
            'is_revealed' => $this->faker->boolean(20),
            'color' => $this->faker->hexColor(),
            'media_url' => match ($type) {
                'image' => $this->faker->imageUrl(640, 480, 'nature', true),
                'audio' => 'https://example.com/media/audio-' . $this->faker->uuid . '.mp3',
                default => 'https://example.com/media/default-media.txt',
            },
            'cover_image' => $this->faker->boolean(50) ? $this->faker->imageUrl(640, 480, 'nature', true) : null,
            'privacy' => $this->faker->randomElement(['private', 'public']),
            'country' => $this->faker->country(),
            'surprise_mode' => $this->faker->boolean(),
        ];
    }

    public function revealed()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_revealed' => true,
                'reveal_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ];
        });
    }

    public function private()
    {
        return $this->state(function (array $attributes) {
            return [
                'privacy' => 'private',
            ];
        });
    }
}
