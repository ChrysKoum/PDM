// NAVBAR //

// Select the navbar element
const navbar = document.querySelector("#nav");

// Add an event listener to the window object to listen for scroll events
window.addEventListener("scroll", function () {
  // Check if the user has scrolled past the navbar
  if (window.scrollY >= navbar.offsetHeight) {
    // If they have, add a class to the navbar to change its background color
    navbar.classList.add("scrolled");
    // Change the color of the list items to white
    const links = document.querySelectorAll(".navbar-nav a");
    links.forEach((link) => {
      link.style.color = "#fff";
    });
  } else {
    // Otherwise, remove the class to revert the navbar's background color
    navbar.classList.remove("scrolled");
    // Revert the color of the list items to their original color
    const links = document.querySelectorAll(".navbar-nav a");
    links.forEach((link) => {
      link.style.color = "";
    });
  }
});

// Cycles progress //

var data_humidity = 80;
var data_tempatureOut = 35;
var data_moisture = 70;
var data_tempatureIn = 25;

// Calculate the value for the circle progress based on data
var circleValue_humidity = (data_humidity * 0.85) / 100;
var circleValue_tempatureOut = (data_tempatureOut * 0.85) / 100;
var circleValue_moisture = (data_moisture * 0.85) / 100;
var circleValue_tempatureIn = (data_tempatureIn * 0.85) / 100;

$(".first.circle")
  .circleProgress({
    startAngle: 90,
    size: 180,
    value: circleValue_humidity,
    fill: { gradient: ["	#016544", "	#53f3bd"] },
  })
  .on("circle-animation-progress", function (event, progress) {
    $(this)
      .find("strong")
      .html(Math.round(data_humidity * progress) + "%");
  });

$(".second.circle")
  .circleProgress({
    startAngle: 90,
    size: 180,
    value: circleValue_tempatureOut,
    fill: { gradient: ["	#016544", "	#53f3bd"] },
  })
  .on("circle-animation-progress", function (event, progress) {
    $(this)
      .find("strong")
      .html(Math.round(data_tempatureOut * progress) + "<sup>o</sup>");
  });

$(".third.circle")
  .circleProgress({
    startAngle: 90,
    size: 180,
    value: circleValue_moisture,
    fill: { gradient: ["	#016544", "	#53f3bd"] },
  })
  .on("circle-animation-progress", function (event, progress) {
    $(this)
      .find("strong")
      .html(Math.round(data_moisture * progress) + "%");
  });

$(".fourth.circle")
  .circleProgress({
    startAngle: 90,
    size: 180,
    value: circleValue_tempatureIn,
    fill: { gradient: ["	#016544", "	#53f3bd"] },
  })
  .on("circle-animation-progress", function (event, progress) {
    $(this)
      .find("strong")
      .html(Math.round(data_tempatureIn * progress) + "<sup>o</sup>");
  });

// Getting the Current Tempature //
$(document).ready(function () {
  // Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key from OpenWeatherMap
  const apiKey = "f32769cb412055395c07bcd8bfe80f8b";
  const city = "Limassol, CY"; // Replace with the city name you want to fetch weather for

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
            $("#temperature").html(temperature + "<sup>o</sup>");
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

/* Is the system active*/
// Assuming you have fetched the value of data.active from the database
var isActive = true; // Set this to true or false based on the data.active value

// Get the image wrapper element
var imageWrapper = document.querySelector(".image-wrapper");

// Update the class based on the isActive value
if (isActive) {
  imageWrapper.classList.add("active");
} else {
  imageWrapper.classList.remove("active");
}
