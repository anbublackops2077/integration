
function customCodeValidation(obj) 
{

    var msg = obj.alt; 
    // Call for is required 
    
    // Call for char valdation.
    if(!customCheckValidChars(obj,specialCharForCode)){ 
        setObjFocus(obj)
        return false;
    }

    // Call For Max Len.
    if(obj.value.length > 25) 
    {
        alert(msg+" field should be less than or equal to 25");
        setObjFocus(obj);
        return false;
    }   
    
    // Change To Upper field values
    var val = obj.value;
    val = val.substring(0,val.length).toUpperCase()
    obj.value = MyTrim(val);
    
    return true;
}

function customCodeValidationFor50Chars(obj) 
{

    var msg = obj.alt; 
    // Call for is required 
    
    // Call for char valdation.
    if(!customCheckValidChars(obj,specialCharForCode)){ 
        setObjFocus(obj)
        return false;
    }

    // Call For Max Len.
    if(obj.value.length > 50) 
    {
        alert(msg+" field should be less than or equal to 50");
        setObjFocus(obj);
        return false;
    }   
    
    // Change To Upper field values
    var val = obj.value;
    val = val.substring(0,val.length).toUpperCase();
    obj.value = MyTrim(val);
    
    return true;
}



function customNameValidation(obj) 
{
    var msg = obj.alt; 
    
    if(!customCheckValidChars(obj,specialCharForName)){
        setObjFocus(obj);
        return false;
    }
    if(!validateLengthForName(obj)){
        setObjFocus(obj);
        return false;
    }
    return true;
}

function customNameValidationFor100Chars(obj) 
{
    
    var msg = obj.alt; 
    
     // Call For Max Len.
    if(obj.value.length > 100) 
    {
        alert(msg+" field should be less than or equal to 100");
        setObjFocus(obj);
        return false;
    }   
    
    if(!customCheckValidChars(obj,specialCharForName)){
        setObjFocus(obj);
        return false;
    }
        
        
    return true;
}

function customAddressValidation(obj) 
{
    
    var msg = obj.alt; 

    
    // Call for char valdation.
    if(!customCheckValidChars(obj,specialCharForAddress)){
        setObjFocus(obj)
        return false;
    }
        
    // Call For Max Len.
    if(obj.value.length > 100)
    {
        alert(msg+" field should be less than or equal to 100");
        setObjFocus(obj);
        return false;
    }

    
     // Change To Upper field values
    var result = "";
    var words = obj.value.split(" ");
    var count = words.length;
    
    for(var i=0;i<count;i++)
    {
       result += parse(words[i]) + " ";
    }
    result += parse(words[i]);
    obj.value = MyTrim(result);
    
    return true;
}


function customAddressValidationFor100Chars(obj) 
{
    
    var msg = obj.alt; 

    
    // Call for char valdation.
    if(!customCheckValidChars(obj,specialCharForAddress)){
        setObjFocus(obj)
        return false;
    }
        
    // Call For Max Len.
    if(obj.value.length > 100)
    {
        alert(msg+" field should be less than or equal to 100");
        setObjFocus(obj);
        return false;
    }

    
     // Change To Upper field values
    var result = "";
    var words = obj.value.split(" ");
    var count = words.length;
    
    for(var i=0;i<count;i++)
    {
       result += parse(words[i]) + " ";
    }
    result += parse(words[i]);
    obj.value = MyTrim(result);
    
    return true;
}

function customPinCodeValidation(obj) 
{
    
    var msg = obj.alt; 
    
    if(!customCheckValidCharsAllowNull(obj,specialCharForPincode)){
        setObjFocus(obj)
        return false;
    }
        
    return true;
}
function customPinCodeValidationAllowNull(obj) 
{
    
    var msg = obj.alt; 
    
    if(!customCheckValidCharsAllowNull(obj,specialCharForPincode)){
        setObjFocus(obj)
        return false;
    }
        
    return true;
}

function customTelFaxNoValidation(obj) 
{
    
    var msg = obj.alt; 
    
    if(!customCheckValidChars(obj,specialCharForTelFaxNo)){
        setObjFocus(obj)
        return false;
    }
        
    return true;
}


function customAccountNoValidation(obj) 
{
    
    var msg = obj.alt; 
    
    if(!customCheckValidChars(obj,specialCharForAccNo)){
        setObjFocus(obj)
        return false;
    }
        
    return true;
}

function customEmailValidation(obj) {
    var emailStr = obj.value;
    var emails= emailStr.split(",");
    for(i=0;i<emails.length;i++){
        if(!checkSingleEmailValidation(emails[i]))
        return false;
    }
    return true;
}

function checkSingleEmailValidation(emailStr){
        if (emailStr.length == 0) {
            return true;
        }
        //Addde By Mahesh To Skip the Special Charater Like % on 16 Aug 2011 
        if (emailStr.match("%")) {
            alert("Please Enter a Valid Email Address ");
            return false;
        }
        
        var emailPat=/^(.+)@(.+)$/;
        var specialChars="\\(\\)@,\\\\\\\"\\.\\[\\]#";
        var validChars="\[^\\s" + specialChars + "\]";
        var quotedUser="(\"[^\"]*\")";
        var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
        var atom=validChars + '+';
        var word="(" + atom + "|" + quotedUser + ")";
        var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
        var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
        var matchArray=emailStr.match(emailPat);
        if (matchArray == null) {
                alert("Please Enter a Valid Email Address ");
                return false;
        }
        var user=matchArray[1];
        var domain=matchArray[2];
        if (user.match(userPat) == null) {
            alert("Please Enter a Valid Email Address ");
            return false;
       }
       var IPArray = domain.match(ipDomainPat);
       if (IPArray != null) {
           for (var i = 1; i <= 4; i++) {
              if (IPArray[i] > 255) {
                     alert("Please Enter a Valid Email Address ");
                     return false;
              }
           }
           return true;
       }
       var domainArray=domain.match(domainPat);
       if (domainArray == null) {
            alert("Please Enter a Valid Email Address ");
            return false;
       }
       var atomPat=new RegExp(atom,"g");
       var domArr=domain.match(atomPat);
       var len=domArr.length;
       if ((domArr[domArr.length-1].length < 2) ||
           (domArr[domArr.length-1].length > 7)) {
             alert("Please Enter a Valid Email Address ");
             return false;
       }
       if (len < 2) {
            alert("Please Enter a Valid Email Address ");
            return false;
       }
       return true;
}
function customCheckValidCharsAllowNull(obj,allowedChars)
{
    var msg = obj.alt;
    var allowedChar  = allowedChars.split(",");

    var str = new String(obj.value)
    var chk = false;
     var Pat=new RegExp(allowedChars);
     
     
     return true;
     
}


function customCheckValidChars(obj,allowedChars)
{
    var msg = obj.alt;
    var allowedChar  = allowedChars.split(",");
    if(!checkIsNull(obj, msg))
        return false;

    var str = new String(obj.value)
    var chk = false;
     var Pat=new RegExp(allowedChars);
     
     if (str.match(Pat) == null) {
         alert("Please Enter Correct Value For "+msg);
          obj.select();
          setObjFocus(obj);
           return false;
     }
     
     return true;
     
}

function checkValidChar(asciiCode, char)
{
    if(String.fromCharCode(asciiCode) == char)
    {
        return true;
    }
    else
    {
        return false;
    }
    
    }
function validateLengthForName( obj, msg) {
    if(obj.value.length > 50)
    {
        var ms = obj.alt;
        if(ms == "")
            ms = obj.title;
            
        alert(ms+" field should be less than or equal to 50");
        setObjFocus(obj);
        return false;
    }
    var result = "";
    var words = obj.value.split(" ");
    var count = words.length;
    
    
    return true;
} 
function customNameValidationAllowNull(obj) 
{
    
    var msg = obj.alt; 
    
    if(!customCheckValidCharsAllowNull(obj,specialCharForName)){
        setObjFocus(obj);
        return false;
    }
        
    if(!validateLengthForName(obj)){
        setObjFocus(obj);
        return false;
    }
        
    return true;
}

function customNameValidationFor200Chars(obj) 
{
    
    var msg = obj.alt; 
    
     // Call For Max Len.
    if(obj.value.length > 200) 
    {
        alert(msg+" field should be less than or equal to 200");
        setObjFocus(obj);
        return false;
    }   
    
    if(!customCheckValidChars(obj,specialCharForName)){
        setObjFocus(obj);
        return false;
    }
        
        
    return true;
}


function customAddressValidationFor50Chars(obj) 
{
    
    var msg = obj.alt; 

    
    // Call for char valdation.
    if(!customCheckValidChars(obj,specialCharForAddress)){
        setObjFocus(obj)
        return false;
    }
        
    // Call For Max Len.
    if(obj.value.length > 50)
    {
        alert(msg+" field should be less than or equal to 50");
        setObjFocus(obj);
        return false;
    }

    
     // Change To Upper field values
    var result = "";
    var words = obj.value.split(" ");
    var count = words.length;
    
    for(var i=0;i<count;i++)
    {
       result += parse(words[i]) + " ";
    }
    result += parse(words[i]);
    obj.value = MyTrim(result);
    
    return true;
}


function customCodeValidationFor50Chars(obj) 
{

    var msg = obj.alt; 
    // Call for is required 
    
    // Call for char valdation.
    if(!customCheckValidChars(obj,specialCharForCode)){ 
        setObjFocus(obj)
        return false;
    }

    // Call For Max Len.
    if(obj.value.length > 50) 
    {
        alert(msg+" field should be less than or equal to 50");
        setObjFocus(obj);
        return false;
    }   
    
    // Change To Upper field values
    var val = obj.value;
    val = val.substring(0,val.length).toUpperCase()
    obj.value = MyTrim(val);
    
    return true;
}