<?php
require 'accessHeaders.php';

/*#####################################################################
To use your own Server, provide below informations. rename this file to database.php and upload all Files inside "backend" folder to https://your-domain.ch/api.
Inside frontend Project -> services/global-variables.service change change server path
For Database structure see Database Schema in schema.sql
*/#####################################################################

define('DB_HOST', '');
define('DB_USER', '');
define('DB_PASS', '');
define('DB_NAME', '');

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

function connect()
{
  $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  if (mysqli_connect_errno()) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();
