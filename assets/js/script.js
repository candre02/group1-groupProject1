var getLocationGiphy = function (location, weather) {
    // format the GIPHY api url                User entered location    current weather of location    api key                     amount of gifs requested
    var apiUrl = "http://api.giphy.com/v1/gifs/search?q=" + location + "+" + weather + "&api_key=SHks0oKzeD1J8FJxxV3tXAqMCUuXR1C6&rating=g&limit=3";

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

getLocationGiphy("austin", "stormy");