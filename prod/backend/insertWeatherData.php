<?php
require 'authenticate.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    //$username_post = mysqli_real_escape_string($con, trim($request->username));
    //$password_post = mysqli_real_escape_string($con, trim($request->password));
    
    $pressure_post = mysqli_real_escape_string($con, filter_var($request->pressure, FILTER_VALIDATE_FLOAT));
    $temperature_post =mysqli_real_escape_string($con, filter_var($request->temperature, FILTER_VALIDATE_INT));
    $windSpeed_post = mysqli_real_escape_string($con, filter_var($request->windSpeed, FILTER_VALIDATE_INT));
    $humidity_post = mysqli_real_escape_string($con, filter_var($request->humidity, FILTER_VALIDATE_INT));
    $precipitation_post = mysqli_real_escape_string($con, filter_var($request->precipitation, FILTER_VALIDATE_FLOAT));

    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }
   // if (authenticate($username_post, $password_post)) {
        $sql = "INSERT INTO weather_station_data_tbl (pressure,temperature,windSpeed,humidity,precipitation) VALUES ('{$pressure_post}','{$temperature_post}','{$windSpeed_post}','{$humidity_post}','{$precipitation_post}')";
        if (mysqli_query($con, $sql)) {
            echo json_encode(true);
        } else {
            echo json_encode(false); //konnte nicht eingetragen werden
        }
    /*} else {
        echo json_encode(false); //Account nicht gefunden
    }*/
}
