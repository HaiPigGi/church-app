<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class membersModel extends Model
{
    use HasFactory;

    protected $primaryKey = "member_id";
    public $incrementing = false;
    protected $keyType = "string";

    protected $table = "members";

    protected $fillable = [
        "organitation_id",
        "position_id",
        "members_name",
        "born_date",
        "address",
        "image",
    ];

    public function organitation()
    {
        return $this->belongsTo(organitationModel::class,'organitation_id');
    }
    public function position()
    {
        return $this->belongsTo(positionModel::class,'position_id');
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
