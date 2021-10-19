<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\I18n\Time;

class RequestSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'item' => "pipe",
                'location' => 1,
                'qty' => 1,
                'req_to' => "spv",
                'email_to' => "heri@email.com",
                'phone' => "092839489899",
                'req_status' => 3,
                'seen_status' => 2,
                'create_by' => "system",
                'create_date' => Time::now()
            ],
            [
                'item' => "cable",
                'location' => 2,
                'qty' => 1,
                'req_to' => "wh",
                'email_to' => "wh1@email.com",
                'phone' => "0938459893485",
                'req_status' => 3,
                'seen_status' => 1,
                'create_by' => "system",
                'create_date' => Time::now()
            ]
        ];

        // Simple Queries
        //$this->db->query("INSERT INTO location (nama_lokasi, alamat_lokasi, password, status, create_by, create_date) 
        //VALUES(:nama_lokasi:, :alamat_lokasi:, :password:, :status:, :create_by:, :create_date:)", $data);

        // Using Query Builder
        $this->db->table('Request')->insertBatch($data);
    }
}
