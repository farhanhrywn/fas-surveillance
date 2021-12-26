<?php

namespace App\Controllers;

use App\Models\SurveillanceModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\Response;
use CodeIgniter\I18n\Time;
use CodeIgniter\HTTP\Files\UploadedFile;
use DateTime;

class Surveillance extends ResourceController
{
    protected $modelName = 'App\Models\SurveillanceModel';
    protected $format = 'json';
    protected $datetime;
    protected $PATH_UPLOADED = './assets/upload/';
    protected $validation;

    public function __construct()
    {
        $this->validation = \Config\Services::validation();
        date_default_timezone_set('Asia/Jakarta');
        $this->datetime = date('Y-m-d H:i:s');
        $validation =  \Config\Services::validation();
    }

    public function index()
    {
        //return $this->respond($this->model->findAll());
        return $this->indexByLocation($lokasi = null, $idTools = null);
    }

    public function getDataBackload($lokasi = null)
    {
        $status = 'backload';
        //tapi kalo id tools nya null dia bakal nampil seluruh tools yg ada di lokasi tsb (view all tools in spesific location)
        $arrParam = ['location' => $lokasi, 'status =' => $status];

        $model = new SurveillanceModel();
        $data = $model->where($arrParam)->findAll();
        if ($data) {
            return $this->respond($data);
        }
        return false;
    }

    public function indexByLocation($lokasi = null, $type = null)
    {
        #indexnya bakal nampilin tools sesuai lokasinya biar ga berat (select all)
        //$data = $this->model->getWhere(['location' => $lokasi])->getResult();
        //param buat detil tools yg ada di lokasi tsb
        $status = 'backload';
        // $type = 'TOOLS';
        #tapi kalo id tools nya null dia bakal nampil seluruh tools yg ada di lokasi tsb (view all tools in spesific location)
        // $arrParam = ['location' => $lokasi, 'id_surv' => $idTools];
        $arrParam = ['location' => $lokasi, 'type' => $type, 'status!=' => $status];
        if (is_null($type) || $type == '') $arrParam = ['location' => $lokasi, 'status!=' => $status];

        $model = new SurveillanceModel();
        $data = $model->where($arrParam)->findAll();
        if ($data) {
            return $this->respond($data);
        }
        return false;
    }

    public function create()
    {
        #ini kalo dari frontend
        $input = $this->request->getPost();
        // $data1 = json_decode(json_encode($input), true);
        // $data2 = key((array)json_decode(json_encode($input), true));
        $data3 = json_decode(key((array)json_decode(json_encode($input), true)), true);
        $data = str_replace('_', ' ', $data3);
        // return $this->respond($data);

        if (!$this->validation->run($data, 'surveillanceValCreate')) {
            return $this->respond([
                'status' => 400,
                'error' => true,
                'data' => $this->validation->getErrors()
            ], 400);
        }

        // $strItem = str_replace('_', ' ', $data['item']);

        $item = new \App\Entities\Surveillance();
        $item->fill($data);
        $item->maintenance_date = $this->datetime;
        $item->status = 1;
        // $item->location = 1;

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

    public function uploadFile($file)
    {
        // $file = $this->request->getFile('remark_file');
        $rules = [
            'remark_file' => 'uploaded[remark_file]|max_size[remark_file,10240]|ext_in[remark_file,pdf,png,jpg,jpeg,heif,hevc,xlsx,docx,txt]',
        ];
        //cek uploaded via http
        if (!$file->isvalid()) {
            return 'error';
        }
        // cek sesuai rules
        // if (!$this->validate($rules)) {
        //     return 'error';
        // }
        $namaFileBaru = $file->getRandomName();
        $file->move($this->PATH_UPLOADED, $namaFileBaru);
        return $file;
    }


    #update harian
    public function update($id = null)
    {
        #ini kalo dari frontend
        // $input = $this->request->getPost();
        $input = $this->request->getRawInput();
        $data['id_surv'] = $id;
        $data3 = json_decode(key((array)json_decode(json_encode($input), true)), true);
        $data = str_replace('_', ' ', $data3);

        #testing from backend
        if (!$this->model->find($id)) {
            return $this->fail('id not found');
        }

        // $validate = $this->validation->run($data, 'surveillanceValCreate');
        // $errors = $this->validation->getErrors();
        // if ($errors) {
        //     return $this->fail($errors);
        // }

        // return $this->respond($data, 400);

        if (!$this->validation->run($data, 'surveillanceValCreate')) {
            return $this->respond([
                'status' => 400,
                'error' => true,
                'data' => $this->validation->getErrors()
            ], 400);
        }


        $surv = new \App\Entities\Surveillance();
        $surv->fill($data);
        $surv->maintenance_date = $this->datetime;

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
        // return $this->respond($response, $code);
        return $this->respondUpdated($surv);
    }

    public function show($id = null)
    {
        $input = $this->model->find($id);
        if (!$input) {
            return $this->fail('id not found');
        }
        $model = new SurveillanceModel();
        $data = $model->getDetail($id);
        return $this->respond($data);
    }

    #delete = set status jadi 0 + update untuk remove (backllad / handover)
    public function delete($id = null)
    {
        #tambahin kondisi : yg bisa dihapus cuma yg statusnya installed & backload
        $data = $this->model->find($id);
        if (!$data) {
            return $this->fail('id not found');
        }
        $existStatus = $data->status;
        // $data->status = 2;
        if ($existStatus != 'Backload' && $existStatus != 'Installed') {
            return $this->respond($response = [
                'status' => 200,
                'error' => true,
                'data' => 'status item must be installed or backload',
            ], 200);
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
        $this->deleteFile($data->remark_file);
        return $this->respond($response, $code);
    }

    public  function deleteFile($file = null)
    {
        if (file_exists($this->PATH_UPLOADED . $file) && $file != null) {
            //kalo ada diapus dulu biar file ga numpuk di db
            unlink($this->PATH_UPLOADED . $file);
        }
    }

    public function handover($id = null)
    {
        //validasi
        $existItem = $this->model->find($id);
        if (!$existItem) {
            return $this->fail('id not found');
        }

        #ini kalo dari frontend
        $input = $this->request->getPost();
        $input['id_surv'] = $id;
        $data3 = json_decode(key((array)json_decode(json_encode($input), true)), true);
        $data = str_replace('_', ' ', $data3);

        // return $this->respond($this->request->getFile('remarkFile'));

        $surv = new \App\Entities\Surveillance();
        $surv->fill($data);
        $surv->maintenance_date = $this->datetime;

        //cek apakah param handover_file ada isinya?
        if ($this->request->getFile('remarkFile')) {
            #2
            $old_file = $existItem->remark_file;
            //file dengan id item tersebut ada ga?
            if (file_exists($this->PATH_UPLOADED . $old_file) && $old_file != null) {
                //kalo ada diapus dulu biar file ga numpuk di db
                unlink($this->PATH_UPLOADED . $old_file);
            }
            $file = $this->uploadFile($this->request->getFile('remarkFile'));
            if ($file == 'error') {
                return $this->respond([
                    'status' => 400,
                    'error' => true,
                    'data' => 'File format is not supported. File Format Supported : pdf, png, jpg, jpeg, heif, hevc, xlsx, docx, txt. Size maximum : 10 Mb'
                ], 400);
            }
            $surv->remark_file = $file->getName();
        }
        return $this->respond($surv);
        $action = $this->model->save($surv);
        if ($action) {
            $code = 200;
            $msg = 'handover success';
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

    public function download($id = null)
    {
        $model = new SurveillanceModel();
        $data = $model->find($id);
        if (!$data) {
            return $this->fail('id not found');
        }
        return $this->response->download('./assets/upload/' . $data->remark_file, null);
    }
}


//function upload file cara pertama
            #1
            // $file = $this->uploadFile($this->request->getFile('remark_file'));
            // //kalo balikan dari uploadFile ada yg error
            // if ($file == 'error') {
            //     return $this->respond([
            //         'status' => 400,
            //         'error' => true,
            //         'data' => 'File format is not supported. File Format Supported : pdf, png, jpg, jpeg, heif, hevc, xlsx, docx, txt. Size maximum : 10 Mb'
            //     ], 400);
            // } else {
            //     $old_file = $existItem->remark_file;
            //     // return $this->respond($old_file);
            //     //file dengan id item tersebut ada ga?
            //     if (file_exists($this->PATH_UPLOADED . '/' . $old_file)) {
            //         //kalo ada diapus dulu biar file ga numpuk di db
            //         unlink($this->PATH_UPLOADED . '/' . $old_file);
            //     }
            //     $surv->remark_file = $file->getName();
            // }


/*
validation form dari function create

        #testing from backend
        // $data = $this->request->getPost();
        // $validate = $this->validation->run($data, 'surveillanceValCreate'); //nama validasinya (app/config/validation)
        // $error = $this->validation->getErrors();
        // if ($error) {
        //     return $this->fail($error);
        // }

*/