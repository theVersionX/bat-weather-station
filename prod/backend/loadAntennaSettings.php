

<?php
require 'authenticate.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    $username_post = mysqli_real_escape_string($con, trim($request->username));
    $password_post = mysqli_real_escape_string($con, trim($request->password));
    $antennaId_post = mysqli_real_escape_string($con, trim($request->antennaId));


    if (mysqli_connect_errno()) {
        exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    if (authenticate($username_post, $password_post)) {

        if ($stmt = $con->prepare("SELECT antenna FROM weather_station_antennas_tbl WHERE id=?")) {
            $stmt->bind_param('s', $antennaId_post);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $stmt->bind_result($antenna_db);
                $stmt->fetch();
                echo json_encode($antenna_db); //worked
            } else {
                echo json_encode(-1); // didnt work (loaded 0 rows)
            }
            $stmt->close();
        } else {
            echo json_encode(-2); //qry didnt work
        }
    } else {
        echo json_encode(-3); //login didnt work
    }
}
