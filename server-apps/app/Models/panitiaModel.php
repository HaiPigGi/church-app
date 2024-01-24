<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class panitiaModel extends Model
{
    use HasFactory;

    protected $table="panitias";

    protected $fillable = ['status'];

    public const TAMPILAN_A = 0;
    public const TAMPILAN_B = 1;
    public const TAMPILAN_C = 2;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $primaryKey = 'panitia_id';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->panitia_id = (string) Str::uuid();
        });
    }
}
