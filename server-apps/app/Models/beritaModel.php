<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class beritaModel extends Model
{
    use HasFactory;

    protected $table = 'berita';

    protected $primaryKey=  'berita_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'image',
        'title',
        'content',
        'event',
    ];

    protected static function boot()
    {
        parent::boot();

        // Generating UUID for 'berita_id' before creating the model
        static::creating(function ($model) {
            $model->berita_id = (string) Str::uuid();
        });
    }
}
