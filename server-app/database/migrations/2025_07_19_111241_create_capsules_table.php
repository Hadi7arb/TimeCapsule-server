<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('capsules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->string('title');
            $table->text('message');
            $table->DateTime('reveal_date');
            $table->string('mood', 20)->index();
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->ipAddress('ip_address');
            $table->boolean('is_revealed')->index();
            $table->string('color');
            $table->string('cover_image')->nullable();
            $table->string('privacy', 20)->default('private')->index();
            $table->string('country');
            $table->string("media_url")->nullable();
            $table->boolean('surprise_mode');
            $table->softDeletes();
            $table->timestamps();
        });

        

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capsules');
       

    }
};
