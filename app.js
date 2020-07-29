// API KEY = afb75baca819a53461c823e985d80100

// select dom element
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

// app data
const weather = {};//weather object

weather.temperature = { //temperature unit set celcious
    unit: "celsius"
};

// app consts and vars
const KELVIN = 273;
// API key
const key = "afb75baca819a53461c823e985d80100";

// check if browser supports geolocation
if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(setPosition,showError);// we pass setPosition and showError callback method 
}else{
    notificationElement.style.display = "block";//modify css part of display part
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

// set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // call get wether function
    getWeather(latitude,longitude);
}

// show the error if there is any issue with geolocation service
function showError(error){
 notificationElement.style.display = "block";
 notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// get weather from API and initiliaze the weather object
function getWeather(latitude,longitude){
    // fetch data from this url and pass paramenter latitude and longitude
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${longitude}&lon=${latitude}&appid=${key}`;

    // let api = `http://api.openweathermap.org/data/2.5/weather?lat=22.89&lon=87.7910&appid=${key}`;//this is for testing purpuse you can delete this line 
    
    fetch(api).then(function(response){//at first we fetch the api and then we start a callback function
        let data = response.json();
        return data;// we return the data
    }).then(function(data){//then we agin call a call back function
        weather.temperature.value = Math.floor(data.main.temp-KELVIN);//at first we change it into celcious and set 
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then( function(){//after updating weather object we call diasplay weather function
        displayWeather()
    });

    
}
   
    // display weather function 
    function displayWeather(){
        iconElement.innerHTML = `<img src ="icons/${weather.iconId}.png"/>`;    
        tempElement.innerHTML = `${weather.temperature.value} &deg;<span>C</span>`;
        descElement.innerHTML = weather.description;
        locationElement.innerHTML =`${weather.city}, ${weather.country}`
    }


    // add listener in temperatureElement
    tempElement.addEventListener('click', function (event) {
        if(weather.temperature.value === undefined) return;
        else if(weather.temperature.unit === "celsius"){
            var fahrenheitValue = celsiusToFahrenheit(weather.temperature.value);
            weather.temperature.value = fahrenheitValue;
            weather.temperature.unit = "fahrenheit";
            tempElement.innerHTML = `${weather.temperature.value} &deg;<span>F</span>`;
        }
        else if(weather.temperature.unit === "fahrenheit"){
            var celsiusValue = fahrenheitToCelsius(weather.temperature.value);
            weather.temperature.value = celsiusValue;
            weather.temperature.unit = "celsius";
            tempElement.innerHTML = `${weather.temperature.value} &deg;<span>C</span>`;
        }

      });

    //  Celsius to Fahrenheit Converter
      function celsiusToFahrenheit(temperature){
          return Math.floor(temperature*9/5)+32;
      }

      // Fahrenheit to  Celsius Converter
      function fahrenheitToCelsius(temperature){
        return Math.floor((5/9) * (temperature - 32));
    }