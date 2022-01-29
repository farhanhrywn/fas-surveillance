<?php

namespace App\Models;

use CodeIgniter\Model;

class SurveillanceModel extends Model
{
    protected $table = 'Surveillance';
    protected $primaryKey = 'id_surv';
    protected $allowedFields = [
        'type',
        'item',
        'location',
        'plan',
        'pn',
        'sn',
        'qty',
        'sheet', //category
        'steelbox',
        'condition',
        'cert_date',
        'remark',
        'remark_file',
        'maintenance_by',
        'phone',
        'tools_date_in',
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
            Surveillance.sheet,
            Surveillance.type,
            Surveillance.condition,
            Surveillance.cert_date,
            Surveillance.tools_date_in,
            Surveillance.remark,
            Surveillance.remark_file,
            Surveillance.maintenance_by,
            Surveillance.phone,
            Surveillance.maintenance_date,
            Surveillance.plan,
            Surveillance.steelbox,
            Surveillance.status
            ')
            ->join('Location', 'Location.id_lokasi=Surveillance.location', 'left')
            ->where(['Surveillance.id_surv' => $input->id_surv])
            ->get()->getresultArray();

        return $join;
    }

    public function listJoinAsset($location = null, $status = null)
    {
        $arrParam = [
            'Surveillance.location' => $location,
            'Surveillance.status!=' => 'backload'
        ];
        if ($status == 'backload')
            $arrParam = [
                'Surveillance.location' => $location,
                'Surveillance.status' => 'backload'
            ];

        $join = $this
            ->select('
            Surveillance.id_surv,
            Surveillance.item,
            Location.nama_lokasi,
            Surveillance.pn,
            Surveillance.sn,
            Surveillance.qty,
            Surveillance.sheet,
            Surveillance.type,
            Surveillance.condition,
            Surveillance.cert_date,
            Surveillance.tools_date_in,
            Surveillance.remark,
            Surveillance.remark_file,
            Surveillance.maintenance_by,
            Surveillance.phone,
            Surveillance.maintenance_date,
            Surveillance.plan,
            Surveillance.steelbox,
            Surveillance.status
            ')
            ->join('Location', 'Location.id_lokasi=Surveillance.location', 'left')
            ->where($arrParam)
            ->get()->getresultArray();

        return $join;
    }


    // public function checkDate()
    // {
    //     if ($date == new DateTime("0000-00-00 00:00:00")) {
    //         echo "-";
    //     } else {
    //         echo date_format($date, "Y-m-d");
    //     }
    // }
}
