<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Request extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id_req'          => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true, //positif
                'auto_increment' => true,
            ],
            'item' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'unique' => true,
            ],
            'location' => [
                'type' => 'INT',
                'unsigned'       => true,
            ],
            'qty' => [
                'type' => 'INT',
                'constraint'     => 11,
            ],
            'req_to' => [ //spv / warehouse
                'type' => 'VARCHAR',
                'constraint'     => 100,
            ],
            'email_to' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
            ],
            'phone' => [ //hp teknisi
                'type' => 'VARCHAR',
                'constraint'     => 17,
                'null' => true,
            ],
            'req_status' => [
                'type' => 'ENUM',
                'constraint' => ['accept', 'rejected', 'waiting'],
            ],
            'seen_status' => [
                'type' => 'ENUM',
                'constraint' => ['seen', 'not seen'],
            ],
            'create_by' => [ //teknisi yg request
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'create_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'update_by' => [ //yang konfirmasi (spv / warehouse)
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'update_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id_req', true);
        $this->forge->addforeignKey('location', 'Location', 'id_lokasi');
        $this->forge->createTable('Request');
    }

    public function down()
    {
        $this->forge->dropTable('Request');
    }
}
