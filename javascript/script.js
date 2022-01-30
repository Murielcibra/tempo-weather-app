let now = new Date();
let currentDate = document.querySelector("#current-date");
let time = document.querySelector("#current-time");
let date = now.getDate();
let hours = now.getHours();
let hoursIn12HrFormat = hours >= 13 ? hours % 12 : hours;
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let year = now.getFullYear();
let ampm = hours > 12 ? "PM" : "AM";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
currentDate.innerHTML = `${day}, ${date} ${month} ${year}`;
time.innerHTML = `Updated as of ${hoursIn12HrFormat}: ${minute} <span id="am-pm">${ampm}</span>`;

let apiKey = "f6f001d26151b94d121b17eb30bad8c0";
let searchForm = document.querySelector("#go-form");
searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let cityLabel = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityLabel.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".temperature-current");
  let description = document.querySelector("#description-temp");
  let humidity = document.querySelector("#humidity");
  currentTemp.innerHTML = `${temperature}&#176;C`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
}
function showWeather(response) {
  let temperature2 = Math.round(response.data.main.temp);
  let cityLabel2 = document.querySelector("#city");
  let currentTemp2 = document.querySelector(".temperature-current");
  cityLabel2.innerHTML = `${response.data.name}`;
  currentTemp2.innerHTML = `${temperature2}&#176;C`;
}
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let iN = document.querySelector("#location");
  iN.innerHTML = `Latitude is ${lat}
  Longitude is ${lon}`;
  let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlPosition).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let positionSubmit = document.querySelector("#current-position");
positionSubmit.addEventListener("click", getCurrentPosition);
