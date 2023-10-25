const db = require("./firebaseConfig");

async function getHumidityData() {
  let snapshot = await db.ref("house/humidity").once("value");
  return snapshot.val();
}

async function getTemperatureData() {
  let snapshot = await db.ref("house/temperature").once("value");
  return snapshot.val();
}

// ... Add other utility functions for fetching data

module.exports = {
  getHumidityData,
  getTemperatureData,
  // ... other exports
};

async function saveContactData(data) {
  await db.ref("contacts").push(data);
}

// Add to module exports
module.exports.saveContactData = saveContactData;
