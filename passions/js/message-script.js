const fadeSpeed=500;
const scrollAmount=20;
const scrollFrequency=1;
const readFrequency=10000;

$(document).ready(function()
{

	$("#termsOfServiceLink").click(function()
	{
		seeTermsOfService();
	});

	$("#hideTermsOfService").click(function()
	{
		hideTermsOfService();
	});

	$(".reply").click(function()
	{
		$("#responseForm").fadeIn();
	});

	$(".num_responses_value").parent().click(function()
	{
		var responses=$(this).parent().parent().parent().find(".response");
		responses.fadeToggle(fadeSpeed);
	});

	$(".num_responses_value").parent().mouseover(function()
	{
		if($(this).find(".num_responses_value").html()!="0")
		{
			$(this).css("cursor","pointer");
		}
	});

	$(".editFormPost").submit(function(event)
	{
			event.preventDefault();
			editPost($(this).parent());
	});

	$(".editFormResponse").submit(function(event)
	{
			event.preventDefault();
			editResponse($(this).parent());
	});

	$("#postForm").submit(function(event)
	{
		event.preventDefault();
	  savePost();
	});

	$(".replyFormPost").submit(function(event)
	{
		event.preventDefault();
	 	saveResponse($(this),$(this).parent());
	});

	$(".replyFormResponse").submit(function(event)
	{
		event.preventDefault();
	 	saveResponse2($(this),$(this).parent().parent().parent());
	});

	$('.scrollUpResponse').click(function()
	{
		//	$(window).scrollTop($(this).parent().parent().parent().parent().position().top);
		var targetElement=$(this).parent().parent().parent().parent();

		var scrollToTop=window.setInterval(function()
		{
			var scrollUp=setTimeout(function()
			{
				$(window).scrollTop($(window).scrollTop()-scrollAmount);
			},scrollFrequency);
			if($(window).scrollTop()<=targetElement.position().top)
			{
				clearInterval(scrollToTop);
				clearTimeout(scrollUp);
			}
		},scrollFrequency);
	});

	$('.scrollUpPost').click(function()
	{
		//$(window).scrollTop($(this).parent().parent().parent().prev().position().top);
		var targetElement=$(this).parent().parent().parent().prev();

		var scrollUp=window.setInterval(function()
		{
			setTimeout(function()
			{
				$(window).scrollTop($(window).scrollTop()-scrollAmount);
			},scrollFrequency);
			if($(window).scrollTop()<=targetElement.position().top)
			{
				clearInterval(scrollUp);
			}
		},scrollFrequency);
	});

	$( ".options" ).mouseenter(function()
	{
	  	$(this).addClass( "btn-secondary" );
	});

	$( ".options" ).mouseleave(function()
	{
	  	$(this).removeClass( "btn-secondary" );
	});

	$( ".reply_option_post" ).click(function()
	{
		//shows the reply option and hides the edit and delete options for a post
		$(this).parent().parent().find(".replyFormPost").fadeIn(fadeSpeed);
		$(this).parent().parent().find(".editFormPost").fadeOut(fadeSpeed);
		$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
	});

	$( ".reply_option_response" ).click(function()
	{
			//shows the reply option and hides the edit and delete options for a reply to a post
			var responses=$(this).parent().parent().find(".response");
			if($(this).html()=="reply")
			{
				$(this).parent().parent().find(".num_responses").fadeOut(fadeSpeed);
				// if(responses.css("display")!="none")
				// {
				// 	responses.fadeOut(fadeSpeed);
				// }
				$(this).parent().parent().find(".replyFormResponse").fadeIn(fadeSpeed);
				$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
				$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
			}
	});

	$( ".edit_option_post" ).click(function()
	 {
		if($(this).html()=="edit")
		{
			$(this).parent().parent().find(".editFormPost").fadeIn(fadeSpeed);
			$(this).parent().parent().find(".replyFormPost").fadeOut(fadeSpeed);
			$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
		}
	});

	$( ".edit_option_response" ).click(function()
	{
		var responses=$(this).parent().parent().find(".response");
		if($(this).html()=="edit")
		{
			$(this).parent().parent().find(".num_responses").fadeOut(fadeSpeed);
			if(responses.css("display")!="none")
			{
				responses.fadeOut(fadeSpeed);
			}
			$(this).parent().parent().find(".editFormResponse").fadeIn(fadeSpeed);
			$(this).parent().parent().find(".replyFormResponse").fadeOut(fadeSpeed);
			$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
		}
	});

	$(".delete_option_post").click(function()
	{
			var dialog=$(this).parent().parent().find(".deletePostDialog");
			if(dialog.length>0)
			{
				dialog.remove();
			}
			$(this).parent().before("<div class='alert alert-danger col-sm-9 w-75 mx-auto border border-danger rounded m-4 deletePostDialog' role='alert'> <form method='post' name='deleteForm' class='deleteFormPost border-0 rounded'><div class='row'><div class='col-sm text-center mx-auto'>Are you sure you want to delete?</div></div> <div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='delete' class='delete btn btn-danger' value='delete'></div> <div class='col-sm m-2'><input type='submit' value='cancel' class='btn btn-primary cancelDeletePost'></div></div> </form> </div>");
			$(this).parent().parent().find(".editFormPost").fadeOut(fadeSpeed);
			$(this).parent().parent().find(".replyFormPost").fadeOut(fadeSpeed);
			// $(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
			// $(this).parent().parent().find(".responseFormResponse").fadeOut(fadeSpeed);
			$(".deleteFormPost").submit(function(event){
				event.preventDefault();
				deletePost($(this).parent().parent());
			});

			$(".cancelDeletePost").click(function(event){
				event.preventDefault();
				var dialog=$(this).parent().parent().parent().parent().parent().find(".deletePostDialog");
				dialog.fadeOut(fadeSpeed, function(){
					$(this).remove();
				});
			});
	});

	$(".delete_option_response").click(function()
	{
		var dialog=$(this).parent().parent().find(".deletePostDialog");
		if(dialog.length>0)
		{
			dialog.remove();
		}
		$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
		$(this).parent().parent().find(".replyFormResponse").fadeOut(fadeSpeed);
		$(this).parent().before("<div class='alert alert-danger col-sm-9 w-75 border rounded border-danger p-4 m-4 mx-auto deletePostDialog' role='alert'> <form method='post' name='deleteForm' class='deleteFormResponse border-0'><div class='row'><div class='col-sm text-center'>Are you sure you want to delete?</div></div> <div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='delete' class='delete btn btn-danger' value='delete'></div> <div class='col-sm m-2'><input type='submit' value='cancel' class='btn btn-primary cancelDeletePost'></div></div> </form> </div>");
		$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
		$(this).parent().parent().find(".responseFormResponse").fadeOut(fadeSpeed);
		$(".deleteFormResponse").submit(function(event)
		{
			event.preventDefault();
			deleteResponse($(this).parent().parent(), $(this).parent().parent().parent().parent());
		});

		$(".cancelDeletePost").click(function(event)
		{
			event.preventDefault();
			var dialog=$(this).parent().parent().parent().parent().parent().find(".deletePostDialog");
			dialog.fadeOut(fadeSpeed, function(){
				dialog.remove();
			});
		});
	});

	$(".cancel").click(function(event)
	{
		// hides the option
		event.preventDefault();
		var dialog=$(this).parent().parent().parent();
		dialog.fadeOut(fadeSpeed);
		$(".alert").fadeOut(fadeSpeed);
	});

	$("#notifications-dropdown-menu .dropdown-item").click(function()
	{
		var id=$(this).prop("href").split("#")[1];
		var response=$("#"+id);
		var post=response.parent().parent();
		post.find(".response").fadeIn();
	});

	$("#notifications-dropdown-menu").parent().on('shown.bs.dropdown', function ()
	{
		$('#notifications-badge').html('');
		//	var numOfReadNotifications=$(this).find(".dropdown-item.0");

		// send an ajax request to mark all the notifications as read
		var obj = {"markRead":"read"};
		$.ajax(
		{
		  method: "POST",
		  url: "/passions/passionsblog.php",
		  data: obj
		})
		.done(function( data )
		{
				//console.log(data);
		})
		.fail(function( data)
		{
				console.error(data);
		});
	});

	if($('#notifications-badge').html()!="")
	{
		notify();
	}

	// checkUpdates();
	obj={"getLoggedInUser":"get"};
	$.ajax(
	{
		method: "POST",
		url: "/passions/passionsblog.php",
		data: obj
	})
	.done(function(data)
	{
		console.log(data);
		try
		{
			var data = JSON.parse(data);
			var loggedInUser=data.loggedInUser;
			if(loggedInUser!=="")
			{
				checkUpdates(loggedInUser);
			}
		}
		catch(error)
		{
			console.error(error);
		}
	})
	.fail(function(error)
	{
		console.log(error);
	});

});

function checkUpdates(loggedInUser)
{
	checkForPosts(loggedInUser);
	checkForResponses(loggedInUser);
	checkForNotifications();
	checkForDeletesPosts();
	checkForDeletesResponses();
	checkForUpdates();
}

function getCookie(name)
{
	var cookie=document.cookie;
	var cookie=cookie.split("; ");
	var curCookie="";
	var cookieName="";
	var cookieValue="";
	for(var i=0; i<cookie.length; i++)
	{
		curCookie=cookie[i];
		curCookie=curCookie.split("=");
		cookieName=curCookie[0];
		cookieValue=curCookie[1];
		console.log("Cookie name: "+cookieName+", Cookie value: "+cookieValue);
		if(cookieName==name)
		{
			console.log("returning '"+cookieValue+"'");
			return cookieValue;
		}
	}
	console.log("");
	return "";
}

function checkForDeletesPosts()
{
	var check=setInterval(function()
	{
		console.log("Checking for deleted posts...");
		var posts=$(".post");
		for(var i=0; i<posts.length; i++)
		{
			obj={"checkForDeletes":"check","postId":posts[i].id};
			$.ajax({
				method: "POST",
				url: "/passions/passionsblog.php",
				data: obj
			})
			.done(function(data)
			{
				//	console.log(data);
				try
				{
					var data = JSON.parse(data);
					if(data.deletePost=="delete")
					{
						$("#"+data.postId).parent().fadeOut(fadeSpeed,function()
						{
						  	$(this).remove();
							var numOfPosts=$(".post").length+$(".response").length;
						    if(numOfPosts==1)
						    {
						    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> post</h4>");
						    }
						    else
						    {
						    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> posts</h4>");
						    }
						});
					}
				}
				catch(error)
				{
					console.log(error);
				}
			})
			.fail(function(error){
				console.log(error);
			});
		}
	},readFrequency);
}

function checkForDeletesResponses()
{
	var check=setInterval(function()
	{
		console.log("Checking for deleted responses...");
		var responses=$(".response");
		for(var i=0; i<responses.length; i++)
		{
			obj={"checkForDeletes":"check","postId":responses[i].id};
			$.ajax({
				method: "POST",
				url: "/passions/passionsblog.php",
				data: obj
			})
			.done(function(data)
			{
				//	console.log(data);
				try
				{
					var data = JSON.parse(data);
					if(data.deletePost=="delete")
					{
						$("#"+data.postId).parent().fadeOut(fadeSpeed,function()
						{
							var post=$(this).parent();
							$(this).remove();
							var numOfPosts=$(".post").length+$(".response").length;
							if(numOfPosts==1)
							{
								$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> post</h4>");
							}
							else
							{
								$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> posts</h4>");
							}
							var numOfResponses=post.find(".response").length;
							if(numOfResponses==1)
							{
								post.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> reply</h4>");
							}
							else
							{
								post.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> replies</h4>");
							}

							post.find(".num_responses_value").parent().mouseover(function()
							{
								if($(this).find(".num_responses_value").html()!="0")
								{
									$(this).css("cursor","pointer");
								}
							});

							post.find(".num_responses_value").parent().click(function()
							{
								var responses=$(this).parent().parent().parent().find(".response");
								responses.fadeToggle(fadeSpeed);
							});

						});
					}

				}
				catch(error)
				{
					console.log(error);
				}
			})
			.fail(function(error){
				console.log(error);
			});
		}
	},readFrequency);
}

function checkForUpdates()
{
	var check=setInterval(function()
	{
		console.log("Checking for updated posts...");
		var posts=$(".post");
		var postId=-1;
		for(var i=0; i<posts.length; i++)
		{
			postId=posts[i].id;
			obj={"checkForUpdates":"check", "postId":posts[i].id, "post": $("#"+postId).find(".post_content").html(), "image":posts[i].image};
			$.ajax({
				method: "POST",
				url: "/passions/passionsblog.php",
				data: obj
			})
			.done(function(data)
			{
				try
				{
					//console.log(data);
					var data = JSON.parse(data);
					if(data.updatePost!="do not update")
					{
						$("#"+data.postId).find(".post_content").first().html(data.updatePost);
						if(data.image!="")
						{
							$("#"+data.postId).find(".imagePost").remove();
							$("#"+data.postId).find(".post_content").first().before("<img class='w-75 border rounded imagePost alt='image post' img-fluid mx-auto mt-2 mb-2 d-block' src='data:image/jpeg;base64,"+data.image+"'>");
						}
					}
				}
				catch(error)
				{
					console.log(error);
				}
			})
			.fail(function(error){
				console.log(error);
			});
		}

		console.log("Checking for updated responses...");
		var responses=$(".response");
		var responseId=-1;
		for(var i=0; i<responses.length; i++)
		{
			responseId=responses[i].id;
			obj={"checkForUpdates":"check","postId":responses[i].id, "post":$("#"+responseId).find(".post_content").html(), "image":responses[i].imagePost2};
			$.ajax({
				method: "POST",
				url: "/passions/passionsblog.php",
				data: obj
			})
			.done(function(data){
			//	console.log(data);
				var data = JSON.parse(data);
				if(data.updatePost!="do not update")
				{
					console.log("update to "+data.updatePost+" and "+data.image);
					$("#"+data.postId).find(".post_content").html(data.updatePost);
					if(data.image!="")
					{
						$("#"+data.postId).find(".imagePost2").remove();
						$("#"+data.postId).find(".post_content").before("<img class='w-75 border rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+data.image+"'>");
					}
				}
			})
			.fail(function(error){
				console.log(error);
			});
		}
	},readFrequency);
}

function checkForPosts(loggedInUser)
{
	var checkPosts=setInterval(function()
	{
		console.log("checking for posts...");
		var obj={"checkForPosts":"check"};
		$.ajax({
			method: "POST",
			url: "/passions/passionsblog.php",
			data: obj
		})
		.done(function( data )
		{
			//console.log(data);

			try
			{

				var data = JSON.parse(data);
				var newPosts=data.newPosts;

				var postId="";
				var username="";
				var post="";
				var image="";
				var profilePic="";
				var dateTime="";

				// need to change date parameter to tuple format
				var dateTimeArray="";
				var datePortion="";
				var datePortionArray="";
				var year="";
				var month="";
				var date="";
				var timePortion="";
				var timePortionArray="";
				var hours="";
				var minutes="";
				var seconds="";
				var date="";
				var dateNow="";
				var timeZoneDifference=-1;

				for(var i=0; i<newPosts.length; i++)
				{
					postId=newPosts[i].postId;
					if($(document).find("#"+postId).length>0)
					{
						continue;
					}
					username=newPosts[i].username;
					if(loggedInUser==username)
					{
						continue;
					}
					post=newPosts[i].post;
					image=newPosts[i].image;
					profilePic=newPosts[i].profilePic;
					dateTime=newPosts[i].dateTime;
					// need to change date parameter to tuple format
					dateTimeArray=dateTime.split(" ");
					datePortion=dateTimeArray[0];
					datePortionArray=datePortion.split("-");
					year=datePortionArray[0];
					month=datePortionArray[1];
					date=datePortionArray[2];
					timePortion=dateTimeArray[1];
					timePortionArray=timePortion.split(":");
					hours=timePortionArray[0];
					minutes=timePortionArray[1];
					seconds=timePortionArray[2];
					date=new Date(year,month-1,date,hours,minutes,seconds);
					dateNow=new Date();
					timeZoneDifference=dateNow.getTimezoneOffset()/60;
					date.setHours(date.getHours()-timeZoneDifference);
					date=formatMonth(date.getMonth())+" "+addLeadingZeros(date.getDate())+", "+date.getFullYear()+" "+addLeadingZeros(formatHours(date.getHours()))+":"+addLeadingZeros(date.getMinutes())+":"+addLeadingZeros(date.getSeconds())+" "+formatAM_PM(date.getHours());
					var lastPost=$(".post").first();
					if(lastPost.length>0)
					{
						if(image!="")
						{
							if(profilePic!="")
							{
								lastPost.parent().before("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='border border-secondary rounded m-2 img-fluid' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p>  <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form>  <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
							}
							else
							{
								lastPost.parent().before("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border border-secondary rounded' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p>  <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form>  <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
							}
						}
						else
						{
							if(profilePic!="")
							{
								lastPost.parent().before("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='border border-secondary rounded m-2 img-fluid' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
							}
							else
							{
								lastPost.parent().before("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class=w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border border-secondary rounded' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
							}
						}
					}
					else
					{
						if(image!="")
						{
							if(profilePic!="")
							{
								$("#num_posts").after("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='border border-secondary rounded m-2 img-fluid' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
							}
							else
							{
								$("#num_posts").after("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border border-secondary rounded' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
							}
						}
						else
						{
							if(profilePic!="")
							{
									$("#num_posts").after("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='border border-secondary rounded m-2 img-fluid' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
							}
							else
							{
									$("#num_posts").after("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border border-secondary rounded' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
							}
						}
					}
					var numOfPosts=$(".post").length+$(".response").length;
					if(numOfPosts==1)
					{
						$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> post</h4>");
					}
					else
					{
						$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> posts</h4>");
					}

					$(".post").first().find(".num_responses_value").parent().click(function()
					{
						var responses=$(this).parent().parent().find(".response");
						responses.fadeToggle(fadeSpeed);
					});

					$(".post").first().find(".num_responses_value").parent().mouseover(function()
					{
						if($(this).find(".num_responses_value").html()!="0")
						{
							$(this).css("cursor","pointer");
						}
					});

					$(".post").first().find(".replyFormPost").submit(function(event)
					{
						event.preventDefault();
						saveResponse($(this),$(this).parent());
					});

					$(".post").first().find('.scrollUpPost').click(function()
					{
						//$(window).scrollTop($(this).parent().parent().parent().prev().position().top);
						var targetElement=$(this).parent().parent().parent().prev();

						var scrollUp=window.setInterval(function(){
							setTimeout(function(){
								$(window).scrollTop($(window).scrollTop()-scrollAmount);
							},scrollFrequency);
							if($(window).scrollTop()<=targetElement.position().top)
							{
								clearInterval(scrollUp);
							}
						},scrollFrequency);
					});

					$(".post").first().find( ".options" ).mouseenter(function() {
							$(this).addClass( "btn-secondary" );
					});

					$(".post").first().find( ".options" ).mouseleave(function() {
							$(this).removeClass( "btn-secondary" );
					});

					$(".post").first().find(".deleteForm").submit(function(event){
						event.preventDefault();
						deletePost($(this).parent().parent());
					});

					$(".post").first().find(".cancelDeletePost").click(function(event){
						event.preventDefault();
						var deleteFormParent=$(this).parent().parent().parent().parent();
						deleteFormParent.remove();
					});

					$(".post").first().find( ".reply_option_post" ).click(function() {
							$(this).parent().parent().find(".replyFormPost").fadeIn(fadeSpeed);
							$(this).parent().parent().find(".editFormPost").fadeOut(fadeSpeed);
							$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
					});

					$(".post").first().find(".cancel").click(function(event)
					{
						event.preventDefault();
						var dialog=$(this).parent().parent().parent();
						dialog.fadeOut(fadeSpeed);
						$(this).find(".alert").fadeOut(fadeSpeed);
					});
				}

			}
			catch(error)
			{
				console.log(error);
			}
		})
		.fail(function( error)
		{
			console.log(error);
		});
	},readFrequency);
}

function checkForResponses(loggedInUser)
{
	var checkResponses=setInterval(function()
	{
		console.log("checking for responses....");
		var obj={"checkForResponses":"check"};
		$.ajax({
			method: "POST",
			url: "/passions/passionsblog.php",
			data: obj
		})
		.done(function( data )
		{
			//console.log(data);
			try
			{
				var data = JSON.parse(data);
				var newResponses=data.newResponses;

				var responseId=-1;
				var username="";
				var initPostId="";
				var response="";
				var image="";
				var date="";
				var profilePic="";
				var dateTime="";

				// need to change date parameter to tuple format
				var dateTimeArray="";
				var datePortion="";
				var datePortionArray="";
				var year="";
				var month="";
				var date="";
				var timePortion="";
				var timePortionArray="";
				var hours="";
				var minutes="";
				var seconds="";
				var date="";
				var dateNow="";
				var timeZoneDifference="";

				var thePost="";
				var lastResponse="";

				var numOfPosts=-1;

				var firstResponse="";
				var lastResponse="";

				for(var i=0; i<newResponses.length; i++)
				{
					responseId=newResponses[i].responseId;
					if($(document).find("#"+responseId).length>0)
					{
						continue;
					}
					username=newResponses[i].username;
					if(loggedInUser==username)
					{
						continue;
					}
					initPostId=newResponses[i].initPostId;
					response=newResponses[i].response;
					image=newResponses[i].image;
					profilePic=newResponses[i].profilePic;
					dateTime=newResponses[i].dateTime;

					// need to change date parameter to tuple format
					dateTimeArray=dateTime.split(" ");
					datePortion=dateTimeArray[0];
					datePortionArray=datePortion.split("-");
					year=datePortionArray[0];
					month=datePortionArray[1];
					date=datePortionArray[2];
					timePortion=dateTimeArray[1];
					timePortionArray=timePortion.split(":");
					hours=timePortionArray[0];
					minutes=timePortionArray[1];
					seconds=timePortionArray[2];
					date=new Date(year,month-1,date,hours,minutes,seconds);
					dateNow=new Date();
					timeZoneDifference=dateNow.getTimezoneOffset()/60;

					date.setHours(date.getHours()-timeZoneDifference);
					date=formatMonth(date.getMonth())+" "+addLeadingZeros(date.getDate())+", "+date.getFullYear()+" "+addLeadingZeros(formatHours(date.getHours()))+":"+addLeadingZeros(date.getMinutes())+":"+addLeadingZeros(date.getSeconds())+" "+formatAM_PM(date.getHours());

					thePost=$("#"+initPostId);
					lastResponse=thePost.find(".response").first();
					//if there are responses for the post
					if(lastResponse.length>0)
					{
						if(image!="")
						{
							if(profilePic!="")
							{
								lastResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2' enctype='multipart/form-data'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' class='form-control border border-secondary rounded imageResponse' name='imageUpload' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
							}
							else
							{
								lastResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2' enctype='multipart/form-data'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' class='form-control border border-secondary rounded imageResponse' name='imageUpload' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
							}
						}
						else
						{
							if(profilePic!="")
							{
								lastResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2' enctype='multipart/form-data'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
							}
							else
							{
								lastResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2' enctype='multipart/form-data'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
							}
						}
					}
					//if there are no responses for the post
					else
					{
						if(image!="")
						{
							if(profilePic!="")
							{
								thePost.find(".num_responses").after("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2' enctype='multipart/form-data'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' class='form-control border border-secondary rounded imageResponse' name='imageUpload' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'>	</div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
							}
							else
							{
								thePost.find(".num_responses").after("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2' enctype='multipart/form-data'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' class='form-control border border-secondary rounded imageResponse' name='imageUpload' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'>	</div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
							}
						}
						else
						{
							if(profilePic!="")
							{
								thePost.find(".num_responses").after("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2' enctype='multipart/form-data'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'>	</div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
							}
							else
							{
								thePost.find(".num_responses").after("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2' enctype='multipart/form-data'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'>	</div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
							}
						}
					}

					numOfPosts=$(".post").length+$(".response").length;
					if(numOfPosts==1)
					{
						$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> post</h4>");
					}
					else
					{
						$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> posts</h4>");
					}
					var numOfResponses=thePost.find(".response").length;
					if(numOfResponses==1)
					{
						thePost.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> reply</h4>");
					}
					else
					{
						thePost.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> replys</h4>");
					}

					thePost.find(".num_responses_value").parent().mouseover(function()
					{
						if($(this).find(".num_responses_value").html()!="0")
						{
							$(this).css("cursor","pointer");
						}
					});

					thePost.find(".num_responses_value").parent().click(function()
					{
						var responses=$(this).parent().parent().parent().find(".response");
						responses.fadeToggle(fadeSpeed);
					});

					firstResponse=thePost.find(".response").first();
					lastResponse=thePost.find(".response").last();

					// if responses are shown, display new response
					if(lastResponse.css("display")!="none")
					{
						firstResponse.fadeIn(fadeSpeed);
					}

					firstResponse.find(".replyFormResponse").submit(function(event)
					{
						event.preventDefault();
						saveResponse2($(this),$(this).parent().parent().parent());
					});

					$(".response").first().find( ".options" ).mouseenter(function()
					{
						$(this).addClass( "btn-secondary" );
					});

					$(".response").first().find( ".options" ).mouseleave(function()
					{
						$(this).removeClass( "btn-secondary" );
					});

					firstResponse.find('.scrollUpResponse').click(function()
					{
						var targetElement=$(this).parent().parent();

						var scrollToTop=window.setInterval(function(){
							var scrollUp=setTimeout(function(){
								$(window).scrollTop($(window).scrollTop()-scrollAmount);
							},scrollFrequency);
							if($(window).scrollTop()<=targetElement.position().top)
							{
								clearInterval(scrollToTop);
								clearTimeout(scrollUp);
							}
						},scrollFrequency);
					});

					firstResponse.find( ".reply_option_response" ).click(function()
					{
							var responses=$(this).parent().parent().find(".response");
							if($(this).html()=="reply")
							{
								$(this).parent().parent().find(".num_responses").fadeOut(fadeSpeed);
								$(this).parent().parent().find(".replyFormResponse").fadeIn(fadeSpeed);
								$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
								$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
							}
					});

					firstResponse.find(".cancel").click(function(event)
					{
							event.preventDefault();
							var dialog=$(this).parent().parent().parent();
							dialog.fadeOut(fadeSpeed);
							$(this).find(".alert").fadeOut(fadeSpeed);
					});
				}
			}
			catch(error)
			{
				console.error(error);
			}

		 })
		.fail(function( error)
		{
			console.log(error);
		});
	},readFrequency);
}

function checkForNotifications()
{
	var checkNotifications=setInterval(function()
	{
		console.log("checking for notifications....");
		var obj={"checkForNotifications":"check"};
		$.ajax({
			method: "POST",
			url: "/passions/passionsblog.php",
			data: obj
		})
		.done(function( data )
		{
			//console.log(data);
			try
			{
				var data = JSON.parse(data);
				var newNotifications=data.newNotifications;
				var obj=[];
				var responseId=-1;
				var notification="";
				var isRead=0;

				for(var i=0; i<newNotifications.length; i++)
				{
					obj=newNotifications[i];
					responseId=obj['responseId'];
					notification=obj['notification'];
					isRead=obj['isRead'];

					if($(document).find("#"+responseId+"-link").length==0)
					{
						$("#notifications-dropdown-menu").prepend("<a class='dropdown-item' href='#"+responseId+"' id='"+responseId+"-link'>"+notification+"</a>");
						$("#"+responseId+"-link").addClass(isRead);
						notify();
					}
				}
				if(newNotifications.length>0)
				{
					$('#notifications-badge').html(newNotifications.length);
				}
			}
			catch(error)
			{
				console.log(error);
			}
		})
		.fail(function( data)
		{
			console.error(data);
		});
	},readFrequency);
}

function notify()
{
	var audio=document.getElementById("notification");
	if(audio!=null)
	{
		audio.play();
	}
}

function seeTermsOfService()
{
	$("#termsOfService").fadeIn(fadeSpeed);
}

function hideTermsOfService()
{
	$("#termsOfService").fadeOut(fadeSpeed);
}

function savePost()
{
	if($("#newPost").val()=="")
	{
		//	alert("Please enter text to make a post");
		if($(document).find("#makeTextPostAlert").length<=0)
		{
			$(".pos-f-t").after("<div class='alert alert-warning alert-dismissible fade show' id='makeTextPostAlert' role='alert'>Please enter text to make a post<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
		}
	}
	else
	{
		var obj=new FormData();
		obj.append("newPost", $("#newPost").val());
		obj.append("post","post");
		obj.append("image", document.getElementById("imagePost").files[0]);
		$.ajax(
		{
		  method: "POST",
		  url: "/passions/passionsblog.php",
		  data: obj,
		  contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false
		})
	  	.done(function( data )
	  	{
	  		console.log("Post: "+data);
	  		try
	  		{
		  		var data = JSON.parse(data);
		  		var postId=data.postId;
			  	var username=data.username;
			  	var post=data.post;
			  	var image=data.image;
			  	var profilePic=data.profilePic;
			  	var dateTime=data.dateTime;
					// need to change date parameter to tuple format
					var dateTimeArray=dateTime.split(" ");
					var datePortion=dateTimeArray[0];
					var datePortionArray=datePortion.split("-");
					var year=datePortionArray[0];
					var month=datePortionArray[1];
					var date=datePortionArray[2];
					var timePortion=dateTimeArray[1];
					var timePortionArray=timePortion.split(":");
					var hours=timePortionArray[0];
					var minutes=timePortionArray[1];
					var seconds=timePortionArray[2];
					var date=new Date(year,month-1,date,hours,minutes,seconds);
			  	var dateNow=new Date();
			  	var timeZoneDifference=dateNow.getTimezoneOffset()/60;
			  	date.setHours(date.getHours()-timeZoneDifference);
			  	date=formatMonth(date.getMonth())+" "+addLeadingZeros(date.getDate())+", "+date.getFullYear()+" "+addLeadingZeros(formatHours(date.getHours()))+":"+addLeadingZeros(date.getMinutes())+":"+addLeadingZeros(date.getSeconds())+" "+formatAM_PM(date.getHours());
				  var lastPost=$(".post").first();
			    if(lastPost.length>0)
			    {
			    	if(image!="")
			    	{
			    		if(profilePic!="")
			    		{
			    			lastPost.parent().before("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img  width='25' height='25' alt='profile picture' class='border border-secondary rounded m-2 img-fluid' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p  class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p>  <form method='post' name='editForm' class='editFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='editPostId' class='editPostId' value="+postId+"><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+post+"</textarea></div><div class='form-group'><input type='file' name='image' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form>  <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn edit_option_post'>edit</p> <p class='col-sm options mx-auto p-2 m-2 text-center border-right btn delete_option_post'>delete</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
			    		}
			    		else
			    		{
			    			lastPost.parent().before("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border border-secondary rounded' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p>  <form method='post' name='editForm' class=' col-md-9 mx-auto border rounded p-2 m-4'><input type='hidden' name='editPostId' class='editPostId' value="+postId+"><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+post+"</textarea></div><div class='form-group'><input type='file' name='image' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form>  <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn edit_option_post'>edit</p> <p class='col-sm options mx-auto p-2 m-2 text-center border-right btn delete_option_post'>delete</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
			    		}
			    	}
			    	else
			    	{
			    		if(profilePic!="")
			    		{
			    			lastPost.parent().before("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='border border-secondary rounded m-2 img-fluid' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p>  <form method='post' name='editForm' class='editFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='editPostId' class='editPostId' value="+postId+"><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+post+"</textarea></div><div class='form-group'><input type='file' name='image' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form>   <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn edit_option_post'>edit</p> <p class='col-sm options mx-auto p-2 m-2 text-center border-right btn delete_option_post'>delete</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
			    		}
			    		else
			    		{
			    			lastPost.parent().before("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border border-secondary rounded' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p>  <form method='post' name='editForm' class='editFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='editPostId' class='editPostId' value="+postId+"><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+post+"</textarea></div><div class='form-group'><input type='file' name='image' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form>   <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn edit_option_post'>edit</p> <p class='col-sm options mx-auto p-2 m-2 text-center border-right btn delete_option_post'>delete</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
			    		}
			    	}
			    }
			    else
			    {
			    	if(image!="")
			    	{
			    		if(profilePic!="")
			    		{
			    			$("#num_posts").after("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='border border-secondary rounded m-2 img-fluid' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p  class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='editForm' class='editFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='editPostId' class='editPostId' value="+postId+"><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+post+"</textarea></div><div class='form-group'><input type='file' name='image' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn edit_option_post'>edit</p> <p class='col-sm options mx-auto p-2 m-2 text-center border-right btn delete_option_post'>delete</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
			    		}
			    		else
			    		{
			    			$("#num_posts").after("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border border-secondary rounded' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='editForm' class='editFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='editPostId' class='editPostId' value="+postId+"><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+post+"</textarea></div><div class='form-group'><input type='file' name='image' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn edit_option_post'>edit</p> <p class='col-sm options mx-auto p-2 m-2 text-center border-right btn delete_option_post'>delete</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
			    		}
			    	}
			    	else
			    	{
			    		if(profilePic!="")
			    		{
			    			$("#num_posts").after("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='border border-secondary rounded m-2 img-fluid' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='editForm' class='editFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='editPostId' class='editPostId' value="+postId+"><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+post+"</textarea></div><div class='form-group'><input type='file' name='image' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn edit_option_post'>edit</p> <p class='col-sm options mx-auto p-2 m-2 text-center border-right btn delete_option_post'>delete</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
			    		}
			    		else
			    		{
			    			$("#num_posts").after("<div class='row'><div id='"+postId+"' class='post border-secondary border rounded col-sm-6 mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class=w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border border-secondary rounded' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><p class='w-75 mt-2 mb-2 p-2 border border-secondary rounded post_content mx-auto'>"+post+"</p> <form method='post' name='editForm' class='editFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='editPostId' class='editPostId' value="+postId+"><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+post+"</textarea></div><div class='form-group'><input type='file' name='image' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormPost col-sm-9 mx-auto border border-secondary rounded p-2 m-4 w-75'><input type='hidden' name='initPostId' class='initPostId' value="+postId+"><input type='hidden' name='initUser' class='initUser' value="+username+"><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div>	<div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn reply_option_post'>reply</p> <p class='col-sm options border-right mx-auto p-2 m-2 text-center btn edit_option_post'>edit</p> <p class='col-sm options mx-auto p-2 m-2 text-center border-right btn delete_option_post'>delete</p> <p class='col-sm options scrollUpPost mx-auto p-2 m-2 border-right text-center btn'>scroll up</p> </div> <div class='row num_responses m-2 text-center'><h4 class='m-2 p-2'><span class='num_responses_value'>0</span> replies</h4></div> </div></div>");
			    		}
			    	}
			    }
			    var numOfPosts=$(".post").length+$(".response").length;
			    if(numOfPosts==1)
			    {
			    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> post</h4>");
			    }
			    else
			    {
			    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> posts</h4>");
			    }

			   	$(".post").first().find(".num_responses_value").parent().click(function()
					{
						var responses=$(this).parent().parent().find(".response");
						responses.fadeToggle(fadeSpeed);
					});

					 $(".post").first().find(".num_responses_value").parent().mouseover(function()
					 {
						if($(this).find(".num_responses_value").html()!="0")
						{
							$(this).css("cursor","pointer");
						}
					});

				$(".post").first().find(".editFormPost").submit(function(event){
						event.preventDefault();
						editPost($(this).parent());
				});

			    $(".post").first().find(".replyFormPost").submit(function(event){
					event.preventDefault();
				  	saveResponse($(this),$(this).parent());
				});

				$(".post").first().find('.scrollUpPost').click(function(){
					//$(window).scrollTop($(this).parent().parent().parent().prev().position().top);
					var targetElement=$(this).parent().parent().parent().prev();

					var scrollUp=window.setInterval(function(){
						setTimeout(function(){
							$(window).scrollTop($(window).scrollTop()-scrollAmount);
						},scrollFrequency);
						if($(window).scrollTop()<=targetElement.position().top)
						{
							clearInterval(scrollUp);
						}
					},scrollFrequency);
				});
				$(".post").first().find( ".options" ).mouseenter(function() {
				  	$(this).addClass( "btn-secondary" );
				});

				$(".post").first().find( ".options" ).mouseleave(function() {
				  	$(this).removeClass( "btn-secondary" );
				});

				$(".post").first().find(".deleteForm").submit(function(event)
				{
					event.preventDefault();
					deletePost($(this).parent().parent());
				});

				$(".post").first().find(".cancelDeletePost").click(function(event)
				{
					event.preventDefault();
					var deleteFormParent=$(this).parent().parent().parent().parent();
					deleteFormParent.remove();
				});

				$(".post").first().find( ".reply_option_post" ).click(function()
				{
					$(this).parent().parent().find(".replyFormPost").fadeIn(fadeSpeed);
					$(this).parent().parent().find(".editFormPost").fadeOut(fadeSpeed);
					$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
				});

				$(".post").first().find( ".edit_option_post" ).click(function()
				 {
					if($(this).html()=="edit")
					{
						$(this).parent().parent().find(".editFormPost").fadeIn(fadeSpeed);
						$(this).parent().parent().find(".replyFormPost").fadeOut(fadeSpeed);
						$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
					}
				});

				$(".post").first().find(".delete_option_post").click(function()
				{
					var dialog=$(this).parent().parent().find(".deletePostDialog");
					if(dialog.length>0)
					{
						dialog.remove();
					}
					$(this).parent().parent().find(".editFormPost").fadeOut(fadeSpeed);
					$(this).parent().parent().find(".replyFormPost").fadeOut(fadeSpeed);
					$(this).parent().before("<div class='alert alert-danger col-sm-9 w-75 mx-auto border border-danger rounded m-4 deletePostDialog' role='alert'> <form method='post' name='deleteForm' class='deleteFormPost border rounded mx-auto'><div class='row'><div class='col-sm text-center mx-auto'>Are you sure you want to delete?</div></div> <div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='delete' class='delete btn btn-danger text-center' value='delete'></div> <div class='col-sm m-2'><input type='submit' value='cancel' class='btn btn-primary cancelDeletePost text-center'></div> </form> </div>");
					$(".post").first().find(".deleteFormPost").submit(function(event){
						event.preventDefault();
						deletePost($(this).parent().parent());
					});

					$(".post").first().find(".cancelDeletePost").click(function(event){
						event.preventDefault();
						var dialog=$(this).parent().parent().parent().parent().parent().find(".deletePostDialog");
						dialog.fadeOut(fadeSpeed, function(){
							$(this).remove();
						});
					});
				});

				$(".post").first().find(".cancel").click(function(event){
					event.preventDefault();
					var dialog=$(this).parent().parent().parent();
					dialog.fadeOut(fadeSpeed);
					$(this).find(".alert").fadeOut(fadeSpeed);
				});
  			}
		  	catch(error)
		  	{
		  		console.error(error);
		  		alert("An error has occurred");
		  	}
	  	})
		.fail(function(error)
		{
			alert("An error has occured.  Please try again.");
			console.log(error.responseText);
		});
	}

}

function saveResponse(responseForm, thePost)
{

	if(responseForm.find(".newResponse").val()=="")
	{
		//	alert("Please enter text to send a reply");
		if($(document).find("#makeTextResponseAlert").length<=0)
		{
			responseForm.before("<div class='alert alert-warning alert-dismissible fade show col-sm-9 w-75' id='makeTextResponseAlert' role='alert'>Please enter text to send a reply<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
		}
	}
	else
	{
		var obj=new FormData((responseForm)[0]);
		obj.append("initPostId", responseForm.find(".initPostId").val());
		obj.append("initUser", responseForm.find(".initUser").val());
		obj.append("newResponse", responseForm.find(".newResponse").val());
		obj.append("reply","reply");
		obj.append("image", (responseForm.find(".imageResponse"))[0].files[0]);
		$.ajax(
		{
		  method: "POST",
		  url: "/passions/passionsblog.php",
		  data: obj,
		  contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false
		})
	  .done(function( data )
		{
	  	//console.log("Response: "+data);
	  	try
	  	{
	  		var data = JSON.parse(data);
	  		var responseId=data.responseId;
		  	var username=data.username;
		  	var initPostId=data.initPostId;
		  	var response=data.response;
		  	var image=data.image;
		  	var profilePic=data.profilePic;
				var dateTime=data.dateTime;

				// need to change date parameter to tuple format
				var dateTimeArray=dateTime.split(" ");
				var datePortion=dateTimeArray[0];
				var datePortionArray=datePortion.split("-");
				var year=datePortionArray[0];
				var month=datePortionArray[1];
				var date=datePortionArray[2];
				var timePortion=dateTimeArray[1];
				var timePortionArray=timePortion.split(":");
				var hours=timePortionArray[0];
				var minutes=timePortionArray[1];
				var seconds=timePortionArray[2];
				var date=new Date(year,month-1,date,hours,minutes,seconds);
				var dateNow=new Date();
				var timeZoneDifference=dateNow.getTimezoneOffset()/60;
				date.setHours(date.getHours()-timeZoneDifference);
				date=formatMonth(date.getMonth())+" "+addLeadingZeros(date.getDate())+", "+date.getFullYear()+" "+addLeadingZeros(formatHours(date.getHours()))+":"+addLeadingZeros(date.getMinutes())+":"+addLeadingZeros(date.getSeconds())+" "+formatAM_PM(date.getHours());
			 	var lastResponse=thePost.find(".response").first();
			 	//var lastResponse=responseForm.parent().parent();
			  //if there are responses for the post
			  if(lastResponse.length>0)
			  {
		    	if(image!="")
		    	{
		    		if(profilePic!="")
		    		{
		    			lastResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
		    		}
		    		else
		    		{
		    			lastResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
		    		}
		    	}
		    	else
		    	{
		    		if(profilePic!="")
		    		{
		    			lastResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p>	<form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
		    		}
		    		else
		    		{
		    			lastResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p>	<form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
		    		}

		    	}
			  }
		    //if there are no responses for the post
		    else
		    {
		    	if(image!="")
		    	{
		    		if(profilePic!="")
		    		{
		    			thePost.find(".num_responses").after("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'>	</div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
		    		}
		    		else
		    		{
		    			thePost.find(".num_responses").after("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'>	</div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
		    		}

		    	}
		    	else
		    	{
		    		if(profilePic!="")
		    		{
		    			thePost.find(".num_responses").after("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'>	</div></div></form>	<div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
		    		}
		    		else
		    		{
		    			thePost.find(".num_responses").after("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'>	</div></div></form>	<div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
		    		}
		    	}
		    }

				var numOfPosts=$(".post").length+$(".response").length;
		    if(numOfPosts==1)
		    {
		    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> post</h4>");
		    }
		    else
		    {
		    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> posts</h4>");
		    }
		    var numOfResponses=thePost.find(".response").length;
		    if(numOfResponses==1)
		    {
		    	thePost.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> reply</h4>");
		    }
		    else
		    {
		    	thePost.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> replys</h4>");
		    }

				thePost.find(".num_responses_value").parent().mouseover(function()
				{
					if($(this).find(".num_responses_value").html()!="0")
					{
						$(this).css("cursor","pointer");
					}
				});

				thePost.find(".num_responses_value").parent().click(function()
				{
					var responses=$(this).parent().parent().parent().find(".response");
					responses.fadeToggle(fadeSpeed);
				});

	  	 	var firstResponse=thePost.find(".response").first();
	  	 	var lastResponse=thePost.find(".response").last();
				// if responses are shown, display new response
	  	 	if(lastResponse.css("display")!="none")
	  	 	{
					firstResponse.fadeIn(fadeSpeed);
	  	 	}

			firstResponse.find(".editFormResponse").submit(function(event)
			{
					event.preventDefault();
					editResponse($(this).parent());
			});

  	 	firstResponse.find(".replyFormResponse").submit(function(event)
			{
				event.preventDefault();
		  	saveResponse2($(this),$(this).parent().parent().parent());
			});

			$(".response").first().find( ".options" ).mouseenter(function()
			{
			  	$(this).addClass( "btn-secondary" );
			});

			$(".response").first().find( ".options" ).mouseleave(function()
			{
			  	$(this).removeClass( "btn-secondary" );
			});

			firstResponse.find('.scrollUpResponse').click(function()
			{
				var targetElement=$(this).parent().parent();

				var scrollToTop=window.setInterval(function(){
					var scrollUp=setTimeout(function(){
						$(window).scrollTop($(window).scrollTop()-scrollAmount);
					},scrollFrequency);
					if($(window).scrollTop()<=targetElement.position().top)
					{
						clearInterval(scrollToTop);
						clearTimeout(scrollUp);
					}
				},scrollFrequency);
			});

			firstResponse.find( ".reply_option_response" ).click(function()
			{
					var responses=$(this).parent().parent().find(".response");
					if($(this).html()=="reply")
					{
						$(this).parent().parent().find(".num_responses").fadeOut(fadeSpeed);
						$(this).parent().parent().find(".replyFormResponse").fadeIn(fadeSpeed);
						$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
						$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
					}
			});

			firstResponse.find( ".edit_option_response" ).click(function()
			{
				var responses=$(this).parent().parent().find(".response");
				if($(this).html()=="edit")
				{
					$(this).parent().parent().find(".num_responses").fadeOut(fadeSpeed);
					if(responses.css("display")!="none")
					{
						responses.fadeOut(fadeSpeed);
					}
					$(this).parent().parent().find(".editFormResponse").fadeIn(fadeSpeed);
					$(this).parent().parent().find(".replyFormResponse").fadeOut(fadeSpeed);
					$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
				}
			});

			firstResponse.find(".delete_option_response").click(function()
			{
				var dialog=$(this).parent().parent().find(".deletePostDialog");
				if(dialog.length>0)
				{
					dialog.remove();
				}
				$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
				$(this).parent().parent().find(".replyFormResponse").fadeOut(fadeSpeed);
				$(this).parent().before("<div class='alert alert-danger border border-danger col-sm mx-auto mb-4 mt-4 p-4 deletePostDialog' role='alert'> <form method='post' name='deleteForm' class='deleteFormResponse border-0 rounded mx-auto'><div class='row'><div class='col-sm text-center mx-auto'>Are you sure you want to delete?</div></div> <div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='delete' class='delete btn btn-danger' value='delete'></div> <div class='col-sm m-2'><input type='submit' value='cancel' class='btn btn-primary cancelDeletePost'></div></div> </form> </div>");
				$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
				$(this).parent().parent().find(".responseFormResponse").fadeOut(fadeSpeed);

				firstResponse.find(".cancelDeletePost").click(function(event)
				{
						event.preventDefault();
						var dialog=$(this).parent().parent().parent().parent().parent().find(".deletePostDialog");
						dialog.fadeOut(fadeSpeed, function()
						{
							dialog.remove();
						});
					});

					firstResponse.find(".deleteFormResponse").submit(function(event)
					{
						event.preventDefault();
						deleteResponse($(this).parent().parent(), $(this).parent().parent().parent().parent());
					});
				});

				firstResponse.find(".cancel").click(function(event)
				{
					event.preventDefault();
					var dialog=$(this).parent().parent().parent();
					dialog.fadeOut(fadeSpeed);
					$(this).find(".alert").fadeOut(fadeSpeed);
				});
	  	}
	  	catch(error)
	  	{
	  		console.error(error);
	  		alert("An error has occurred");
	  	}
		})
	  .fail(function(error)
		{
	  	alert("An error has occured.  Please try again.");
			console.log(error.responseText);
	  });
	}
}

function saveResponse2(responseForm, thePost)
{

	if(responseForm.find(".newResponse").val()=="")
	{
		//	alert("Please enter text to send a reply");
		if($(document).find("#makeTextResponseAlert").length<=0)
		{
			responseForm.before("<div class='alert alert-warning alert-dismissible fade show' id='makeTextResponseAlert' role='alert'>Please enter text to send a reply<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
		}
	}
	else
	{
		var obj=new FormData((responseForm)[0]);
		obj.append("initPostId", responseForm.find(".initPostId").val());
		obj.append("initUser", responseForm.find(".initUser").val());
		obj.append("newResponse", responseForm.find(".newResponse").val());
		obj.append("reply","reply");
		obj.append("image", (responseForm.find(".imageResponse"))[0].files[0]);
		$.ajax({
		  method: "POST",
		  url: "/passions/passionsblog.php",
		  data: obj,
		  contentType: false,       // The content type used when sending data to the server.
          cache: false,             // To unable request pages to be cached
          processData:false
		})
		  .done(function( data ) {
		  	console.log("Response: "+data);
		  	try
		  	{
		  		var data = JSON.parse(data);
		  		var responseId=data.responseId;
			  	var username=data.username;
			  	var initPostId=data.initPostId;
			  	var response=data.response;
			  	var image=data.image;
			  	var profilePic=data.profilePic;
					var dateTime=data.dateTime;

					// need to change date parameter to tuple format
					var dateTimeArray=dateTime.split(" ");
					var datePortion=dateTimeArray[0];
					var datePortionArray=datePortion.split("-");
					var year=datePortionArray[0];
					var month=datePortionArray[1];
					var date=datePortionArray[2];
					var timePortion=dateTimeArray[1];
					var timePortionArray=timePortion.split(":");
					var hours=timePortionArray[0];
					var minutes=timePortionArray[1];
					var seconds=timePortionArray[2];
					var date=new Date(year,month-1,date,hours,minutes,seconds);
					var dateNow=new Date();
					var timeZoneDifference=dateNow.getTimezoneOffset()/60;
					date.setHours(date.getHours()-timeZoneDifference);
					date=formatMonth(date.getMonth())+" "+addLeadingZeros(date.getDate())+", "+date.getFullYear()+" "+addLeadingZeros(formatHours(date.getHours()))+":"+addLeadingZeros(date.getMinutes())+":"+addLeadingZeros(date.getSeconds())+" "+formatAM_PM(date.getHours());
				 	//var lastResponse=thePost.find(".response").first();
				 	var curResponse=responseForm.parent();
					console.log(curResponse.html());
			    	if(image!="")
			    	{
			    		if(profilePic!="")
			    		{
			    			curResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
			    		}
			    		else
			    		{
			    			curResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><img class='w-75 border border-secondary rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+image+"'><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p> <form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
			    		}
			    	}
			    	else
			    	{
			    		if(profilePic!="")
			    		{
			    			curResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><img width='25' height='25' alt='profile picture' class='img-fluid rounded m-2 border border-secondary' src='data:image/jpeg;base64,"+profilePic+"'>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p>	<form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
			    		}
			    		else
			    		{
			    			curResponse.parent().before("<div class='row'><div id='"+responseId+"' class='response col-sm-9 border mx-auto mt-4 mb-4 p-2 w-75 bg-white'><h5 class='w-75 m-2'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person m-2 border rounded border-secondary' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'></path></svg>"+username+" @ "+date+"</h5><p class='mt-2 mb-2 mx-auto p-2 col-sm-9 w-75 border border-secondary rounded post_content'>"+response+"</p>	<form method='post' name='editForm' class='editFormResponse col-sm-9 w-75 border border-secondary mx-auto rounded p-2'><input type='hidden' name='editPostId' class='editPostId' value='"+responseId+"'><div class='form-group'><textarea name='newEdit' class='form-control newEdit border border-secondary rounded'>"+response+"</textarea></div><div class='form-group'><input type='file' name='imageUpload' class='form-control imageEdit border border-secondary rounded' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='edit' value='edit' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <form method='post' name='responseForm' class='replyFormResponse mx-auto col-sm-9 w-75 border border-secondary rounded p-2'><input type='hidden' name='initPostId' class='initPostId' value='"+initPostId+"'><input type='hidden' name='initUser' class='initUser' value='"+username+"'><div class='form-group'><textarea name='newResponse' class='form-control newResponse border border-secondary rounded'></textarea></div><div class='form-group'><input type='file' name='image' class='form-control border border-secondary rounded imageResponse' value='upload image' accept='image/png, image/jpeg, image/jpg, image/gif'></div><div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='reply' value='reply' class='btn btn-primary border rounded'></div><div class='col-sm m-2'><input type='submit' value='cancel' class='cancel btn btn-primary border rounded'></div></div></form> <div class='row w-75 ml-2 mb-2 mx-auto'><p class='col-sm options border-right mx-auto p-2 m-2 text-center reply_option_response'>reply</p><p class='col-sm options border-right mx-auto p-2 m-2 text-center edit_option_response'>edit</p><p class='col-sm options mx-auto p-2 m-2 text-center border-right delete_option_response'>delete</p><p class='col-sm options scrollUpResponse mx-auto p-2 m-2 border-right text-center'>scroll up</p></div> </div></div>");
			    		}

			    	}

					var numOfPosts=$(".post").length+$(".response").length;
			    if(numOfPosts==1)
			    {
			    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> post</h4>");
			    }
			    else
			    {
			    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> posts</h4>");
			    }
			    var numOfResponses=thePost.find(".response").length;
			    if(numOfResponses==1)
			    {
			    	thePost.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> reply</h4>");
			    }
			    else
			    {
			    	thePost.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> replys</h4>");
			    }
		  	 	var newResponse=curResponse.parent().prev().find(".response");
		  	 	var lastResponse=thePost.find(".response").last();

					// if responses are shown, display new response
		  	 	if(lastResponse.css("display")!="none")
		  	 	{
						newResponse.fadeIn(fadeSpeed);
		  	 	}

					newResponse.find(".editFormResponse").submit(function(event){
							event.preventDefault();
							editResponse($(this).parent());
					});

		  	 	newResponse.find(".replyFormResponse").submit(function(event){
						event.preventDefault();
				  	saveResponse2($(this),$(this).parent().parent().parent());
					});

				newResponse.find( ".options" ).mouseenter(function() {
				  	$(this).addClass( "btn-secondary" );
				});

				newResponse.find( ".options" ).mouseleave(function() {
				  	$(this).removeClass( "btn-secondary" );
				});

				newResponse.find(".num_responses_value").parent().mouseover(function(){
					if($(this).find(".num_responses_value").html()!="0"){
						$(this).css("cursor","pointer");
					}
				});

				newResponse.find('.scrollUpResponse').click(function(){
				//	$(window).scrollTop($(this).parent().parent().position().top);
					var targetElement=$(this).parent().parent();

					var scrollToTop=window.setInterval(function(){
						var scrollUp=setTimeout(function(){
							$(window).scrollTop($(window).scrollTop()-scrollAmount);
						},scrollFrequency);
						if($(window).scrollTop()<=targetElement.position().top)
						{
							clearInterval(scrollToTop);
							clearTimeout(scrollUp);
						}
					},scrollFrequency);
				});

				newResponse.find( ".reply_option_response" ).click(function() {
						var responses=$(this).parent().parent().find(".response");
						if($(this).html()=="reply")
						{
							$(this).parent().parent().find(".num_responses").fadeOut(fadeSpeed);
							$(this).parent().parent().find(".replyFormResponse").fadeIn(fadeSpeed);
							$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
							$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
						}
				});

				newResponse.find( ".edit_option_response" ).click(function() {
					var responses=$(this).parent().parent().find(".response");
					if($(this).html()=="edit")
					{
						$(this).parent().parent().find(".num_responses").fadeOut(fadeSpeed);
						if(responses.css("display")!="none")
						{
							responses.fadeOut(fadeSpeed);
						}
						$(this).parent().parent().find(".editFormResponse").fadeIn(fadeSpeed);
						$(this).parent().parent().find(".replyFormResponse").fadeOut(fadeSpeed);
						$(this).parent().parent().find(".deletePostDialog").fadeOut(fadeSpeed);
					}
				});

				newResponse.find(".delete_option_response").click(function(){
					var dialog=$(this).parent().parent().find(".deletePostDialog");
					if(dialog.length>0)
					{
						dialog.remove();
					}
					$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
					$(this).parent().parent().find(".replyFormResponse").fadeOut(fadeSpeed);
					$(this).parent().before("<div class='alert alert-danger border col-sm mx-auto mb-4 mt-4 p-4 border-danger  deletePostDialog' role='alert'> <form method='post' name='deleteForm' class='deleteFormResponse border-0 rounded mx-auto'><div class='row'><div class='col-sm text-center mx-auto'>Are you sure you want to delete?</div></div> <div class='row text-center mx-auto'><div class='col-sm m-2'><input type='submit' name='delete' class='delete btn btn-danger' value='delete'></div> <div class='col-sm m-2'><input type='submit' value='cancel' class='btn btn-primary cancelDeletePost'></div></div> </form> </div>");
					$(this).parent().parent().find(".editFormResponse").fadeOut(fadeSpeed);
					$(this).parent().parent().find(".responseFormResponse").fadeOut(fadeSpeed);

					newResponse.find(".cancelDeletePost").click(function(event){
							event.preventDefault();
							var dialog=$(this).parent().parent().parent().parent().parent().find(".deletePostDialog");
							dialog.fadeOut(fadeSpeed, function(){
								dialog.remove();
							});
						});

						newResponse.find(".deleteFormResponse").submit(function(event){
							event.preventDefault();
							deleteResponse($(this).parent().parent(), $(this).parent().parent().parent().parent());
						});
					});

					newResponse.find(".cancel").click(function(event){
						event.preventDefault();
						var dialog=$(this).parent().parent().parent();
						dialog.fadeOut(fadeSpeed);
						$(this).find(".alert").fadeOut(fadeSpeed);
					});
		  	}
		  	catch(error)
		  	{
		  		console.error(error);
		  		alert("An error has occurred");
		  	}
		  })
		  .fail(function(error)
			{
		  	alert("An error has occured.  Please try again.");
				console.log(error.responseText);
		  });
	}

}

function deletePost(post)
{
	var postId=post.find(".replyFormPost .initPostId").val();
	var obj={ "delete": "delete", "postId": postId};
	$.ajax({
	  method: "POST",
	  url: "/passions/passionsblog.php",
	  data: obj
	})
	  .done(function( data ) {
		//	console.log(data);
	  	var data = JSON.parse(data);
			post.parent().fadeOut(fadeSpeed,function(){
		  	$(this).remove();
				var numOfPosts=$(".post").length+$(".response").length;
		    if(numOfPosts==1)
		    {
		    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> post</h4>");
		    }
		    else
		    {
		    	$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> posts</h4>");
		    }
			});
	  })
	  .fail(function(error){
	  	alert("An error has occured.  Please try again.");
 // 	console.log(error.responseText);
	});
}

function deleteResponse(response, post)
{
	var obj={ "delete": "delete", "postId": response.find(".editFormResponse .editPostId").val()};
	$.ajax(
	{
	  method: "POST",
	  url: "/passions/passionsblog.php",
	  data: obj
	})
	.done(function( data )
	{
		//console.log(data);
	  var data = JSON.parse(data);
		response.parent().fadeOut(fadeSpeed,function()
		{
	  	$(this).remove();
			var numOfPosts=$(".post").length+$(".response").length;
			if(numOfPosts==1)
			{
				$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> post</h4>");
			}
			else
			{
				$("#num_posts").html("<h4 class='col-sm-6 w-50 m-2 p-2'><span id='num_posts_value'>"+numOfPosts+"</span> posts</h4>");
			}
			var numOfResponses=post.find(".response").length;
	    if(numOfResponses==1)
	    {
	    	post.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> reply</h4>");
	    }
	    else
	    {
	    	post.find(".num_responses").html("<h4 class='m-2 p-2'><span class='num_responses_value'>"+numOfResponses+"</span> replies</h4>");
	    }

			post.find(".num_responses_value").parent().mouseover(function()
			{
				if($(this).find(".num_responses_value").html()!="0")
				{
					$(this).css("cursor","pointer");
				}
			});

			post.find(".num_responses_value").parent().click(function()
			{
				var responses=$(this).parent().parent().parent().find(".response");
				responses.fadeToggle(fadeSpeed);
			});

		});
	})
	.fail(function(error)
	{
	  	alert("An error has occured.  Please try again.");
			//console.log(error.responseText);
	});
}

function editPost(post)
{
	if(post.find(".newEdit").first().val()=="")
	{
		if($(document).find("#makeTextEditPostAlert").length<=0)
		{
			post.find(".editFormPost").before("<div class='alert alert-warning alert-dismissible fade show' id='makeTextEditPostAlert' role='alert'>Please enter text to make a post<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
		}
	}
	else
	{

		var obj=new FormData();
		obj.append("post",post.find(".newEdit").val())
		obj.append("edit","edit");
		obj.append("postId", post.find(".editPostId").val());
		obj.append("image", (post.find(".imageEdit"))[0].files[0]);
		$.ajax({
		  method: "POST",
		  url: "/passions/passionsblog.php",
		  data: obj,
		  contentType: false,       // The content type used when sending data to the server.
	      cache: false,             // To unable request pages to be cached
	      processData:false
		})
		.done(function( data )
		{
			//console.log(data);
		  var data = JSON.parse(data);
			post.find("p").first().html(data.post);
			if(data.image!="" && data.image!=null && data.image!=undefined)
			{
				post.find("img").first().remove();
				post.find("p").first().before("<img class='w-75 border border-secondary rounded imagePost img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+data.image+"'>");
			}
		})
	  	.fail(function(error)
	  	{
	  		alert("An error has occured.  Please try again.");
			//  console.log(error.responseText);
		});
	}
}

function editResponse(response)
{
	var obj=new FormData();
	obj.append("edit","edit");
	obj.append("post",response.find(".newEdit").val());
	obj.append("image", (response.find(".imageEdit"))[0].files[0]);
	obj.append("postId",response.find(".editPostId").val());
	$.ajax(
	{
	  method: "POST",
	  url: "/passions/passionsblog.php",
	  data: obj,
	  contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false
	})
	.done(function( data )
	{
		//  console.log(data);
	  var data = JSON.parse(data);
		response.find("p").first().html(data.post);
		if(data.image!="" && data.image!=null && data.image!=undefined)
		{
			response.find("img").first().remove();
			response.find("p").first().before("<img class='w-75 border rounded imagePost2 img-fluid mx-auto mt-2 mb-2 d-block' alt='image post' src='data:image/jpeg;base64,"+data.image+"'>");
		}
	  })
	.fail(function(error)
	{
	  	alert("An error has occured.  Please try again.");
		//  console.log(error.responseText);
	});
}

function formatHours(hours)
{
	if(hours==0)
	{
		return "12";
	}
	if(hours>12)
	{
		return parseInt(hours,10)-12;
	}
	else
	{
		return hours;
	}
}

function formatAM_PM(hours)
{
	if(hours<12)
	{
		return "A.M.";
	}
	else
	{
		return "P.M.";
	}
}

function addLeadingZeros(num)
{
	if(parseInt(num,10)<10 && parseInt(num,10)>-10)
	{
		return "0"+num;
	}
	else
	{
		return num;
	}
}

function formatMonth(month)
{
	switch(month){
		case 0:
			return "Jan";
		case 1:
			return "Feb";
		case 2:
			return "Mar";
		case 3:
			return "Apr";
		case 4:
			return "May";
		case 5:
			return "Jun";
		case 6:
			return "Jul";
		case 7:
			return "Aug";
		case 8:
			return "Sep";
		case 9:
			return "Oct";
		case 10:
			return "Nov";
		case 11:
			return "Dec";
		default:
			return "";
	}
}
