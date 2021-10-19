<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class RemovedItem extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id_rmv'          => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true, //positif
                'auto_increment' => true,
            ],
            'item' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                //'unique' => true,
            ],
            'location' => [
                'type' => 'INT',
                'unsigned'       => true,
            ],
            'pn' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                //'unique' => true,
            ],
            'sn' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                //'unique' => true,
            ],
            'qty' => [
                'type' => 'INT',
                'constraint'     => 11,
            ],
            'category' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
            ],
            'jenis' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'null' => true,
            ],
            //bakal pindah ke tabel removed tools
            'remark_backload' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'null' => true,
            ],
            //bakal pindah ke tabel removed tools
            'boxcode_backload' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'null' => true,
            ],
            'maintenance_by' => [ //teknisi yg update
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'maintenance_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id_rmv', true);
        $this->forge->createTable('RemovedItem');
    }

    public function down()
    {
        $this->forge->dropTable('Surveillance');
    }
}
