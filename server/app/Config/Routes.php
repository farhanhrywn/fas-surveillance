<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');

#Surveillance Page
//$routes->get('/Surveillance', 'Surveillance::index', ['filter' => 'auth']);
$routes->get('/Surveillance/(:num)', 'Surveillance::indexByLocation/$1');
$routes->get('/Surveillance/(:num)/(:alpha)', 'Surveillance::indexByLocation/$1/$2');
$routes->get('/Surveillance/detail/(:num)', 'Surveillance::show/$1'); //get by ID
$routes->get('/Surveillance/downloadRemarks/(:num)', 'Surveillance::download/$1');
$routes->get('/Surveillance/getBackload/(:num)', 'Surveillance::getDataBackload/$1');
$routes->get('/Surveillance/exportToExcel/(:num)/(:alpha)', 'Surveillance::export_to_excel/$1/$2'); //param kedua isi backload kalo mau backload, isi selain backload kalo mau ambil yg aktif

//surveillance - ubah status jadi handover
//$routes->put('/Surveillance/handover/(:num)', 'Surveillance::handover/$1');
$routes->post('/Surveillance/handover/(:num)', 'Surveillance::handover/$1');
$routes->get('/Surveillance/SendEmail', 'Surveillance::sendEmail');

#User
//warehouse register 
$routes->post('register', 'Register::index');
$routes->post('User', 'User::index');

#Login
$routes->post('loginLoc', 'Login::loginLocation');
$routes->post('loginSpv', 'Login::loginSpv');
$routes->post('loginWH', 'Login::loginWH');

#Location
$routes->get('Location', 'Location::index');
$routes->get('/Location/show/(:num)', 'Location::show/$1');

#Request
$routes->get('Request', 'Request::index'); //index for all
$routes->get('/Request/detail/(:num)', 'Request::show/$1'); //get by ID for update request teknisi
$routes->get('/Request/(:num)/(:alpha)', 'Request::listRequestByLocation/$1/$2'); //view per lokasi + filter status request - for teknisi
//api update request status - [ spv & wh ]
//view request by req_to + filter lokasi - [ spv & wh ]
//count request for notification [ count request where status_seen = waiting ]

#RemarkHistory
$routes->get('RemarkHistory/(:num)', 'RemarkHistory::indexByItem/$1');
$routes->post('Remarks/(:num)', 'Remarks::saveRemarkHistory/(:num)');


$routes->resource('Role');
$routes->resource('User');
$routes->resource('Location');
$routes->resource('Request');
$routes->resource('Surveillance');
$routes->resource('RemarkHistory');

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
