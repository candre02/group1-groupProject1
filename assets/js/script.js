
var searchedCity = "";
var submitBtn = document.getElementById("submitBtn");
var searchBar = document.getElementById("search-city");
var historyEl = document.getElementById("history");



var getLocationGiphy = function (location, weather) {
    // format the GIPHY api url                User entered location    current weather of location    api key                     amount of gifs requested
    var apiUrl = "http://api.giphy.com/v1/gifs/search?q=" + location + " " + weather + "&api_key=SHks0oKzeD1J8FJxxV3tXAqMCUuXR1C6&rating=g&limit=3";


    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    applyGifs(data);
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=07748c42b466d653378d277748838d7c";

    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    var currentWeather = data.weather[0].main;
                    getLocationGiphy(searchedCity, currentWeather);
                    currentTemperture(data);
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

function currentTemperture(weather) {
    var temp = document.getElementById("temp");
    var humidity = document.getElementById("humidity");
    var wind = document.getElementById("wind");
    var pressure = document.getElementById("pressure");

    temp.textContent = weather.main.temp + "F";
    humidity.textContent = weather.main.humidity;
    wind.textContent = weather.wind.speed + "mph";
    pressure.textContent = weather.main.pressure + "hPa";
}


// applies the 3 searched gifs to the website
function applyGifs(gifs) {
    var gifOne = document.getElementById("gifOne");
    var gifTwo = document.getElementById("gifTwo");
    var gifThree = document.getElementById("gifThree");

    gifOne.setAttribute("src", gifs.data[0].embed_url);
    gifTwo.setAttribute("src", gifs.data[1].embed_url);
    gifThree.setAttribute("src", gifs.data[2].embed_url);
};

function userCity() {
    var finalSearch = searchBar.value;
    searchedCity = finalSearch;
    getWeatherData(searchedCity);
};

// save to local storage
function saveSearch() {
    var searchValue = searchBar.value.trim();

    var searchHistory = loadHistory();

    searchHistory.push(searchValue);

    localStorage.setItem('searched', JSON.stringify(searchHistory));
    displayHistory(searchHistory);

};

var displayHistory = function (searchHistory) {
    //console.log("inside displayHistory");
    historyEl.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
        var historyDiv = document.createElement("div");
        historyDiv.addEventListener('click', function (event) {
            getWeatherData(event.target.innerText);
        })
        historyDiv.classList.add("history-item");
        historyDiv.innerHTML = "<h4>" + searchHistory[i] + "</h4>";
        historyEl.appendChild(historyDiv);
    }
};

var loadHistory = function () {
    var localHistory = localStorage.getItem("searched")
    if (localHistory) {
        return JSON.parse(localHistory);
    }

    return []
};

function saveCity(event) {
    event.preventDefault();
    userCity();
    saveSearch();
    searchBar.value = ""
};

saveSearch();
submitBtn.onclick = saveCity;