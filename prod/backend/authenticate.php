<?php
require 'database.php';

function authenticate($username_post, $password_post)
{
    //authenticate--------------------------
    $authenticateRemoteUrl = 'https://versionx.ch/api/common/authenticate.php';
    $postData = array('username' => $username_post, 'password' => $password_post);
    $options = array('http' => array('method' => 'POST', 'header' => 'Content-type: application/x-www-form-urlencoded', 'content' => http_build_query($postData)));
    $authResult =  filter_var(file_get_contents($authenticateRemoteUrl, false, stream_context_create($options)), FILTER_VALIDATE_BOOLEAN);
    //authenticate--------------------------
    return $authResult;
}
