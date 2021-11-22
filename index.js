
let now = new Date();

let dayOfTheWeek = document.querySelector("#weekday");
let dateTime = document.querySelector("#date-time");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];


dayOfTheWeek.innerHTML = `${day}`;
monthNumber.innerHTML = `${month} ${date}`;
time.innerHTML = `${hours}:${minutes}`;

function getForecast(coordinates){
   let apiKey = "2b8193e1fb0166e722b7330ca6c589b4";
 let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperatureDegrees").innerHTML = `${temperature}°C`;

  let temperaturemin = Math.round(response.data.main.temp_min);
  document.querySelector("#temperatureMin").innerHTML = `${temperaturemin}°C`;

  let temperaturemax = Math.round(response.data.main.temp_max);
  document.querySelector("#temperatureMax").innerHTML = `${temperaturemax}°C`;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

celsiusTemperature= response.data.main.temp;

getForecast(response.data.coord);
}

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thur",
  "Fri",
  "Sat",
];
return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement= document.querySelector("#forecast");

  let forecastHTML = "";
  
  forecast.forEach(function(forecastDay, index) {
    if (index < 3) {
  forecastHTML =
    forecastHTML +
    `
            <div class="row">
              <div class="weekday-forecast col-5">${formatDay(forecastDay.dt)}</div>
               <div class="temperature-min-max-forecast col">
                   <span id="temperatureMinForecast">${Math.round(forecastDay.temp.min)}° /
                    </span>
                <span id="temperatureMaxForecast">${Math.round(forecastDay.temp.max)}°</span>
            </div>
            </div>
            <div class="row">
            <img class="icon-forecast col-5" id="iconForecast" alt="clear" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" />
            <h1 class="temperature-b main-card col-7" id="temperatureDegreesForecast">${Math.round(forecastDay.temp.day)}°</h1>
            </div>
            <h3 class="main-weather main-card description-forecast" id="descriptionForecast">Description</h3>
            <hr size="4" width="100%" color="black">
          `;
    }
          });
          forecastElement.innerHTML = forecastHTML;
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input").value;
  search(input);
}

function search(city) {
  let apiKey = "2b8193e1fb0166e722b7330ca6c589b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
search("Toronto");

let searchForm = document.querySelector("#citySearch");
searchForm.addEventListener("submit", handleSubmit);

function showFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  let temperatureElementMin = document.querySelector("#temperatureMin");
  let temperatureElementMax = document.querySelector("#temperatureMax");
  celsiusConvert.classList.remove("active");
  fahrenheitConvert.classList.add("active");
  temperatureDegrees.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
  temperatureElementMin.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
  temperatureElementMax.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}
function showCelsiusTemperature(event){
  event.preventDefault();
  celsiusConvert.classList.add("active");
  fahrenheitConvert.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let temperatureElementMin = document.querySelector("#temperatureMin");
  let temperatureElementMax = document.querySelector("#temperatureMax");
  temperatureDegrees.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  temperatureElementMin.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  temperatureElementMax.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsiusTemperature = null;

let fahrenheitConvert = document.querySelector("#fahrenheit");
fahrenheitConvert.addEventListener("click", showFahrenheitTemperature);

let celsiusConvert = document.querySelector("#celsius");
celsiusConvert.addEventListener("click", showCelsiusTemperature);