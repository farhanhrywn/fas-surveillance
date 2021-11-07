<?php

namespace App\Models;

use CodeIgniter\Model;

class RequestModel extends Model
{
    protected $DBGroup              = 'default';
    protected $table                = 'Request';
    protected $primaryKey           = 'id_req';
    protected $useAutoIncrement     = true;
    protected $insertID             = 0;
    protected $returnType           = 'array';
    protected $useSoftDeletes       = false;
    protected $protectFields        = true;
    protected $allowedFields        = [
        'item',
        'qty',
        'location',
        'req_to',
        'email_to',
        'create_by',
        'phone',
        'create_date',
        'req_status',
        'seen_status',
        'update_by',
        'update_date',
    ];

    // Dates
    protected $useTimestamps        = false;
    protected $dateFormat           = 'datetime';
    protected $createdField         = 'create_date';
    protected $updatedField         = 'update_date';
    // protected $deletedField         = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks       = true;
    protected $beforeInsert         = [];
    protected $afterInsert          = [];
    protected $beforeUpdate         = [];
    protected $afterUpdate          = [];
    protected $beforeFind           = [];
    protected $afterFind            = [];
    protected $beforeDelete         = [];
    protected $afterDelete          = [];
}
