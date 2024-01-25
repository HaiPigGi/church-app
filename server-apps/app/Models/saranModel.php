<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class saranModel extends Model
{
    use HasFactory;

   protected $table="sarans";

    protected $primaryKey = 'saran_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['saran_id', 'full_name', 'email', 'message'];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string) Str::uuid();
        });
    }
}
