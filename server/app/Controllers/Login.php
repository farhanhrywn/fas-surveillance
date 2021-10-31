<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use App\Models\LocationModel;

use \Firebase\JWT\JWT;

class Login extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */

    public function __construct()
    {
        $this->validation = \Config\Services::validation();
    }


    public function index()
    {
        //
    }

    public function loginLocation()
    {
        helper(['form']);

        $input = $this->request->getPost();
        $validate = $this->validation->run($input, 'loginTeknisi'); //nama validasinya (app/config/validation)
        $error = $this->validation->getErrors();
        if ($error) {
            return $this->fail($error);
        }

        $model = new LocationModel();

        $teknisi = $model->Where('alamat_lokasi', $this->request->getVar('nama_lokasi'))->first();
        if (!$teknisi) return $this->failNotFound('Nama Lokasi not Found');
        //return $this->respond($this->request->getVar('password'));

        $verify = password_verify($this->request->getVar('password'), $teknisi['password']); //ini kalo passwordnya udah di hash
        //$verify = $this->checkPass($this->request->getVar('password'), $teknisi['password']);
        if (!$verify) return $this->failNotFound('Wrong Password');


        //bikin jwt nya
        $key = getenv('JWT_SECRET_KEY');
        $requestTime = time();
        $tokenTime = getenv('TOKEN_TIME_TO_LIVE');
        $expiredTime = $tokenTime + $requestTime; //token dari env + waktu sekarang
        $payload = array(
            "iat" => $requestTime, //1356999524,
            "nbf" => $expiredTime, //1357000000,
            "uid" => $teknisi['id_lokasi'],
            "lokasi" => $teknisi['nama_lokasi'],
        );
        $token = JWT::encode($payload, $key);
        return $this->respond($token);
    }

    public function checkPass($param1 = null, $param2 = null)
    {
        if ($param1 == $param2) return true;
        return false;
    }

    public function loginSpv()
    {
    }

    public function loginWH()
    {
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
