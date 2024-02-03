<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class dokumentasiImageModel extends Model
{
    use HasFactory;

    protected $table = 'dokumentasi_images';

    protected $primaryKey=  'dokumentasi_images_id';
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = [
        'dokumentasi_id',
        'image',
    ];
    
    protected static function boot()
    {
        parent::boot();

        // Generating UUID for 'berita_id' before creating the model
        static::creating(function ($model) {
            $model->dokumentasi_images_id = (string) Str::uuid();
        });
    }


    // Define the relationship with the dokumentasiModel
    public function dokumentasi()
    {
        return $this->belongsTo(dokumentasiModel::class, 'dokumentasi_id');
    }
}
