<?php

namespace App\Controllers;

use App\Models\LocationModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\I18n\Time;

class Location extends ResourceController
{
    protected $modelName = 'App\Models\LocationModel';
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
        //$model = new LocationModel();
        $data = $this->model->getWhere(['id_lokasi' => $id])->getResult();
        if ($data) {
            return $this->respond($data);
        }
        return false;
    }

    public function create()
    {
        // helper(['form']);
        $input = $this->request->getPost();
        $validate = $this->validation->run($input, 'registLocation'); //nama validasinya (app/config/validation)
        $error = $this->validation->getErrors();
        if ($error) {
            return $this->fail($error);
        }

        // $data = [
        //     'nama_lokasi' => $this->request->getVar('nama_lokasi'),
        //     'alamat_lokasi' => $this->request->getVar('alamat_lokasi'),
        //     'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
        //     'create_by' => $this->request->getVar('create_by'),
        //     'create_date' => $this->datetime,
        //     'status' => 1,
        // ];
        $data = [
            'nama_lokasi' => $input['nama_lokasi'],
            'alamat_lokasi' => $input['alamat_lokasi'],
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
            'create_by' => $input['create_by'],
            'update_date' => $this->datetime,
            'status' => 1,
        ];

        $model = new LocationModel();
        $action = $model->save($data);
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
        if (!$this->show($id)) {
            return $this->fail('id not found');
        }

        $input = $this->request->getRawInput();
        $input['id_lokasi'] = $id;
        $validate = $this->validation->run($input, 'updateLocation');
        $errors = $this->validation->getErrors();
        if ($errors) {
            return $this->fail($errors);
        }

        $data = [
            'nama_lokasi' => $input['nama_lokasi'],
            'alamat_lokasi' => $input['alamat_lokasi'],
            'update_by' => $input['update_by'],
            'update_date' => $this->datetime,
            'status' => 1,
        ];

        $model = new LocationModel();
        $action = $model->update($id, $data);
        if ($action) {
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
    }

    public function delete($id = null)
    {
        // if (!$this->show($id)) {
        //     return $this->fail('id tidak ditemukan');
        // }

        // if ($this->model->delete($id)) {
        //     return $this->respondDeleted(['id' => $id . ' Deleted']);
        // }

        if (!$this->show($id)) {
            return $this->fail('id not found');
        }

        $data = $this->request->getRawInput();
        $data['id_lokasi'] = $id; //ngambil id dari url (request)

        $location = new \App\Entities\Location();
        $location->fill($data);
        $location->update_date = $this->datetime;
        $location->status = 2;

        if ($this->model->save($location)) {
            return $this->respondUpdated($location, 'has been deleted');
        }
    }

    public function checkOldPassword($id)
    {
        $input = [
            'nama_lokasi' => $this->request->getVar('nama_lokasi'),
            'alamat_lokasi' => $this->request->getVar('alamat_lokasi'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
            'oldPass' => $this->request->getVar('password'),
            'update_by' => $this->request->getVar('update_by'),
            'update_date' => $this->datetime
        ];

        $data = $this->model->getWhere(['id_lokasi' => $id])->getResult();

        if ($data['password'] == $input['oldPass']) {
            return $this->fail('Password not match');
        }

        unset($input['oldPass']);

        $model = new LocationModel();
        $action = $model->update($id, $input);
        if ($action) {
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
    }
}
