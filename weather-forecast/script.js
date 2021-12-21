function start()
{
	var submitButton=document.getElementById("submit");
	submitButton.addEventListener("click",function() 
	{
		fetchLatestWeather();
	});
}

function scrollUp(element)
{
	console.log("content changed");
	element.scrollTop=0;
}

async function fetchLatestWeather()
{
	var location=document.getElementById("location").value;
	var regex=/(^\w+(\w|\-|\s|\.)*$)/g;
	if(regex.test(location))
	{
		var url="https://meta-weather.vercel.app/api/location/search/?query="+location;
		fetch(url)
		.then(response => response.json())
		.then(json => {
			if(json.length>0)
			{
				var locationId=json[0].woeid;
				var locationTitle=json[0].title;
				var locationType=json[0].location_type;
				url="https://meta-weather.vercel.app/api/location/"+locationId+"/";
				fetch(url)
				.then(response => response.json())
				.then(json => {
					var weatherData=json;
					weatherData=weatherData["consolidated_weather"][0];
					var weatherStateAbbr=weatherData["weather_state_abbr"];
					var date=weatherData["applicable_date"];
					date=convertDateFormat(date);
					var output="<h6 class='text-center mx-auto m-2 p-2'>The forecast as of <em>"+date+"</em> in the "+locationType+" of "+locationTitle+" is:</h6>";
					output+="<img src='https://www.metaweather.com/static/img/weather/"+weatherStateAbbr+".svg' width='64' height='64'>";
					output+="<p class='text-center mx-auto m-2 p-2'><strong>"+weatherData["weather_state_name"]+"</strong></p>";
					output+="<p class='text-center mx-auto m-2 p-2'><strong>Wind</strong>: "+weatherData["wind_direction_compass"]+" "+weatherData["wind_speed"]+" mph</p>";
					output+="<p class='text-center mx-auto m-2 p-2'><strong>Current Temperature</strong>: "+weatherData["the_temp"]+" Centigrade</p>";
					output+="<p class='text-center mx-auto m-2 p-2'><strong>High</strong>: "+weatherData["max_temp"]+" Centigrade</p>";
					output+="<p class='text-center mx-auto m-2 p-2'><strong>Low</strong>: "+weatherData["min_temp"]+" Centigrade</p>";
					output+="<p class='text-center mx-auto m-2 p-2'><strong>Humidity</strong>: "+weatherData["humidity"]+" %</p>";
					output+="<p class='text-center mx-auto m-2 p-2'><strong>Air Pressure</strong>: "+weatherData["air_pressure"]+" mbar</p>";
					output+="<p class='text-center mx-auto m-2 p-2'><strong>Visibility</strong>: "+weatherData["visibility"]+" miles</p>";
					output+="<p class='text-center mx-auto m-2 p-2'><strong>Accuracy</strong>: "+weatherData["predictability"]+" %</p>";
					var display=document.getElementById("display");
					display.innerHTML=output;
					display.scrollTop=1;
				});
			}
			else
			{
				var display=document.getElementById("display");
				display.innerHTML="<h6 class='error text-center mx-auto m-2 p-2'>No weather data exist for that location</h6>";
				display.scrollTop=1;
			}
			
		});	
	}
	else
	{
		var display=document.getElementById("display");
		display.innerHTML="<h6 class='error text-center mx-auto m-2 p-2'>Invalid input</h6>";
		display.scrollTop=1;
	}
}

function convertDateFormat(date)
{
	date=date.split("-");
	var output="";
	var months=["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
	date[1]=months[date[1]-1];
	return date[1]+" "+date[2]+", "+date[0];
}

function printObjectProperties(obj)
{
	var objKeys=Object.keys(obj);
	for(counter in objKeys)
	{
		console.log(objKeys[counter]+":"+obj[objKeys[counter]]);
	}
}

function getOjbectProperties(obj)
{
	var objKeys=Object.keys(obj);
	var text="";
	for(counter in objKeys)
	{
		text+="<p>"+objKeys[counter]+":"+obj[objKeys[counter]]+"</p>";
	}
	return text;
}

window.addEventListener("load",function()
{
	start();
});