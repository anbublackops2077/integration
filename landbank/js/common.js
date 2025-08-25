// To block F5 

// for disabling back button. 
//		history.go(1);

		
		var asciiF5 = 116;
		var ctrlN = 17;
//      var forbiddenKeys = new Array("a", "n", "c", "x", "v", "j");	
		var forbiddenKeys = new Array("n");	
		var bRet = true; 
		var bIsFunctionKey = false;	
		if(document.all){ 
			document.onkeydown = onKeyPress;
			
		}else if (document.layers || document.getElementById){ 
			document.onkeypress = onKeyPress;
		}
		function onKeyPress(evt) {
			window.status = '';
			var oEvent = (window.event) ? window.event : evt;
			
// Handling ctrl and N

	        var key;
	        var isCtrl;
	        if(window.event)
	        { 
	                key = window.event.keyCode;     //IE
	                if(window.event.ctrlKey)
	                        isCtrl = true;
	                else
	                        isCtrl = false;
	        }
	        else
	        { 
	                key = evt.which;     //firefox
	                if(evt.ctrlKey)
	                        isCtrl = true;
	                else
	                        isCtrl = false;
	        }
	        //if ctrl is pressed check if other key is in forbidenKeys array
	        if(isCtrl)
	        {
	        		var len = forbiddenKeys.length;
	                for(var i=0; i < len ; i++)
	                {
	                        //case-insensitive comparation
	                        if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase())
	                        {
	                                alert("This Feature has been disabled.");
	                                return false;
	                        }
	                }
	        }

// end ctrl + N				
		
			
			if(parseInt(oEvent.keyCode) == parseInt(asciiF5)) {
				var nKeyCode = oEvent.keyCode ? oEvent.keyCode :
				oEvent.which ? oEvent.which : 
				void 0;
				
				
				if(oEvent.charCode == null || oEvent.charCode == 0){ 
					
					bIsFunctionKey = (nKeyCode == asciiF5)
				}
				
			if(bIsFunctionKey) {
				
				bRet = false;
				try{
					oEvent.returnValue = false;
					oEvent.cancelBubble = true;
					
					if(document.all){ //IE
						oEvent.keyCode = 0;
					}else{ //NS
						oEvent.preventDefault();
						oEvent.stopPropagation();
					}
					window.status = msg; 
				}catch(ex){
					alert("This Feature has been disabled");
					bIsFunctionKey = false;
					bRet = false;
				}
			}
			return bRet;
		}
		

		}
/**
	encode Id's from UI which are being passed in the URL
*/
		function encodeId(id)
		{
			return encodeURIComponent(id);
		}
		
		function disabledEnabledFieldForLastAction(obj, lastAction, mode)
{
	// For disabling code.
		var listtypeforjs = "";
		var showbutton = true;
		try {
			listtypeforjs = document.getElementById("listtypeforjs").value;
			if("AUTHORIZED" == listtypeforjs.toUpperCase())
				showbutton = false;
		}	
		catch(Exception) {
		
		}
	if(mode.toUpperCase() != "VIEW" && mode.toUpperCase() != "VIEWCHANGEINFO" ) {
		if(lastAction == "create" || lastAction == "create Rejected" || lastAction == "") {
				obj.disabled = false;
		}
		else {
			obj.disabled = true;
		}
	}
	// For Showing View Previous button.
	//var viewbutton = document.all.viewbutton.value;
	
	if((lastAction == "update" || lastAction == "update Rejected")  && mode != "viewchangeinfo" && showbutton) {
		MM_setTextOfLayer('layerprivousbutton','','&nbsp;<input type=button Class=buttonStyle onClick =viewPreviousData() value = "View Previous Data" >') 
	}
	else {
		MM_setTextOfLayer('layerprivousbutton','','')
	}
}

function appandTokenId() {

	var tokenId = document.getElementById("userTokenId").value;
	if(tokenId != "" && tokenId != null)
		return "&userTokenId="+tokenId;
	
	return "";	
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_setTextOfLayer(objName,x,newText) { //v4.01
  if ((obj=MM_findObj(objName))!=null) with (obj)
    if (document.layers) {document.write(unescape(newText)); document.close();}
    else innerHTML = unescape(newText);
}