const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const session = require("express-session"); // This is for managing language preference
const ejsMate = require("ejs-mate");
require("dotenv").config();

const app = express();

// Setting the view engine to EJS
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

// Secret
const secret = process.env.SECRET || "thisshouldbeabettersecret";

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: secret, // Change this to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 minute just for example. Adjust as needed.
  })
);

// Use our routes from routes/index.js
app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
