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
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(rand(3, 7)),
            'message' => $this->faker->paragraph(rand(3, 8)),
            'reveal_date' => $this->faker->dateTimeBetween('-1 month', '+5 years'),
            'mood' => $this->faker->randomElement(['happy', 'sad', 'excited', 'calm', 'angry', 'thoughtful', 'playful']),
            'latitude' => $this->faker->latitude(30, 40),
            'longitude' => $this->faker->longitude(-100, -70),
            'ip_address' => $this->faker->ipv4(),
            'is_revealed' => $this->faker->boolean(20),
            'color' => $this->faker->hexColor(),
            'cover_image' => $this->faker->boolean(50) ? $this->faker->imageUrl(640, 480, 'nature', true) : null,
            'privacy' => $this->faker->randomElement(['private', 'public', 'friends_only']),
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
