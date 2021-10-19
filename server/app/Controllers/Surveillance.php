<?php

namespace App\Controllers;

use App\Models\LocationModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\I18n\Time;

class Surveillance extends ResourceController
{
    protected $modelName = 'App\Models\SurveillanceModel';
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

    public function indexByLocation($lokasi = null, $jenis = null)
    {
        //indexnya bakal nampilin tools sesuai lokasinya biar ga berat (select all)
        $data = $this->model->getWhere(['location' => $lokasi])->getResult();
        if ($data) {
            return $this->respond($data);
        }
        return false;
    }

    public function create()
    {
        $data = $this->request->getPost();
        $validate = $this->validation->run($data, 'surveillanceValCreate'); //nama validasinya (app/config/validation)
        $error = $this->validation->getErrors();
        if ($error) {
            return $this->fail($error);
            //return $this->fail('Item name is already exist');
        }

        $item = new \App\Entities\Surveillance();
        $item->fill($data);
        $item->maintenance_date = $this->datetime;
        $item->status = 1;

        if ($this->model->save($item)) {
            return $this->respondCreated($item, 'has been created');
        }
    }

    //update harian
    public function update($id = null)
    {
        $data = $this->request->getRawInput();
        $data['id_surv'] = $id;
        $validate = $this->validation->run($data, 'surveillanceValUpdate');
        $errors = $this->validation->getErrors();

        if (!$this->show($id)) {
            return $this->fail('id not found');
        }
        if ($errors) {
            return $this->fail($errors);
        }

        $surv = new \App\Entities\Surveillance();
        $surv->fill($data);
        $surv->maintenance_date = $this->datetime;

        if ($this->model->save($surv)) {
            return $this->respondUpdated($surv, 'tools updated');
        }

        //kalo dah bisa bikin kondisi: jika qty= 0 maka; nonaktifkan status barang / remove
    }

    public function show($id = null)
    {
        //$model = new LocationModel();
        $data = $this->model->getWhere(['id_surv' => $id])->getResult();
        if ($data) {
            return $this->respond($data);
        }
        return false;
    }

    //delete = set status jadi 0 + update untuk remove (backllad / handover)
    public function delete($id = null)
    {
        if (!$this->show($id)) {
            return $this->fail('id tidak ditemukan');
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted(['id' => $id . ' Deleted']);
        }
    }

    public function handover($id = null)
    {
        if (!$this->show($id)) {
            return $this->fail('id not found');
        }

        $data = $this->request->getRawInput();
        $data['id_surv'] = $id; //ngambil id dari url (request)

        $surv = new \App\Entities\Surveillance();
        $surv->fill($data);
        $surv->update_date = $this->datetime;
        $surv->status = 2;

        if ($this->model->save($surv)) {
            return $this->respondUpdated('has been update');
            //return $this->respondNoContent('has been deleted');
            //langsung insert ke table removeditem
        }
    }
}
