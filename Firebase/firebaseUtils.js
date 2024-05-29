// firebaseUtils.js with Firebase v9+ modular syntax

const { db, ref, get } = require("./firebaseConfig");

const getSensorData = async () => {
  const snapshot = await get(ref(db, "Measurements"));
  return snapshot.val();
};

const getEspSleepModeStatus = async () => {
  const snapshot = await get(ref(db, "ESP_Sleep_Mode"));
  return snapshot.val();
};

module.exports = {
  getSensorData,
  getEspSleepModeStatus,
};
