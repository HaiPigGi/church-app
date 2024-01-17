<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class JenisMisaModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'jenis_misa_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'jenis',
    ];
    protected $table = "jenis_misa";

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->jenis_misa_id = Str::uuid();
        });
    }


}
