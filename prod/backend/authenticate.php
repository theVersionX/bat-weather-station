<?php
require 'database.php';

function authenticate($username_post, $password_post)
{
    if($username_post=="HB9HSLU" && $password_post=="super_secure_pw"){
        return true;
    }else{
        return false;
    }
}
