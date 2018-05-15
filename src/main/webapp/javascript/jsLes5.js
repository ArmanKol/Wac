function initpage() {
  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(function(location) {

      document.querySelector("#mijnLocatie").addEventListener("click", function() {
        console.log("tttt");
        weatherChange(location.city);
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
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=208f85213b9c300d1b445708c11a9d80")
    .then(response => response.json())
    .then(function(weather) {

      var sunriseM = new Date((weather.sys.sunrise) * 1000);
      var sunsetM = new Date((weather.sys.sunset) * 1000);

      var sunset = sunsetM.getHours() + ":" + sunsetM.getMinutes() + ":" + sunsetM.getSeconds();
      var sunrise = sunriseM.getHours() + ":" + sunriseM.getMinutes() + ":" + sunriseM.getSeconds();

      var temperatuur = (weather.main.temp - 273.15).toFixed(1);

      document.querySelector("#temperatuur").append(document.createTextNode(temperatuur));
      document.querySelector("#luchtvochtigheid").append(document.createTextNode(weather.main.humidity));
      document.querySelector("#windsnelheid").append(document.createTextNode(weather.wind.speed));
      document.querySelector("#windrichting").append(document.createTextNode(weather.wind.deg));
      document.querySelector("#zonsopgang").append(document.createTextNode(sunrise));
      document.querySelector("#zonsondergang").append(document.createTextNode(sunset));

      document.querySelector("#headerWeer").append(document.createTextNode(city));
    });
}

function loadCountries() {
  fetch("restservices/countries/")
    .then(response => response.json())
    .then(function(weather) {
      for (const country of weather) {

        var row = document.createElement("tr");
        row.setAttribute("id", country.hoofdstad);
        row.addEventListener("click", function() {
          weatherChange(this.id);
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

function weatherChange(city) {
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=208f85213b9c300d1b445708c11a9d80";
  fetch(url)
    .then(response => response.json())
    .then(function(weather) {
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

      var localStorage = window.localStorage();

    });
}

initpage();
