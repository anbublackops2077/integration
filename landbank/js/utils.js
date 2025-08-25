		

var montharr = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

function Is()
{
    var agent = navigator.userAgent.toLowerCase();
    this.major = parseInt(navigator.appVersion);
    this.minor = parseFloat(navigator.appVersion);
    this.ns  = ((agent.indexOf('mozilla')!=-1) && ((agent.indexOf('spoofer')==-1) && (agent.indexOf('compatible') == -1)));
    this.ns2 = (this.ns && (this.major == 2));
    this.ns3 = (this.ns && (this.major == 3));
    this.ns4b = (this.ns && (this.minor < 4.04));
    this.ns4 = (this.ns && (this.major >= 4));
    this.ie   = (agent.indexOf("msie") != -1);
    this.ie3  = (this.ie && (this.major == 2));
    this.ie4  = (this.ie && (this.major >= 4));
    this.op3 = (agent.indexOf("opera") != -1);
    this.win   = (agent.indexOf("win")!=-1);
    this.mac   = (agent.indexOf("mac")!=-1);
    this.unix  = (agent.indexOf("x11")!=-1);
}

var is = new Is();

if(is.ns4) 
{
    doc = "document.layers";
    sty = "";
    htm = ".document"
} 
else if(is.ie4) 
{
    doc = "document.all";
    sty = ".style";
    htm = ""
}

function checkComboWithoutDefaultZeroValue(obj)
{   
    var msg = obj.title
    if(msg == null || msg == "")
	   	var msg = obj.alt 
   	 
    var str = obj.value;
    if(str == "")
    {
        setObjFocus(obj);
        alert("Please select "+msg+".")
        return false
    }
    return true
}

function isIE5()
{
    if (navigator.userAgent.indexOf("MSIE 5") != -1)
        return true;
    else
        return false;
}

function toggleDisabled(eToggle,iFirst,iLast)
{
    var bDisabled = (eToggle.checked ? false : true);
    var eForm = eToggle.form;
    for (var i=iFirst;i<=iLast;i++)
    {
        eForm.elements[i].disabled = bDisabled;
    }
}

function resetForm(eForm)
{
    eForm.reset();  
}

function setObjFocus(obj) {
	try {
     	 obj.focus();
     }
     catch(Exception) {
     }
}
/*
 * This function for validation codes in all masters
 */
function validateCode(obj) 
{
	var msg = obj.alt; 
	// Call for is required 
	
    // Call for char valdation.
    if(!checkInvalidChars(obj)) 
	    return false;

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

/*
 * This function for validation codes in all masters
 */
function validateName(obj) 
{
	
	var msg = obj.alt; 
	// Call for is required 
	
    // Call for char valdation.
    if(!checkInvalidCharsSpace(obj))
    	return false;
	
	if(!validateLengthForName(obj))
    	return false;
    
    return true;
}

function validateNameWithAllowToSpecChars(obj, specChars) 
{
	var msg = obj.alt; 
    if(!checkInvalidCharsSpaceAndAllowToSpecChars(obj))
    	return false;
	
	if(!validateLengthForName(obj, msg))
    	return false;
    
    return true;	
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
    
    for(var i=0;i<count;i++)
    {
       result += parse(words[i]) + " ";
    }
    result += parse(words[i]);
    obj.value = MyTrim(result);
    
    return true;
} 

function validateAddress(obj) 
{
	
	var msg = obj.alt; 
	// Call for is required 
	
    // Call for char valdation.
    if(!checkInvalidCharsSpaceAddress(obj))
    	return false;

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

function validateAddressFor100Chars(obj) 
{
	
	var msg = obj.alt; 
	
    // Call For Max Len.
    if(obj.value.length > 100)
    {
	    alert(msg+" field should be less than or equal to 100");
	    obj.value = "";
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


function checkInvalidCharsSpaceAddress(obj)
{
   var msg = obj.alt;      //Change made by Rohit on 10/04/2004
   if(!checkIsNull(obj, msg))
       return false;

    var str = new String(obj.value)
    var chk = false;
          
        if(obj.value.length!=0)
        {

            for (i=0; i<str.length; i++)
           {
               for(j=0; j<40; j++)
               {
				//40,41,44,45,46,47,91,93
                    if(j != 32) // check space //vikram
                    {
                      
                           if(!findInvalidChars(j, str.charAt(i)))
                           {                
                               alert("Please enter alpha-numeric value for "+msg);
                                obj.select();
                                setObjFocus(obj);
                               return false;
                             
                        	}
                    }
	                for(jj=42; jj<44; jj++)							
	                {
	                  if(!findInvalidChars(jj, str.charAt(i)))
	                  {                
	                  alert("Please Enter Alpha-Numeric Value For "+msg);
	                  obj.select();
	                  setObjFocus(obj);
	                  return false;
	                  }
	                } 
               }
               for(kk=58; kk<65; kk++)
                {
                    if(!findInvalidChars(kk, str.charAt(i)))
                  {
                        alert("Please Enter Alpha-Numeric Value For "+msg);
                        obj.select();
                      setObjFocus(obj);                
                        return false;
                    }
                }
                for(k=92; k<97; k++)              //to allow "["
                {
                   if(k!=93)						//to allow "]"
                    {
	                    if(!findInvalidChars(k, str.charAt(i)))
	                    {
	                        alert("Please Enter Alpha-Numeric Value For "+msg);
	                        obj.select();
	                        setObjFocus(obj);
	                        return false;
	                    }
                    }
                }
               for(l=123; l<256; l++)
               {
                    if(!findInvalidChars(l, str.charAt(i)))
                  {
                     alert("Please Enter Alpha-Numeric Value For "+msg);
                        obj.select();
                       setObjFocus(obj);
                       return false;
                    }
               }
           }
              
        }
        return true;
}

function checkNameOnlyForAlphabets(obj) 
{
	var msg = obj.alt; 
	// Call for is required 
	 var msg = obj.alt;      //Change made by Rohit on 10/04/2004
    if(!checkIsNull(obj, msg))
        return false;
   if(!checkAlphabets(obj))
      return false;
    var str = new String(obj.value)
    var chk = false;
            
        if(obj.value.length!=0)
        {

            for (i=0; i<str.length; i++)
            {
      			
      		 for(kk=48; kk<58; kk++)
                {
                    if(!findInvalidChars(kk, str.charAt(i)))
                    {
                        alert(msg+" should only contain alphabet values.");
                        obj.select();
                        setObjFocus(obj);                
                        return false;
                    }
                }
                for(k=91; k<97; k++)
                {
                    if(!findInvalidChars(k, str.charAt(i)))
                    {
                        alert(msg+" should only contain alphabet values.");
                        obj.select();
                        setObjFocus(obj);
                        return false;
                    }
                }
                  }
                
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


function checkNameCheckInvalidCharsSpace(obj)
{
    var msg = obj.alt;      //Change made by Rohit on 10/04/2004
    if(!checkIsNull(obj, msg))
        return false;

    var str = new String(obj.value)
    var chk = false;
            
        if(obj.value.length!=0)
        {

            for (i=0; i<str.length; i++)
            {
                for(j=0; j<48; j++)
                {
                    if(j != 32) // check space
                    {
                      
                            if(!findInvalidChars(j, str.charAt(i)))
                            {                
                                alert("Please Enter Alpha-Numeric Value For "+msg);
                                obj.select();
                                setObjFocus(obj);
                                return false;
                             
                        }
                    }
                }
                 for(kk=48; kk<58; kk++)
                {
                    if(!findInvalidChars(kk, str.charAt(i)))
                    {
                        alert("Please Enter Only Alphabet Value For "+msg);
                        obj.select();
                        setObjFocus(obj);                
                        return false;
                    }
                }
                
                for(kk=58; kk<65; kk++)
                {
                    if(!findInvalidChars(kk, str.charAt(i)))
                    {
                        alert("Please Enter Only Alphabet Value For "+msg);
                        obj.select();
                        setObjFocus(obj);                
                        return false;
                    }
                }
                for(k=91; k<97; k++)
                {
                    if(!findInvalidChars(k, str.charAt(i)))
                    {
                        alert("Please Enter Only Alphabet Value For "+msg);
                        obj.select();
                        setObjFocus(obj);
                        return false;
                    }
                }
                for(l=123; l<256; l++)
                {
                    if(!findInvalidChars(l, str.charAt(i)))
                    {
                        alert("Please Enter Only Alphabet Value For "+msg);
                        obj.select();
                        setObjFocus(obj);
                        return false;
                    }
                }
            }
                
        }
        return true;
}

//Created by Naz on  4/6/07
function checkAlphabets(obj)
{
    var msg = obj.alt;      //Change made by Rohit on 10/04/2004
    if(!checkIsNull(obj, msg))
        return false;

    var str = new String(obj.value)
    var chk = false;
            
        if(obj.value.length!=0)
        {

            for (i=0; i<str.length; i++)
            {
                for(j=0; j<48; j++)
                {
                    if(j != 32) // check space
                    {
                      
                            if(!findInvalidChars(j, str.charAt(i)))
                            {                
                                alert(msg+" should only contain alphabet values.");
                                obj.select();
                                setObjFocus(obj);
                                return false;
                             
                        }
                    }
                }
                 for(kk=48; kk<58; kk++)
                {
                    if(!findInvalidChars(kk, str.charAt(i)))
                    {
                        alert(msg+" should only contain alphabet values.");
                        obj.select();
                        setObjFocus(obj);                
                        return false;
                    }
                }
                
                for(kk=58; kk<65; kk++)
                {
                    if(!findInvalidChars(kk, str.charAt(i)))
                    {
                        alert(msg+" should only contain alphabet values.");
                        obj.select();
                        setObjFocus(obj);                
                        return false;
                    }
                }
                for(k=91; k<97; k++)
                {
                    if(!findInvalidChars(k, str.charAt(i)))
                    {
                        alert(msg+" should only contain alphabet values.");
                        obj.select();
                        setObjFocus(obj);
                        return false;
                    }
                }
                for(l=123; l<256; l++)
                {
                    if(!findInvalidChars(l, str.charAt(i)))
                    {
                        alert(msg+" should only contain alphabet values.");
                        obj.select();
                        setObjFocus(obj);
                        return false;
                    }
                }
            }
                
        }
        return true;
}

//


 	function parse(s)
	{
	   if(void(0)==s||""==s) return "";
	   if(isNaN(parseInt(s)))
	   {
	      return s.charAt(0)+ s.substr(1);
	   }
	   else
	   {
	      return s;
	   }
	}

	function disableFromDate(applDate, obj)
	{
		
		if(!CompareDatesFlag(applDate, obj.value))
		{
			if(obj.value != "" && obj.value.length > 0) {
				obj.disabled = true;
				document.all.fromdateimg.disabled = true;
			}
		}	
		else
			obj.disabled = false;
			
	}
function validateFromToDate(fromdate, tilldate, applDate)
{
	if(fromdate.disabled == false && fromdate.readOnly == false)
	{
		if(!checkDate(fromdate))
		    return false;
		var message = fromdate.alt+" Has To Be Greater Than Application Date";
		if(!CompareDates(applDate, fromdate.value, message))
		{
			setObjFocus(fromdate);
			return false;
		}   
	}
	
	if(tilldate.value.length != 0)
    {
		if(!checkDate(tilldate))
		{
			setObjFocus(tilldate);
			return false;
		}

		var message = tilldate.alt+" Has To Be Greater Than Effective From Date";
		if(!CompareDates(fromdate.value, tilldate.value, message))
		{
			setObjFocus(tilldate);
			return false;
		}

		message = tilldate.alt+" Has To Be Greater Than or Equal To Application Date";
		if(fromdate.disabled == true)
		{ 
			if(!CompareDates(applDate, tilldate.value, message))
			{
				setObjFocus(tilldate);
				return false;
			}			
		}
	}
	else
		tilldate.value="";
	
	if(fromdate.disabled == true)
	{
		fromdate.disabled = false;
		fromdate.readOnly = true;
	}
	
	return true;				
}	  


function validateFromToDateInReports(fromdate, todate, applDate)
	{
		if(!checkDate(fromdate)){
			setObjFocus(fromdate);
		    return false;
		}   
	
		if(!checkDate(todate))
		{
			setObjFocus(todate);
			return false;
		}

		var message = "ToDate Has To Be Greater Than From Date";
		if(!CompareDates(fromdate.value, todate.value, message))
		{
			setObjFocus(todate);
			return false;
		}

		return true;				
	}
	
	  
function SetInitialFocus(frmElement) 
{
  if (typeof(frmElement) == "object")  
  {
    frmElement.focus();
  }
}

	function spaceSpecialCapitalize(obj)
	{
	    var s = obj.value;
	 
	    if(void(0)==s||null==s)
	    {
	        return checkIsNull(obj);
	    }
	    if("object"==typeof(s)) s = s.nextNode.text;
	    if(void(0)==s||""==s)
	    {
	        return checkIsNull(obj);
	    }
	
	    var result = "";
	    var words = s.split(" ");
	    var count = words.length;
	
	    for(var i=0;i<count;i++)
	    {
	       result += parse(words[i]) + " ";
	    }
	    result += parse(words[i]);
	    obj.value = MyTrim(result);
	
	    //return checkInvalidCharsSpace(obj);
	    return true;   
	    ////////////////////////////////////////
	    //internal method
	    function parse(s)
	    {
	       if(void(0)==s||""==s) return "";
	       if(isNaN(parseInt(s)))
	       {
	          return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
	       }
	       else
	       {
	          return s;
	       }
	    }
	}

	function findInvalidChars(asciiCode, char)
	{
	    if(String.fromCharCode(asciiCode) == char)
	    {
	        return false
	    }
	    else
	    {
	        return true
	    }
	}

function checkInvalidChars(obj)
{
    var msg = obj.alt;      //Change made by Rohit on 10/04/2004
    if(!checkIsNull(obj, msg))
        return false;

    var str = new String(obj.value)
    var chk = false;
        if(obj.value.length!=0)
        {
            for (i=0; i<str.length; i++)
            {
                for(j=0; j<48; j++)
                {
                    //if(j != 45 && j!= 47)
                    //{
                        if(!findInvalidChars(j, str.charAt(i)))
                        {
                            alert("Please Enter Alpha-Numeric Value For "+msg);
                            //obj.value="";
                            obj.select();
                            setObjFocus(obj);
                            return false;
                        }
                    //}
                }
                for(kk=58; kk<65; kk++)
                {
                    if(!findInvalidChars(kk, str.charAt(i)))
                    {
                        alert("Please Enter Alpha-Numeric Value For "+msg);
                     	obj.select();
                        setObjFocus(obj);                
                        return false;
                    }
                }
                for(k=91; k<97; k++)
                {
                    if(!findInvalidChars(k, str.charAt(i)))
                    {
                        alert("Please Enter Alpha-Numeric Value For "+msg);
						obj.select();
                        setObjFocus(obj);
                        return false;
                    }
                }
                for(l=123; l<256; l++)
                {
                    if(!findInvalidChars(l, str.charAt(i)))
                    {
                        alert("Please Enter Alpha-Numeric Value For "+msg);
                        obj.select();
                        setObjFocus(obj);
                        return false;
                    }
                }
            }
                
        }
        return true;
}

function checkInvalidCharsForFilter(obj)
{
    var msg = obj.alt;      //Change made by Rohit on 10/04/2004
    if(!checkIsNull(obj, msg))
        return false;

    var str = new String(obj.value)
    var chk = false;
        if(obj.value.length!=0)
        {
            for (i=0; i<str.length; i++)
            {
                for(j=0; j<48; j++)
                {
                    //if(j != 45 && j!= 47)
                    //{
                        if(!findInvalidChars(j, str.charAt(i)) && j != 32)
                        {
                            alert("Please Enter Alpha-Numeric Value For "+msg);
                            //obj.value="";
                            obj.select();
                            setObjFocus(obj);
                            return false;
                        }
                    //}
                }
                for(kk=58; kk<65; kk++)
                {
                    if(!findInvalidChars(kk, str.charAt(i)))
                    {
                        alert("Please Enter Alpha-Numeric Value For "+msg);
                     	obj.select();
                        setObjFocus(obj);                
                        return false;
                    }
                }
                for(k=91; k<97; k++)
                {
                    if(!findInvalidChars(k, str.charAt(i)))
                    {
                        alert("Please Enter Alpha-Numeric Value For "+msg);
						obj.select();
                        setObjFocus(obj);
                        return false;
                    }
                }
                for(l=123; l<256; l++)
                {
                    if(!findInvalidChars(l, str.charAt(i)))
                    {
                        alert("Please Enter Alpha-Numeric Value For "+msg);
                        obj.select();
                        setObjFocus(obj);
                        return false;
                    }
                }
            }
                
        }
        return true;
}

function checkValidationForPassword(obj, splitString)
{ 
    var msg = obj.alt;
	var str = new String(obj.value)
    var strPass = obj.value;
    var str1 = MyTrim(obj.value); 
    var str = new String(str1);
    var chars=0;
    var digits=0; 
	
	var minLength = splitString[0]; 
	if(minLength == "null" || minLength == "")
		minLength = 8;
		
    var maxLength = splitString[1];
    if(maxLength == "null" || maxLength == "")
    	maxLength = 25;

    var MinChars = splitString[2];
    if(MinChars == "null" || MinChars == "")
    	MinChars = 2;
    	
   var MaxChars = splitString[3];
	if(MaxChars == "null" || MaxChars == "")
	 	MaxChars = 20;
	
	 var MinDigits = splitString[4];
    if(MinDigits == "null" || MinDigits == "")
		MinDigits= 2;
		
		 	
    var MaxDigits = splitString[5];
	if(MaxDigits == "null" || MaxDigits == "")
		MaxDigits = 20;
			
	var minAllowedsspcChars = splitString[6];
	if(minAllowedsspcChars == "null" || minAllowedsspcChars == "")
		minAllowedsspcChars = 3;
		
    var maxAllowedsspcChars = splitString[7];
   	if(maxAllowedsspcChars == "null" || maxAllowedsspcChars == "")
   		maxAllowedsspcChars = 10;
   		
	var spcCount=0;

	if(!checkIsNull(obj, msg))
 		return false;
        
    if(str.length < minLength) {
        alert("Please Enter Minimum Of "+minLength+" Characters For "+msg);
        obj.value = "";
        setObjFocus(obj);
        return false
    }   
    else if(str.length > maxLength) {
        alert("Please Enter Maximum Of "+maxLength+" Characters For "+msg);
        obj.value = "";
        setObjFocus(obj);
        return false
    }
    if(obj.value.length!=0) {
	    for (i=0; i<str.length; i++) {
	         for(j=48; j<58; j++)
			 {
				if(!findInvalidChars(j, str.charAt(i))) {
				   digits=parseInt(digits)+1;     
				}                            
			 }
			for(kk=65; kk<91; kk++)
			{
				if(!findInvalidChars(kk, str.charAt(i)))
				{
					chars=parseInt(chars)+1;
				}
			}
			for(kd=97; kd<123; kd++)
			{
			  if(!findInvalidChars(kd, str.charAt(i)))
			  {
				chars=parseInt(chars)+1;
			  }
			 }
			for(j=0; j<48; j++)
	        {
				if(!findInvalidChars(j, str.charAt(i)))
				{
					spcCount=parseInt(spcCount)+1;
				}
	        }
	        for(kk=58; kk<65; kk++)
	        {
	            if(!findInvalidChars(kk, str.charAt(i)))
	            {
	               spcCount=parseInt(spcCount)+1;
	            }
	        }
	        for(k=91; k<97; k++)
	        {
	            if(!findInvalidChars(k, str.charAt(i)))
	            {
	                spcCount=parseInt(spcCount)+1;
	            }
	        }
	        for(l=123; l<256; l++)
	        {
	            if(!findInvalidChars(l, str.charAt(i)))
	            {
	                spcCount=parseInt(spcCount)+1;
	            }
	        }
	    }
	}
	
	if(parseInt(chars) < parseInt(MinChars) || parseInt(digits) < parseInt(MinDigits)) 
    {
        alert("Password Should Contain Minimum "+MinChars+" Characters And "+MinDigits+" Digits");
        obj.value="";
        setObjFocus(obj);
        return false; 
    }
    
	if(parseInt(chars) > parseInt(MaxChars) || parseInt(digits) > parseInt(MaxDigits)) 
    {
        alert("Password Should Contain Maximum "+MaxChars+" Characters And "+MaxDigits+" Digits");
        obj.value="";
        setObjFocus(obj);
        return false; 
    }
   
    if(parseInt(spcCount) < parseInt(minAllowedsspcChars) || parseInt(spcCount) > parseInt(maxAllowedsspcChars)) 

	    {
	        alert("Password Should Contain Minimum "+minAllowedsspcChars+" Special Characters And Maximum "+maxAllowedsspcChars+" Special Characters");
	        obj.value="";
	        setObjFocus(obj);
	        return false; 
	    }


    return true;
}

//============================== Added by Ashwin for requirements according to METRO BANK on 20/03/2012.========================= START
function checkPasswordValidationForMetro(obj, splitString)
{ 
    var msg = obj.alt;
	var str = new String(obj.value);
    var strPass = obj.value;
    var str1 = MyTrim(obj.value); 
	str = new String(str1);
    var chars=0;
    var digits=0; 
    
	
	//Minimum Password Length validation.
	var minLength = splitString[0]; 
	if(minLength == "null" || minLength == "")
		minLength = 8;
	
	//Maximum Password Length validation.	
    var maxLength = splitString[1];
    if(maxLength == "null" || maxLength == "")
    	maxLength = 25;
	//Contain Alphabet validation.
	var containAlphabets = splitString[2];
	if(containAlphabets == 'Y' || containAlphabets == 'y')
	{
		var MinChars = 1;
		var MaxChars = 99;
	}else{
		var MinChars = 0;
		var MaxChars = 0;
	}
	
	
	var containNumeric = splitString[3];
	if(containNumeric == 'Y' || containNumeric == 'y')
	{
		var MinDigits = 1;
		var MaxDigits = 99;
	}else{
		var MinDigits = 0;
		var MaxDigits = 0;
	}
	var containSpecialCharacters = splitString[4];
	if(containSpecialCharacters == 'Y' || containSpecialCharacters == 'y')
	{
		var minAllowedsspcChars = 1;
		var maxAllowedsspcChars = 99;
	}else{
		var minAllowedsspcChars = 0;
		var maxAllowedsspcChars = 0;
	}
	
	var containACharacterInUpperCase = splitString[5];
	if(containACharacterInUpperCase == 'Y' || containACharacterInUpperCase == 'y')
	{
		var minCharacterInUpperCase = 1;
		var maxCharacterInUpperCase = 99;
	}else{
		var minCharacterInUpperCase = 0;
		var maxCharacterInUpperCase = 0;
	}
	var spcCount=0;

	if(!checkIsNull(obj, msg))
 		return false;
        
    if(str.length < minLength) {
        alert("Please Enter Minimum Of "+minLength+" Characters For "+msg);
        obj.value = "";
        setObjFocus(obj);
        return false
    }   
    else if(str.length > maxLength) {
        alert("Please Enter Maximum Of "+maxLength+" Characters For "+msg);
        obj.value = "";
        setObjFocus(obj);
        return false
    }
    if(obj.value.length!=0) 
    {
	    for (i=0; i<str.length; i++) 
	    {
	         for(j=48; j<58; j++)
			 {
				if(!findInvalidChars(j, str.charAt(i))) {
				   digits=parseInt(digits)+1;     
				}                            
			 }
			for(kk=65; kk<91; kk++)
			{
				if(!findInvalidChars(kk, str.charAt(i)))
				{
					chars=parseInt(chars)+1;
				}
			}
			for(kd=97; kd<123; kd++)
			{
			  if(!findInvalidChars(kd, str.charAt(i)))
			  {
				chars=parseInt(chars)+1;
			  }
			 }
			for(j=0; j<48; j++)
	        {
				if(!findInvalidChars(j, str.charAt(i)))
				{
					spcCount=parseInt(spcCount)+1;
				}
	        }
	        for(kk=58; kk<65; kk++)
	        {
	            if(!findInvalidChars(kk, str.charAt(i)))
	            {
	               spcCount=parseInt(spcCount)+1;
	            }
	        }
	        for(k=91; k<97; k++)
	        {
	            if(!findInvalidChars(k, str.charAt(i)))
	            {
	                spcCount=parseInt(spcCount)+1;
	            }
	        }
	        for(l=123; l<256; l++)
	        {
	            if(!findInvalidChars(l, str.charAt(i)))
	            {
	                spcCount=parseInt(spcCount)+1;
	            }
	        }
	    }
	}
	
	if(parseInt(chars) < parseInt(MinChars) || parseInt(digits) < parseInt(MinDigits)) 
    {
        alert("Password Should Contain Minimum "+MinChars+" Characters And "+MinDigits+" Digits");
        obj.value="";
        setObjFocus(obj);
        return false; 
    }
	if(parseInt(chars) > parseInt(MaxChars) || parseInt(digits) > parseInt(MaxDigits)) 
    {
        alert("Password Should Contain Maximum "+MaxChars+" Characters And "+MaxDigits+" Digits");
        obj.value="";
        setObjFocus(obj);
        return false; 
    }
    if(parseInt(spcCount) < parseInt(minAllowedsspcChars) || parseInt(spcCount) > parseInt(maxAllowedsspcChars)) 
    {
        alert("Password Should Contain Minimum "+minAllowedsspcChars+" Special Characters And Maximum "+maxAllowedsspcChars+" Special Characters");
        obj.value="";
        setObjFocus(obj);
        return false; 
    }
 	if(obj.value.length!=0)
 	{
 		var matchList = 0;
		var regexp = /[A-Z]/g;
		var text = obj.value;
   
		while ((match = regexp.exec(text)) != null) 
		{
			matchList = matchList +1;
		}
		
		if(matchList < minCharacterInUpperCase) 
		{
        	alert("Please Enter Minimum Of "+minLength+" UpperCase Character For "+msg);
        	obj.value = "";
        	setObjFocus(obj);
        	return false
    	}else if(matchList > maxCharacterInUpperCase)
    			{
        			alert("Please Enter Maximum Of "+maxLength+" UpperCase Character For "+msg);
        			obj.value = "";
        			setObjFocus(obj);
        			return false
    			}
 	}
    return true;
}
//============================== Added by Ashwin for requirements according to METRO BANK.========================= END

// Created By Rohit 04-10-2004 For allow space 
function checkInvalidCharsSpace(obj)
{
    var msg = obj.alt;      //Change made by Rohit on 10/04/2004
    if(!checkIsNull(obj, msg))
        return false;

    var str = new String(obj.value)
    var chk = false;
            
        if(obj.value.length!=0)
        {
            for (i=0; i<str.length; i++)
            {
                for(j=0; j<48; j++)
                {
                    if(j != 32 && j != 46 && j!= 38) // check space
                    {
                            if(!findInvalidChars(j, str.charAt(i)))
                            {                
                                alert("Please Enter Alpha-Numeric Value For "+msg);
                                obj.select();
                                setObjFocus(obj);
                                return false;
                             
                        }
                    }
                }
				if(!findInValidKeys(obj, i, str))
					return false;
            }
                
        }
        return true;
}

function checkInvalidCharsSpaceAndAllowToSpecChars(obj)
{
    var msg = obj.alt;
    if(!checkIsNull(obj, msg))
        return false;

    var str = new String(obj.value)
    var chk = false;
            
        if(obj.value.length!=0)
        {
            for (i=0; i<str.length; i++)
            {
                for(j=0; j<48; j++)
                {
                    if(j != 32 && j != 46 && j != 38 && j != 45 && j != 39) // check space
                    {
                            if(!findInvalidChars(j, str.charAt(i)))
                            {                
                                alert("Please Enter Alpha-Numeric Value For "+msg);
                                obj.select();
                                setObjFocus(obj);
                                obj.value = "";
                                return false;
                             
                        }
                    }
                }
				if(!findInValidKeys(obj, i, str))
					return false;
            }
                
        }
        return true;
}

function  findInValidKeys(obj, i, str) {
	
	var msg = obj.alt;
	for(kk=58; kk<65; kk++)
     {
         if(!findInvalidChars(kk, str.charAt(i)))
         {
             alert("Please Enter Proper Value For "+msg);
             obj.select();
             setObjFocus(obj);                
             return false;
         }
     }
     for(k=91; k<97; k++)
     {
         if(!findInvalidChars(k, str.charAt(i)))
         {
             alert("Please Enter Proper value for "+msg);
             obj.select();
             setObjFocus(obj);
             return false;
         }
     }
     for(l=123; l<256; l++)
     {
         if(!findInvalidChars(l, str.charAt(i)))
         {
             alert("Please Enter Proper Value For "+msg);
             obj.select();
             setObjFocus(obj);
             return false;
         }
     }
     return true;
                
}
function checkInvalidCharsPass(obj)
{
    var msg = obj.message; //Change made by Santosh Lokhande on 7/19/2004
     msg = obj.alt; 
    if(!checkIsNull(obj, msg))
        return false;

    var strPass = new String(obj.value)
   // alert(strPass);
    var chk = false;

//  if(!checkStringLenPass(obj, msg))
    //  return false;

    if (!checkStringLenPass(obj, msg))
            {
                //alert("Please Enter proper Value For "+msg);
                obj.value="";   //Change made by Manish on 7/21/2004
                setObjFocus(obj);
                return false
            }
    else{
    for (i=0; i<strPass.length; i++)
    {
        for(j=0; j<33; j++)
        {
        //  if(j != 45 && j!= 47)
        //  {
                if(!findInvalidChars(j, strPass.charAt(i)))
                {
                    alert("Please Enter Proper value "+msg);
                    //alert("Id "+obj.id);
                    obj.value="";
                    setObjFocus(obj);
                    return false;
                }
        //  }
        }
        for(l=127; l<256; l++)
        {
            if(!findInvalidChars(l, strPass.charAt(i)))
            {
                alert("Please Enter Proper value "+msg);
                obj.value="";
                setObjFocus(obj);
                return false;
            }
        }
    }
    return true;
}
}



function checkExact(eElem, message)
{
    var exact = eElem.getAttribute("exact")
    //alert('exact : '+exact)
    if(exact)
    {
    //alert('inside exact!')
        if(parseInt(exact) > 0)
        {
            if(eElem.value.length != parseInt(exact))
            {
                alert("Please Enter "+parseInt(exact)+" digit "+message);
                eElem.focus();
                return false
            }
        }
    }
    return true;
}

function checkIsNull (obj)
{
    var i;
    var whitespace = " \t\n\r";
    var msg = obj.alt
    var str = obj.value;
   
      
    if ((str == null) ||(str=="") ||(str.length == 0))
    {
        alert("Please enter "+msg)
        obj.value = "";
        setObjFocus(obj);
        return false;
    }

    // Search through string's characters one by one
    // until we find a non-whitespace character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < str.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = str.charAt(i);

        if (whitespace.indexOf(c) == -1) 
        {
            return true;
        }
    }

    // All characters are whitespace.
    alert("Please enter "+msg)
    obj.value = "";
    setObjFocus(obj);
    return false;
}

//function added by Swapna for checking for Space between characters. 
//Allows trailing Spaces.
function checkSpace(obj)
{
     var i;
     var msg = obj.alt
     var str = MyTrim(obj.value);
     for (i = 0; i < str.length; i++)
    {   
        for(i=0;i<str.length;i++)
        {
            if(str.charAt(i)==' ')
            {
                alert("Please Enter " + msg + " Without Space");
                obj.value = "";
                setObjFocus(obj);
                return false;
            }
        }
    }
    return true
}



function checkCombo(obj)
{   
    var msg = obj.title
    if(msg == null || msg == "")
	   	var msg = obj.alt 
   	 
    var str = obj.value;
    if(str == "" || str == "0")
    {
        setObjFocus(obj);
        alert("Please select "+msg+".")
        return false
    }
    return true
}

function checkCheckBox(obj, msg)
{
    var count = 0
    if (obj.length != null)
    {
        for(i=0; i<obj.length; i++)
        {
            if (obj[i].checked == true)
            {
                count++
            }
        }
        if (count == 0)
        {
            alert("Please select "+msg)
            return false
        }
        return true
    }
    else
    {
        if (!(obj.checked))
        {
            setObjFocus(obj);
            alert("Please select "+msg)
            return false
        }
    }
    return true
}

    //new logic to allow only "." & "_" sp.chars within in email id
 /*   function checkEmail ( obj )
	{
	  sEmailText = obj.value;
      var oREEmail = /^([a-zA-Z0-9]+[a-zA-Z0-9_\.-]*@[a-zA-Z]+([a-zA-Z0-9_\-]*\.[a-zA-Z0-9]+)+)$/g;
      
      var sEmail =  String( sEmailText );
      var result = true; 
      if (sEmail.search(oREEmail) == -1)
      {
      		alert("Please Enter a Valid Email Address" )
      		//obj.value = "";
	        obj.blur();
    	    setObjFocus(obj);
            result = false;
      }
      return result ;
	}*/
	
	/*New function for checking date as it allows  special characters*/
		function checkEmail(obj) {
        	var emailStr = obj.value;
               if (emailStr.length == 0) {
                   return true;
               }
               var emailPat=/^(.+)@(.+)$/;
               var specialChars="\\(\\)@,:!\\\\\\\"\\.\\[\\]";
               var validChars="\[^\\s" + specialChars + "\]";
               var quotedUser="(\"[^\"]*\")";
               var ipDomainPat=/^(\d{1,4})[.](\d{1,4})[.](\d{1,4})[.](\d{1,4})$/;
               var atom=validChars + '+';
               var word="(" + atom + "|" + quotedUser + ")";
               var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
               var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
               var matchArray=emailStr.match(emailPat);
               if (matchArray == null) {
               		alert("Please enter valid Email Address.");
                   	return false;
               }
               var user=matchArray[1];
               var domain=matchArray[2];
               if (user.match(userPat) == null) {
					alert("Please enter valid Email Address.");
                    return false;
               }
               var IPArray = domain.match(ipDomainPat);
               if (IPArray != null) {
                   for (var i = 1; i <= 4; i++) {
                      if (IPArray[i] > 255) {
                      		 alert("Please enter valid Email Address.");
                        	 return false;
                      }
                   }
                   return true;
               }
               var domainArray=domain.match(domainPat);
               if (domainArray == null) {
           			alert("Please enter valid Email Address.");
                    return false;
               }
               var atomPat=new RegExp(atom,"g");
               var domArr=domain.match(atomPat);
               var len=domArr.length;
               if ((domArr[domArr.length-1].length < 2) ||
                   (domArr[domArr.length-1].length > 4)) {
                	 alert("Please enter valid Email Address.");
                     return false;
               }
               if (len < 2) {
              		alert("Please enter valid Email Address.");
                   	return false;
               }
               
               return true;
               
            }


/*** Function for Checking valid email address ***/
/*** Checked ***/
/* Function Which is used earlier.

function checkEmail(obj, field)
{
    var str = obj.value;
    var supported = 0;
    field = obj.alt;
    if (window.RegExp) {
      var tempStr = "a";
      var tempReg = new RegExp(tempStr);
      if (tempReg.test(tempStr)) supported = 1;
    }
    if (!supported) 
      return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
    var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
    var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
    if (!(!r1.test(str) && r2.test(str)))
    {
        alert("Please Enter a Valid Email Address for "+ field)
        obj.value = "";
        obj.blur();
        setObjFocus(obj);
        return false
    } 
    else
        return true;
}*/

/* function checkEmail(str1,  field)
   {
       var str = str1;    
	   var supported = 0;
      field = str1.alt;
       if (window.RegExp) {
           var tempStr = "a";
           var tempReg = new RegExp(tempStr);
           if (tempReg.test(tempStr)) supported = 1;
        }
       if (!supported) 
            return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
       var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
       var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
       if (!(!r1.test(str) && r2.test(str)))
       {
         alert("Please Enter a Valid Email Address For "+ field)
         document.OrganizationUnitForm.contact1emailid.focus();       
         return false
       }
       else
          return true;
    }*/
/*** To check for positive number in a field ***/
/*** obj => Object to be checked ***/
/*** field => field name to be displayed in error message (Appends to the text ----- Please Enter Numeric Value For .....) ***/
/*** Checked ***/
function checkNum(obj, field)
{
    // Added by Sumit Sarda, @date 28-Oct-2004
    field = obj.alt;
    //Commented by Sumit Sarda, @date 28-Oct-2004
/*  
       if(!checkIsNull (obj, field))
        return false;
*/
    //Added by Sumit Sarda, @date 28-Oct-2004 because isNaN() fails if space is entered before and after the number.
    var str = obj.value
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)==' ')
        {
            // alert("Please enter numeric "+field+".");
            alert(field+" should only contain numeric values.");
            obj.value = "";
            obj.blur();
            setObjFocus(obj);
            return false;
        }
    }

    if (isNaN(obj.value))
    {
       // alert("Please enter numeric "+field+".");
        alert(field+" should only contain numeric values.");
        obj.value = "";
        obj.blur();
        setObjFocus(obj);
        return false;
    }
    if(((obj.value).indexOf("e") != -1) || ((obj.value).indexOf("E") != -1)) 
    {
        //alert("Please enter numeric "+field+".");
        alert(field+" should only contain numeric values.");
        obj.value = "";
        obj.blur();
        setObjFocus(obj);
        return false;
    }
    if (obj.value < 0)
    { 
        alert("Please enter positive value for "+field+".");
        obj.value = "";
        obj.blur();
        setObjFocus(obj);
        return false;
    }
    return true;
}

// Added By Karuna
function checkNum2(obj, field)
{
    // Added by Sumit Sarda, @date 28-Oct-2004
    field = obj.alt;
    var str = obj.value
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)==' ')
        {
            alert("Please enter numeric "+field);
            obj.value = "";
            setObjFocus(obj);
            return false;
        }
    }

    if (isNaN(obj.value))
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    if(((obj.value).indexOf("e") != -1) || ((obj.value).indexOf("E") != -1)) 
    {
        alert("Please enter numeric "+field);
        setObjFocus(obj);
        obj.value = "";
        return false;
    }
    if (obj.value < 0)
    { 
        alert("Please Enter Positive Value For "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    return true;
}


function checkRequiredNum(obj, field)
{
    field = obj.alt;
  
    if(!checkIsNull (obj, field))
      return false;

  
    var str = obj.value
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)==' ')
        {
            alert("Please enter numeric "+field);
            obj.value = "";
            setObjFocus(obj);
            return false;
        }
    }

    if (isNaN(obj.value))
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    if(((obj.value).indexOf("e") != -1) || ((obj.value).indexOf("E") != -1)) 
    {
        alert("Please enter numeric "+field);
        setObjFocus(obj);
        obj.value = "";
        return false;
    }
    if (obj.value <= 0)
    { 
        alert("Please Enter Positive Value For "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    return true;
}

function checkDeciNumber(obj, field)
{
	field = obj.alt;
    if(((obj.value).indexOf(".") != -1)) 
    {
        var origvalue = (obj.value).substring(0,parseInt((obj.value).indexOf(".")));
        if(parseInt(origvalue) > 999999999999999)
        {
            alert("Maximum Fifteen Digits Are Allowed Before Decimal Point for "+field);
            obj.value = "";
            obj.blur();
            setObjFocus(obj);
            return false;
        }
        var decvalue = (obj.value).substring(parseInt((obj.value).indexOf("."))+1);
        if(parseInt(decvalue) > 99)
        {   
            alert("Maximum Two Digits Are Allowed After Decimal Point for "+field);
            obj.value = "";
            obj.blur();
            setObjFocus(obj);
            return false;
        }        
        if(parseFloat(obj.value) > 999999999999999.90)
        {  
            alert("Maximum 999999999999999.90 value is allowed for "+field);
            obj.value = "";
            obj.blur();
            setObjFocus(obj);
            return false;
        }
    }
    else
    {
        if(parseFloat(obj.value) > 999999999999999.90)
        {  
            alert("Maximum 999999999999999.90 value is allowed for "+field);
            obj.value = "";
            obj.blur();
            setObjFocus(obj);
            return false;
        }
    }
           
    if (isNaN(obj.value) || MyTrim(obj.value)=="")
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        obj.blur();
        setObjFocus(obj);
        return false;
    }
    if(((obj.value).indexOf("e") != -1) || ((obj.value).indexOf("E") != -1)) 
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        obj.blur();
        setObjFocus(obj);
        return false;
    }
    return true;
}

function checkPositiveDeciNumber(obj)
{
    var field = obj.alt;
    
    if (obj.value < 0)
    { 
        alert("Please Enter Positive Value For "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    var str = obj.value;
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)==' ' || str.charAt(i)== '-')
        {
            alert("Please Enter Proper Value For "+field);
            obj.value = "";
            setObjFocus(obj);
            return false;
        }
    }
    if(((obj.value).indexOf(".") != -1))   
    {
        var origvalue = (obj.value).substring(0,parseInt((obj.value).indexOf(".")));
        if(parseInt(origvalue) > 999999999999999)
        {
            alert("Maximum Fifteen Digits Are Allowed Before Decimal Point for "+field);
            obj.value = "";
            setObjFocus(obj);
            return false;
        }
        var decvalue = (obj.value).substring(parseInt((obj.value).indexOf("."))+1);
        if(parseInt(decvalue)> 99)
        {   
            alert("Maximum Two Digits Are Allowed After Decimal Point for "+field);
            obj.value = "";
            setObjFocus(obj);
            return false;
        }
        if(parseFloat(obj.value) > 999999999999999.90)
        {  
            alert("Maximum 999999999999999.90 value is allowed for "+field);
            obj.value = "";
            obj.blur();
            setObjFocus(obj);
            return false;
        }
    }
    else
    {
        if(parseFloat(obj.value) > 999999999999999.90)
        {  
            alert("Maximum 999999999999999.90 value is allowed for "+field);
            obj.value = "";
            obj.blur();
            setObjFocus(obj);
            return false;
        }
    }
           
    if (isNaN(obj.value) || MyTrim(obj.value)=="")
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    if(((obj.value).indexOf("e") != -1) || ((obj.value).indexOf("E") != -1)) 
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }   
    return true;
}

function checkDate(obj)
{
   var dt = GetFullDate(obj.value,obj.alt)
    if(dt == -1)
    {
        
        obj.value = "";
        obj.blur();
        setObjFocus(obj);
        return false;
    }
    else
    {
        obj.value = dt
        return true;
    }
}


/*** Checked ***/
function CompareDates(StartDate, EndDate, msg)
{	
    if((StartDate != "") && (EndDate != ""))
    {
        StartDay = StartDate.substring(0 , StartDate.indexOf("/"));
        StartMonth = StartDate.substring(StartDate.indexOf("/")+1, StartDate.lastIndexOf("/"));
        StartMonth = ParseMonth(StartMonth)
        StartYear = StartDate.substring(StartDate.lastIndexOf("/")+1); 
            
        EndDay = EndDate.substring(0 , EndDate.indexOf("/"));
        EndMonth = EndDate.substring(EndDate.indexOf("/")+1, EndDate.lastIndexOf("/"));
        EndMonth = ParseMonth(EndMonth)
        EndYear = EndDate.substring(EndDate.lastIndexOf("/")+1); 
    
        if(StartYear > EndYear)
        {
            alert(msg);
            return false
        }
        else if(StartYear == EndYear)
        {
            if(StartMonth > EndMonth)
            {
                alert(msg);
                return false;
            }
            else if(StartMonth == EndMonth)
            {
                if(StartDay > EndDay)
                {
                alert(msg);
                return false;
                }
                else
                {
                    return true;
                }
            }
        }
        return true
    }
    return false
}

/*** Checked ***/
function CompareDatesFlag(StartDate, EndDate)
{	
    if((StartDate != "") && (EndDate != ""))
    {
        StartDay = StartDate.substring(0 , StartDate.indexOf("-"));
        StartMonth = StartDate.substring(StartDate.indexOf("-")+1, StartDate.lastIndexOf("-"));
        StartMonth = ParseMonth(StartMonth)
        StartYear = StartDate.substring(StartDate.lastIndexOf("-")+1); 
            
        EndDay = EndDate.substring(0 , EndDate.indexOf("-"));
        EndMonth = EndDate.substring(EndDate.indexOf("-")+1, EndDate.lastIndexOf("-"));
        EndMonth = ParseMonth(EndMonth)
        EndYear = EndDate.substring(EndDate.lastIndexOf("-")+1); 
    
        if(StartYear > EndYear)
        {
            return false
        }
        else if(StartYear == EndYear)
        {
            if(StartMonth > EndMonth)
            {
                return false;
            }
            else if(StartMonth == EndMonth)
            {
                if(StartDay > EndDay)
                {
                return false;
                }
                else
                {
                    return true;
                }
            }
        }
        return true
    }
    return false
}

// to check equal date...10/8/2002.
function CompareEqualDates(StartDate, EndDate, msg)
{
    if((StartDate != "") && (EndDate != ""))
    {
        StartDay = StartDate.substring(0 , StartDate.indexOf("-"));
        StartMonth = StartDate.substring(StartDate.indexOf("-")+1, StartDate.lastIndexOf("-"));
        StartMonth = ParseMonth(StartMonth)
        StartYear = StartDate.substring(StartDate.lastIndexOf("-")+1); 
            
        EndDay = EndDate.substring(0 , EndDate.indexOf("-"));
        EndMonth = EndDate.substring(EndDate.indexOf("-")+1, EndDate.lastIndexOf("-"));
        EndMonth = ParseMonth(EndMonth)
        EndYear = EndDate.substring(EndDate.lastIndexOf("-")+1); 
    
        if(StartYear > EndYear)
        {
            alert(msg);
         
            return false
        }
        else if(StartYear == EndYear)
        {
            if(StartMonth > EndMonth)
            {
                alert(msg);
                       
                return false;
            }
            else if(StartMonth == EndMonth)
            {
                if(StartDay >= EndDay)
                {
                alert(msg);
                return false;
                }
                else
                {
                    return true;
                }
            }
        }
        return true
    }
    return false
}

function CompareEqualDates1(StartDate, EndDate, msg)
{
    if((StartDate != "") && (EndDate != ""))
    {
        StartDay = StartDate.substring(0 , StartDate.indexOf("-"));
        StartMonth = StartDate.substring(StartDate.indexOf("-")+1, StartDate.lastIndexOf("-"));
        StartMonth = ParseMonth(StartMonth)
        StartYear = StartDate.substring(StartDate.lastIndexOf("-")+1); 
            
        EndDay = EndDate.substring(0 , EndDate.indexOf("-"));
        EndMonth = EndDate.substring(EndDate.indexOf("-")+1, EndDate.lastIndexOf("-"));
        EndMonth = ParseMonth(EndMonth)
        EndYear = EndDate.substring(EndDate.lastIndexOf("-")+1); 
    
        if(StartYear > EndYear)
        {
            alert(msg);
          
            return false
        }
        else if(StartYear == EndYear)
        {
            if(StartMonth > EndMonth)
            {
                alert(msg);
             
                return false;
            }
            else if(StartMonth == EndMonth)
            {
                if(StartDay > EndDay)
                {
                alert(msg);
              
                return false;
                }
                else
                {
                    return true;
                }
            }
        }
        return true
    }
    return false
}




/*** Checked ***/
function GetFullDate(currd,message)
{
 
    var dtStr;
    var day,month,month1,year;
    message = "Please enter valid " + message+".";          
    if (currd != "")
    {
        //currd = CStr(MyTrim(currd));
                    
        var chkneg = currd.search("-")
        if (chkneg == 0)
        {   
            alert(message)  //narasinha
            return -1;
        }
                    
        if ((currd.indexOf("-") == -1) && (currd.indexOf("/") == -1))
        {
            alert(message)      //narsinha
            return -1;
        }
                    
        if (currd.indexOf("-") != -1) // "-" separaters present
        {
            day = currd.substring(0 , currd.indexOf("-"));
            month = currd.substring(currd.indexOf("-")+1, currd.lastIndexOf("-"));
            year = currd.substring(currd.lastIndexOf("-")+1);
        }
        else if (currd.indexOf("/") != -1) // "/" separaters present
        {
            month = currd.substring(0 , currd.indexOf("/"));
            month1 = currd.substring(0 , currd.indexOf("/"));
            day = currd.substring(currd.indexOf("/")+1, currd.lastIndexOf("/"));
            year = currd.substring(currd.lastIndexOf("/")+1);
        }
        
        else if (currd.length > 11) // "/" separaters present
        {alert()
            currd = currd.substring(currd);
        }

        if (isNaN(day))
        {
            alert(message)
            return -1;
        }
                    
        if (day.length > 2)
        {
            alert(message)
            return -1;
        }
                    
        if (parseInt(day,10) > 31 || parseInt(day,10) == 0 )
        {
            alert(message)
            return -1;
        }
                    
        if (month.length > 3)
        {
            alert(message)
            return -1;
        }

        if (isNaN(year))
        {
            alert(message)
            return -1;
        }
        if (!(year.length == 2 || year.length == 4))
        {
            alert(message)
            return -1;
        }
                    
        if (year.length == 2) //add 20 to the year if it is 2 digit
            year = "20"+year
        if((year < 1800))
        {
            alert(message)
            return -1;
        }
        
        var mth = 'invalid'
        mParsed = month
        if (isNaN(parseInt(month,10)))
        {
            for (var i=0; i < montharr.length; i++)
            {       
                if (month.toUpperCase() ==  montharr[i].toUpperCase())
                {
                    mth = 'valid';
                    mIndex = i;
                    i = montharr.length ;
                    mParsed = parseInt(mIndex + 1,10)
                }
            }
        }
                    
        if (mth != 'valid')
        {
            if ((parseInt(month,10)>0 && parseInt(month,10) <13))
            {
                month = montharr[parseInt(month,10)-1]
            }
            else
            {
                alert(message)
                return -1;
            }
        }

        dParsed = parseInt(day,10)
        if (isNaN(mParsed))
            mParsed = parseInt(month,10)
        mUpper = month.toUpperCase()
        yParsed = parseInt(year,10)

        if ((mParsed ==2 || mUpper == 'FEB') && (dParsed==30 || dParsed==31))
        {
            alert(message)
            return -1;
        }
        if(((mParsed==2 || mParsed==4 ||  mParsed==6 || mParsed==9 || mParsed==11) && dParsed==31)  || ((mUpper=='FEB'  || mUpper=='APR' ||  mUpper=='JUN' || mUpper=='SEP' || mUpper=='NOV') && dParsed==31))
        {                                                                                                                                                                                                                            
            alert(message)
            return -1;      
        }
        if ( !(yParsed%4==0) && mParsed==2 && (dParsed==29))
        {
            alert(message)
            return -1;
        }

        if (day.length == 1)
            day = "0"+day
                    
        dtstr = month1 +"/" + day + "/" + year;

        return dtstr;
    }
    alert(message)
    return -1;
}



/*** Checked ***/
function GetFullDateRev(currd,message)
{

    var dtStr;
    var day,month,year;
    message = "Please Enter Valid " + message;          
    if (currd != "")
    {
        //currd = CStr(MyTrim(currd));
                    
        var chkneg = currd.search("-")

                    
        if ((currd.indexOf("-") == -1) && (currd.indexOf("/") == -1))
        {
            
                  //narsinha
            return currd;
        }
                    
        if (currd.indexOf("-") != -1) // "-" separaters present
        {
            day = currd.substring(0 , currd.indexOf("-"));
            month = currd.substring(currd.indexOf("-")+1, currd.lastIndexOf("-"));
            year = currd.substring(currd.lastIndexOf("-")+1);
        }
        else if (currd.indexOf("/") != -1) // "/" separaters present
        {
            day = currd.substring(0 , currd.indexOf("/"));
            month = currd.substring(currd.indexOf("/")+1, currd.lastIndexOf("/"));
            year = currd.substring(currd.lastIndexOf("/")+1);
        }

        if (isNaN(day))
        {
            return currd;
        }
                    
        if (day.length > 2)
        {
                return currd;        
        }
                    
        if (parseInt(day,10) > 31 || parseInt(day,10) == 0 )
        {
                return currd;        
        }
                    
        if (month.length > 3)
        {
                return currd;        
        }

        if (isNaN(year))
        {
                return currd;        
        }
        if (!(year.length == 2 || year.length == 4))
        {
      
                return currd;        
        }
                    
        if (year.length == 2) //add 20 to the year if it is 2 digit
            year = "20"+year
        if((year < 1800))
        {
                return currd;        
        }
        
        var mth = 'invalid'
        mParsed = month
        if (isNaN(parseInt(month,10)))
        {
            for (var i=0; i < montharr.length; i++)
            {       
                if (month.toUpperCase() ==  montharr[i].toUpperCase())
                {
                    mth = 'valid';
                    mIndex = i;
                    i = montharr.length ;
                    mParsed = parseInt(mIndex + 1,10)
                }
            }
        }
                    
        if (mth != 'valid')
        {
            if ((parseInt(month,10)>0 && parseInt(month,10) <13))
            {
                month = montharr[parseInt(month,10)-1]
            }
            else
            {
                return currd;        
            }
        }

        dParsed = parseInt(day,10)
        if (isNaN(mParsed))
            mParsed = parseInt(month,10)
        mUpper = month.toUpperCase()
        yParsed = parseInt(year,10)

        if ((mParsed ==2 || mUpper == 'FEB') && (dParsed==30 || dParsed==31))
        {
                return currd;        
        }
        if(((mParsed==2 || mParsed==4 ||  mParsed==6 || mParsed==9 || mParsed==11) && dParsed==31)  || ((mUpper=='FEB'  || mUpper=='APR' ||  mUpper=='JUN' || mUpper=='SEP' || mUpper=='NOV') && dParsed==31))
        {                                                                                                                                                                                                                            
                return currd;        
        }
        if ( !(yParsed%4==0) && mParsed==2 && (dParsed==29))
        {
                return currd;        
        }

        if (day.length == 1)
            day = "0"+day
                    
        dtstr = day +"-" + month + "-" + year;


 
        for (var i=0; i < 12; i++)
        {
            if (month.toUpperCase() ==  montharr[i].toUpperCase())
            {
                month=i+1;
                break;
             }
             
        }
         if (month.length == 1)
            month = "0"+month       
          if (day.length == 1)
            day = "0"+day
         
        dtstr = day +"-" + month + "-" + year;  
    
        return dtstr;
    }

  return currd;        
}


var mParsed
/*** Checked ***/
function ParseMonth(month)
{
    if (isNaN(parseInt(month,10)))
    {
        for (var i=0; i < montharr.length; i++)
        {       
            if (month.toUpperCase() ==  montharr[i].toUpperCase())
            {
                mth = 'valid';
                mIndex = i;
                i = montharr.length ;
                mParsed = parseInt(mIndex + 1,10)
            }
        }
    }
    return mParsed              
}

function checkNoForZero(obj, field)
{

    if (isNaN(obj.value) || MyTrim(obj.value)=="")
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    if (obj.value < 0)
    { 
        alert("Please Enter Positive Value For "+field);
        obj.value = "";
        setObjFocus(obj);
        return false; 
    }
    return true;
}



// VAlidation for negative VAlues
//Added By KAruna JOshi

function checkNegative(obj)
{
   var msg = obj.alt
   var str = obj.value;
   if ((str == null) ||(str=="") ||(str.length == 0))
   {
       alert("Please Enter "+msg)
       obj.value = "";
       setObjFocus(obj);
       return false;
   }   
   
    var str = obj.value
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)==' ')
        {
            alert("Please enter numeric "+msg);
            obj.value = "";
            setObjFocus(obj);
            return false;
        }
    }
     
    //Checking for value = 0
    if(obj.value >= 0)
    {
        return true;
    }    
   if (obj.value < 0)
   {
     return true; 
   } 
  //return true; 
}
    function  checkTelFaxNo(obj, field)
    {
        var s = obj.value;
 		field = obj.alt;
        if(void(0)==s||null==s)
        {
            return checkIsNull(obj);
        }
        if("object"==typeof(s)) s = s.nextNode.text;
        if(void(0)==s||""==s)
        {
            return checkIsNull(obj);
        }
        var compstr="0123456789-,+ -";
        i = obj.value.length;
        str = obj.value;
         i--;
        var k=i;
        count=0;
        while(i>=0)
        {
            var j=compstr.length;
             j--;
             while(j>=0)
             {
                if(str.charAt(i)==compstr.charAt(j))
                {
                    count++;  
                  break;  
                }
                else
                {
                    j--;     
                  continue;             
                }
             }
            i--;
            if((k-i)>count)
            {
                alert("Please enter valid "+field);
                obj.value = "";
                obj.blur();
                setObjFocus(obj);
                return false;
            }
        }
         return true; 
    }
function checkIntNumber(obj, field)
{
    field= obj.alt;
    if (isNaN(obj.value) || MyTrim(obj.value)=="")
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    if (obj.value.indexOf(".") != -1)
    { 
        alert("Please Enter whole Number for "+field);
        obj.value = "";
        setObjFocus(obj);
        return false; 
    }
    return true;
}
//To format the Integer to remove left padded zeros
function formatstring(obj) {
		 var str = obj.value;
		 var tempstr;
		 var format = "false"; 
		 if(str.length > 0) {
		 	for(var i=0;i < str.length; i++) {
		 		var indexval = str.charAt(i);
		 		if(parseInt(indexval) == 0 || indexval == " "){
		 			tempstr = str.substring(i+1,str.length);
		 			format = "true";
		 		} else {
		 			break;
		 		}
		 	}
		 }
		 
		 if(format == "true") {
		 	obj.value = tempstr;
		 }
}

function checkWholeNumber(obj)
{
    var field = obj.alt;
    
     //Added by Swapna Shetty, @date 01-Feb-2005 because isNaN() fails if space is entered before and after the number.
    var str = obj.value
    for(i=0;i<str.length;i++)
    {
      if(str.charAt(i)==' ')
      {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
      }
    }
    if (isNaN(obj.value) || MyTrim(obj.value)=="")
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    if (obj.value.indexOf(".") != -1)
    { 
        alert("Please Enter whole Number for "+field);
        obj.value = "";
        setObjFocus(obj);
        return false; 
    }
    if (obj.value <= 0)
    { 
        alert("Please Enter Positive Value For "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    return true;
}
function checkWholeNumberTemp(obj , field)
{
    //var field = obj.alt;
    
     //Added by Swapna Shetty, @date 01-Feb-2005 because isNaN() fails if space is entered before and after the number.
    var str = obj.value
    for(i=0;i<str.length;i++)
    {
      if(str.charAt(i)==' ')
      {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
      }
    }
    if (isNaN(obj.value) || MyTrim(obj.value)=="")
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    if (obj.value.indexOf(".") != -1)
    { 
        alert("Please Enter whole Number for "+field);
        obj.value = "";
        setObjFocus(obj);
        return false; 
    }
    if (obj.value < 0)
    { 
        alert("Please Enter Positive Value For "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    return true;
}
/*** get rid of leading and trailing spaces ***/
function MyTrim(pstr)
{
  var tstr = new String(pstr);
  tstr = tstr.replace(/^\s*/, "");
  tstr = tstr.replace(/\s*$/, "");
  return tstr.valueOf();
}


/*** To check for number not less than -100 in a field ***/
/*** obj => Object to be checked ***/
/*** field => field name to be displayed in error message (Appends to the text ----- Please enter numeric .....) ***/
/*** Checked ***/
function checkNumForAcceptModify(obj, field)
{
    if(!checkIsNull (obj, field))
        return false;

    if (isNaN(obj.value))
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    if (obj.value < -100)
    { 
        alert(""+field+"  value can not be less than -100%");
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    return true;
}

//Added by jay on 31-03-2003
function checkChars(obj, msg)
{
    //if(!checkIsNull(obj, msg))
    //  return false;
    var str = new String(obj.value)
    var chk = false;
    for (i=0; i<str.length; i++)
    {
        for(j=0; j<48; j++)
        {
            //(j != 34 && j!= 39 &&
            if(j != 45 && j!= 47 )
            {
                if(!findInvalidChars(j, str.charAt(i)))
                {
                    alert("Please Enter Proper Value For "+msg);
                    setObjFocus(obj);
                    return false
                }
            }
        }
        for(kk=58; kk<65; kk++)
        {
            if(!findInvalidChars(kk, str.charAt(i)))
            {
                alert("Please Enter Proper Value For "+msg);
                setObjFocus(obj);
                return false
            }
        }
        for(k=91; k<97; k++)
        {
            if(k != 95) 
            {   
                if(!findInvalidChars(k, str.charAt(i)))
                {
                    alert("Please Enter Proper Value For "+msg);
                    setObjFocus(obj);
                    return false
                }
            }
        }
        for(l=123; l<256; l++)
        {
            if(!findInvalidChars(l, str.charAt(i)))
            {
                alert("Please Enter Proper Value For "+msg);
                setObjFocus(obj);
                return false
            }
        }
    }
    return true
}
function checkNumforquery(obj, field)
{
    //if(!checkIsNull (obj, field))
    //  return false;
    if (isNaN(obj.value))
    {
        alert("Please enter numeric "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    if (obj.value < 0)
    { 
        alert("Please Enter Positive Value For "+field);
        obj.value = "";
        setObjFocus(obj);
        return false;
    }
    return true;
}


/** Function to check minimum length of username.... Prepared  by Manish 07/21/2004 */
function checkStringLenU(obj, msg)
{
    var str = obj.value;
    if(str.length < 4) 
        {
            alert("Please Enter minimum of 4 alphanumeric values for "+msg);
            obj.value = "";
            setObjFocus(obj);
            return false
        }
    
    return true;
}

/** Function to check minimum length of password.... Prepared  by Manish 07/21/2004 */
function checkStringLenPass(obj, msg,str)
{
    var strPass = obj.value;
    str = obj.value;
    var chars=0;
    var digits=0; 
    
        if(strPass.length < 8) 
        {
            alert("Please Enter minimum of 8 values "+msg);
            obj.value = "";
            setObjFocus(obj);
            return false
        }
     for (i=0; i<str.length; i++)
   {
     for(j=48; j<58; j++)
     {
       if(findInvalidChars(j, str.charAt(i)))
       {
        digits=parseInt(digits)+1;
       }
     }
     for(kk=65; kk<91; kk++)
     {
       if(findInvalidChars(kk, str.charAt(i)))
       {
        chars=parseInt(chars)+1;
       }
     }
     for(k=97; k<123; k++)
     {
      if(findInvalidChars(k, str.charAt(i)))
      {
        chars=parseInt(chars)+1;
      }
     }
   }
    
   // alert("Chars : "+ chars);  
   // alert("Digits : "+ digits);  
    if(chars >= 4 && digits >= 4) 
    {
    //    alert("Ok");
    }
    return true;
}

/** Function to check Warrant and Folio Nos. .... Prepared  by Manish 07/23/2004 */
function checkStringLenWarFo(obj, msg)
{
    var strWarFo = obj.value;
    if(strWarFo.length >0) 
        {
            //alert("Please enter manish Alpha-Numeric values for "+msg);
            //obj.value = "";
            setObjFocus(obj);
            return true;
        }
    else
    return false;
}

/*** To trim a string value in javascript, and remove all leading and lagging spaces ***/
/*** str => String to be trimmed ***/
/*** Checked ***/
function stringTrimmer(str)
{
    startIndex = 0;
    endIndex = str.length - 1;
    startFound = false;
    endFound = false;
    charCount = 0;

    while(charCount < str.length)
    {
        if(!startFound)
        {
            if(str.charAt(startIndex) != ' ')
            {
                startFound = true;
            }
            else
            {
                startIndex++;
            }
        }
        
        if(!endFound)
        {
            if(str.charAt(endIndex) != ' ')
            {
                endFound = true;
            }
            else
            {
                endIndex--;
            }
        }

        if(startFound && endFound)
            break;

        charCount++;
    }

    if(endIndex < 0)
        return "";
    else
        return str.substring(startIndex, endIndex + 1);
}

function checkalphaspace(obj, msg)
{
//  if(!checkIsNull(obj, msg))
//      return false;
    var str = new String(obj.value)
    var chk = false;
    for (i=0; i<str.length; i++)
    {
        for(j=0; j<65; j++)
        {
            if(j != 32 )
            {
                if(!findInvalidChars(j, str.charAt(i)))
                {
                    alert("Please Enter Proper Value For "+msg);
                    setObjFocus(obj);
                    return false
                }
            }
        }
        for(k=91; k<97; k++)
        {
            if(!findInvalidChars(k, str.charAt(i)))
            {
                alert("Please Enter Proper Value For "+msg);
                setObjFocus(obj);
                return false
            }
        }
        for(l=123; l<256; l++)
        {
            if(!findInvalidChars(l, str.charAt(i)))
            {
                alert("Please Enter Proper Value For "+msg);
                setObjFocus(obj);
                return false
            }
        }
    }
    return true
}

function showDate(obj)
{
    var str = obj.value;
    var msg = obj.message;
    if (str.length > 0) {
        var st = GetFullDate(str,obj.message+"");               
        if (st == "-1")
        {
            obj.value="";
            setObjFocus(obj);
        }
        else    
        {
            obj.value = st;                             
        }
    }
}


    function checkInvalidCharsWarFo(obj)
    {
        //var msg = obj.message; //Change made by Manish on 07/21/2004
        var msg = obj.alt; //Changed by Sumit Sarda on 19-Oct-2004
        var str = new String(obj.value)
        
        var chk = false;
        if (checkStringLenWarFo(obj, msg))
        {   
                    for (i=0; i<str.length; i++)
                    {
                        for(j=0; j<48; j++)
                        {   //if(j != 45 && j!= 47) // Commented by Manish on 07/21/2004
                            //{
                                if(!findInvalidChars(j, str.charAt(i)))
                                {
                                    alert("Please Enter Alpha-Numeric Value For "+msg);
                                    obj.value="";
                                    setObjFocus(obj);
                                    return false;
                                }
                            //}
                        }
                        for(kk=58; kk<65; kk++)
                        {
                            if(!findInvalidChars(kk, str.charAt(i)))
                            {
                                alert("Please Enter Alpha-Numeric Value For "+msg);
                                obj.value="";
                                setObjFocus(obj);                
                                return false;
                            }
                        }
                        for(k=91; k<97; k++)
                        {
                            if(!findInvalidChars(k, str.charAt(i)))
                            {
                                alert("Please Enter Alpha-Numeric Value For "+msg);
                                obj.value="";
                                setObjFocus(obj);
                                return false;
                            }
                        }
                        for(l=123; l<256; l++)
                        {
                            if(!findInvalidChars(l, str.charAt(i)))
                            {
                                alert("Please Enter Alpha-Numeric Value For "+msg);
                                obj.value="";
                                setObjFocus(obj);
                                return false;
                            }
                        }
                    }
                    return true;
                }   
                else 
                {
                    return true;
                }
        }



/*
    Added by Santosh Lokhande on 8/6/2003
    This method would allow only alphanumeric characters to be entered in a textbox
*/
function checkAlpha(e) {
        var key;            
        if(window.event || !e.which) // IE
        {
            key = e.keyCode; // for IE, same as window.event.keyCode
        }
        else if(e) // netscape
        {
            key = e.which;
        }   
        key=parseInt(key)   
        //alert(key)
        if(window.event || !e.which) // IE
        {
            if( (key >=48 && key<=57) || (key >=65 && key<=90) || (key >=97 && key<=122))
            {
                //alert(key)
            }
            else{
                e.keyCode=0; // for IE, same as window.event.keyCode
            }
        }
        else if(e) // netscape
        {
            if (!(key>=48 && key<=57) && !(key==8) && !(key==9) && !(key >=65 && key<=90) && !(key >=97 && key<=102))
            {
                e.which=null
                return false
            }
        }   
    }

function padIt(obj)
    {
        //added for checking any blank spaces ( leading ,trailing , internal). Manish 23/07/2004
        var msg = obj.message;  //Change made by Manish on 7/23/2004
        var str = new String(obj.value) 

            for (i=0; i<str.length; i++)
                    {
                        for(j=32; j<33; j++)
                        {
                            
                                if(!findInvalidChars(j, str.charAt(i)))
                                {
                                    alert("Please Enter proper Value For "+msg);
                                    obj.value="";
                                    setObjFocus(obj);
                                    return false;
                                }
                            
                        }
                    }   // upto Manish 23/07/2004

        if ( isNaN(obj.value) )
        {
            alert(obj.message+" must be Numeric!");
            obj.value = "";
            setObjFocus(obj);
            return false;
        }

        if(eval(obj.value)>0)
        {
            val = "00000"+obj.value;
            obj.value = val.substring(val.length-6) ;
 
        }
        else if(obj.value != "")    {
            alert(obj.message+" must be greater than zero!");
            obj.value="";
            setObjFocus(obj);
            return false;
        }
            
        return true;
    }
    
 
    function populateListBox(arrayObject,listboxobj)
    {
        
        var i = 0;  
        var nameIndex = 0;
        var valueIndex = 0;
        var name = "";
        var value = "";
        var arrayList = arrayObject;
        listboxobj.length = 1;  
        listboxobj.options[i].text= "-- Select Any --";
        listboxobj.options[i].value = "-1";     
        listboxobj.options[i].selected = true;      
        for(; i < arrayList.length; i++)
        {
            listboxobj.length = i+2;
            nameIndex = arrayList[i].indexOf("[");
            name = arrayList[i].substring(0,nameIndex);
            valueIndex = arrayList[i].indexOf("]");
            
            value = arrayList[i].substring(nameIndex+1,valueIndex);
            
            listboxobj.options[i+1].text= name
            listboxobj.options[i+1].value = value

        }
        
    }
    
    
/*Use In CollectPro*/


/* Added by Rohit on 04-11-2004  */ 
/*  For Multiple Email Address Checked */
function testmultipleemail(str)
{               
    var supported = 0;
    var str1 = new String(str.value) 
    if (window.RegExp)
    {
      var tempStr = "a";
      var tempReg = new RegExp(tempStr);
      if (tempReg.test(tempStr))
        supported = 1;
    }
    if(!supported) 
        return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
        var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
        var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");

        if (!(!r1.test(str) && r2.test(str)))
        {
            alert("Please Enter a Valid Email Address ");
            return false;
        }
        else
            return true;
}

function checkEmailTextArea(obj)
{
    var str1 = obj;
    var str = "";
    var k =0 ;
    if((str1.indexOf(",")==-1))
    {
        str = str1;
        if(testmultipleemail(str))
        return true;
        else
        return false;
    }
    while(str1.indexOf(",")!= -1)
    {           
        var i=str1.indexOf(",");
        str=str1.substring(0,i);
        str1 = str1.substring(i+1);
        if(testmultipleemail(str))
        {
            if(str1.indexOf(",")==-1)
            {
                str =str1;
                return(testmultipleemail(str));
            }
            continue;
        }
        else
            return false;
    }
}
// End email validate function
		
	function setDecimailFormat(obj)
	{
		var val1 = obj.value;
		var tempindex = val1.indexOf(".");
		
		if(tempindex==-1 && val1.length!=0)
		{
			if(val1!=0)
			{
				val1 = val1 + ".00";
			}
		}
		else
		{
			var deciValue = val1.substring(tempindex + 1);
			var deciLength =  deciValue.length;
			if(deciLength == 0)
			{
				val1 = val1 + "00";
			}
			else if(deciLength==1)
			{
				val1 = val1 + "0";
			}
		}
		return val1;
	}
	
		function formatNumber(obj)
		{
		   
		    var value = obj.value;
		    var num = new NumberFormat();
		    num.setInputDecimal('.');
		    num.setNumber(value); // obj.value is '1000'
		    num.setPlaces('2');
		    num.setCurrencyValue('$');
		    num.setCurrency(false);
		    num.setCurrencyPosition(num.LEFT_OUTSIDE);
		    num.setNegativeFormat(num.LEFT_DASH);
		    num.setNegativeRed(false);
		    num.setSeparators(false, ',', ',');
		    value = num.toFormatted();
		   	obj.value = value;
		    return value;
		}
		
		function formatNumberByValue(value)
		{
		   
		    
		    var num = new NumberFormat();
		    num.setInputDecimal('.');
		    num.setNumber(value); // obj.value is '1000'
		    num.setPlaces('2');
		    num.setCurrencyValue('$');
		    num.setCurrency(false);
		    num.setCurrencyPosition(num.LEFT_OUTSIDE);
		    num.setNegativeFormat(num.LEFT_DASH);
		    num.setNegativeRed(false);
		    num.setSeparators(false, ',', ',');
		    value = num.toFormatted();
		    return value;
		}
	function NumberFormat(num, inputDecimal)
    {
        // constants
        this.COMMA = ',';
        this.PERIOD = '.';
        this.DASH = '-'; // v1.5.0 - new - used internally
        this.LEFT_PAREN = '('; // v1.5.0 - new - used internally
        this.RIGHT_PAREN = ')'; // v1.5.0 - new - used internally
        this.LEFT_OUTSIDE = 0; // v1.5.0 - new - currency
        this.LEFT_INSIDE = 1;  // v1.5.0 - new - currency
        this.RIGHT_INSIDE = 2;  // v1.5.0 - new - currency
        this.RIGHT_OUTSIDE = 3;  // v1.5.0 - new - currency
        this.LEFT_DASH = 0; // v1.5.0 - new - negative
        this.RIGHT_DASH = 1; // v1.5.0 - new - negative
        this.PARENTHESIS = 2; // v1.5.0 - new - negative
        this.NO_ROUNDING = -1 // v1.5.1 - new
    
        // member variables
        this.num;
        this.numOriginal;
        this.hasSeparators = false;  // v1.5.0 - new
        this.separatorValue;  // v1.5.0 - new
        this.inputDecimalValue; // v1.5.0 - new
        this.decimalValue;  // v1.5.0 - new
        this.negativeFormat; // v1.5.0 - new
        this.negativeRed; // v1.5.0 - new
        this.hasCurrency;  // v1.5.0 - modified
        this.currencyPosition;  // v1.5.0 - new
        this.currencyValue;  // v1.5.0 - modified
        this.places;
        this.roundToPlaces; // v1.5.1 - new
    
        // external methods
        this.setNumber = setNumberNF;
        this.toUnformatted = toUnformattedNF;
        this.setInputDecimal = setInputDecimalNF; // v1.5.0 - new
        this.setSeparators = setSeparatorsNF; // v1.5.0 - new - for separators and decimals
        this.setCommas = setCommasNF;
        this.setNegativeFormat = setNegativeFormatNF; // v1.5.0 - new
        this.setNegativeRed = setNegativeRedNF; // v1.5.0 - new
        this.setCurrency = setCurrencyNF;
        this.setCurrencyPrefix = setCurrencyPrefixNF;
        this.setCurrencyValue = setCurrencyValueNF; // v1.5.0 - new - setCurrencyPrefix uses this
        this.setCurrencyPosition = setCurrencyPositionNF; // v1.5.0 - new - setCurrencyPrefix uses this
        this.setPlaces = setPlacesNF;
        this.toFormatted = toFormattedNF;
        this.toPercentage = toPercentageNF;
        this.getOriginal = getOriginalNF;
        this.moveDecimalRight = moveDecimalRightNF;
        this.moveDecimalLeft = moveDecimalLeftNF;
    
        // internal methods
        this.getRounded = getRoundedNF;
        this.preserveZeros = preserveZerosNF;
        this.justNumber = justNumberNF;
        this.expandExponential = expandExponentialNF;
        this.getZeros = getZerosNF;
        this.moveDecimalAsString = moveDecimalAsStringNF;
        this.moveDecimal = moveDecimalNF;
        this.addSeparators = addSeparatorsNF;
    
        // setup defaults
        if (inputDecimal == null) {
            this.setNumber(num, this.PERIOD);
        } else {
            this.setNumber(num, inputDecimal); // v.1.5.1 - new
        }
        this.setCommas(true);
        this.setNegativeFormat(this.LEFT_DASH); // v1.5.0 - new
        this.setNegativeRed(false); // v1.5.0 - new
        this.setCurrency(false); // v1.5.1 - false by default
        this.setCurrencyPrefix('$');
        this.setPlaces(2);
    }
    

    function setInputDecimalNF(val)
    {
        this.inputDecimalValue = val;
    }
    
    /*
     * setNumber - Sets the number
     * num - The number to be formatted
     * inputDecimal - (Optional) The decimal character for the input
     *  Also refer to setInputDecimal
     * 
     * If there is a non-period decimal format for the input,
     * setInputDecimal should be called before calling setNumber.
     *
     * v1.5.0 - modified
     */
    function setNumberNF(num, inputDecimal)
    {
        if (inputDecimal != null) {
            this.setInputDecimal(inputDecimal); // v.1.5.1 - new
        }
        
        this.numOriginal = num;
        this.num = this.justNumber(num);
    }
    
    /*
     * toUnformatted - Returns the number as just a number.
     * If the original value was '100,000', then this method will return the number 100000
     * v1.0.2 - Modified comments, because this method no longer returns the original value.
     */
    function toUnformattedNF()
    {
        return (this.num);
    }
    
    /*
     * getOriginal - Returns the number as it was passed in, which may include non-number characters.
     * This function is new in v1.0.2
     */
    function getOriginalNF()
    {
        return (this.numOriginal);
    }
    
    function setNegativeFormatNF(format)
    {
        this.negativeFormat = format;
    }
    
    function setNegativeRedNF(isRed)
    {
        this.negativeRed = isRed;
    }
    
    function setSeparatorsNF(isC, separator, decimal)
    {
        this.hasSeparators = isC;
        
        // Make sure a separator was passed in
        if (separator == null) separator = this.COMMA;
        
        // Make sure a decimal was passed in
        if (decimal == null) decimal = this.PERIOD;
        
        if (separator == decimal) {
            this.decimalValue = (decimal == this.PERIOD) ? this.COMMA : this.PERIOD;
        } else {
            this.decimalValue = decimal;
        }
        
        // Since the decimal value changes if decimal and separator are the same,
        // the separator value can keep its setting.
        this.separatorValue = separator;
    }
    
    function setCommasNF(isC)
    {
        this.setSeparators(isC, this.COMMA, this.PERIOD);
    }
    
    /*
     * setCurrency - Sets a switch that indicates if should be displayed as currency
     * isC - true, if should be currency; false, if not currency
     */
    function setCurrencyNF(isC)
    {
        this.hasCurrency = isC;
    }
    
    function setCurrencyValueNF(val)
    {
        this.currencyValue = val;
    }
    
    function setCurrencyPrefixNF(cp)
    {
        this.setCurrencyValue(cp);
        this.setCurrencyPosition(this.LEFT_OUTSIDE);
    }
    
    function setCurrencyPositionNF(cp)
    {
        this.currencyPosition = cp
    }
    
    function setPlacesNF(p)
    {
        this.roundToPlaces = !(p == this.NO_ROUNDING); // v1.5.1
        this.places = (p < 0) ? 0 : p; // v1.5.1 - Don't leave negatives.
    }
    
    function addSeparatorsNF(nStr, inD, outD, sep)
    {
        nStr += '';
        var dpos = nStr.indexOf(inD);
        var nStrEnd = '';
        if (dpos != -1) {
            nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
            nStr = nStr.substring(0, dpos);
        }
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(nStr)) {
            nStr = nStr.replace(rgx, '$1' + sep + '$2');
        }
        return nStr + nStrEnd;
    }
    
    function toFormattedNF()
    {   
        var pos;
        var nNum = this.num; // v1.0.1 - number as a number
        var nStr;            // v1.0.1 - number as a string
        var splitString = new Array(2);   // v1.5.0
        
        // round decimal places - modified v1.5.1
        // Note: Take away negative temporarily with Math.abs
        if (this.roundToPlaces) {
            nNum = this.getRounded(nNum);
            nStr = this.preserveZeros(Math.abs(nNum)); // this step makes nNum into a string. v1.0.1 Math.abs
        } else {
            nStr = this.expandExponential(Math.abs(nNum)); // expandExponential is called in preserveZeros, so call it here too
        }
        
        // v1.5.3 - lost the if in 1.5.2, so putting it back
        if (this.hasSeparators) {
            // v1.5.2
            // Note that the argument being passed in for inD is this.PERIOD
            //  That's because the toFormatted method is working with an unformatted number
            nStr = this.addSeparators(nStr, this.PERIOD, this.decimalValue, this.separatorValue);
        }
        
        // negative and currency
        // $[c0] -[n0] $[c1] -[n1] #.#[nStr] -[n2] $[c2] -[n3] $[c3]
        var c0 = '';
        var n0 = '';
        var c1 = '';
        var n1 = '';
        var n2 = '';
        var c2 = '';
        var n3 = '';
        var c3 = '';
        var negSignL = (this.negativeFormat == this.PARENTHESIS) ? this.LEFT_PAREN : this.DASH;
        var negSignR = (this.negativeFormat == this.PARENTHESIS) ? this.RIGHT_PAREN : this.DASH;
            
        if (this.currencyPosition == this.LEFT_OUTSIDE) {
            // add currency sign in front, outside of any negative. example: $-1.00 
            if (nNum < 0) {
                if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n1 = negSignL;
                if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n2 = negSignR;
            }
            if (this.hasCurrency) c0 = this.currencyValue;
        } else if (this.currencyPosition == this.LEFT_INSIDE) {
            // add currency sign in front, inside of any negative. example: -$1.00
            if (nNum < 0) {
                if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n0 = negSignL;
                if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n3 = negSignR;
            }
            if (this.hasCurrency) c1 = this.currencyValue;
        }
        else if (this.currencyPosition == this.RIGHT_INSIDE) {
            // add currency sign at the end, inside of any negative. example: 1.00$-
            if (nNum < 0) {
                if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n0 = negSignL;
                if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n3 = negSignR;
            }
            if (this.hasCurrency) c2 = this.currencyValue;
        }
        else if (this.currencyPosition == this.RIGHT_OUTSIDE) {
            // add currency sign at the end, outside of any negative. example: 1.00-$
            if (nNum < 0) {
                if (this.negativeFormat == this.LEFT_DASH || this.negativeFormat == this.PARENTHESIS) n1 = negSignL;
                if (this.negativeFormat == this.RIGHT_DASH || this.negativeFormat == this.PARENTHESIS) n2 = negSignR;
            }
            if (this.hasCurrency) c3 = this.currencyValue;
        }
    
        nStr = c0 + n0 + c1 + n1 + nStr + n2 + c2 + n3 + c3;
        
        // negative red
        if (this.negativeRed && nNum < 0) {
            nStr = '<font color="red">' + nStr + '</font>';
        }
    
        return (nStr);
    }
    
    function toPercentageNF()
    {
        nNum = this.num * 100;
        
        // round decimal places
        nNum = this.getRounded(nNum);
        
        return nNum + '%';
    }
    
    function getZerosNF(places)
    {
            var extraZ = '';
            var i;
            for (i=0; i<places; i++) {
                extraZ += '0';
            }
            return extraZ;
    }
    
    function expandExponentialNF(origVal)
    {
        if (isNaN(origVal)) return origVal;
    
        var newVal = parseFloat(origVal) + ''; // parseFloat to let JavaScript evaluate number
        var eLoc = newVal.toLowerCase().indexOf('e');
    
        if (eLoc != -1) {
            var plusLoc = newVal.toLowerCase().indexOf('+');
            var negLoc = newVal.toLowerCase().indexOf('-', eLoc); // search for - after the e
            var justNumber = newVal.substring(0, eLoc);
            
            if (negLoc != -1) {
                // shift decimal to the left
                var places = newVal.substring(negLoc + 1, newVal.length);
                justNumber = this.moveDecimalAsString(justNumber, true, parseInt(places));
            } else {
                // shift decimal to the right
                // Check if there's a plus sign, and if not refer to where the e is.
                // This is to account for either formatting 1e21 or 1e+21
                if (plusLoc == -1) plusLoc = eLoc;
                var places = newVal.substring(plusLoc + 1, newVal.length);
                justNumber = this.moveDecimalAsString(justNumber, false, parseInt(places));
            }
            
            newVal = justNumber;
        }
    
        return newVal;
    } 
    function moveDecimalRightNF(val, places)
    {
        var newVal = '';
        
        if (places == null) {
            newVal = this.moveDecimal(val, false);
        } else {
            newVal = this.moveDecimal(val, false, places);
        }
        
        return newVal;
    }
    
    function moveDecimalLeftNF(val, places)
    {
        var newVal = '';
        
        if (places == null) {
            newVal = this.moveDecimal(val, true);
        } else {
            newVal = this.moveDecimal(val, true, places);
        }
        
        return newVal;
    }
    function moveDecimalAsStringNF(val, left, places)
    {
        var spaces = (arguments.length < 3) ? this.places : places;
        if (spaces <= 0) return val; // to avoid Mozilla limitation
                
        var newVal = val + '';
        var extraZ = this.getZeros(spaces);
        var re1 = new RegExp('([0-9.]+)');
        if (left) {
            newVal = newVal.replace(re1, extraZ + '$1');
            var re2 = new RegExp('(-?)([0-9]*)([0-9]{' + spaces + '})(\\.?)');      
            newVal = newVal.replace(re2, '$1$2.$3');
        } else {
            var reArray = re1.exec(newVal); // v1.5.2
            if (reArray != null) {
                newVal = newVal.substring(0,reArray.index) + reArray[1] + extraZ + newVal.substring(reArray.index + reArray[0].length); // v1.5.2
            }
            var re2 = new RegExp('(-?)([0-9]*)(\\.?)([0-9]{' + spaces + '})');
            newVal = newVal.replace(re2, '$1$2$4.');
        }
        newVal = newVal.replace(/\.$/, ''); // to avoid IE flaw
        
        return newVal;
    }
    
    function moveDecimalNF(val, left, places)
    {
        var newVal = '';
        
        if (places == null) {
            newVal = this.moveDecimalAsString(val, left);
        } else {
            newVal = this.moveDecimalAsString(val, left, places);
        }
        
        return parseFloat(newVal);
    }
    
    function getRoundedNF(val)
    {
        val = this.moveDecimalRight(val);
        val = Math.round(val);
        val = this.moveDecimalLeft(val);
        
        return val;
    }
    
    function preserveZerosNF(val)
    {
        var i;
    
        // make a string - to preserve the zeros at the end
        val = this.expandExponential(val);
        
        if (this.places <= 0) return val; // leave now. no zeros are necessary - v1.0.1 less than or equal
        
        var decimalPos = val.indexOf('.');
        if (decimalPos == -1) {
            val += '.';
            for (i=0; i<this.places; i++) {
                val += '0';
            }
        } else {
            var actualDecimals = (val.length - 1) - decimalPos;
            var difference = this.places - actualDecimals;
            for (i=0; i<difference; i++) {
                val += '0';
            }
        }
        
        return val;
    }
    
    function checkFloatRate(obj)
    {
		if(obj.value>100)
		{
	    	alert("Enter Value less than or equal to 100");
	    	obj.value="";
	    	setObjFocus(obj);
	  		return false;
		}
		var decimalindex=(obj.value).indexOf(".");
		
		if(decimalindex != -1) 
		{
		  if(((obj.value).substring(decimalindex+2,decimalindex+3)=="")||((obj.value).substring(decimalindex+2,decimalindex+3)==null))
		 	{
		 	 	obj.value=obj.value+"0"
		 	}
		 	if(decimalindex == 0) 
					obj.value= "0" + obj.value;
		}
		else
		{	
		 	obj.value=obj.value+".00"
		}	
 	}  
    
   function justNumberNF(val)
    {
        newVal = val + '';
        
        var isPercentage = false;
        if (newVal.indexOf('%') != -1) {
            newVal = newVal.replace(/\%/g, '');
            isPercentage = true; // mark a flag
        }
            
        var re = new RegExp('[^\\' + this.inputDecimalValue + '\\d\\-\\+\\(\\)eE]', 'g');   // v1.5.2   
        newVal = newVal.replace(re, '');
        var tempRe = new RegExp('[' + this.inputDecimalValue + ']', 'g');
        var treArray = tempRe.exec(newVal); // v1.5.2
        if (treArray != null) {
          var tempRight = newVal.substring(treArray.index + treArray[0].length); // v1.5.2
            newVal = newVal.substring(0,treArray.index) + this.PERIOD + tempRight.replace(tempRe, ''); // v1.5.2
        }
        
        // If negative, get it in -n format
        if (newVal.charAt(newVal.length - 1) == this.DASH ) {
            newVal = newVal.substring(0, newVal.length - 1);
            newVal = '-' + newVal;
        }
        else if (newVal.charAt(0) == this.LEFT_PAREN
         && newVal.charAt(newVal.length - 1) == this.RIGHT_PAREN) {
            newVal = newVal.substring(1, newVal.length - 1);
            newVal = '-' + newVal;
        }
        
        newVal = parseFloat(newVal);
        
        if (!isFinite(newVal)) {
            newVal = 0;
      }
        
        // now that it's a number, adjust for percentage, if applicable.
      // example. if the number was formatted 24%, then move decimal left to get 0.24
      // v1.5.0 - updated v1.5.1
      if (isPercentage) {
        newVal = this.moveDecimalLeft(newVal, 2);
      }
            
        return newVal;
    }
    
/*** get rid of leading and trailing spaces ***/
function trimString(pstr)
{
  var tstr = new String(pstr);
  tstr = tstr.replace(/^\s*/, "");
  tstr = tstr.replace(/\s*$/, "");
  return tstr.valueOf();
}



// ================= End Of Java Script Funmctions .============================
        

// ========================== For Drop Down Code =========================================== //

	function makeAJAXCall(parent, listBox){
		//- Select  -
		if(parent == ""){
		
			clearCombo(listBox);
			return false;
		}
	    return true;
	}
	
	function clearCombo(list){
		
		var listBox=document.getElementById(list);
		listBox.options.length=0;
		listBox.options[0] = new Option("Please select","");
	}
	
	function fillCombo(comboboxname, docElement,selectedvalue, enrichment){
		fillComboWithDefault(comboboxname, docElement,selectedvalue, enrichment, "Please select");
	}
	
	function fillComboAll(comboboxname, docElement,selectedvalue, enrichment){
		fillComboWithDefault(comboboxname, docElement,selectedvalue, enrichment, "All");
	}
	
	function fillComboWithDefault(comboboxname, docElement,selectedvalue, enrichment, optionValue) {
		
		var listBox=document.getElementById(comboboxname);
		listBox.options.length = 0;
		var list = docElement.getElementsByTagName('Item');
		listBox.options[0] = new Option(optionValue,"");
			
		var enrichments = new Array();
		
		for(i = 0;i < list.length;i++){
			
			var id = list[i].getElementsByTagName("Id")[0].firstChild.data;
			var name = list[i].getElementsByTagName("Name")[0].firstChild.data;
			var enrich = list[i].getElementsByTagName("Enrichments");
			if(enrich.length > 0 )
			{
				var value = new Array();
				for(j = 0;j < enrich.length;j++){
					value[j] = enrich[j].firstChild.data;
				}
				
				enrichments[i] = value;
			}
			/*if(name.length >= 35){
				name = name.substring(0,34)+"..";
				listBox.options[i+1] = new Option(name,id);
			}
			else*/
				listBox.options[i+1] = new Option(name,id);
			
			if(selectedvalue!=null && id==selectedvalue)
				listBox.options[i+1].selected = true;
		}
		
		if(enrichment)
			enrichment(enrichments);
	}
	
	function fillComboWithAll(comboboxname, docElement,selectedvalue, enrichment){
		fillComboWithDefault(comboboxname, docElement,selectedvalue, enrichment, "Select All");
	}
	
	function fillComboWithBlank(comboboxname, docElement,selectedvalue, enrichment){
		fillComboWithDefault(comboboxname, docElement,selectedvalue, enrichment, "");
	}
	
	function fillComboText(comboboxname, docElement,selectedvalue){

		var listBox=document.getElementById(comboboxname);
		listBox.options.length=0;
		var list = docElement.getElementsByTagName('Item');
		listBox.options[0] = new Option("Please select","");
		
		for(i = 0;i < list.length;i++){
			var name = list[i].getElementsByTagName("Name")[0].firstChild.data;
			 var names = name.split("-");
			 
			/*if(name.length >= 35){
				name = name.substring(0,34)+"..";
				listBox.options[i+1] = new Option(name, names[0]);
			}
			else*/
				listBox.options[i+1] = new Option(name, names[0]);
				
			if(selectedvalue!=null && names[0]==selectedvalue)
				listBox.options[i+1].selected = true;
		}
	}
	
	
	function fillMonthArray(comboboxname, selectedvalue, monthlen){

		var listBox=document.getElementById(comboboxname);
		listBox.options.length = 0;
		listBox.options[0] = new Option("Please select","");
		for(i = 1;i <=monthlen;i++){
			listBox.options[i] = new Option(i,i);
			if(selectedvalue != null && i == selectedvalue)
				listBox.options[i].selected = true;
				
		}
	}
	function fillMonthNamesArray(comboboxname, selectedvalue, monthlen){
		var listBox=document.getElementById(comboboxname);
		listBox.options.length = 0;
		listBox.options[0] = new Option("Please select","");
		for(i = 1;i <=monthlen;i++){
			listBox.options[i] = new Option(montharr[i-1],montharr[i-1]);
			if(selectedvalue != null && montharr[i-1] == selectedvalue)
				listBox.options[i].selected = true;
				
		}
	}
	function fillMonthArray1(comboboxname, selectedvalue, monthlen){

		var listBox=document.getElementById(comboboxname);
		listBox.options.length = 0;
		listBox.options[0] = new Option("Please select","");
		for(i = 1;i <=monthlen;i++){
			
			var field = i+" Month";
			listBox.options[i] = new Option(field, i);
			if(selectedvalue != null && field == selectedvalue)
				listBox.options[i].selected = true;
		}
	}
	
	
	function fillInstructionPriorityArray(comboboxname, selectedvalue){
		var listBox=document.getElementById(comboboxname);
		listBox.options.length = 0;
		listBox.options[0] = new Option("Please select","");
		for(i = 1;i<=10;i++){
			
			listBox.options[i] = new Option(i,i);
			if(selectedvalue != null && i == selectedvalue)
				listBox.options[i].selected = true;
		}
	}
	
	function fillComboWithNameAsKeyAndValue(comboboxname, docElement,selectedvalue){

		var listBox=document.getElementById(comboboxname);
		listBox.options.length=0;
		var list = docElement.getElementsByTagName('Item');
		listBox.options[0] = new Option("Please select","");
		
		for(i = 0;i < list.length;i++){
			var name = list[i].getElementsByTagName("Name")[0].firstChild.data;

			listBox.options[i+1] = new Option(name,name);
			if(selectedvalue!=null && name==selectedvalue)
				listBox.options[i+1].selected = true;
		}
	}
	
	
// =================================================================
//	Making asynchronous AJAX calls , AJAXCall is a javascript class
//	url = complete url to send http request
//	callback = method to be executed on response of http request
//	list = combobox to be populated
//	selected = value to be selected in combobox
// =================================================================	
	function AJAXCall(url, callback,list,selected, enrichment) {
	   
	   //added by padma naresh for url encryption
	   url=hashURL(url);
	   //alert(url);
	    var req = init();
	    req.onreadystatechange = processRequest;
	    function init() {
	        if (window.XMLHttpRequest) {
	        return new XMLHttpRequest();
	      } else if (window.ActiveXObject) {
	        return new ActiveXObject("Microsoft.XMLHTTP");
	      }
	    } 
	    
	    function processRequest () {
	   
	      if (req.readyState == 4) {
	        if (req.status == 200) {
		      if (callback) callback(list,req.responseXML,selected, enrichment);
	        }
	      }
	    }
	
	    this.doGet = function() {
	      req.open("GET", url, true); 
	      req.send(url);
	    }
	    
	    this.doSynchronousGet = function() {
	      req.open("GET", url, false); 
	      req.send(url);
	    }
	    
	    this.doPost = function(body) {
	      req.open("POST", url, true);
	      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	      req.send(body);
	    }

		this.doSynchronousPost = function(body) {
	      req.open("POST", url, false);
	      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	      req.send(body);
	    }
	    
	}
	

function AJAXCallWithStatusImage(url, callback,list,selected, image, enrichment) {
		//added by padma naresh for url encryption
	   url=hashURL(url);
	  //alert("after hash "+url);
		
		var projectName = document.getElementById("projectName").value;
		if(image != "")
			MM_setTextOfLayer(image,'','&nbsp;<img src="'+projectName+'/images/arrow.gif" alt="arrow" height="14px">') 
	
	    var req = init();
	    req.onreadystatechange = processRequest;
	  
	    function init() {
	        if (window.XMLHttpRequest) {
	        return new XMLHttpRequest();
	      } else if (window.ActiveXObject) {
	        return new ActiveXObject("Microsoft.XMLHTTP");
	      }
	    } 
	    
	    function processRequest () {
	   		
	      if (req.readyState == 4) {
	        if (req.status == 200) {
		      if (callback) callback(list,req.responseXML,selected, enrichment);
		      	if(image != "")
					MM_setTextOfLayer(image,'','')
	        }
	        else if (req.status == 400) {
	        	//if(image != "")
				//	MM_setTextOfLayer(image,'','')
	        	//alert("Please write proper Url for "+document.getElementById(list).title);
	        	//return false;
	        }
	      }
	    }
	
	    this.doGet = function() {
	      req.open("GET", url, true); 
	      req.send(url);
	    }
	    
	    this.doSynchronousGet = function() {
	      req.open("GET", url, false); 
	      req.send(url);
	    }
	    
	    this.doPost = function(body) {
	      req.open("POST", url, true);
	      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	      req.send(body);
	    }

	}

	function checkNull(obj, isamt) {
 		var str = obj.value;
 		 if(isamt) {
 		 	if((str == null) ||(str=="") ||(str.length == 0) || str == "0" || str == "0.0" || str == "0.00") {
 		 		return true;
 		 	}
 		 } else if ((str == null) ||(str=="") ||(str.length == 0)) {
 		 	return true;
 		 }
 		return false;
 	}

	function MM_findObj(n, d) { //v4.01
	try {
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
  }catch(Excption) {}
}
	
function MM_setTextOfLayer(objName,x,newText) { //v4.01
	  if ((obj=MM_findObj(objName))!=null) with (obj)
	    if (document.layers) {document.write(unescape(newText)); document.close();}
	    else innerHTML = unescape(newText);
}
	
function validateAddress250(obj,val) 
{

	var msg = obj.alt; 
	
	if(!checkIsNull(obj))
    	return false;

    if(val.length > 250)
    {
	    alert(msg+" field should be less than or equal to 250");
	    setObjFocus(obj);
	    return false;
    }

    
     // Change To Upper field values
    var result = "";
    var words = val.split(" ");
    var count = words.length;
    
    for(var i=0;i<count;i++)
    {
       result += parse(words[i]) + " ";
    }
    result += parse(words[i]);
    val.value = MyTrim(result);
    
    return true;
}

function checkLoginAndPaswordisNotSame(login, password){
	
	var loginId = login.value;
	var pwd = password.value;
	if(loginId == pwd){
	
		alert("Password cannot be same as LoginId");
		password.value = "";
		password.focus()
		return false;
	}
	return true;	
}	


/*************************************************************************
	@Author Nitin Wasnik
	@Date 15/01/2008
	@Version 1.0
	@param1      :-  The element passed to be zero padded.
	@param2      :-  The max length allowed by the element.
	@Desc           :-  This method zero pads a value ie passed to it at runtime.
	
**************************************************************************/	
	function zeroPadIt(elem,len)
	{
		var val = elem.value;
		var padChar="";

		if(parseInt(elem.value.length)> parseInt(len))
		{
			alert("Length of "+elem.value+" exceeds max length "+len+". Please Re-enter ");
			elem.value="";
			elem.focus();
			return false;
		}
		if(parseInt(elem.value.length)< parseInt(len))
		{
			diff = len - elem.value.length;
			for (i=0;i<diff; i++)
			{
				padChar = "0"+padChar;			
			}
			elem.value = padChar+val;
		}		
	}
	

function replaceChars(obj) {

	var entry = obj.value;
	out = ","; // replace this
	add = ""; // with this
	var temp = "" + entry; // temporary holder
	
	while (temp.indexOf(out)>-1) {
		pos= temp.indexOf(out);
		temp = "" + (temp.substring(0, pos) + add + 
		temp.substring((pos + out.length), temp.length));
	}
	
	return temp;
}

	
function amountValidation(obj, isAllowNull){
	
	if(isAllowNull == false){
		if(!checkIsNull(obj))
		  	 return false;
	}
	
	var fvalue = replaceChars(obj);
	obj.value = fvalue;
	
	if(!checkDeciNumber(obj))
			return false;

	fvalue = setValueWithSeparator(obj);
	obj.value = fvalue;
	if(fvalue == "0.00")
		obj.value = "";
	return true;	
}

//amountvalidation with zero value
function amountValidationWithZero(obj, isAllowNull){
	
	
	if(isAllowNull == false){
		if(!checkIsNull(obj))
		  	 return false;
	}
	var fvalue = replaceChars(obj);
	obj.value = fvalue;
	
	if(!checkDeciNumber(obj))
			return false;
	
	fvalue = setValueWithSeparator(obj);
	obj.value = fvalue;
	//if(fvalue == "0.00")
		//obj.value = "";
	return true;	
}

function amountValidationWithZeroNegativeNotAllowed(obj, isAllowNull){
	
	
	if(isAllowNull == false){
		if(!checkIsNull(obj))
		  	 return false;
	}
	var fvalue = replaceChars(obj);
	obj.value = fvalue;
	
	if(!checkPositiveDeciNumber(obj))
			return false;
	
	fvalue = setValueWithSeparator(obj);
	obj.value = fvalue;
	//if(fvalue == "0.00")
		//obj.value = "";
	return true;	
}



function setValueWithOutSeparator(obj){
    var value = obj.value;
    var num = new NumberFormat();
    num.setInputDecimal('.');
    num.setNumber(value); // obj.value is '1000'
    num.setPlaces('2');
    num.setCurrencyValue('$');
    num.setCurrency(false);
    num.setCurrencyPosition(num.LEFT_OUTSIDE);
    num.setNegativeFormat(num.LEFT_DASH);
    num.setNegativeRed(false);
    num.setSeparators(false, ',', ',');
    value = num.toFormatted();
   	obj.value = value;
    return value;
}
		

function setValueWithOutSeparatorByValue(value){
    //var value = obj.value;
    var num = new NumberFormat();
    num.setInputDecimal('.');
    num.setNumber(value); // obj.value is '1000'
    num.setPlaces('2');
    num.setCurrencyValue('$');
    num.setCurrency(false);
    num.setCurrencyPosition(num.LEFT_OUTSIDE);
    num.setNegativeFormat(num.LEFT_DASH);
    num.setNegativeRed(false);
    num.setSeparators(false, ',', ',');
    value = num.toFormatted();
   	//obj.value = value;
    return value;
}

function setValueWithSeparator(obj){
	var value = obj.value;
   	var num = new NumberFormat();
   	num.setInputDecimal('.');
	num.setNumber(value); // obj.value is '1000'
	num.setPlaces('2');
	num.setCurrencyValue('$');
	num.setCurrency(false);
	num.setCurrencyPosition(num.LEFT_OUTSIDE);
	num.setNegativeFormat(num.LEFT_DASH);
	num.setNegativeRed(false);
	num.setSeparators(true, ',', ',');
	value = num.toFormatted();
	obj.value = value;
	return value;
}		

 function validateNameWithNumbers(obj)
	 {
	 	var field = obj.alt;
	   if (!isNaN(obj.value) || MyTrim(obj.value)=="")
    {
        alert("Please Enter Alpha Numeric Value For "+field);
        obj.value = "";
        obj.focus();
        return false;
    }
    
     if(!checkInvalidCharsSpaceAndAllowToSpecChars(obj))
    	return false;
    	
    	return true;
    
   }
   
   // Function to check if the password contains 1 upper case and 1 lower case charecter.
   function checkForUpperCaseLowerCaseChars(obj){
		var capsChar = "false";
   		var lowerChar= "false"; 
   		var str = new String(obj.value);
   		for (i=0; i<str.length; i++) {
			for(kk=65; kk<91; kk++)
			{
				if(str.charAt(i) == String.fromCharCode(kk))
				{
					capsChar = "true";
					
					//chars=parseInt(chars)+1;
				}
			}
			for(kd=97; kd<123; kd++)
			{
			  if(str.charAt(i) == String.fromCharCode(kd))
			  {
    		    lowerChar = "true";	
    		    
				//chars=parseInt(chars)+1;
			  }
			 }
		}
		if(lowerChar == "false" || capsChar == "false") 

	    {
	        alert("Password Should Contain Atleast 1 Lower Case Character And Atleast 1 Upper Case Character");
	        //obj.value="";
	        setObjFocus(obj);
	        return false; 
	    }    
	    return true;
	}
   // Function for validation of beneficiary Name contain (a to z,A To Z,0 to 9 , ( / - ? . , ' + ( ) )charater) NEFT, RTGS,SWIFT payment method.
	function qphStringValidation(objvalue,validCharacters,objalt){
	    var flag = 0;    
	    
	    for(var i=0;i<objvalue.length;i++){		
			for(var j=0 ; j < validCharacters.length ; j++ ){			
			    if(objvalue.charAt(i)== validCharacters[j].charAt(0)|| (objvalue.charAt(i).charCodeAt(0)>=47 && objvalue.charAt(i).charCodeAt(0)<=57)||
			      (objvalue.charAt(i).charCodeAt(0) >= 65 && objvalue.charAt(i).charCodeAt(0) <= 90) || (objvalue.charAt(i).charCodeAt(0) >= 97 && objvalue.charAt(i).charCodeAt(0) <= 122) ){			       
			       flag = 1;
			       break;
			    }			   
			}
			if(flag == 0 )
			{
			  alert('QPH Character Validation failed for '+objalt);
			  return false;
			}
			flag = 0 ;
		}
		return true;
	}
	


//check comma seperated names
 function checkCommaSeparatedFieldNames(fieldsToBeChecked, fieldName){
 		var  fields = fieldsToBeChecked.split(",");
 		for(i = 0; i < fields.length; i++){
 			var field = fields[i];
 			if(field != "" && field != "null" && field != "NULL"){	
	 			if(field != fieldName){
            			var txtField  = document.getElementById(fieldName);
            			txtField.value = fieldValue;
	 			}
	 		}
 		}
 }

// Fill Text for Search
   function commonFillTextForsearch(xmlList, fieldsToBeChecked, fieldId){
           
          if(xmlList.length != 0){
				    var fieldNames = xmlList[0].childNodes;
            	    var dataSize = fieldNames[0].childNodes[0].data;
		    if(dataSize == 1)
		    {
				 		for(i = 1; i < fieldNames.length; i++){
			                    fieldName = fieldNames[i].tagName;
			                    fieldValue = fieldNames[i].childNodes[0].data;
			                   
				          if(fieldName == "Id"){
				               var txtField  = document.getElementById(fieldId);
				               if(txtField != null){
				               		txtField.value = fieldValue;
				               }
				          }
		             	  
		                  if(fieldName != "Id" && fieldName != "null" && fieldName != "" && fieldName != "size" && fieldName != fieldsToBeChecked){
						        var txtField  = document.getElementById(fieldName);
				                  					        
						        if(txtField != null){
						   	   	 txtField.value = fieldValue;	
						   	   	}												            			
														            			
	                	  }                   
		                         			
		          	}//inner for
		          	return dataSize;
	       }else if(dataSize == 0){
	             	alert("No Records Found.");
	             	return dataSize;
	                   
	       }else if(dataSize > 1){
	             	alert("Multiple Records Found. Please Use Search Facility.");
	             	return dataSize;
	       }
	       }else{
            	alert("No Records Found.");
           }
   }
   // removes preceeding zeros.......
  function trimNumber(s) {
			  while (s.substr(0,1) == '0' && s.length>1) { s = s.substr(1,9999); }
			  return s;
	} 

	
//added by padma naresh on 9th feb 2012 for URL encruption using SHA1.
	
function hashURL(formURL){
						var length =formURL.lastIndexOf('?');	
						if(length >0){
							var newUrl  = formURL.substring(length+1);
							var hashcode = SHA1(newUrl);
							formURL =  formURL +"&MYCAL="+hashcode;
						}else{
							var hashcode = SHA1(newUrl);
							formURL =  formURL +"&MYCAL="+hashcode;
						}
						return formURL;
	}

function SHA1(msg) {
	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};
 
	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;
 
		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};
 
	function cvt_hex(val) {
		var str="";
		var i;
		var v;
 
		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};
 
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;
 
	msg = Utf8Encode(msg);
 
	var msg_len = msg.length;
 
	var word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}
 
	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;
 
		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;
 
		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}
 
	word_array.push( i );
 
	while( (word_array.length % 16) != 14 ) word_array.push( 0 );
 
	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );
 
 
	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 
		for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
		for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
 
		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
 
	}
 
	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
 
	return temp.toLowerCase();
 
}


//added by padma naresh to format account number
function formatAccountNum(accNum){
	var newAccNum = accNum.substring(0,3)+"-"+accNum.substring(3,4)+"-"+accNum.substring(4,7)+"-"+accNum.substring(7,12)+"-"+accNum.substring(12,13);
	return newAccNum;
}
//added by sumeet singh to append zero at the end of amount
function appendZeroToAmount(amount)
{
	if(amount.indexOf(".") >= 0)
	{
			var actualamt = amount.split('.')[0];
			var afterSplit = amount.split('.')[1];
			if(afterSplit.length == 1)
			{
			 	amount = amount + "0";
			 	return amount;
			}
			return amount;
	}
	else
	{
		amount = amount + ".00";
		return amount; 
	}
}
	
	//added by Komal for checking Leap Year.	
	function checkDateForLeapYear(datevalue)
	{
		
		re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
		if(datevalue != '') {
		 if(regs = datevalue.match(re)) {
			if (regs[1] == 2)
		    {
		    	 if (regs[2] == 29)
		        {
		        	 if(regs[3] % 4 != 0 || regs[3] % 100 == 0 && regs[3] % 400 != 0 ) 
		           	{
		            	alert("Please enter valid date.");
		            	return false;
		          	}
		           	
		        }
		        else if(regs[2]==30 ||regs[2] == 31)
		        {
		        
		        alert("Please enter valid date.");
		        return false;
		        }
			}
			}
		   return true;
		}
    }
    
    function checkIsNull(obj,message)
{
    
    var i;
    var whitespace = " \t\n\r";
    var msg = obj.alt
    var str = obj.value;
    var initmessage =message
      
    if ((str == null) ||(str=="") ||(str.length == 0))
    {
        if(message!=null)
        alert(initmessage+" "+msg+".");
        else
        alert("Please enter "+msg+".")
        obj.value = "";
        setObjFocus(obj);
        return false;
    }

    // Search through string's characters one by one
    // until we find a non-whitespace character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < str.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = str.charAt(i);

        if (whitespace.indexOf(c) == -1) 
        {
            return true;
        }
    }

    // All characters are whitespace.
         if(message!=null)
           alert(initmessage+" "+msg);
         else
         alert("Please enter "+msg)
         obj.value = "";
         setObjFocus(obj);
          return false;
}
function applyPagination(styleClass,pageCount){
		if(!pageCount){
			var per_page = 10;
		}else{
			var per_page = pageCount;
		}
		var listClass = "."+styleClass;
		var totalMails = $(listClass).size(),
		totalPages = Math.ceil(parseInt(totalMails)/parseInt(per_page));
		
		currentPage = 1;
		/*setPrevPages = '1-'+per_page;
		currentPageList	= 
		setNextPage	= 
		$('#prev').attr('name',);
		$('#next').attr('name',);*/
		$(listClass).each(function(index){
			var mail_id = parseInt(index)+parseInt(1);
			$(this).attr('id','mail-'+mail_id);
			if(index >= per_page)
			{
				$(this).hide();
			}
		});
		$('#next').on('click',function(e){
			
			if($(this).hasClass('disablePagination')== true){
				return false;
			}
			e.preventDefault();
			var nextPages = $(this).attr('name');
			var nextPages = nextPages.split(',');
			var nextPageStart = parseInt(nextPages[0]);
			var nextPageEnd	 = parseInt(nextPages[1]);
			//alert(nextPageEnd);
			$(listClass).hide();
			for(i=nextPageStart;i<=nextPageEnd;i++){
			//alert(i);
				$('#mail-'+i).show();
			}
			$('#prev').attr('name',parseInt(nextPageStart-parseInt(per_page))+','+parseInt(nextPageEnd-parseInt(per_page)));
			nextPages = nextPageStart+parseInt(per_page)+','+parseInt(nextPageEnd+parseInt(per_page));
			
			$(this).attr('name',nextPages);
			currentPage++
			checkCurrPage()
		});
		$('#prev').on('click',function(e){
			
			if($(this).hasClass('disablePagination')== true){
				return false;
			}
			e.preventDefault();
			var prevPages = $(this).attr('name');
			var prevPages = prevPages.split(',');
			var prevPageStart = parseInt(prevPages[0]);
			var prevPageEnd	 = parseInt(prevPages[1]);
			//alert(nextPageEnd);
			$(listClass).hide();
			for(i=prevPageStart;i<=prevPageEnd;i++){
			//alert(i);
				$('#mail-'+i).show();
			}
			$('#next').attr('name',parseInt(prevPageStart+parseInt(per_page))+','+parseInt(prevPageEnd+parseInt(per_page)));
			nextPages = prevPageStart-parseInt(per_page)+','+parseInt(prevPageEnd-parseInt(per_page));
			
			$(this).attr('name',nextPages);
			currentPage--;
			checkCurrPage()
		});
		checkCurrPage()
		function checkCurrPage(){
			if(currentPage==1){
				$('#prev').addClass('disablePagination').attr('name','0,0');
				$('#next').attr('name',parseInt(per_page)+1+','+parseInt(per_page+per_page));
				
			}else{
				$('#prev').removeClass('disablePagination');
			}
			if(currentPage==totalPages){
				$('#next').addClass('disablePagination');
			}else{
				$('#next').removeClass('disablePagination');
			}
			if(totalPages == 1){
				$('#prev,#next').addClass('hidePagination').removeClass('disablePagination');
				if($('#prev').parent().hasClass('onlyPagination')){
					$('.onlyPagination').hide();
				}	
			}
			if(totalPages == 0){
				$('#prev,#next').addClass('hidePagination').removeClass('disablePagination');
			}
		}
}  
function disableCopyPasteFn(e){ 
    if(e.keyCode==17 || e.keyCode==93){                  
           alert('Copy and paste is not allowed.');
           return false;                   
    }
}
// Adding to check whether pressed key is Number or not.
 function isNumberKey(obj)
	{
		var msg = obj.alt;
		var charCode = (obj.which) ? obj.which : event.keyCode
		if (charCode > 31 && (charCode < 48 || charCode > 57))
		{
			return false;
		}
		return true;
	}
	
	function disableSumbitButton()
	{	
		$('.submitButtonDisable').prop("disabled",true);
	}  
  	