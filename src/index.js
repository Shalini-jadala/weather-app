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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("India");

