<?php

namespace App\Controllers;

use App\Models\RequestModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\I18n\Time;
use DateTime;

class Request extends ResourceController
{
    protected $modelName = 'App\Models\RequestModel';
    protected $format = 'json';
    protected $datetime;

    public function __construct()
    {
        $this->validation = \Config\Services::validation();
        date_default_timezone_set('Asia/Jakarta');
        $this->datetime = date('Y-m-d H:i:s');
    }

    public function index()
    {
        //List Request
        return $this->model->findAll();
    }

    public function listReqest($role = null)
    {
        //List Request
        return $this->model->where('req_to', $role);
    }

    public function create()
    {
        #testing from backend
        $input = $this->request->getPost();
        $validate = $this->validation->run($input, 'surveillanceValCreate'); //nama validasinya (app/config/validation)
        $error = $this->validation->getErrors();
        if ($error) {
            return $this->fail($error);
        }

        $data = [
            'item' => $input['item'],
            'qty' => $input['qty'],
            'location' => $input['location'],
            'req_to' => $input['req_to'],
            'email_to' => $input['email_to'],
            'create_by' => $input['create_by'],
            'phone' => $input['phone'],
            'create_date' => $input['create_date'],
            'req_status' => $input['req_status'],
            'seen_status' => $input['seen_status'],
            'update_by' => $input['update_by'],
            'update_date' => $input['update_date'],
        ];

        $model = new RequestModel();
        $action = $this->model->save($data);
        if ($action) {
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

    public function update($id = null)
    {
        //Acc request
    }
}
