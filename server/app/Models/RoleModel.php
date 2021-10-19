<?php

namespace App\Models;

use CodeIgniter\Model;

class RoleModel extends Model
{
    protected $table = 'Location';
    protected $primaryKey = 'id_lokasi';
    protected $allowedFields = [
        'nama_role',
        'status',
        'create_by',
        'create_date',
        'update_by',
        'update_date'
    ];
    protected $returnType    = 'App\Entities\Roles';
    protected $useTimestamps = false;

    public function finById($id = null)
    {
        $data = $this->find($id);
        if ($data) {
            return $data;
        }
        return false;
    }
}
