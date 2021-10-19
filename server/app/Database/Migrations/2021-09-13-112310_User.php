<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class User extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id_user'          => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true, //positif
                'auto_increment' => true,
            ],
            'role'       => [
                'type'       => 'INT',
                'unsigned'       => true,
            ],
            'nama_user' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
            ],
            'username' => [
                'type' => 'VARCHAR',
                'constraint'     => 30,
                'unique' => true,
            ],
            'password' => [
                'type' => 'VARCHAR',
                'constraint'     => 30,
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
            ],
            'phone' => [
                'type' => 'VARCHAR',
                'constraint'     => 17,
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
        $this->forge->addKey('id_user', true);
        $this->forge->addforeignKey('role', 'Role', 'id_role');
        $this->forge->createTable('User');
    }

    public function down()
    {
        $this->forge->dropTable('User');
    }
}
