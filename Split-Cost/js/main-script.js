$("document").ready(function()
{
	var revising=false;
	var changed=false;
	var body=$("body");
	var tip=$("#tip");
	var greedyCount=0;
	var amount=parseFloat($("#amount").val());
	const fadeTime=500;
	const messageFadeTime=2000;
	var guests=[];
	var message=$("#message");
	var greedyRatio=.8;
	var greedyHogs=[];

	$("button").css("background","#332307");

	$("button").mouseenter(function(){
		$(this).css("cursor","pointer");
		$(this).css("background","#786049");
	});

	$("button").mouseleave(function(){
		$(this).css("background","#332307");
		$(this).css("color","white");
	});

	$("#greetingsDiv").fadeIn(fadeTime);

	$("#back-1").click(function()
	{
		$(".guessNameDiv").remove();
		$("#guessNamesDiv").fadeOut(fadeTime,function()
			{
				$("#greetingsDiv").fadeIn(fadeTime);
			});
	});

	$("#back-2").click(function()
	{
		$("#display").fadeOut(fadeTime,function()
		{
			$("#guessNamesDiv").fadeIn(fadeTime);
		});
	});

	$("#amount").change(function()
	{
		splitCost();
	});

	$("input[type='radio']").change(function()
	{
		splitCost();
	});

	$("#step-1").click(function()
	{
		if($("#numOfPeople").val()!="")
		{
			message.html("");
			$("#greetingsDiv").fadeOut(fadeTime,function()
			{
				$("#guessNamesDiv").fadeIn(fadeTime);
			});
			$(".guessNameDiv").remove();
			var numOfGuests=parseInt($("#numOfPeople").val());
			var guessNamesDiv=$("#guessNamesDiv");
			var newHTML="";
			for(var numOfPeople=0; numOfPeople<numOfGuests; numOfPeople++)
			{
				 newHTML+="<div class='guessNameDiv form-group'><label for='input"+numOfPeople+"'>Enter guess name "+(numOfPeople+1)+"</label><br><input type='text' id='input"+numOfPeople+"' class='guessNames form-control col-sm-4 mx-auto' placeholder='guest "+(numOfPeople+1)+"' autocomplete='on'></div>";
			}
			guessNamesDiv.prepend(newHTML);
			$(".guessNames").change(function()
			{
				$(".costs").remove();
				greedyCount=0;
				changed=true;
			});
		}
		else
		{
			invalidInput(message,messageFadeTime);
		}
	});

	$("#step-2").click(function()
	{
		var namesOfGuests=$(".guessNames");
		var allFilledOut=true;
		for(var i=0;i<namesOfGuests.length; i++)
		{
			if(namesOfGuests[i].value=="")
			{
				allFilledOut=false;
			}
		}
		if(changed)
		{
			message.html("");
			if(allFilledOut)
			{
				guests=[];
				$("#amount").val("");
				$("#guessNamesDiv").fadeOut(fadeTime);
				$("#display").fadeIn(fadeTime);
				amount=parseInt($("#amount").val());
				for(var i=0;i<namesOfGuests.length; i++)
				{
					guests.push(new Guest(namesOfGuests[i].value,0,false));

				}
				var script="";
				for(var i=0;i<guests.length; i++)
				{
					script+="<div class='costs mb-3'><div class='name col-sm-3'>"+guests[i].name+"</div><div class='cost col-sm-3'>$"+guests[i].cost+" (0%)</div><div class='form-check form-check-inline greedy col-sm-3'><label for='greedy"+i+"'>greedy</label><input type='checkbox' class='form-check-input greedy-check-box ml-2' value='greedy' id='greedy"+i+"'></div></div>";
				}
				$("#display").append(script);
				$(".greedy-check-box").change(function()
				{
					var id=parseInt($(this).attr("id").slice(-1));
					if($(this).prop("checked"))
					{
						guests[id].greedy=true;
						greedyCount++;
					}
					else
					{
						guests[id].greedy=false;
						greedyCount--;
					}
					splitCost();
				});
				changed=false;
			}
			else
			{
				invalidInput(message,messageFadeTime);
			}
		}
		else
		{
			if(allFilledOut)
			{
				$("#guessNamesDiv").fadeOut(fadeTime,function()
				{
					$("#display").fadeIn(fadeTime);
				});
			}
			else
			{
				invalidInput(message,messageFadeTime);
			}
		}
	});

	function splitCost()
	{
		var amount=$("#amount").val();
		var greedyAmount;
		var averageAmount;
		var percent=[];
		for(var i=0; i<guests.length; i++)
		{
			percent[i]=0;
		}
		if(amount!="")
		{
			amount=parseFloat(amount);
			var tip=$("input[type='radio']:checked").val();
			tip=parseFloat(tip);
			amount+=(amount*tip);
			if(greedyCount<guests.length && greedyCount>0)
			{
				if((greedyCount/guests.length)>.5)
				{
					greedyRatio=.85;
				}
				else
				{
					greedyRatio=.8;
				}
				console.log(greedyRatio);
				greedyAmount=greedyRatio*amount;
				averageAmount=(1-greedyRatio)*amount;
				for(var i=0; i<guests.length; i++)
				{
					if(guests[i].greedy)
					{
						guests[i].cost=(greedyAmount/greedyCount).toFixed(2);
					}
					else
					{
						guests[i].cost=(averageAmount/(guests.length-greedyCount)).toFixed(2);
					}
				}
			}
			else
			{
				for(var i=0; i<guests.length; i++)
				{
					guests[i].cost=(amount/guests.length).toFixed(2);
				}
			}
			for(var i=0; i<percent.length; i++)
			{
				percent[i]=100*(guests[i].cost/amount);
				percent[i]=percent[i].toFixed(1);
			}
		}
		else
		{
			for(var i=0; i<guests.length; i++)
			{

				guests[i].cost=0;
				percent[i]=0;
			}
		}
		var costs=$(".cost");
		for(var i=0; i<costs.length; i++)
		{
			costs[i].innerHTML="$"+guests[i].cost+" ("+percent[i]+"%)";
		}
	}

	$("#cost-split").click(function()
	{
		splitCost();
	});

});

function Guest(name, cost, greedy)
{
	this.name=name;
	this.cost=cost;
	this.greedy=greedy;
}

function median(sum,num)
{
	return (sum/num);
}

function invalidInput(element,messageFadeTime)
{
	element.html("Please fill out all fields");
	setTimeout(function(){
		element.html("");
	},messageFadeTime);
}
