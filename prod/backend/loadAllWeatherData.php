

<?php
require 'authenticate.php';

//functions--------------------------------------------------------
$allWeatherData;

function addWeatherDataToAllWeatherData($data_db, $ind)
{
    global $allWeatherData;

    $weatherData = [
        'id' => filter_var($data_db["id"], FILTER_VALIDATE_INT),
        'timestamp' => $data_db["timestamp"],
        'pressure' => filter_var($data_db["pages"], FILTER_VALIDATE_INT),
        'temperature' => filter_var($data_db["temperature"], FILTER_VALIDATE_INT),
        'windStrength' => filter_var($data_db["windStrength"], FILTER_VALIDATE_INT),
        'humidity' => filter_var($data_db["humidity"], FILTER_VALIDATE_INT),
        'precipitation' => filter_var($data_db["precipitation"], FILTER_VALIDATE_INT),
    ];
    $allWeatherData[$ind] = $weatherData;
}

//main---------------------------------------------------------------
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    $username_post = mysqli_real_escape_string($con, trim($request->username));
    $password_post = mysqli_real_escape_string($con, trim($request->password));


    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    if (authenticate($username_post, $password_post)) {

        $qry = mysqli_query($con, "SELECT * FROM weather_station_data_tbl");
        $tempInd = 0;
        while ($result = mysqli_fetch_array($qry)) {
            addWeatherDataToAllWeatherData($result, $tempInd);
            $tempInd++;
        }
        echo json_encode($allWeatherData);
    }
}
