<?php

namespace Config;

use CodeIgniter\Validation\CreditCardRules;
use CodeIgniter\Validation\FileRules;
use CodeIgniter\Validation\FormatRules;
use CodeIgniter\Validation\Rules;

class Validation
{
    //--------------------------------------------------------------------
    // Setup
    //--------------------------------------------------------------------

    /**
     * Stores the classes that contain the
     * rules that are available.
     *
     * @var string[]
     */
    public $ruleSets = [
        Rules::class,
        FormatRules::class,
        FileRules::class,
        CreditCardRules::class,
    ];

    /**
     * Specifies the views that are used to display the
     * errors.
     *
     * @var array<string, string>
     */
    public $templates = [
        'list'   => 'CodeIgniter\Validation\Views\list',
        'single' => 'CodeIgniter\Validation\Views\single',
    ];

    //--------------------------------------------------------------------
    // Rules
    //--------------------------------------------------------------------

    #Location
    public $registLocation = [
        'nama_lokasi' => [
            'rules' => 'required|max_length[100]|is_unique[location.nama_lokasi]',
        ],
        'password' => [
            'rules' => 'required|min_length[5]'
        ],
        'status' => [
            'rules' => 'required'
        ]
    ];
    public $updateLocation = [
        'nama_lokasi' => [
            'rules' => 'required|max_length[100]|is_unique[location.nama_lokasi,id_lokasi,{id_lokasi}]',
        ],
        'status' => [
            'rules' => 'required'
        ],
        'update_by' => [
            'rules' => 'required'
        ],
    ];

    public $registRole = [
        'nama_role' => ['rules' => 'required'],
        'status' => ['rules' => 'required'],
        'create_by' => ['rules' => 'required'],
    ];



    #Surveillance |is_unique[surveillance.item] 'is_unique' => 'Item is already inserted'
    public $surveillanceValCreate = [
        'item' => [
            'rules' => 'required|max_length[100]',
            'errors' => [
                'required' => 'You must fill item',
            ],
        ],
        'location' => [
            'rules' => 'required'
        ],
        'pn' => [
            'rules' => 'required|max_length[20]|min_length[4]',
            'errors' => [
                'required' => 'You must fill pn',
                'max_length' => 'maximum characters = 20',
                'min_length' => 'mimimum characters = 20'
            ],
        ],
        'sn' => [
            'rules' => 'required|max_length[20]|min_length[4]|is_unique[surveillance.sn]',
            'errors' => [
                'required' => 'You must fill sn',
                'is_unique' => 'Serial Number is already inserted'
            ],
        ],
        'qty' => [
            'rules' => 'required|numeric',
            'errors' => [
                'required' => 'You must fill quantity',
                'number' => 'Quantity must be a number'
            ],
        ],
        'jenis' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill jenis'
            ],
        ],
        'condition' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill condition'
            ],
        ],
        'phone' => [
            'rules' => 'required|numeric',
            'errors' => [
                'required' => 'You must fill phone number',
                'number' => 'Phone must be a number'
            ],
        ]
    ];

    public $surveillanceValUpdate = [
        'item' => [
            'rules' => 'required|max_length[100]',
            'errors' => [
                'required' => 'You must fill item',
            ],
        ],
        'location' => [
            'rules' => 'required'
        ],
        'pn' => [
            'rules' => 'required|max_length[20]|min_length[4]',
            'errors' => [
                'required' => 'You must fill pn',
                'max_length' => 'maximum characters = 20',
                'min_length' => 'mimimum characters = 20'
            ],
        ],
        'sn' => [
            'rules' => 'required|max_length[20]|min_length[4]|is_unique[surveillance.sn,id_surv,{id_surv}]',
            'errors' => [
                'required' => 'You must fill item',
                'is_unique' => 'SN cannot same with another item'
            ],
        ],
        'qty' => [
            'rules' => 'required|numeric',
            'errors' => [
                'required' => 'You must fill quantity',
                'number' => 'Quantity must be a number'
            ],
        ],
        'jenis' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill jenis'
            ],
        ],
        'condition' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill condition'
            ],
        ],
        'phone' => [
            'rules' => 'required|numeric',
            'errors' => [
                'required' => 'You must fill phone number',
                'number' => 'Phone must be a number'
            ],
        ]
    ];
}
