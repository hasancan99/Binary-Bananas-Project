// Import the username from localStorage
let username = localStorage.getItem("username");

// You can now use this username anywhere in your index.js file. For example:
console.log(`The username is: ${username}`);

let questionNumber = 1;
let incorrectAnswers = 0;
let dinoPosition = 2;
let userPosition = 4;
let countdownInterval = null;
let countdown = 10;
let currentScore = 0;

// ELLIOT
const getCurrentScore = async (username) => {
  try {
    const resp = await fetch(`https://thedinochase.onrender.com/get-score/${username}`);
    if (resp.ok) {
      const data = await resp.json();
      return data; // Return the score
    } else {
      throw "Error: http status code = " + resp.status;
    }
  } catch (err) {
    console.log(err);
  }
};

// ELLIOT
const updateScore = async (username, score) => {
  try {
    const resp = await fetch(
      `https://thedinochase.onrender.com/add-totalScore/${username}/${score}`,
      {
        method: "POST",
      }
    );
    if (resp.ok) {
      console.log(`Score updated: ${score}`);
    } else {
      throw "Error: http status code = " + resp.status;
    }
  } catch (err) {
    console.log(err);
  }
};

// Use the getCurrentScore function
getCurrentScore(username).then((score) => {
  currentScore = score; // Update the currentScore variable
  console.log(`The current score is: ${currentScore}`); // Log the current score
});

// When pages loads run nextQuestion function
window.onload = () => {
  nextQuestion();
};

const endGame = () => {
  // Clear countdown interval to stop the timer
  clearInterval(countdownInterval);
  document.getElementById("countdown").innerText = "";

  // Update the status text to indicate the game is over
  document.getElementById("status").innerText =
    " The dinosaur caught you. Game over!";

  // Clear the options div so no more answers can be chosen
  document.getElementById("options").innerHTML = "";

  // Hide dino and player
  document.getElementById("player").style.display = "none";
  document.getElementById("beast").style.display = "none";

  // Show new game button
  document.getElementById("newGameButton").style.display = "block";
  endGameButton();
};

document.getElementById("username").innerText = `Hi ${username}!`;

function nextQuestion() {
  // Clear countdown interval if it's already set
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  // Send a GET request to the server to fetch the next question
  fetch(`https://thedinochase.onrender.com/next-question?questionNumber=${questionNumber}`)
    .then((response) => response.json())
    .then((question) => {
      console.log(question);
      // Get a reference to the options div and clear it
      let optionsDiv = document.getElementById("options");
      optionsDiv.innerHTML = "";

      // For each possible answer
      for (let i = 0; i < question.answers.length; i++) {
        // Create a new button element
        let optionButton = document.createElement("questionbutton");

        // Set the button's text to the current answer option
        optionButton.innerText = question.answers[i];

        // When an answer is chosen, clear the countdown interval and text
        optionButton.addEventListener("click", () => {
          clearInterval(countdownInterval);
          document.getElementById("countdown").innerText = "";
          checkAnswer(i + 1, question.correct_answer);
        });

        // Add the button to the options div
        optionsDiv.appendChild(optionButton);
      }

      // Update the question text on the page
      document.getElementById("question").innerText = question.question;

      // COUNTDOWN
      // Reset the countdown
      countdown = 10;
      document.getElementById("countdown").innerText =
        countdown + " seconds remaining.";

      // Begin the countdown
      countdownInterval = setInterval(() => {
        countdown--;

        // If time runs out they lose a position
        if (userPosition === dinoPosition) {
          endGame();
        } else if (countdown < 0) {
          clearInterval(countdownInterval);
          incorrectAnswers++;

          // Move the dinosaur one place to the right. '++' is before 'dinoPosition' so it increments it before returning it
          document.getElementById("player").style.gridColumn = --userPosition;

          // Update the status text to indicate an incorrect answer
          document.getElementById("status").innerText =
            "You ran out of time. New question!";

          // ELLIOT Decrement user score on locally and on server
          currentScore--;
          //updateScore(username, currentScore);
          document.getElementById(
            "score"
          ).innerText = `Total score: ${currentScore}`;

          // Go to the next question
          questionNumber++;
          nextQuestion();
        } else {
          // Otherwise, update the countdown with the remaining time
          document.getElementById("countdown").innerText =
            countdown + " seconds remaining.";
        }
      }, 1000);

      // When the first question is answered, display the score
      if (questionNumber === 2) {
        document.getElementById(
          "score"
        ).innerText = `Total score: ${currentScore}`;
      }
    })
    // If there's no more questions left
    .catch((error) => {
      endGameButton("won");
    });
}

// Function to check if the chosen answer is correct
function checkAnswer(index, correctAnswerIndex) {
  if (index === correctAnswerIndex) {
    document.getElementById("status").innerText =
      "Correct! You moved away from the dinosaur.";
    questionNumber++;
    currentScore++;
    document.getElementById("score").innerText = `Total score: ${currentScore}`;
    document.getElementById("player").style.gridColumn =
      userPosition < 8 ? ++userPosition : userPosition;
    nextQuestion();
  } else {
    incorrectAnswers++;
    currentScore--;
    document.getElementById("score").innerText = `Total score: ${currentScore}`;
    document.getElementById("player").style.gridColumn = --userPosition;
    document.getElementById("status").innerText =
      "Incorrect! The dinosaur is getting closer!";
    if (userPosition === dinoPosition) {
      document.getElementById("question").innerText = "";
      endGame();
    } else {
      nextQuestion();
    }
  }
}



//function for when the games finished, and we want to display view results button
const endGameButton = (result = "lost") => {
  // Clear the game div completely
  const game = document.querySelector("#game");
  game.remove();

  // Create a new game div and style it
  const newGameDiv = document.createElement("div");
  newGameDiv.id = "game";
  newGameDiv.style.textAlign = "center";

  // append new button, plus text and gif corresponding to if user won or lost
  const body = document.querySelector("body");
  body.appendChild(newGameDiv);

  const h3Element = document.createElement("h3");

  newGameDiv.appendChild(h3Element);

  const endButton = document.createElement("button");
  endButton.textContent = "Save Your Score";
  endButton.addEventListener("click", function () {
    updateScore(username, currentScore);
    window.location.href = "leaderboard.html";
  });

  const h5Element = document.createElement("h5");
  h5Element.textContent =
    "If you save you'll also get to see the leaderboard :)";

  if (result === "won") {
    h3Element.textContent = "Well done! You managed to escape the dinosaur.";
    const iframeDiv = document.createElement("div");

    const iframeElement = document.createElement("iframe");
    iframeElement.src = "./img/won.gif";
    iframeElement.width = "480";
    iframeElement.height = "318";
    iframeElement.frameBorder = "0";
    iframeElement.className = "giphy-embed";
    iframeElement.allowFullscreen = true;

    const iframeLink = document.createElement("p");
    iframeDiv.appendChild(iframeElement);
    iframeDiv.appendChild(iframeLink);

    newGameDiv.appendChild(iframeDiv);
  } else {
    h3Element.textContent = "Bad luck you've been eaten!";
    //adding the gif for eaten beast
    const iframeDiv = document.createElement("div");

    const iframeElement = document.createElement("iframe");
    iframeElement.src = "./img/eaten.gif";
    iframeElement.width = "480";
    iframeElement.height = "270";
    iframeElement.frameBorder = "0";
    iframeElement.className = "giphy-embed";
    iframeElement.allowFullscreen = true;

    const iframeLink = document.createElement("p");

    iframeDiv.appendChild(iframeElement);
    iframeDiv.appendChild(iframeLink);

    newGameDiv.appendChild(iframeDiv);
  }
  newGameDiv.appendChild(endButton);
  newGameDiv.appendChild(h5Element);
};

// Event listener for the "newGameButton" element
document.getElementById("newGameButton").addEventListener("click", function () {
  // Hide new game button
  document.getElementById("newGameButton").style.display = "none";

  // Reset scores and positions
  questionNumber = 1;
  incorrectAnswers = 0;
  dinoPosition = 2;
  userPosition = 4;

  // Reset status
  document.getElementById("status").innerText = "Pick the right answer!";

  // Show and reset dino and player position
  document.getElementById("player").style.gridColumn = userPosition;
  document.getElementById("beast").style.gridColumn = dinoPosition;
  document.getElementById("player").style.display = "block";
  document.getElementById("beast").style.display = "block";

  // Run game again
  nextQuestion();
});
