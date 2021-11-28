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
            'rules' => 'required|max_length[100]',
            'errors' => [
                'required' => 'You must fill location name',
                'max_length' => 'maximum characters = 100',
            ],
        ],
        'password' => [
            'rules' => 'required|min_length[5]'
        ],
        // 'status' => [
        //     'rules' => 'required'
        // ]
    ];
    public $updateLocation = [
        //|is_unique[location.nama_lokasi,id_lokasi,{id_lokasi}]
        'nama_lokasi' => [
            'rules' => 'required|max_length[100]' //,id_lokasi,{id_lokasi}]',
        ],
        // 'status' => [
        //     'rules' => 'required'
        // ],
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
            'rules' => 'max_length[100]',
            'errors' => [
                'max_length' => 'maximum characters = 100',
            ],
        ],
        // 'location' => [
        //     'rules' => 'required'
        // ],
        'pn' => [
            'rules' => 'max_length[20]|min_length[4]',
            'errors' => [
                'max_length' => 'maximum characters = 20',
                'min_length' => 'mimimum characters = 4'
            ],
        ],
        'sn' => [
            'rules' => 'max_length[20]|min_length[4]', // '|is_unique[surveillance.sn]',
            'errors' => [
                'max_length' => 'Max character is 20',
                'min_length' => 'Min character is 4',
            ],
        ],
        'qty' => [
            'rules' => 'numeric',
            'errors' => [
                'number' => 'Quantity must be a number'
            ],
        ],
        // 'type' => [
        //     'rules' => 'required',
        //     'errors' => [
        //         'required' => 'You must fill type'
        //     ],
        // ],
        // 'condition' => [
        //     'rules' => 'required',
        //     'errors' => [
        //         'required' => 'You must fill condition'
        //     ],
        // ],
        'phone' => [
            'rules' => 'numeric',
            'errors' => [
                'number' => 'Phone must be a number'
            ],
        ],
        'tools_date_in' => [
            'rules' => 'Date',
            'errors' => [
                'Date' => 'You must fill tools in',
            ],
        ],
        'plan' => [
            'rules' => 'max_length[50]',
            'errors' => [
                'max_length' => 'maximum characters = 50',
            ],
        ],
        'steelbox' => [
            'rules' => 'max_length[20]',
            'errors' => [
                'max_length' => 'maximum characters = 20',
            ],
        ],
        // 'sheet' => [
        //     'rules' => 'required',
        //     'errors' => [
        //         'required' => 'You must fill Category',
        //     ],
        // ],
        // 'status' => [
        //     'rules' => 'required',
        //     'errors' => [
        //         'required' => 'You must fill Status',
        //     ],
        // ],
        'maintenance_by' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill PIC',
            ],
        ],
    ];

    public $surveillanceValUpdate = [
        'item' => [
            'rules' => 'required|max_length[100]',
            'errors' => [
                'required' => 'You must fill item',
            ],
        ],
        // 'location' => [
        //     'rules' => 'required'
        // ],
        'pn' => [
            'rules' => 'required|max_length[20]|min_length[4]',
            'errors' => [
                'required' => 'You must fill pn',
                'max_length' => 'maximum characters = 20',
                'min_length' => 'mimimum characters = 4'
            ],
        ],
        'sn' => [
            'rules' => 'required|max_length[20]|min_length[4]', // '|is_unique[surveillance.sn]',
            'errors' => [
                'required' => 'You must fill sn',
                // 'is_unique' => 'Serial Number is already inserted'
            ],
        ],
        'qty' => [
            'rules' => 'required|numeric',
            'errors' => [
                'required' => 'You must fill quantity',
                'number' => 'Quantity must be a number'
            ],
        ],
        'type' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill type'
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
        ],
        'tools_date_in' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill tools in',
            ],
        ],
        'plan' => [
            'rules' => 'required|max_length[50]',
            'errors' => [
                'required' => 'You must fill plan',
                'max_length' => 'maximum characters = 50',
            ],
        ],
        'steelbox' => [
            'rules' => 'max_length[20]',
            'errors' => [
                // 'required' => 'You must fill steelbox',
                'max_length' => 'maximum characters = 20',
            ],
        ],
        'sheet' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill Category',
            ],
        ],
        'status' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill Status',
            ],
        ],
        'maintenance_by' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'You must fill PIC',
            ],
        ],
    ];

    public $surveillanceValHandover = [
        'remark_file' => [
            'rules' => 'uploaded[remark_file]|max_size[remark_file,10240]|ext_in[remark_file,pdf,png,jpg,jpeg,heif,hevc,xlsx,docx,txt]',
            'errors' => [
                'max_size' => 'Maximum file size is 10Mb',
                'ext_in' => 'You can only upload file with extension jpg,png,doc,txt,xlsx'
            ],
        ],
    ];

    #User Register (Warehouse)
    public $warehouseRegist = [
        'username' => [
            'rules' => 'required|is_unique[user.username]',
            'errors' => [
                'required' => 'Username must fill',
                'is_unique' => 'Username has been used'
            ]
        ],
        'password' => [
            'rules' => 'required|min_length[6]|max_length[20]',
            'errors' => [
                'required' => 'Password must fill',
                'min_length' => 'Minimal length is 6 characters',
                'max_length' => 'Maximal length is 20 characters',
            ]
        ],
        'confpassword' => 'matches[password]',
        'email' => [
            'rules' => 'required|valid_email|is_unique[user.email]',
            'errors' => [
                'required' => 'Email must fill',
                'valid_email' => 'Format email must be valid',
                'is_unique' => 'Email has been used'
            ]
        ],
        'phone' => [
            'rules' => 'required|numeric',
            'errors' => [
                'required' => 'You must fill phone number',
                'number' => 'Phone must be a number'
            ],
        ]
    ];

    #User Update 
    public $updateUser = [
        'nama_user' => [
            'rules' => 'required|is_unique[user.username,id_user,{id_user}]',
            'errors' => [
                'required' => 'Username must fill',
                'is_unique' => 'Username has been used'
            ]
        ],
        'email' => [
            'rules' => 'required|valid_email|is_unique[user.email,id_user,{id_user}]',
            'errors' => [
                'required' => 'Email must fill',
                'valid_email' => 'Format email must be valid',
                'is_unique' => 'Email has been used'
            ]
        ],
        'phone' => [
            'rules' => 'required|numeric',
            'errors' => [
                'required' => 'You must fill phone number',
                'number' => 'Phone must be a number'
            ],
        ]
    ];


    #teknisi login 
    public $loginTeknisi = [
        'id_lokasi' => [
            'rules' => 'required',
            'errors' => [
                'required' => 'Location Name must fill',
            ]
        ],
        'password' => [
            'rules' => 'required|min_length[6]|max_length[20]',
            'errors' => [
                'required' => 'Password must fill',
                'min_length' => 'Minimal length is 6 characters',
                'max_length' => 'Maximal length is 20 characters',
            ]
        ],
        // 'phone' => [
        //     'rules' => 'numeric',
        //     'errors' => [
        //         // 'required' => 'You must fill phone number',
        //         'number' => 'Phone must be a number'
        //     ],
        // ]
    ];
}
