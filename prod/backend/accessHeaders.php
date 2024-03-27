<?php

session_start();
$http_origin = $_SERVER['HTTP_ORIGIN'];

/*
if ($http_origin == "https://stack.versionx.ch" || $http_origin == "http://localhost:4200")
{  
    header("Access-Control-Allow-Origin: $http_origin");
}
*/
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: https://test.exo-productions.ch");
//header("Access-Control-Allow-Origin: http://localhost:4200");

header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");