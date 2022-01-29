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
        // $input = [
        //     'id_surv' => $this->request->getVar('id_lokasi'),
        //     'pic_name' => $this->request->getVar('pic_name'),
        //     'password' => $this->request->getVar('password'),
        //     'pic_phone' => $this->request->getVar('pic_phone'),
        // ];
        // $validate = $this->validation->run($input, 'loginTeknisi'); //nama validasinya (app/config/validation)
        // $error = $this->validation->getErrors();
        // if ($error) {
        //     return $this->fail($error);
        // }

        // $data3 = json_decode(key((array)json_decode(json_encode($input), true)), true);
        // $input = str_replace('_', ' ', $data3);

        // if (!$this->validation->run($input, 'loginTeknisi')) {
        //     return $this->respond([
        //         'status' => 400,
        //         'error' => true,
        //         'data' => $this->validation->getErrors()
        //     ], 400);
        // }
        // return $this->respond($input);
        $model = new LocationModel();
        // return $this->respond($input);
        $teknisi = $model->Where('id_lokasi', $this->request->getVar('id_lokasi'))->first();
        // $teknisi = $model->Where('id_lokasi', $input['id_lokasi'])->first();
        if (!$teknisi) return $this->failNotFound('ID Lokasi not Found');
        //return $this->respond($this->request->getVar('password'));

        // $verify = $input['password'] == 'password'
        //     ? password_verify($input['password'], $teknisi['password'])
        //     : $this->checkPass($this->request->getVar('password'), $teknisi['password']);

        $verify = password_verify($this->request->getVar('password'), $teknisi['password']); //ini kalo passwordnya udah di hash
        // $verify = password_verify($input['password'], $teknisi['password']);
        // $verify = $this->checkPass($this->request->getVar('password'), $teknisi['password']);
        if (!$verify) return $this->failNotFound('Wrong Password');


        //bikin jwt nya
        $key = getenv('JWT_SECRET_KEY');
        $requestTime = time();
        $tokenTime = getenv('TOKEN_TIME_TO_LIVE');
        $expiredTime = $tokenTime + $requestTime; //token dari env + waktu sekarang
        $payload = array(
            "iat" => $requestTime, //1356999524,
            "nbf" => $expiredTime, //1357000000,
            "loc_id" => $teknisi['id_lokasi'],
            "lokasi" => $teknisi['nama_lokasi'],
        );
        $token = JWT::encode($payload, $key);
        $response = [
            'data' => $payload,
            'token' => $token,
        ];
        return $this->respond($response);
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
