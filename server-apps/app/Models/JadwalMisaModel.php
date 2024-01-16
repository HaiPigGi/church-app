<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class JadwalMisaModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'jadwal_misa_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'hari', 'waktu_mulai', 'waktu_selesai', 'jenis_misa_id',
    ];
    protected $table = "jadwal_misa";

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->jadwal_misa_id = Str::uuid();
        });
    }

    public function jenisMisa()
    {
        return $this->belongsTo(JenisMisaModel::class, 'jenis_misa_id', 'jenis_misa_id');
    }
}
