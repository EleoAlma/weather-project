let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city?");
city = city.toLowerCase();
city = city.trim();

if (weather[city] !== undefined) {
  let humidity = weather[city].humidity;
  let tempCelsius = weather[city].temp;
  let tempFahrenheit = (weather[city].temp * 9) / 5 + 32;
  alert(
    `It is currently ${Math.round(tempCelsius)}°C (${Math.round(
      tempFahrenheit
    )}°F) in ${`${city.charAt(0).toUpperCase()}${city.slice(
      1
    )}`} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=${city}`
  );
}
