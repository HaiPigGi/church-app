<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class organitationModel extends Model
{
    use HasFactory;
    
    protected $table = "organitation";
    protected $primaryKey=  'organitation_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'organitation_id',
        'name_organitation',
        'description',
        'date_of_establishment',
        'image',
    ];

    public function members ()
    {
        return $this->hasMany(membersModel::class, 'organitation_id');
    }
}
