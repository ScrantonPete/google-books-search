const express = require("express");
const PORT = process.env.PORT || 3001;
const logger = require("morgan");
const routes = require("./routes");
const app = express();

// MONGODB
const mongoose = require("mongoose");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

// Connect to the Mongo DB
mongoose.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/googlebooks",
  { useNewUrlParser: true }
);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
