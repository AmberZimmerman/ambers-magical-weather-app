
var savedCitiesContainer = document.getElementById('saved-cities');


        
    
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
            let getWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=e411420d201b5d2ab3ba0e99dfa72c08`;

            console.log(getWeather);

            fetch(getWeather)
            .then(function (response) {
                return response.json();
            })
            .then(function (weatherData) {
                console.log(weatherData);
                
                

                const cardBody = document.getElementById('card-body-current');
                clearCards(cardBody);

                const date = weatherData.current.dt;
                const dateEl = document.createElement('div');
                dateEl.innerText = `Date: ${date}`;
                cardBody.appendChild(dateEl);
                
                const temp = weatherData.current.temp;
                console.log(temp);
                const tempEl = document.createElement('div');
                tempEl.innerText = `Temp: ${temp}`;
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

                const dailyCardsContainer = document.getElementById("daily-cards-container");
                clearCards(dailyCardsContainer);

                for (let i = 0; i < 5; i++) {
                    const element = daily[i];

                    const dateDaily = element.dt;
                    const tempDaily = element.temp.min;
                    const humidDaily = element.humidity;
                    const windDaily = element.wind_speed;
                    
                    // const iconDaily = element.weather.

                   

                    const colDaily = document.createElement('div');
                    colDaily.classList.add('col');
                    dailyCardsContainer.appendChild(colDaily);
                    
                    const cardDaily = document.createElement('div');
                    cardDaily.classList.add('card');
                    colDaily.appendChild(cardDaily);

                    const dailyCardBody = document.createElement('div');
                    dailyCardBody.classList.add('card-body');
                    cardDaily.appendChild(dailyCardBody);

                    let dateDailyEl = document.createElement('div');
                    dateDailyEl.innerText = `Date: ${dateDaily}`;
                    dailyCardBody.appendChild(dateDailyEl);

                    let tempDailyEl = document.createElement('div');
                    tempDailyEl.innerText = `Temp: ${tempDaily}`;
                    dailyCardBody.appendChild(tempDailyEl);

                    let windDailyEl = document.createElement('div');
                    windDailyEl.innerText = `Wind: ${windDaily}`;
                    dailyCardBody.appendChild(windDailyEl);

                    let humidDailyEl = document.createElement('div');
                    humidDailyEl.innerText = `Humidity: ${humidDaily}`;
                    dailyCardBody.appendChild(humidDailyEl);
                    

                    console.log(element);
                }
                });
    
            })

           
        }


const city = document.getElementById('city');
const submitCity = document.getElementById('submitCity');

submitCity.addEventListener("click", function(event) {
    event.preventDefault();
    const cityValue = city.value.trim();
    if (cityValue) {
    
    // Get api is strictly putting elements on the page
    getApi(cityValue);
    // local storage is doing its own thing
    
    let cityNameOne = JSON.parse(localStorage.getItem('cityNames'));
    
    // Check to see if array exists inside local storage
    if (!cityNameOne) {
        cityNameOne = [];
    }

    cityNameOne.push(cityValue);

  
    localStorage.setItem("cityNames", JSON.stringify (cityNameOne));
}
    

    renderHistory();
  

    
});
    
function renderHistory () {
    cityNameOne = JSON.parse(localStorage.getItem("cityNames"));
    if (cityNameOne) {
    clearCards(savedCitiesContainer);

    
    for (let index = 0; index < cityNameOne.length; index++) {
        const cityNamesAgain = cityNameOne[index];
        console.log(cityNamesAgain);

        const savedCity = document.createElement('button');
        savedCity.setAttribute("city-name", cityNamesAgain);
        savedCity.innerText = cityNamesAgain;
        savedCitiesContainer.append(savedCity);   
    }
}
}

renderHistory();



function getHistoryAgain (e) {
    const historyAgainCard = e.target;
    const storeWord = historyAgainCard.getAttribute("city-name");
    getApi(storeWord);

}

savedCitiesContainer.addEventListener('click', getHistoryAgain);

function clearCards(x) {
    while(x.firstChild) {
x.removeChild(x.firstChild);

    }
};







/**
 * user loads web page
 * going to do local storage.get items from local storage
 * get the array of strings
 * list of items get out with a for loop
 * if I have an array that has a list of items, the best way to get them out will be to use a for loop
 * create a container where we want city names to go
 * create each individual element where city names will go
 * each element will have some values because it's based off what the user will click
 * in container is a list of buttons
 * each button will have data attributes
 * give each button the value of a city name
 * each button will have an event listener
 * each time the button is clicked
 * add event listener to pass in the value again
 * I'm going to need to check if my button is a button because it will grab any other text floating around
 * add lat and long not just city name
 * 
 trim, make sure it's not an empty string, make sure it's not null
 */