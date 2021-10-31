<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Location extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id_lokasi'          => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true, //positif
                'auto_increment' => true,
            ],
            'nama_lokasi'       => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
                //'unique' => true,
            ],
            'alamat_lokasi' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'null' => true,
            ],
            'password' => [
                'type' => 'VARCHAR',
                'constraint'     => '255',
                'null' => true,
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['active', 'inactive'],
            ],
            'create_by' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'create_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'update_by' => [
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'update_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id_lokasi', true);
        $this->forge->createTable('Location');
    }

    public function down()
    {
        $this->forge->dropTable('Location');
    }
}
