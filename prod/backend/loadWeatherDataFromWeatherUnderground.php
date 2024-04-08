<?php
require 'accessHeaders.php';
// API URL
$url = 'https://api.weather.com/v2/pws/observations/current?stationId=IHORW43&format=json&units=m&apiKey=e6ed9af54b7b4010ad9af54b7b90108f';

// Fetch data
$response = file_get_contents($url);

// Decode JSON response
$data = json_decode($response, true);

// Check if data is successfully retrieved
if ($data !== null) {
    // Access data
    //var_dump($data);
    echo json_encode($data);
} else {
    echo "Failed to fetch data from the API.";
}
