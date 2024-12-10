// Getting the Current Temperature //
$(function () {
  // Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key from OpenWeatherMap
  const apiKey = "f32769cb412055395c07bcd8bfe80f8b";
  const city = "Thessaloniki, GR"; // Replace with the city name you want to fetch weather for

  // Function to fetch weather data from OpenWeatherMap API and update the temperature in the heading
  function fetchWeatherData() {
    // First, get the latitude and longitude of the city
    $.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
      function (data) {
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        // Now make another API call using the latitude and longitude to get the weather data
        $.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
          function (weatherData) {
            const temperature = weatherData.main.temp;

            // Update the heading content with the fetched temperature
            $("#temperature").html(temperature + "<sup>o</sup>C");
          }
        ).fail(function () {
          // If the second API request fails, display an error message
          $("#temperature").html("Error fetching weather");
        });
      }
    ).fail(function () {
      // If the first API request fails, display an error message
      $("#temperature").html("Error fetching city data");
    });
  }

  // Call the fetchWeatherData function initially to load the weather
  fetchWeatherData();
});
