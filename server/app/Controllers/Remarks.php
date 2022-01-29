<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SurveillanceModel;
use App\Models\RemarkHistoryModel;

class Remarks extends ResourceController
{
    protected $modelSurv;
    protected $modelHistory;

    public function __construct()
    {
        $this->modelSurv = new SurveillanceModel();
        $this->modelHistory = new RemarkHistoryModel();
    }

    public function saveRemarkHistory($id = null)
    {
        $input = $this->modelSurv->find($id);
        if (!$input) {
            return $this->fail('id not found');
        }

        $data = [
            'id_surv' => $id,
            'maintenance_by' => $this->request->getVar('maintenance_by'),
            'remark' => $this->request->getVar('remark'),
            'maintenance_date' => $this->datetime,
        ];

        if ($this->modelSurv->save($data)) {
            $msg = "update remark table surveillance success";
            $save2 = $this->modelHistory->save($data);
        } else $msg = "update remark table surveillance failed";

        if ($save2) {
            $msg = $msg . " insert history success";
            $code = 200;
            $response = [
                'status' => 200,
                'error' => false,
                'data' => $msg,
            ];
        } else {
            $msg = 'insert failed';
            $code = 400;
            $response = [
                'status' => 400,
                'error' => false,
                'data' => $msg,
            ];
        }
        return $this->respond($response, $code);
    }

    public function index()
    {
        //
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //
    }

    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        //
    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //
    }
}
