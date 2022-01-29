<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class RemarkHistory extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true, //positif
                'auto_increment' => true,
            ],
            'item'       => [
                'type'       => 'INT',
                'unsigned'       => true, //positif
            ],
            'remark'       => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ],
            'create_by' => [
                'type' => 'VARCHAR',
                'constraint'     => '255',
                'null' => true,
            ],
            'create_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addforeignKey('item', 'Surveillance', 'id_surv');
        $this->forge->createTable('RemarkHistory');
    }

    public function down()
    {
        //
    }
}
