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
        'sheet',
        'type',
        'condition',
        'cert_date',
        'remark',
        'remark_file',
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

    public function getDetail($id = null)
    {
        $input = $this->find($id);
        $join = $this
            ->select('
            Surveillance.id_surv,
            Surveillance.item,
            Location.nama_lokasi,
            Surveillance.pn,
            Surveillance.sn,
            Surveillance.qty,
            Surveillance.category,
            Surveillance.jenis,
            Surveillance.condition,
            Surveillance.cert_date,
            Surveillance.handover_notes,
            Surveillance.handover_file,
            Surveillance.maintenance_by,
            Surveillance.phone,
            Surveillance.maintenance_date,
            Surveillance.status
            ')
            ->join('Location', 'Location.id_lokasi=Surveillance.location', 'left')
            ->where(['Surveillance.id_surv' => $input->id_surv])
            ->get()->getresultArray();

        return $join;
    }
}
