function showResponseForm(element)
{
	document.getElementById('hiddenPost').value=element.textContent;
	document.getElementById('responseForm').style.display="initial";
	document.getElementById('postForm').style.display="none";
	document.getElementById('responseForm2').style.display="none";
}

function hideResponseForm()
{
	document.getElementById('responseForm').style.display="none";
	document.getElementById('postForm').style.display="initial";
	document.getElementById('responseForm2').style.display="none";
}

function showResponseForm2(element)
{
	document.getElementById('hiddenPost2').value=element.textContent;
	document.getElementById('responseForm2').style.display="initial";
	document.getElementById('postForm').style.display="none";
	document.getElementById('responseForm').style.display="none";
}

function hideResponseForm2()
{
	document.getElementById('responseForm2').style.display="none";
	document.getElementById('responseForm').style.display="none";
	document.getElementById('postForm').style.display="initial";
}
/*function process(username, passwd, passwd1)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
		document.getElementById("text").innerHTML=xmlhttp.responseText;
	  }
	}
	xmlhttp.open("POST","createNewAccount.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("username="+username+"&password="+passwd+"&confirmPassword="+passwd1);
}

function create_account(username, passwd, passwd1, agreement)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
		document.getElementById("text").innerHTML=xmlhttp.responseText;
	  }
	}
	xmlhttp.open("POST","createNewAccount.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("createAccount=yes&password="+passwd+"&confirmPassword="+passwd1+"&username="+username+"&agreement="+agreement);
}

function process_delete_account(username, password)
{
	//alert('hi');
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
		document.getElementById("text").innerHTML=xmlhttp.responseText;
	  }
	}
	xmlhttp.open("POST","deleteAccount.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("username="+username+"&password="+password);
}

function delete_account(username, password)
{
	//alert('hi');
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	  {
		document.getElementById("text").innerHTML=xmlhttp.responseText;
	  }
	}
	xmlhttp.open("POST","deleteAccount.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("username="+username+"&password="+password+"&deleteAccount=yes");
}*/