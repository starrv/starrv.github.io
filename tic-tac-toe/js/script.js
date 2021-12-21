function start()
{
	function makeScript(script)
	{
		document.querySelector("#display").innerHTML=currentPlayer.name+" "+script;
	}

	function reset()
	{
		setTimeout(function(){
			if(window.getComputedStyle(document.querySelector("#display"),null).getPropertyValue("display")=="none"){
				document.querySelector("#display").style.display="block";
			}
			playerNumber=0;
			currentPlayer=players[playerNumber];
			var boxes=document.querySelectorAll("th");
			for(var i=0; i<boxes.length; i++)
			{
				boxes[i].innerHTML="";
			}
			gameOver=false;
			document.querySelector("#display").innerHTML="new game";
			setTimeout(function(){
				makeScript(script);},1000);},1000);

	}

	function makeError(errorCode)
	{
		document.querySelector("#display").innerHTML=errorCode;
		setTimeout(function(){
			makeScript(script);
		},1000);
	}
	function endGame(winner)
	{
		if(winner!=="")
		{
			gameOver=true;
			if(winner=="tied")
			{
				document.querySelector("#display").innerHTML=winner;
			}
			else
			{
				document.querySelector("#display").innerHTML=winner+" you won";
			}
		}
	}
	function makeMove(box)
	{
		if(!gameOver)
		{
			if(box.innerHTML=="")
			{
				box.innerHTML=currentPlayer.symbol;
				winner=getWinner();
				if(winner!="")
				{
					endGame(winner);
				}
				else
				{
					playerNumber++;
					playerNumber%=players.length;
					currentPlayer=players[playerNumber];
					makeScript(script);
				}
			}
			else
			{
				makeError(wrongBox);
			}
		}
	}

	function Player(symbol,name)
	{
		this.symbol=symbol;
		this.name=name;
	}

	function addMakeMoveListeners()
	{
		var boxes=document.querySelectorAll("th");
		for(var i=0; i<boxes.length; i++)
		{
			boxes[i].addEventListener("click",function()
			{
				makeMove(this);
			});
		}
	}

	function getWinner()
	{
		console.log("getting winner");
		var boxes=document.querySelectorAll("th");
		var allFilled=true;
		for(var i=0; i<boxes.length; i++)
		{
			if(boxes[i].innerHTML=="")
			{
				allFilled=false;
			}
		}
		if(allFilled)
		{
			if(verifyCompletions(boxes,0,2,1) || verifyCompletions(boxes,3,5,1) || verifyCompletions(boxes,6,8,1) || verifyCompletions(boxes,0,6,3) || verifyCompletions(boxes,1,7,3) || verifyCompletions(boxes,2,8,3) || verifyCompletions(boxes,0,8,4) || verifyCompletions(boxes,2,6,2))
			{
				return currentPlayer.name;
			}
			else
			{
				return "tied";
			}
		}
		else
		{
			if(verifyCompletions(boxes,0,2,1) || verifyCompletions(boxes,3,5,1) || verifyCompletions(boxes,6,8,1) || verifyCompletions(boxes,0,6,3) || verifyCompletions(boxes,1,7,3) || verifyCompletions(boxes,2,8,3) || verifyCompletions(boxes,0,8,4) || verifyCompletions(boxes,2,6,2))
			{
				return currentPlayer.name;
			}
			else
			{
				return "";
			}
		}
	}

	function verifyCompletions(boxes,start,end,step)
	{
		//console.log("starting at "+start+" and ending at "+(end)+" stepping by "+step);
		var isCompleted=true;
		for(var i=start; i<end;i+=step)
		{
			//console.log("currently at "+i);
			//console.log("verifying boxes "+i+" and "+(i+step)+" which have values "+boxes[i].innerHTML+" and "+boxes[i+step].innerHTML);
			if(boxes[i].innerHTML=="" || boxes[i+step].innerHTML=="" ||  boxes[i].innerHTML!=boxes[i+step].innerHTML)
			{
				isCompleted=isCompleted && false;
				break;
			}
			//console.log(" ");
		}
		return isCompleted;
	}

	function addResetListener()
	{
		document.querySelector("#reset").addEventListener("click",function(){
		//	alert("new game");
			reset();
		});
	}

	function scaleIt()
	{
		var game=document.querySelector("#game");
		var intro=document.querySelector("#intro");

		var windowHeight=window.innerHeight;
		var introHeight=window.getComputedStyle(intro,null).getPropertyValue("height");
		var gameHeight=window.getComputedStyle(game,null).getPropertyValue("height");
		introHeight=parseFloat(introHeight.slice(0,-2));
		//console.log(introHeight);
		gameHeight=parseFloat(gameHeight.slice(0,-2));
		//console.log(gameHeight);

		var newHeight=Math.max(windowHeight,(gameHeight+introHeight));
		//console.log(newHeight);
		document.body.style.height=newHeight+"px";
	}

	function init()
	{
		reset();
		//scaleIt();
	}

	function addScaleItListener()
	{
		window.addEventListener('resize', function(){
			scaleIt();
		});
	}

	player1=new Player("x","player 1");
	player2=new Player("o","player 2");
	players=[player1, player2];
	var winner="";
	var gameOver=true;
	var playerNumber;
	var currentPlayer;
	const wrongBox="Invalid box";
	const script="it's your turn";
	init();
	addMakeMoveListeners();
	addResetListener();
	//addScaleItListener();

}
start();
