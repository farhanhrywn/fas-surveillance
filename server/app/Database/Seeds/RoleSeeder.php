<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\I18n\Time;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'nama_role' => 'supervisor',
                'status'    => '1',
                'create_by' => 'developer',
                'create_date'    => Time::now()
            ],
            [
                'nama_role' => 'warehouse',
                'status'    => '1',
                'create_by' => 'developer',
                'create_date'    => Time::now()
            ],
        ];

        // Simple Queries
        //$this->db->query("INSERT INTO location (nama_lokasi, alamat_lokasi, password, status, create_by, create_date) 
        //VALUES(:nama_lokasi:, :alamat_lokasi:, :password:, :status:, :create_by:, :create_date:)", $data);

        // Using Query Builder
        $this->db->table('role')->insertBatch($data);
    }
}
