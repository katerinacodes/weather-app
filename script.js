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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".nextDaysForecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )} </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )} °C</span>
         </span>
        </div>
      </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "77ae0cb67cde28551602feb9f0ea333b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  let sunrise = response.data.sys.sunrise;
  let sunset = response.data.sys.sunset;
  let time = new Date(sunset * 1000);
  let date = new Date(sunrise * 1000);
  let hoursSunset = time.getHours();
  let minutesSunset = time.getMinutes();
  let hoursSunrise = date.getHours();
  let minutesSunrise = date.getMinutes();
  let sunriseElement = document.querySelector(".sunrise");
  sunriseElement.innerHTML = `${hoursSunrise}:${minutesSunrise}`;
  if (hoursSunrise < 10) {
    sunriseElement.innerHTML = `0${hoursSunrise}:${minutesSunrise}`;
  }
  if (minutesSunrise < 10) {
    sunriseElement.innerHTML = `${hoursSunrise}:0${minutesSunrise}`;
  }
  let sunsetElement = document.querySelector(".sunset");
  sunsetElement.innerHTML = `${hoursSunset}:${minutesSunset}`;
  if (hoursSunset < 10) {
    sunsetElement.innerHTML = `0${hoursSunset}:${minutesSunset}`;
  }
  if (minutesSunset < 10) {
    sunsetElement.innerHTML = `${hoursSunset}:0${minutesSunset}`;
  }
  let iconElement = document.querySelector("#currentWeatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  console.log(response.data);
  getForecast(response.data.coord);
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
  let sunrise = current.data.sys.sunrise;
  let sunset = current.data.sys.sunset;
  let time = new Date(sunset * 1000);
  let date = new Date(sunrise * 1000);
  let hoursSunset = time.getHours();
  let minutesSunset = time.getMinutes();
  let hoursSunrise = date.getHours();
  let minutesSunrise = date.getMinutes();
  let sunriseElement = document.querySelector(".sunrise");
  sunriseElement.innerHTML = `${hoursSunrise}:${minutesSunrise}`;
  if (hoursSunrise < 10) {
    sunriseElement.innerHTML = `0${hoursSunrise}:${minutesSunrise}`;
  }
  if (minutesSunrise < 10) {
    sunriseElement.innerHTML = `${hoursSunrise}:0${minutesSunrise}`;
  }
  let sunsetElement = document.querySelector(".sunset");
  sunsetElement.innerHTML = `${hoursSunset}:${minutesSunset}`;
  if (hoursSunset < 10) {
    sunsetElement.innerHTML = `0${hoursSunset}:${minutesSunset}`;
  }
  if (minutesSunset < 10) {
    sunsetElement.innerHTML = `${hoursSunset}:0${minutesSunset}`;
  }
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

displayForecast();
