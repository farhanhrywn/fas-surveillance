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
        return $this->respond($this->model->findAll());
    }

    public function listReqestByRole($role = null)
    {
        //List Request
        return $this->model->where('req_to', $role);
    }

    public function listRequestByLocation($lokasi = null, $status = null)
    {
        #indexnya bakal nampilin tools yg bukan backload sesuai lokasinya 
        //cari berdasarkan lokasi dan status request (waiting, accepted, rejected)
        $arrParam = ['location' => $lokasi, 'req_status=' => $status];
        // if (is_null($status) || $status == '') $arrParam = ['location' => $lokasi];
        if ($status == 'all') $arrParam = ['location' => $lokasi];

        $model = new RequestModel();
        $data = $model->where($arrParam)->findAll();
        if ($data) {
            return $this->respond($data);
        }
        return false;
    }

    /*public function create()
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
    }*/

    public function create()
    {
        #ini kalo dari frontend
        $input = $this->request->getPost();
        // $data3 = json_decode(key((array)json_decode(json_encode($input), true)), true);
        // $data = str_replace('_', ' ', $data3);

        $item = new \App\Entities\Request();
        $item->fill($input);
        $item->create_date = $this->datetime;
        $item->req_status = 3; //3 -> waiting
        $item->seen_status = 2; //2 -> not seen

        $created = $this->model->save($item);
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

    public function show($id = null)
    {
        $input = $this->model->find($id);
        if (!$input) {
            return $this->fail('id not found');
        }
        $model = new RequestModel();
        $data = $model->getDetail($id);
        return $this->respond($data);
    }

    public function update($id = null)
    {
        #ini kalo dari frontend
        // $data = $this->request->getPost();
        $data = $this->request->getRawInput();
        $data['id_req'] = $id;
        // $data['id_req'] = $id;
        // $data3 = json_decode(key((array)json_decode(json_encode($input), true)), true);
        // $data = str_replace('_', ' ', $data3);
        #testing from backend
        if (!$this->model->find($id)) {
            return $this->fail('id not found');
        }

        $surv = new \App\Entities\Request();
        $surv->fill($data);
        $surv->update_date = $this->datetime;
        // $surv->req_status = 1;

        $update = $this->model->save($surv);
        if ($update) {
            $code = 200;
            $msg = 'update success';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        } else {
            $code = 400;
            $msg = 'update failed';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        }
        return $this->respond($response, $code);
        // return $this->respondUpdated($surv, 'updated');
    }

    public function delete($id = null)
    {
        #tambahin kondisi : yg bisa dihapus cuma yg statusnya installed & backload
        $data = $this->model->find($id);
        if (!$data) {
            return $this->fail('id not found');
        }
        $action = $this->model->delete($id);
        if ($action) {
            $code = 200;
            $msg = 'delete success';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        } else {
            $code = 400;
            $msg = $action->geterrorMessage(); //'handover failed';
            $response = [
                'status' => $code,
                'error' => true,
                'data' => $msg,
            ];
        }
        return $this->respond($response, $code);
    }
}
