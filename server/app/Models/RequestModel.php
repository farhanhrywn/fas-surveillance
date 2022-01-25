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
    protected $returnType           = 'App\Entities\Request'; //'array';
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


    public function finById($id = null)
    {
        $data = $this->find($id);
        if ($data) {
            return $data;
        }
        return false;
    }

    public function getDetail($id = null)
    {
        $input = $this->find($id);
        $join = $this
            ->select('
            Request.id_req,
            Request.item,
            Location.nama_lokasi,
            Request.qty,
            Request.req_to,
            Request.create_by,
            Request.create_date,
            Request.phone,
            Request.req_status,
            Request.seen_status,
            Request.update_by,
            Request.update_date
            ')
            ->join('Location', 'Location.id_lokasi=Request.location', 'left')
            ->where(['Request.id_req' => $input->id_req])
            ->get()->getresultArray();

        return $join;
    }
}
