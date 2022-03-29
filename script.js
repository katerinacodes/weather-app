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
function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let celciusDegrees = document.querySelector(".degrees");
  celciusDegrees.innerHTML = `${temperature}`;
}
function typeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${cityInput.value}`;
  let units = "metric";
  let apiKey = "77ae0cb67cde28551602feb9f0ea333b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", typeCity);

function positionWeather(current) {
  let temperature = Math.round(current.data.main.temp);
  let celciusDegrees = document.querySelector(".degrees");
  celciusDegrees.innerHTML = `${temperature}`;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = current.data.name;
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
