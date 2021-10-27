<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $DBGroup = 'default';
    protected $table = 'User';
    protected $primaryKey = 'id_user';
    protected $allowedFields = [
        'role',
        'nama_user',
        'username',
        'password',
        'email',
        'phone',
        'status',
        'create_by',
        'create_date',
        'update_by',
        'update_date',
    ];
    //protected $returnType    = 'App\Entities\User'; user gapake class entities
    protected $returnType    = 'array';
    protected $useTimestamps = true;

    protected $createdField  = 'create_date';
    protected $updatedField  = 'update_date';

    public function finById($id = null)
    {
        $data = $this->find($id);
        if ($data) {
            return $data;
        }
        return false;
    }
}
