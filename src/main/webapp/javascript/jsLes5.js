function initpage() {
  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(function(location) {

      document.querySelector("#mijnLocatie").addEventListener("click", function() {
        console.log("tttt");
        showWeather(location.city);
      });
      document.querySelector("#landcode").append(document.createTextNode(location.country));
      document.querySelector("#land").append(document.createTextNode(location.country_name));
      document.querySelector("#regio").append(document.createTextNode(location.region));
      document.querySelector("#stad").append(document.createTextNode(location.city));
      document.querySelector("#postcode").append(document.createTextNode(location.postal));
      document.querySelector("#lat").append(document.createTextNode(location.latitude));
      document.querySelector("#lon").append(document.createTextNode(location.longitude));
      document.querySelector("#ip").append(document.createTextNode(location.ip));

      showWeather(location.city);
      loadCountries();
    });
}

function showWeather(city) {
	
	if(window.localStorage.getItem(city) != null && JSON.parse(window.localStorage.getItem(city)).name === city && JSON.parse(window.localStorage.getItem(city)).time > new Date().getTime()){
		var weather = JSON.parse(window.localStorage.getItem(city));
		
		console.log("INFORMATIE LOCALSTORAGE");
		var sunriseM = new Date((weather.sys.sunrise) * 1000);
    	var sunsetM = new Date((weather.sys.sunset) * 1000);

    	var sunset = sunsetM.getHours() + ":" + sunsetM.getMinutes() + ":" + sunsetM.getSeconds();
    	var sunrise = sunriseM.getHours() + ":" + sunriseM.getMinutes() + ":" + sunriseM.getSeconds();
	
    	var temperatuur = (weather.main.temp - 273.15).toFixed(1);
	
    	document.querySelector("#temperatuur").innerHTML = temperatuur;
        document.querySelector("#luchtvochtigheid").innerHTML = weather.main.humidity;
        document.querySelector("#windsnelheid").innerHTML = weather.wind.speed;
        document.querySelector("#windrichting").innerHTML = weather.wind.deg;
        document.querySelector("#zonsopgang").innerHTML = sunrise;
        document.querySelector("#zonsondergang").innerHTML = sunset;
        document.querySelector("#headerWeer").innerHTML = "Het weer in " + weather.name;
    	
	}else{
		fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=208f85213b9c300d1b445708c11a9d80")
    	.then(response => response.json())
    	.then(function(weather) {
    	console.log("INFORMATIE FETCH");
    	
    	weather["time"] = new Date().getTime() + 10000;
    	console.log(weather["time"]);
    	window.localStorage.setItem(city, JSON.stringify(weather));
    	var sunriseM = new Date((weather.sys.sunrise) * 1000);
    	var sunsetM = new Date((weather.sys.sunset) * 1000);

    	var sunset = sunsetM.getHours() + ":" + sunsetM.getMinutes() + ":" + sunsetM.getSeconds();
    	var sunrise = sunriseM.getHours() + ":" + sunriseM.getMinutes() + ":" + sunriseM.getSeconds();
	
    	var temperatuur = (weather.main.temp - 273.15).toFixed(1);
	
    	document.querySelector("#temperatuur").innerHTML = temperatuur;
        document.querySelector("#luchtvochtigheid").innerHTML = weather.main.humidity;
        document.querySelector("#windsnelheid").innerHTML = weather.wind.speed;
        document.querySelector("#windrichting").innerHTML = weather.wind.deg;
        document.querySelector("#zonsopgang").innerHTML = sunrise;
        document.querySelector("#zonsondergang").innerHTML = sunset;
        document.querySelector("#headerWeer").innerHTML = "Het weer in " + weather.name;
    	});
	}
}

function loadCountries() {
  fetch("restservices/countries/")
    .then(response => response.json())
    .then(function(weather) {
      for (const country of weather) {

        var row = document.createElement("tr");
        row.setAttribute("id", country.hoofdstad);
        row.addEventListener("click", function() {
          showWeather(this.id);
        });


        var countryColumn = document.createElement("td");
        var countryText = document.createTextNode(country.countries);
        countryColumn.appendChild(countryText);
        row.appendChild(countryColumn);


        var capitalColumn = document.createElement("td");
        var capitalText = document.createTextNode(country.hoofdstad);
        capitalColumn.appendChild(capitalText);
        row.appendChild(capitalColumn);



        var regionColumn = document.createElement("td");
        var regionText = document.createTextNode(country.regio);
        regionColumn.appendChild(regionText);
        row.appendChild(regionColumn);


        var surfaceColumn = document.createElement("td");
        var surfaceText = document.createTextNode(country.oppervlakte);
        surfaceColumn.appendChild(surfaceText);
        row.appendChild(surfaceColumn);

        var populationColumn = document.createElement("td");
        var populationText = document.createTextNode(country.inwoners);
        populationColumn.appendChild(populationText);
        row.appendChild(populationColumn);


        document.querySelector("#vakantiebestemmingenTable").appendChild(row);
      }
    });
}

initpage();
