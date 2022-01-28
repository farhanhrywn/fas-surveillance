<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class SurveillanceAddingFields extends Migration
{
    public function up()
    {
        // $this->forge->addField();
        $data = [
            'plan'     => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'after' => 'location'
            ],
            'steelbox'     => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'after' => 'sheet'
            ],
            'tools_date_in'     => [
                'type' => 'DATETIME',
                'after' => 'phone'
            ],
            'type'     => [
                'type' => 'VARCHAR',
                'constraint'     => 255,
                'after' => 'id_surv'
            ]
            // ,
            // 'status' => [
            //     'type' => 'ENUM', #1       #2       #3           #4       #5       #6          #7               #8           #9
            //     'constraint' => ['New', 'Pulled', 'Running', 'Move', 'Backup', 'Standby', 'Used Item', 'Installed', 'Backload'],
            // ],
        ];
        $this->forge->addColumn('Surveillance', $data);
    }

    public function down()
    {
        //
    }
}
