function getWeather(response){
    let temperatureElement = document.querySelector("#city-temperature");
    let cityTemperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let emojiElement = document.querySelector("#emoji");

    emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}"
        class="weather-app-emoji" />`;

    

 cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    humidityElement.innerHTML =  `${response.data.temperature.humidity}%,`;
    temperatureElement.innerHTML = Math.round(cityTemperature);

    getForecast(response.data.city);
    
   
}
   function formatDate(date){
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


     let day = days[date.getDay()];
    if (minutes < 10){
        minutes = `0${minutes}`;
    }


    return `${day} ${hours}:${minutes}`;

   }


    function searchCity(city) {
    let apiKey = "0a8c6e7ct4a98df4436abe8fo0c14f17";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getWeather);
}





function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}




function getForecast(city) {
    let apiKey = "0a8c6e7ct4a98df4436abe8fo0c14f17";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
}

    function displayForecast(response) {
    let forecastHtml = "";
     
    
    response.data.daily.forEach(function (day, index) {
        if (index < 5) {

        forecastHtml = forecastHtml + 
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div> 
        <img src="${day.condition.icon_url}" class="weather-forecast-emoji" />
        
        <div class="weather-forecast-temp">
            <div class="weather-forecast-temp1">
            <strong>${Math.round(day.temperature.maximum)}°</strong></div>
            <div class="weather-forecast-temp1">${Math.round(
            day.temperature.minimum)}°</div> 
        </div>
    </div> 
        `;
            }

    });



let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml; 
}




let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("India");


