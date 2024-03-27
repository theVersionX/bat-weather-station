

<?php
require 'authenticate.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    $username_post = mysqli_real_escape_string($con, trim($request->username));
    $password_post = mysqli_real_escape_string($con, trim($request->password));


    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    if (authenticate($username_post, $password_post)) {

        if ($stmt = $con->prepare("SELECT * FROM weather_station_data_tbl ORDER BY id DESC  LIMIT 1")) {
            //$stmt->bind_param('s', $userId_post);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $stmt->bind_result($id_db, $timestamp_db,$pressure_db,$temperature_db,$windStrength_db,$humidity_db,$precipitation_db);
                $stmt->fetch();

                $weatherData = [
                    'id' => filter_var($id_db, FILTER_VALIDATE_INT),
                    'timestamp' => $timestamp_db,
                    'pressure' => filter_var($pressure_db, FILTER_VALIDATE_INT),
                    'temperature' => filter_var($temperature_db, FILTER_VALIDATE_INT),
                    'windStrength' => filter_var($windStrength_db, FILTER_VALIDATE_INT),
                    'humidity' => filter_var($humidity_db, FILTER_VALIDATE_INT),
                    'precipitation' => filter_var($precipitation_db, FILTER_VALIDATE_INT),
                ];
                echo json_encode($weatherData);
            } else {
                echo json_encode(0);
            }
            $stmt->close();
        } else {
            echo json_encode(0);
        }
        
    } else {
        echo json_encode(0);
    }
    
}
