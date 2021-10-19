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
        'handover_pict',
        'phone',
        'maintenance_by',
        'maintenance_date',
        'status'
    ];
    protected $returnType    = 'App\Entities\Surveillance';
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
