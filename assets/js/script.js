



function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=Denver,CO,1&appid=e411420d201b5d2ab3ba0e99dfa72c08';

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const lat = data[0].lat;
    const lon = data[0].lon;
       console.log(lat, lon);

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
    })

    const city = document.getElementById('city');
    const submitCity = document.getElementById('submitCity');
    
    submitCity.addEventListener("click", function(event) {
        event.preventDefault();
        const cityValue = city.value;
        console.log(cityValue);
    });
    });

}

getApi();