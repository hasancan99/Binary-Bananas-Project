const fs = require("fs"); //

const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const questionsData = require("./questions.json");
const questions = questionsData.questions;
const leaderboard = require("./people.json");
const points = require("./people.json"); // ELLIOT

// Define a new GET route for "/next-question"
app.get("/next-question", (req, res) => {
  // Try to retrieve the "questionNumber" parameter from the request query.
  // If it doesn't exist, default to 0.
  const questionNumber = req.query.questionNumber
    ? parseInt(req.query.questionNumber)
    : 0;

  // Use the .find() to get the first question that matches the given question number.
  const question = questions.find((q) => q.number === questionNumber);

  // If we found a matching question
  if (question) {
    // Respond to the request with the found question in JSON format.
    res.json(question);
  } else {
    // If there was no matching question (i.e., we've exhausted all questions),
    // respond with a 404 status and an error message.
    res.status(404).json({ error: "No more questions available." });
  }
});

//List scores of players in descending order.
app.get("/leaderboard", (req, res) => {
  res.send(leaderboard.sort((a, b) => b.totalScore - a.totalScore));
});

// Posting usernames to leaderboard.
app.post("/add-user/:user", (req, res) => {
  //check whether a username has been entered
  const userName = req.params.user;
  if (!userName) {
    return res.status(400).json({ error: "Please enter a username" });
  }
  //look for that username in the json file, if it already exists return an error
  const checkUser = leaderboard.find(
    (element) => element.username === userName
  );
  if (checkUser) {
    return res.status(409).json({ error: "Username already in use" });
  }

  //if its a new user, push the new user to leaderboard and write it to the json file
  const userData = { username: userName, totalScore: 0 };
  leaderboard.push(userData);
  fs.writeFileSync("./people.json", JSON.stringify(leaderboard), "utf8");

  //send a success message
  res.status(200).json({ success: "Username added" });
});

// Adds totalscore
app.post("/add-totalScore/:user/:score", (req, res) => {
  const totalScore = req.params.score;
  const user = req.params.user;
  //check whether a username and score has been entered
  if (!user) {
    return res.status(400).json({ error: "Please enter a username" });
  }
  if (!totalScore) {
    return res.status(400).json({ error: "Score not found" });
  }
  //find the user in the leaderboard and the find it's index in the json file
  const checkUser = leaderboard.find((element) => element["username"] === user);
  const checkUserIndex = leaderboard.findIndex(
    (element) => element.username === user
  );
  //if user isnt in the leaderboard - return error
  if (!checkUser) {
    return res.status(404).json({ error: "User not found" });
  }
  //update the users score- and then write to the json file
  leaderboard[checkUserIndex]["totalScore"] = totalScore;
  fs.writeFile("./people.json", JSON.stringify(leaderboard), "utf8");
  res.status(200).json({ success: `Score updated: ${totalScore}` });
});

// New endpoint to check if a username exists
app.get("/usernames", (req, res) => {
  const usernames = leaderboard.map((user) => user.username);
  res.json(usernames);
});




// CHECKSCORE ELLIOT
app.get("/get-score/:user", (req, res) => {
  const user = req.params.user;

  // Find the user in the leaderboard
  const findUser = leaderboard.find((element) => element.username === user);

  // If the user isn't in the leaderboard, return an error
  if (!findUser) {
    return res.status(404).json({ error: "User not found" });
  }

  // If the user is found, return their score
  res.status(200).json(findUser.totalScore);
});


module.exports = app;
