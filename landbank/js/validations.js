$(document).ready(function(){

  $("#ownAcc-sel").click(function(){
	$("#ownAccDD").attr('disabled',false).load('test.txt').focus();
	$("#thrdPartyDD,#unRegTxt").attr('disabled',true);
  });
  $("#thrdParty-sel").click(function(){
	$("#ownAccDD,#unRegTxt").attr('disabled',true);
	$("#thrdPartyDD").attr('disabled',false).load('test.txt').focus();
  });
  $("#uregacc-sel").click(function(){
	$("#ownAccDD,#thrdPartyDD").attr('disabled',true);
	$("#unRegTxt").attr('disabled',false).removeClass('disabled').focus();
  });
  $('#main-form').validate({
	rules :{
		amnt :{
			required : true,
			min: 0.01
		},
		targetAccMulti :{
			required : true
			
		},
		ownAcc :{
			required :"#ownAcc-sel:checked",
			dropDown :true
		}
	},
	errorPlacement: function(error, element) {
		
		if(element.hasClass('topError')){
			
		var topError = element.parentsUntil('.list-table').parent().prev('h2');
		error.appendTo(topError);
		}else{
			error.insertAfter(element);
			//alert(error.text());
		}
   },
   messages:{
	radio1:"Please select Source Account",
	targetAcc:"Please select a target account",
	targetAccMulti : "Please select a target account",
	radio3:"Please select Transfer Type",
	amnt:{
		required:"Please Enter Amount",
		amount: "Please enter numbers only"
	},
	pass : "Please enter password",
	ownAcc : "Please select"
   }
  });
  $.validator.addMethod('amount',function(value,element){
	 return /^\d{1,5}(\.\d{1,2})?$/.test(value);
  }, "Please enter numbers only");
	$.validator.addMethod('textOnly',function(value,element){
	 return /^[a-zA-Z]+$/.test(value);
  }, "Enter Text Only");
  /*$.validator.addMethod('checkGroup', function(value,element){
    if(element.length>0){
        for(var i=0;i<element.length;i++){
            if($(element[i]).val('checked')) return true;
        }
        return false;
    }
    return false;
}, 'Please select at least one option');*/
	$.validator.addMethod('dependent',function(value,element){
		var eleName = $(element).attr('name');
		var depID = '#'+eleName+'-'+'sel';
		
		//return true;
		if($(depID+':checked')&& $(element).val()!=''){
			return true;
		}
		else{
			return false;
		}
		
  }, "Please enter account number");
  $.validator.addMethod('dropDown',function(value,element){
	return element
  
  },"Please select");
  
});