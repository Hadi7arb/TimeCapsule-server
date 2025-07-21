<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Media;
use App\Models\User;

class Capsule extends Model
{
    public function media(): HasMany
    {
        return $this->hasMany(Media::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
