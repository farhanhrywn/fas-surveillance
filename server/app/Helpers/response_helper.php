<?php

function reponseHelper($action)
{
    if ($action) {
        $code = 200;
        $msg = 'insert success';
        $response = [
            'status' => $code,
            'error' => false,
            'data' => $msg,
        ];
    } else {
        $code = 400;
        $msg = 'insert failed';
        $response = [
            'status' => $code,
            'error' => false,
            'data' => $msg,
        ];
    }
    return $response;
}
