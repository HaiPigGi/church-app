<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class positionModel extends Model
{
    use HasFactory;

    protected $primaryKey="position_id";
    public $incrementing=false;
    protected $keyType = "string";

    protected $table="position";

    protected $fillable=["position_name"];

    public function members() 
    {
        return $this->hasMany(membersModel::class,'position_id');
    }
    protected static function boot()
    {
        parent::boot();

        // Generating UUID for 'position_id' before creating the model
        static::creating(function ($model) {
            $model->position_id = (string) Str::uuid();
        });
    }
}
