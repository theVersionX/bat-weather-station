

<?php
require 'authenticate.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    //test--------------------------------------------------------------------------------
    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }
        
    $sql = "INSERT INTO weather_station_data_tbl (fullPostMsg) VALUES ('some entry')";
    if (mysqli_query($con, $sql)) {
        echo json_encode(true);
    } else {
        echo json_encode(false); //konnte nicht eingetragen werden
    }
    
    //test--------------------------------------------------------------------------------

    /*
    
    $username_post = mysqli_real_escape_string($con, trim($request->username));
    $password_post = mysqli_real_escape_string($con, trim($request->password));
    $pressure_post=10;
    $temperature_post=25;
    $windStrength_post=140;
    $humidity_post=40;
    $precipitation_post=10;

    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }
        if (authenticate($username_post, $password_post)) {
            $sql = "INSERT INTO weather_station_data_tbl (pressure,temperature,windStrength,humidity,precipitation) VALUES ('{$pressure_post}','{$temperature_post}','{$windStrength_post}','{$date_post}','{$humidity_post}','{$precipitation_post}')";
            if (mysqli_query($con, $sql)) {
                echo json_encode(true);
            } else {
                echo json_encode(false); //konnte nicht eingetragen werden
            }
        } else {
            echo json_encode(false); //Account nicht gefunden
        }
    */
    
}
