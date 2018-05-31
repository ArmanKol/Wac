function initpage() {
  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(function(location) {

      document.querySelector("#mijnLocatie").addEventListener("click", function() {
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
      
      if(window.sessionStorage.getItem('username') == null){
    	  document.querySelector("#inlog_naam").innerHTML = "Ingelogd als";
      }else{
    	  document.querySelector("#inlog_naam").innerHTML = "Ingelogd als " + window.sessionStorage.getItem('username');
      }
      
      showWeather(location.city);
      loadCountries();
      toevoegenBestemming();
      wijzigLand();
      inloggen();
      uitloggen();
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
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=208f85213b9c300d1b445708c11a9d80")
    	.then(response => response.json())
    	.then(function(weather) {
    	console.log("INFORMATIE FETCH");
    	
    	weather["time"] = new Date().getTime() + 10000;
    	window.localStorage.setItem(city, JSON.stringify(weather));
    	var sunriseM = new Date((weather.sys.sunrise) * 1000);
    	var sunsetM = new Date((weather.sys.sunset) * 1000);

    	var sunset = sunsetM.getHours() + ":" + sunsetM.getMinutes() + ":" + sunsetM.getSeconds();
    	var sunrise = sunriseM.getHours() + ":" + sunriseM.getMinutes() + ":" + sunriseM.getSeconds();
	
    	var temperatuur = (weather.main.temp - 273.15).toFixed(1);
    	
    	if(weather.wind.deg > 247 && weather.wind.deg < 290){
            windrichtingen = "West"
        }
        else if(windrichting > 201 && windrichting < 247){
            windrichtingen = "Zuid West"
        }
        else if(weather.wind.deg > 157 && weather.wind.deg < 202){
            windrichtingen = "Zuid"
        }
        else if(weather.wind.deg > 111 && weather.wind.deg < 157){
            windrichtingen = "Zuid Oost"
        }
        else if(weather.wind.deg > 67 && weather.wind.deg < 111){
            windrichtingen = "Oost"
        }
        else if(weather.wind.deg > 21 && weather.wind.deg < 67){
            windrichtingen = "Noord Oost"
        }
        else if(weather.wind.deg > 337 && windrichting < 21){
            windrichtingen = "Noord"
        }
        else if(windrichting > 292 && windrichting < 337){
            windrichtingen = "Noord West"
        }
    	
    	
    	document.querySelector("#temperatuur").innerHTML = temperatuur;
        document.querySelector("#luchtvochtigheid").innerHTML = weather.main.humidity;
        document.querySelector("#windsnelheid").innerHTML = weather.wind.speed;
        document.querySelector("#windrichting").innerHTML = windrichtingen;
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
        var countryText = document.createTextNode(country.Land);
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
        
        var deleteColumn = document.createElement("td");
        var deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button")
        deleteButton.setAttribute("id", country.code);
        deleteButton.setAttribute("value", "Delete");
        deleteColumn.appendChild(deleteButton);
        row.appendChild(deleteColumn);
        
        var wijzigColumn = document.createElement("td");
        var wijzigButton = document.createElement("input");
        wijzigButton.setAttribute("id", country.code);
        wijzigButton.setAttribute("type", "button");
        wijzigButton.setAttribute("value", "Wijzig");
        wijzigColumn.appendChild(wijzigButton);
        row.appendChild(wijzigColumn);
        
        wijzigButton.addEventListener("click", function(){
        	document.querySelector("#wLand").setAttribute("value", country.Land);
        	document.querySelector("#wHoofdstad").setAttribute("value", country.hoofdstad);
        	document.querySelector("#wRegio").setAttribute("value", country.regio);
        	document.querySelector("#wOppervlakte").setAttribute("value", country.oppervlakte);
        	document.querySelector("#wInwoners").setAttribute("value", country.inwoners);
        	document.querySelector("#countryCode").setAttribute("value", country.code);
        });
        
        var fetchoptions = {method: 'DELETE', headers: {'Authorization' : 'Bearer ' + window.sessionStorage.getItem("sessionToken")}};

        deleteButton.addEventListener("click", function(){
        	fetch("restservices/countries/" + country.code, fetchoptions)
        		.then(function (response) {
        			if(response.ok){
        				alert("Country deleted!")
        				console.log("Country deleted!");
        				// location.reload();
        			}
        			else if(response.status == 404){
        				console.log("Country not found")
        			}
        			else{
        				console.log("Cannot delete country");
        			}
        	})
        	.catch(error => consol.log(error));
        });

        document.querySelector("#vakantiebestemmingenTable").appendChild(row);
      }
    });
}

function toevoegenBestemming(){
	document.querySelector("#post").addEventListener("click", function(){
    	if(document.getElementById("nLandcode").value == "" || document.getElementById("nLand").value == ""){
    		alert("Je hebt geen landcode of landnaam ingevuld.")
    	}else{
    		var formData = new FormData(document.querySelector("#bestemmingToevoegenForm"));
        	var encData = new URLSearchParams(formData.entries());
        	
        	var fetchoptions = {method: 'POST', body:encData, headers: {'Authorization' : 'Bearer ' + window.sessionStorage.getItem("sessionToken")}};
        	
        	fetch("restservices/countries", {method: 'POST', body:encData})
        		.then(response => response.json())
        		.then(function(myJson){
        			console.log(myJson);
        			location.reload();
        	});
    	}
    });
}

function wijzigLand(){
	document.querySelector("#put").addEventListener("click", function(){
    	var countryCode = document.querySelector("#countryCode").value;
    	var formData = new FormData(document.querySelector("#countryForm"));
    	var encData = new URLSearchParams(formData.entries());
    	
    	var fetchoptions = {method: 'PUT', body:encData, headers: {'Authorization' : 'Bearer ' + window.sessionStorage.getItem("sessionToken")}};
    	
    	fetch("restservices/countries/" + countryCode, fetchoptions)
    		.then(response => response.json())
    		.then(function(myJson){
    			console.log(myJson);
    			location.reload();

    		})
    });
}

function inloggen(){
	document.querySelector("#inloggen_id").addEventListener("click", function(){
		
		var username = document.querySelector("#username_id").value;
		var password = document.querySelector("#password_id").value;
		window.sessionStorage.setItem('username', username);
		window.sessionStorage.setItem('password', password);
		
		var formData = new FormData(document.querySelector("#formuser"));
    	var encData = new URLSearchParams(formData.entries());
		
		fetch("restservices/authentication", {method:'POST', body: encData})
			.then(function(response){
				if(response.ok){
					location.reload();
					alert("U bent succesvol ingelogd");
					return response.json();
				}else{
					alert("Wrong username/password");
					throw "Wrong username/password";
				}})
					
			.then(myToken => window.sessionStorage.setItem("sessionToken", myToken.JWT))
			.catch(error => console.log(error));
	});
}

function uitloggen(){
	document.querySelector("#uitloggen").addEventListener("click", function(){
		window.sessionStorage.clear();
		location.reload();
	});
}

initpage();
