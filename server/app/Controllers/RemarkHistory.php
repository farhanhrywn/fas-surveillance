<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

use App\Models\SurveillanceModel;
use App\Models\RemarkHistoryModel;

class RemarkHistory extends ResourceController
{
    protected $modelName = 'App\Models\RemarkHistoryModel';
    protected $format = 'json';
    protected $datetime;
    protected $modelSurv;
    protected $modelHistory;

    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->datetime = date('Y-m-d H:i:s');
        $validation =  \Config\Services::validation();
        $email = \Config\Services::email();
        $this->modelSurv = new SurveillanceModel();
        $this->modelHistory = new RemarkHistoryModel();
    }

    public function index()
    {
        // return $this->respond($this->model->findAll());
        // return $this->indexByLocation($item = null);
    }

    public function indexByItem($item = null)
    {
        // $input = $this->model->find($item);
        // if (!$input) {
        //     return $this->fail('id not found');
        // }

        $model = new RemarkHistoryModel();
        $data = $model
            // ->where('item', $item)
            // ->orderBy('create_date', 'DESC')
            ->findAll();
        if ($data) {
            return $this->respond($data);
        }
        return false;
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
        $input = $this->request->getPost();

        $remark = new \App\Entities\RemarkHistory();
        $remark->fill($input);
        $remark->create_date = $this->datetime;

        $created = $this->model->save($remark);
        if ($created) {
            $code = 200;
            $msg = 'insert success';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        } else {
            $code = 400;
            $msg = 'insert failed';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        }
        return $this->respond($response, $code);
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
