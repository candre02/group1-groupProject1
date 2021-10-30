var searchedCity = "";
var submitBtn = document.getElementById("submitBtn");
var searchBar = document.getElementById("search-city");


var getLocationGiphy = function (location, weather) {
    // format the GIPHY api url                User entered location    current weather of location    api key                     amount of gifs requested
    var apiUrl = "http://api.giphy.com/v1/gifs/search?q=" + location + " " + weather + "&api_key=SHks0oKzeD1J8FJxxV3tXAqMCUuXR1C6&rating=g&limit=3";

    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            } else {
                // request was unsuccessful 
                alert("Error: GIPHY gif not found");
            }
        })
        .catch(function (error) {
            alert("Unable to connect to GIPHY");
        });
};

// gets current weather data and pushes current weather status into gif search along with the user searched city
var getWeatherData = function (location) {
    // format the Open Weather api url                         User entered location             api key
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=07748c42b466d653378d277748838d7c";

    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    var currentWeather = data.weather[0].main;
                    getLocationGiphy(searchedCity, currentWeather);
                    console.log(data);
                });
            } else {
                // request was unsuccessful 
                alert("Error: weather info not found");
            }
        })
        .catch(function (error) {
            alert("Unable to connect to Open Weather");
        });
};


function userCity() {
    var finalSearch = searchBar.value;
    searchedCity = finalSearch;
    getWeatherData(searchedCity);
};



function saveCity(event) {
    event.preventDefault();
    userCity();
};

submitBtn.onclick = saveCity;






