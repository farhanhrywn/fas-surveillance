<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class SurveillanceAddSubLocation extends Migration
{
    public function up()
    {
        $data = [
            'subLocation'     => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'after' => 'location'
            ],
        ];
        $this->forge->addColumn('surveillance', $data);
    }

    public function down()
    {
        //
    }
}
