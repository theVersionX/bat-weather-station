

<?php
require 'authenticate.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    $username_post = mysqli_real_escape_string($con, trim($request->username));
    $password_post = mysqli_real_escape_string($con, trim($request->password));
    $hardwareId_post = mysqli_real_escape_string($con, trim($request->hardwareId));


    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }
    
    if (authenticate($username_post, $password_post)) {

        if ($stmt = $con->prepare("SELECT hardware FROM weather_station_hardware_tbl WHERE id=?")) {
            $stmt->bind_param('s', $hardwareId_post);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $stmt->bind_result($hardware_db);
                $stmt->fetch();
                echo json_encode($hardware_db); //worked
            } else {
                echo json_encode(""); // didnt work (loaded 0 rows)
            }
            $stmt->close();
        } else {
            echo json_encode(""); //qry didnt work
        }
    } else {
        echo json_encode(""); //login didnt work
    }
}
