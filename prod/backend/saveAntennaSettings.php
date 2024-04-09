<?php
require 'authenticate.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    
    $username_post = mysqli_real_escape_string($con, trim($request->username));
    $password_post = mysqli_real_escape_string($con, trim($request->password));
    $antennaId_post = mysqli_real_escape_string($con, trim($request->antennaId));
    $antenna_post = mysqli_real_escape_string($con, trim($request->antenna));


    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

   // echo json_encode($antenna_post);

    if (authenticate($username_post, $password_post)) {
        $sql = "INSERT INTO weather_station_antennas_tbl (id, antenna) VALUES ('{$antennaId_post}','{$antenna_post}') ON DUPLICATE KEY UPDATE antenna='{$antenna_post}'";
        if (mysqli_query($con, $sql)) {
            echo json_encode(true);
        } else {
            echo json_encode(false); //konnte nicht eingetragen werden
        }
    } else {
        echo json_encode(false); //Account nicht gefunden
    }
    
}
