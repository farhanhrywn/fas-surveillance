<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\I18n\Time;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'role'       => '1',
                'nama_user' => 'Heri',
                'username' => 'HeriSpv',
                'password' => 'HeriSpv',
                'email' => 'heri@email.com',
                'phone' => '098345983498',
                'status' => 1,
                'create_by' => 'developer',
                'create_date' => Time::now()
            ],
            [
                'role'       => '2',
                'nama_user' => 'Warehouse Man',
                'username' => 'WarehouseMan',
                'password' => 'WarehouseMan',
                'email' => 'WarehouseMan@email.com',
                'phone' => '098345983498',
                'status' => 1,
                'create_by' => 'developer',
                'create_date' => Time::now()
            ],
        ];

        // Simple Queries
        //$this->db->query("INSERT INTO location (nama_lokasi, alamat_lokasi, password, status, create_by, create_date) 
        //VALUES(:nama_lokasi:, :alamat_lokasi:, :password:, :status:, :create_by:, :create_date:)", $data);

        // Using Query Builder
        $this->db->table('User')->insertBatch($data);
    }
}
