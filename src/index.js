function getWeather(response){
    let temperatureElement = document.querySelector("#city-temperature");
    let cityTemperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(cityTemperature);
   
}

function searchCity(city) {
    let apiKey = "0a8c6e7ct4a98df4436abe8fo0c14f17";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getWeather);
}





function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

