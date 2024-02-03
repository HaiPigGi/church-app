<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class dokumentasiModel extends Model
{
    use HasFactory;

    protected $table = 'dokumentasi';

    protected $primaryKey=  'dokumentasi_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'tahun',
        'jenis_kegiatan',
    ];


    protected static function boot()
    {
        parent::boot();

        // Generating UUID for 'berita_id' before creating the model
        static::creating(function ($model) {
            $model->dokumentasi_id = (string) Str::uuid();
        });
    }

     // Define the relationship with the images
     public function images()
     {
         return $this->hasMany(dokumentasiImageModel::class, 'dokumentasi_id');
     }
}
