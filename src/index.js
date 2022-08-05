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
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let rightDate = `${day}, ${month} ${date}, ${hour}:${minutes}`;

  let dateElement = document.querySelector(".current-date-element");
  dateElement.innerHTML = rightDate;
}

let displayNow = new Date();
formatDate(displayNow);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col forecast-day">
                            <div class="forecast-day-week">
                                ${formatDay(forecastDay.dt)}
                            </div>
                            <div class="forecast-temperature">
                                <span class="forecast-max-temperature">
                                    ${Math.round(forecastDay.temp.max)}&#176
                                </span>
                                <span class="forecast-min-temperature">
                                    ${Math.round(forecastDay.temp.min)}&#176
                                </span>
                            </div>
                            <div class="forecast-icon">
                                <img id="icon" src="http://openweathermap.org/img/wn/${
                                  forecastDay.weather[0].icon
                                }@2x.png" alt="Icon of forecast weather"></img>
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
  let apiKey = "96eb20764d4adbb57fa516a1544ed0a1";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

// <div class="col forecast-day">
//   <div class="forecast-day-week">
//         ${day}
//   </div>
//   <div class="forecast-temperature">
//     <span class="forecast-max-temperature">
//       26&#176
//     </span>
//     <span class="forecast-min-temperature">
//       20&#176
//     </span>
//   </div>
//   <div class="forecast-icon">
//   d="icon" src="http://openweathermap.org/img/wn/10d@2x.png" alt="Icon of forecast weather"></id=>
//   </div>
// </div>

function displayTemperature(response) {
  let cityName = document.querySelector("#name-city");
  cityName.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemperature);
