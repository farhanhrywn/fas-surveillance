<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Role extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id_role'          => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true, //positif
                'auto_increment' => true,
            ],
            'nama_role'       => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
                'unique' => true,
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
        $this->forge->addKey('id_role', true);
        $this->forge->createTable('Role');
    }

    public function down()
    {
        $this->forge->dropTable('Role');
    }
}
