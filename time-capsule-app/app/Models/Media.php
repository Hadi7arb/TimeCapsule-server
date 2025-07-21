<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Capsule;

class Media extends Model
{
    public function capsule(): BelongsTo
    {
        return $this->belongsTo(Capsule::class);
    }
}
