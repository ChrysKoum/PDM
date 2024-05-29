const express = require("express");
const router = express.Router();
const firebaseUtils = require("../Firebase/firebaseUtils");
const nodemailer = require("nodemailer");

// Function to send email
async function sendEmail(name, email, subject, message) {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  // Setup email data
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}, ${process.env.EMAIL_USER}`, // list of receivers
    subject: subject,
    text: `Dear ${name},\n\nThank you for contacting us. We have received your message.\n\nYour message:\n${message}\n\nSincerely,\nYour Company Name`,
  };

  // Send email
  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
}

router.get("/", (req, res) => {
  const lang = req.session.lang || "en";
  // const translations = require(`../locales/${lang}.json`);
  res.render("home", { lang: req.session.lang || "en", currentPage: "home" });
});

router.get("/about-us", (req, res) => {
  res.render("home", {
    lang: req.session.lang || "en",
    anchor: "about-us",
    currentPage: "about",
  });
});

router.get("/dashboard", async (req, res) => {
  try {
    const sensorData = await firebaseUtils.getSensorData();
    const espSleepMode = await firebaseUtils.getEspSleepModeStatus();

    res.render("dashboard", {
      sensorData,
      espSleepMode,
      currentPage: "project",
    });
  } catch (error) {
    console.error("Failed to fetch sensor data:", error);
    res.status(500).send("Error fetching data");
  }
});

router.get("/contact-us", (req, res) => {
  res.render("contact-us", { currentPage: "contact" });
});

router.post("/contact-us", async (req, res) => {
  // Extract data from the form
  const { name, email, subject, message } = req.body;

  // Send email
  try {
    await sendEmail(name, email, subject, message);
    res.redirect("/"); // Redirect to homepage after successful submission
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

router.get("/:lang", (req, res) => {
  req.session.lang = req.params.lang;
  res.redirect("back");
});

module.exports = router;
