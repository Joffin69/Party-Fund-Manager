const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require('./routes/user');
const transacRoutes = require('./routes/transactions');

const app = express();

mongoose
  .connect(
    "mongodb+srv://jjohn12:nkztnP1HNk8Yde89@cluster0-dnghy.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true,  useNewUrlParser: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use('/api/user',userRoutes);
app.use('/api/trans',transacRoutes);

module.exports = app;
