<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class Register extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */

    use ResponseTrait;

    public function __construct()
    {
        $this->validation = \Config\Services::validation();
    }

    public function index()
    {
        helper(['form']);
        $input = $this->request->getPost();
        $validate = $this->validation->run($input, 'warehouseRegist'); //nama validasinya (app/config/validation)
        $error = $this->validation->getErrors();
        if ($error) {
            return $this->fail($error);
        }

        $data = [
            'role' => 2,
            'nama_user' => $this->request->getVar('nama_user'),
            'username' => $this->request->getVar('username'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
            'email' => $this->request->getVar('email'),
            'phone' => $this->request->getVar('phone'),
            'status' => 1,
            'create_by' => $this->request->getVar('nama_user'),
        ];

        $warehouseAkun = new Usermodel();
        $action = $warehouseAkun->save($data);
        if ($action) {
            $code = 200;
            $msg = 'register success';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        } else {
            $code = 400;
            $msg = 'register failed';
            $response = [
                'status' => $code,
                'error' => false,
                'data' => $msg,
            ];
        }
        return $this->respond($response, $code);
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
