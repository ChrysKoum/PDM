// Select the navbar element
const navbar = document.querySelector("#nav");

navbar.classList.remove("fixed-top");
navbar.classList.add("fixed-dashboard");

//  Firebase Update Data//

// Function to update the dashboard with the latest sensor data
function updateDashboard(sensorData) {
  // Assuming sensorData is an object with keys: humidity, temperatureOut, moisture, temperatureIn
  const data_humidity = sensorData.EnvironmentHumidity;
  const data_temperatureOut = sensorData.EnvironmentTemperature;
  const data_moisture = sensorData.SoilMoisture;
  const data_temperatureIn = sensorData.SoilTemperature;

  // Update progress circles
  $(".first.circle")
    .circleProgress({
      startAngle: 90,
      size: 180,
      value: data_humidity / 100,
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
      value: data_temperatureOut / 100,
      fill: { gradient: ["	#016544", "	#53f3bd"] },
    })
    .on("circle-animation-progress", function (event, progress) {
      $(this)
        .find("strong")
        .html(Math.round(data_temperatureOut * progress) + "<sup>o</sup>");
    });

  $(".third.circle")
    .circleProgress({
      startAngle: 90,
      size: 180,
      value: data_moisture / 100,
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
      value: data_temperatureIn / 100,
      fill: { gradient: ["	#016544", "	#53f3bd"] },
    })
    .on("circle-animation-progress", function (event, progress) {
      $(this)
        .find("strong")
        .html(Math.round(data_temperatureIn * progress) + "<sup>o</sup>");
    });
}

// Function to update the system's active status
function updateSystemStatus(isActive) {
  const imageWrapper = document.querySelector(".overlay-image");
  const imagePath = isActive
    ? "assets/icons/flash_active.png"
    : "assets/icons/flash_sleep.png";

  // Update the src attribute with the new imagePath
  imageWrapper.setAttribute("src", imagePath);
}

document.addEventListener("DOMContentLoaded", function () {
  // Assuming sensorData and espSleepMode are available as global variables

  // Update the dashboard UI with sensor data
  updateDashboard(sensorData);
  console.log(espSleepMode);
  // Update the system active status
  updateSystemStatus(espSleepMode);
});

// // Cycles progress //

// var data_humidity = 80;
// var data_tempatureOut = 35;
// var data_moisture = 70;
// var data_tempatureIn = 25;

// // Calculate the value for the circle progress based on data
// var circleValue_humidity = (data_humidity * 0.85) / 100;
// var circleValue_tempatureOut = (data_tempatureOut * 0.85) / 100;
// var circleValue_moisture = (data_moisture * 0.85) / 100;
// var circleValue_tempatureIn = (data_tempatureIn * 0.85) / 100;

// $(".first.circle")
//   .circleProgress({
//     startAngle: 90,
//     size: 180,
//     value: circleValue_humidity,
//     fill: { gradient: ["	#016544", "	#53f3bd"] },
//   })
//   .on("circle-animation-progress", function (event, progress) {
//     $(this)
//       .find("strong")
//       .html(Math.round(data_humidity * progress) + "%");
//   });

// $(".second.circle")
//   .circleProgress({
//     startAngle: 90,
//     size: 180,
//     value: circleValue_tempatureOut,
//     fill: { gradient: ["	#016544", "	#53f3bd"] },
//   })
//   .on("circle-animation-progress", function (event, progress) {
//     $(this)
//       .find("strong")
//       .html(Math.round(data_tempatureOut * progress) + "<sup>o</sup>");
//   });

// $(".third.circle")
//   .circleProgress({
//     startAngle: 90,
//     size: 180,
//     value: circleValue_moisture,
//     fill: { gradient: ["	#016544", "	#53f3bd"] },
//   })
//   .on("circle-animation-progress", function (event, progress) {
//     $(this)
//       .find("strong")
//       .html(Math.round(data_moisture * progress) + "%");
//   });

// $(".fourth.circle")
//   .circleProgress({
//     startAngle: 90,
//     size: 180,
//     value: circleValue_tempatureIn,
//     fill: { gradient: ["	#016544", "	#53f3bd"] },
//   })
//   .on("circle-animation-progress", function (event, progress) {
//     $(this)
//       .find("strong")
//       .html(Math.round(data_tempatureIn * progress) + "<sup>o</sup>");
//   });
