// let initialWeatherCards = [
//     {
//         id: 1,
//         date: "",
//         temp: "",
//         wind: "",
//         uvi: ""
//     },
//     {
//         id: 2,
//         date: "",
//         temp: "",
//         wind: "",
//         uvi: ""
//     },
//     {
//         id: 3,
//         date: "",
//         temp: "",
//         wind: "",
//         uvi: ""
//     },
//     {
//         id: 4,
//         date: "",
//         temp: "",
//         wind: "",
//         uvi: ""
//     },
//     {
//         id: 5,
//         date: "",
//         temp: "",
//         wind: "",
//         uvi: ""
//     },
//     {
//         id: 6,
//         date: "",
//         temp: "",
//         wind: "",
//         uvi: ""
//     },
    
// ]

// if (!localStorage.getItem('weatherCards')) {
//     const weatherCards = JSON.stringify(initialWeatherCards)
//     localStorage.setItem('weatherCards', weatherCards)
// }

// function initiateApp () {
//     console.log('App bootup lets goo');
//     const weatherCards = JSON.parse(localStorage.getItem('weatherCards'));
//     // const el = document.getElementById('');
//     console.log(weatherCards);

//     for (let index = 0; index < weatherCards.length; index++) {
//         const card = weatherCards[index];
        
    

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
                const tempEl = document.createElement('div');
                tempEl.innerText = `Temp: ${temp}`;
                const cardBody = document.getElementById('card-body-current');
                console.log("card body", cardBody);
                cardBody.appendChild(tempEl);
                

                const humid = weatherData.current.humidity;
                console.log(humid);
                const humidEl = document.createElement('div');
                humidEl.innerText = `Humidity: ${humid}`;
                cardBody.appendChild(humidEl);
                
                const wind = weatherData.current.wind_speed;
                console.log(wind);
                const windEl = document.createElement('div');
                windEl.innerText = `Wind: ${wind}`;
                cardBody.appendChild(windEl);
                
                const uvi = weatherData.current.uvi;
                console.log(uvi);
                const uviEl = document.createElement('div');
                uviEl.innerText = `UV Index: ${uvi}`;
                cardBody.appendChild(uviEl);
                
                
                const daily = weatherData.daily;
                console.log(daily);

                for (let i = 0; i < daily.length; i++) {
                    const element = daily[i];
                    const tempDaily = element.temp.min;
                    const windDaily = element.wind_speed;
                    const humidDaily = element.humidity;
                    const uviDaily = element.uvi;
            
                    console.log("temp", tempDaily);
                    console.log("wind", windDaily);
                    console.log('humid', humidDaily);
                    
                    console.log(tempDaily);
                    console.log(element);
                }
                });
    
            })

           
        }
//     }
// }

const city = document.getElementById('city');
const submitCity = document.getElementById('submitCity');

submitCity.addEventListener("click", function(event) {
    event.preventDefault();
    const cityValue = city.value;
    console.log(cityValue);
    getApi(cityValue);
});
    
// 
