const cors = require("cors");
const express = require("express");
const app = express();



// const logger = require("./logger");
// app.use(logger);

app.use(cors());
app.use(express.json());

const questions = require("./questions.json")

console.log(questions)





























module.exports = app;
