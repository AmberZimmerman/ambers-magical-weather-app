



function getApi(cityValue) {
    // fetch request gets long and lat information for the city that the user types into the input
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityValue},1&appid=e411420d201b5d2ab3ba0e99dfa72c08`;

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
        console.log(lat, lon);

     // fetch request takes the long and lat defined above and then inserts taht into this web api that gets the forcast information for that location
    let getWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=e411420d201b5d2ab3ba0e99dfa72c08`;

    console.log(getWeather);

    fetch(getWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (weatherData) {
        console.log(weatherData);
        const temp = weatherData.current.temp;
        console.log(temp);
        const humid = weatherData.current.humidity;
        console.log(humid);
        const wind = weatherData.current.wind_speed;
        console.log(wind);
        const uvi = weatherData.current.uvi;
        console.log(uvi);
        const daily = weatherData.daily;
        console.log(daily);

        for (let i = 0; i < daily.length; i++) {
            const element = daily[i];
            const tempDaily = element.temp.min;
            console.log(tempDaily);
            console.log(element);
        }
    })

    });

}

const city = document.getElementById('city');
const submitCity = document.getElementById('submitCity');

    
    submitCity.addEventListener("click", function(event) {
        event.preventDefault();
        const cityValue = city.value;
        console.log(cityValue);
        getApi(cityValue);
    });

