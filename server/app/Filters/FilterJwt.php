<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Firebase\JWT\JWT;

use CodeIgniter\API\ResponseTrait;
use Exception;

class FilterJwt implements FilterInterface
{
    use ResponseTrait;
    public function before(RequestInterface $request, $arguments = null)
    {
        $key = getenv('JWT_SECRET_KEY');
        $header = $request->getServer('HTTP_AUTHORIZATION');
        $token = explode(' ', $header)[1];
        try {
            JWT::decode($token, $key, ['HS256']);
        } catch (Exception $e) {
            return Services::response()
                ->setJSON(['msg' => 'Invalid Token'])
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do something here
    }
}
