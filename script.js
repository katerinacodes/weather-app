let now = new Date();

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
let hours = now.getHours();
let minutes = now.getMinutes();
let currentdate = document.querySelector("#current-date-time");
if (hours < 10) {
  currentdate.innerHTML = `${day} 0${hours}:${minutes}`;
}
if (minutes < 10) {
  currentdate.innerHTML = `${day} ${hours}:0${minutes}`;
} else {
  currentdate.innerHTML = `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector(".nextHoursForecast");
  let hourlyForecastHTML = `<div class="row">`;
  hourlyForecastHTML =
    hourlyForecastHTML +
    ` <div class="col-1">
              next2h <br /><img src="images/snowy-2.svg" /> <br />
              -7°C
            </div>
          `;
  hourlyForecastHTML =
    hourlyForecastHTML +
    `
            <div class="col-1">
              next2h <br /><img src="images/snowy-2.svg" /> <br />
              -7°C
            </div>
        `;
  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  forecastElement.innerHTML = hourlyForecastHTML;
}
function displayWeather(response) {
  temperatureCelcius = response.data.main.temp;
  let celciusDegrees = document.querySelector(".degrees");
  celciusDegrees.innerHTML = Math.round(temperatureCelcius);
  let cityElement = document.querySelector("h2");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("h3");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#currentWeatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  console.log(response.data);
}
function typeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = `${cityInput.value}`;

  let units = "metric";
  let apiKey = "77ae0cb67cde28551602feb9f0ea333b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", typeCity);

function positionWeather(current) {
  temperatureCelcius = Math.round(current.data.main.temp);
  let celciusDegrees = document.querySelector(".degrees");
  celciusDegrees.innerHTML = `${temperatureCelcius}`;
  let currentCity = document.querySelector("h2");
  currentCity.innerHTML = current.data.name;
  let descriptionElement = document.querySelector("h3");
  descriptionElement.innerHTML = current.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = current.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(current.data.wind.speed);
  let iconElement = document.querySelector("#currentWeatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${current.data.weather[0].icon}@2x.png`
  );
}

function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "77ae0cb67cde28551602feb9f0ea333b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(positionWeather);
}
let button = document.querySelector(`#location`);
button.addEventListener("click", handlePosition);

let apiKey = "77ae0cb67cde28551602feb9f0ea333b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);

function displayFarenheitTemperature(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemperature = (temperatureCelcius * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = Math.round(temperatureCelcius);
}
displayForecast();
let temperatureCelcius = null;
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);
