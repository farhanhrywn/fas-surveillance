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
        $data = $this->request->getPost();
        // $data = [
        //     'nama_lokasi' => $this->request->getPost('nama_lokasi'),
        //     'alamat_lokasi' => $this->request->getPost('alamat_lokasi'),
        //     'password' => $this->request->getPost('password'),
        //     'create_by' => $this->request->getPost('password'),
        // ];

        $validate = $this->validation->run($data, 'registLocation'); //nama validasinya (app/config/validation)
        $error = $this->validation->getErrors();
        if ($error) {
            //return $this->fail($error);
            return $this->fail('Location name is already exist');
        }

        $location = new \App\Entities\Location();
        $location->fill($data);
        $location->create_date = $this->datetime;

        if ($this->model->save($location)) {
            return $this->respondCreated($location, 'has been created');
        }
    }

    public function update($id = null)
    {
        $data = $this->request->getRawInput();
        $data['id_lokasi'] = $id;
        $validate = $this->validation->run($data, 'updateLocation');
        $errors = $this->validation->getErrors();

        if ($errors) {
            return $this->fail($errors);
        }

        if (!$this->show($id)) {
            return $this->fail('id tidak ditemukan');
        }

        $location = new \App\Entities\Location();
        $location->fill($data);
        $location->update_date = $this->datetime;

        if ($this->model->save($location)) {
            return $this->respondUpdated($location, 'user updated');
        }
    }

    public function delete($id = null)
    {
        /*if (!$this->show($id)) {
            return $this->fail('id tidak ditemukan');
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted(['id' => $id . ' Deleted']);
        }*/

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
}
