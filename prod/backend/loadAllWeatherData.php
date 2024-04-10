

<?php
require 'authenticate.php';

//functions--------------------------------------------------------
$allWeatherData;
$weatherData = [
    'ids' => [],
    'timestamps' => [],
    'pressures' => [],
    'temperatures' => [],
    'windStrengths' => [],
    'humidities' => [],
    'precipitations' => [],
];
function addWeatherDataToAllWeatherData($data_db, $ind)
{
    global $allWeatherData;
/*
    $weatherData = [
        'id' => filter_var($data_db["id"], FILTER_VALIDATE_INT),
        'timestamp' => $data_db["timestamp"],
        'pressure' => filter_var($data_db["pressure"], FILTER_VALIDATE_INT),
        'temperature' => filter_var($data_db["temperature"], FILTER_VALIDATE_INT),
        'windStrength' => filter_var($data_db["windStrength"], FILTER_VALIDATE_INT),
        'humidity' => filter_var($data_db["humidity"], FILTER_VALIDATE_INT),
        'precipitation' => filter_var($data_db["precipitation"], FILTER_VALIDATE_INT),
    ];
    */

    $allWeatherData['ids'][$ind]=filter_var($data_db["id"], FILTER_VALIDATE_INT);
    $allWeatherData['timestamps'][$ind]=$data_db["timestamp"];
    $allWeatherData['pressures'][$ind]=filter_var($data_db["pressure"], FILTER_VALIDATE_FLOAT);
    $allWeatherData['temperatures'][$ind]=filter_var($data_db["temperature"], FILTER_VALIDATE_INT);
    $allWeatherData['windSpeeds'][$ind]=filter_var($data_db["windSpeed"], FILTER_VALIDATE_INT);
    $allWeatherData['humidities'][$ind]=filter_var($data_db["humidity"], FILTER_VALIDATE_INT);
    $allWeatherData['precipitations'][$ind]=filter_var($data_db["precipitation"], FILTER_VALIDATE_FLOAT);

    //$allWeatherData[$ind] = $weatherData;
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
