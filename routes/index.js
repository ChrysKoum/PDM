const express = require("express");
const router = express.Router();
// Assuming you have a firebase setup file
//const firebase = require("../Firebase/firebaseConfig");

//const { saveContactData } = require("../Firebase/firebaseUtils");

router.get("/", (req, res) => {
  const lang = req.session.lang || "en";
  const translations = require(`../locales/${lang}.json`);
  res.render("home", { translations });
});

router.get("/about-us", (req, res) => {
  res.render("about-us", { lang: req.session.lang || "en" });
});

router.get("/dashboard", async (req, res) => {
  // Fetch data from Firebase
  //let humidityData = await firebase.getHumidityData();
  //let temperatureData = await firebase.getTemperatureData();
  // ... fetch other data
  res.render("dashboard", {
    //humidityData,
    //temperatureData,
    //lang: req.session.lang || "ENG",
    // ... other data
  });
});

router.get("/contact-us", (req, res) => {
  res.render("contact-us", { lang: req.session.lang || "en" });
});

router.post("/contact-us", async (req, res) => {
  await saveContactData(req.body);
  res.redirect("/");
});

router.get("/switch-language/:lang", (req, res) => {
  req.session.lang = req.params.lang;
  res.redirect("back");
});

module.exports = router;
