<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\I18n\Time;

class SurveillanceSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'item' => "Chain: Lifting Equipment Clamp, Chain Length 22 in",
                'location' => 1,
                'pn' => "902437",
                'sn' => "SLB-15352",
                'qty' => 1,
                'category' => "Tools",
                'condition' => "Good",
                'cert_date' => Time::createFromDate(2020, 5, 22), //date_parse("2020-05-22"),
                'maintenance_by' => "Developer",
                'phone' => "09823049580",
                'maintenance_date' => Time::Now(),
                'status' => 1
            ],
            [
                'item' => "Spreader: Lifting Equipment Clamp, Chain Length 33",
                'location' => 1,
                'pn' => "100367280",
                'sn' => "SLB-15353",
                'qty' => 1,
                'category' => "Tools",
                'condition' => "Good",
                'cert_date' => Time::createFromDate(2020, 5, 22), //date_parse("2020-05-22"),
                'maintenance_by' => "Developer",
                'phone' => "09823049580",
                'maintenance_date' => Time::Now(),
                'status' => 1
            ],
            [
                'item' => "item location 2 (1)",
                'location' => 2,
                'pn' => "902437",
                'sn' => "SLB-15354",
                'qty' => 1,
                'category' => "Tools",
                'condition' => "Good",
                'cert_date' => Time::createFromDate(2020, 5, 22), //date_parse("2020-05-22"),
                'maintenance_by' => "Developer",
                'phone' => "09823049580",
                'maintenance_date' => Time::Now(),
                'status' => 1
            ],
            [
                'item' => "item location 2 (2)",
                'location' => 2,
                'pn' => "100367280",
                'sn' => "SLB-15355",
                'qty' => 1,
                'category' => "Tools",
                'condition' => "Good",
                'cert_date' => Time::createFromDate(2020, 5, 22), //date_parse("2020-05-22"),
                'maintenance_by' => "Developer",
                'phone' => "09823049580",
                'maintenance_date' => Time::Now(),
                'status' => 1
            ],
        ];

        // Simple Queries
        //$this->db->query("INSERT INTO location (nama_lokasi, alamat_lokasi, password, status, create_by, create_date) 
        //VALUES(:nama_lokasi:, :alamat_lokasi:, :password:, :status:, :create_by:, :create_date:)", $data);

        // Using Query Builder
        $this->db->table('Surveillance')->insertBatch($data);
    }
}
