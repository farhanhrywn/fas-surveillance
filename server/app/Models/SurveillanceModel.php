<?php

namespace App\Models;

use CodeIgniter\Model;

class SurveillanceModel extends Model
{
    protected $table = 'Surveillance';
    protected $primaryKey = 'id_surv';
    protected $allowedFields = [
        'item',
        'location',
        'pn',
        'sn',
        'qty',
        'category',
        'jenis',
        'condition',
        'cert_date',
        'handover_notes',
        'handover_file',
        'phone',
        'maintenance_by',
        'maintenance_date',
        'status'
    ];
    protected $returnType    = 'App\Entities\Surveillance';
    protected $useTimestamps = false;

    #protected $createdField  = 'maintenance_date';
    #protected $updatedField  = 'maintenance_date';
    #protected $deletedField  = 'deleted_at';


    public function finById($id = null)
    {
        $data = $this->find($id);
        if ($data) {
            return $data;
        }
        return false;
    }

    public function detailToolsByLocation($loc = null)
    {
        //$data = $this->where(['id_lokasi' => $loc, 'id_surv' => $idTools]);
        $data = $this->where('location', $loc)->findAll();
        if ($data) {
            return $data;
        }
        return false;
    }
}
