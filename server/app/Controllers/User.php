<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\I18n\Time;
use DateTime;
use CodeIgniter\HTTP\Request;

class User extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
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
        return $this->respond($this->model->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if ($data) {
            return $this->respond($data);
        }
        return false;
    }

    #ini fungsi register, udah ke handle di controller register
    public function create()
    {
        // $input = $this->request->getRawInput();

        // $validate = $this->validation->run($input, 'surveillanceValCreate'); //nama validasinya (app/config/validation)
        // $error = $this->validation->getErrors();
        // if ($error) {
        //     return $this->fail($error);
        // }

        // $model = new UserModel();
        // $data = [
        //     'role' => $this->request->getVar('role'),
        //     'nama_user' => $this->request->getVar('nama_user'),
        //     'username' => $this->request->getVar('username'),
        //     'password' => $this->request->getVar('password'),
        //     'email' => $this->request->getVar('email'),
        //     'phone' => $this->request->getVar('phone'),
        //     'status' => $this->request->getVar('status'),
        //     'create_by' => $this->request->getVar('create_by'),
        //     'create_date' => $this->request->getVar('create_date'),
        // ];

        // $created = $model->save($data);
        // if ($created) {
        //     $code = 200;
        //     $msg = 'insert success';
        //     $response = [
        //         'status' => $code,
        //         'error' => false,
        //         'data' => $msg,
        //     ];
        // } else {
        //     $code = 400;
        //     $msg = 'insert failed';
        //     $response = [
        //         'status' => $code,
        //         'error' => false,
        //         'data' => $msg,
        //     ];
        // }
        // return $this->respond($response, $code);
    }

    #update profile user
    public function update($id = null)
    {
        if (!$this->show($id)) {
            return $this->fail('id not found');
        }

        $input = $this->request->getRawInput();

        $validate = $this->validation->run($input, 'updateUser'); //nama validasinya (app/config/validation)
        $error = $this->validation->getErrors();
        if ($error) {
            return $this->fail($error);
        }

        $model = new UserModel();
        $data = [
            // 'role' => $this->request->getVar('role'),
            'nama_user' => $input['nama_user'],
            // 'username' => $this->request->getVar('username'),
            // 'password' => $this->request->getVar('password'),
            'email' => $input['email'],
            'phone' => $input['phone'],
            // 'status' => $this->request->getVar('status'),
            'update_by' => $input['update_by'],
            'update_date' => $this->datetime,
        ];

        $created = $model->update($id, $data);
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
}
