<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\I18n\Time;
use DateTime;
use CodeIgniter\HTTP\Request;

class Surveillance extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
    protected $format = 'json';
    protected $datetime;


    public function login(Request $request)
    {
    }
}
