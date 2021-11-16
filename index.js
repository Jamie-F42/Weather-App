
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

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperatureDegrees").innerHTML = `${temperature}°C`;
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
}


function search(event) {
  let apiKey = "2b8193e1fb0166e722b7330ca6c589b4";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

function showFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  celsiusConvert.classList.remove("active");
  fahrenheitConvert.classList.add("active");
  temperatureDegrees.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}
function showCelsiusTemperature(event){
  event.preventDefault();
  celsiusConvert.classList.add("active");
  fahrenheitConvert.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureDegrees.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsiusTemperature = null;

let fahrenheitConvert = document.querySelector("#fahrenheit");
fahrenheitConvert.addEventListener("click", showFahrenheitTemperature);

let celsiusConvert = document.querySelector("#celsius");
celsiusConvert.addEventListener("click", showCelsiusTemperature);