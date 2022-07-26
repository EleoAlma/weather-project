// Feature #1

function formatDate(currentDate) {
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
  let month = months[currentDate.getMonth()];
  console.log(month);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  console.log(day);

  let date = currentDate.getDate();
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  let rightDate = `${day}, ${month} ${date}, ${hour}:${minutes}`;

  let dateElement = document.querySelector(".current-date-element");
  dateElement.innerHTML = rightDate;
}

let displayNow = new Date();
formatDate(displayNow);

// Bonus Feature week 4

// function temperatureFah(event) {
//   event.preventDefault();

//   let tempCel = document.querySelector("#temperature");
//   let currentTemp = tempCel.innerHTML;
//   let tempFah = Math.round(currentTemp * 1.8 + 32);
//   tempCel.innerHTML = tempFah;
// }

// function temperatureCel(event) {
//   event.preventDefault();

//   let tempCel = document.querySelector("#temperature");
//   let currentTemp = 21;
//   tempCel.innerHTML = currentTemp;
// }

// let tempFah = document.querySelector("#fahrenheit");
// tempFah.addEventListener("click", temperatureFah);
// let tempCel = document.querySelector("#celsius");
// tempCel.addEventListener("clic k", temperatureCel);

// Search Engine

function displayTemperature(response) {
  let cityName = document.querySelector("#name-city");
  cityName.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "96eb20764d4adbb57fa516a1544ed0a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function enterLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

function displayPosition(position) {
  let apiKey = "96eb20764d4adbb57fa516a1544ed0a1";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function geolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let form = document.querySelector("#form-input");
form.addEventListener("submit", enterLocation);

let activedLocation = document.querySelector("#button-location");
activedLocation.addEventListener("click", geolocation);

searchCity("London");
