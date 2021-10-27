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
$routes->get('/', 'Home::index', ['filter' => 'auth']);

#Surveillance Page
//$routes->get('/Surveillance', 'Surveillance::index', ['filter' => 'auth']);
$routes->get('/Surveillance/(:num)', 'Surveillance::indexByLocation/$1');
$routes->get('/Surveillance/(:num)/(:num)', 'Surveillance::indexByLocation/$1/$2');
$routes->get('/Surveillance/detail/(:num)', 'Surveillance::show/$1');

//surveillance - ubah status jadi handover
//$routes->put('/Surveillance/handover/(:num)', 'Surveillance::handover/$1');
$routes->post('/Surveillance/handover/(:num)', 'Surveillance::handover/$1');

#warehouse register 
$routes->post('register', 'Register::index');

#Login
$routes->post('loginLoc', 'Login::loginLocation');
$routes->post('loginSpv', 'Login::loginSpv');
$routes->post('loginWH', 'Login::loginWH');

#Location
$routes->get('Location', 'Location::index', ['filter' => 'auth']);
$routes->get('/Location/show/(:num)', 'Location::show/$1');

$routes->resource('Role');
# $routes->resource('User');
$routes->resource('Location');
# $routes->resource('Request');
$routes->resource('Surveillance');

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
