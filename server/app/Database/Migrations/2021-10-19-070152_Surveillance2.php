<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Surveillance2 extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id_surv'          => [
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
            'condition' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
            ],
            'cert_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            //bakal pindah ke tabel removed tools
            'handover_notes' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'null' => true,
            ],
            //bakal pindah ke tabel removed tools
            'handover_pict' => [
                'type' => 'VARCHAR',
                'constraint'     => 100,
                'null' => true,
            ],
            'maintenance_by' => [ //teknisi yg update
                'type' => 'VARCHAR',
                'constraint' => '50',
                'null' => true,
            ],
            'phone' => [ //hp teknisi
                'type' => 'VARCHAR',
                'constraint'     => 17,
                'null' => true,
            ],
            'maintenance_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['Active', 'Handover'],
            ],
        ]);
        $this->forge->addKey('id_surv', true);
        $this->forge->addforeignKey('location', 'Location', 'id_lokasi');
        $this->forge->createTable('Surveillance');
    }

    public function down()
    {
        $this->forge->dropTable('Surveillance');
    }
}
