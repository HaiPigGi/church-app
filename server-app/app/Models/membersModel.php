<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
