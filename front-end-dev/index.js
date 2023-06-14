// Import the username from localStorage
let username = localStorage.getItem('username');

// You can now use this username anywhere in your index.js file. For example:
console.log(`The username is: ${username}`);


let questionNumber = 1
let incorrectAnswers = 0
let dinoPosition = 1
let userPosition = 4
let countdownInterval = null
let countdown = 10
let currentScore = 0


// ELLIOT
const getCurrentScore = async (username) => {
    try {
      const resp = await fetch(`http://localhost:3000/get-score/${username}`);
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
      const resp = await fetch(`http://localhost:3000/add-totalScore/${username}/${score}`, {
        method: "POST"
      });
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
getCurrentScore(username).then(score => {
    currentScore = score; // Update the currentScore variable
    console.log(`The current score is: ${currentScore}`); // Log the current score
  });




// When pages loads run playGame function
window.onload = () => {
    playGame()
}

//Reveals play game button which when clicked starts the quiz
const playGame = () =>{
    document.getElementById('newGameButton').style.display = 'block'
    document.getElementById('newGameButton').addEventListener('click', function() {
        console.log("button pressed")
        document.getElementById('newGameButton').style.display = 'none'
        nextQuestion()})

}



const endGame = () => {
    // Clear countdown interval to stop the timer
    clearInterval(countdownInterval);
    document.getElementById('countdown').innerText = ''

    // Update the status text to indicate the game is over
    document.getElementById('status').innerText = ' The dinosaur caught you. Game over!'

    // Clear the options div so no more answers can be chosen
    document.getElementById('options').innerHTML = ''

    // Hide dino and player
    document.getElementById("player").style.display = 'none'
    document.getElementById("beast").style.display = 'none'

    //change the play game button to New Game
    document.getElementById('newGameButton').innerHTML = 'New Game' 
    // Show new game button
    document.getElementById('newGameButton').style.display = 'block'

    // If user wants to play again.
    document.getElementById('newGameButton').addEventListener('click', function() {
        // Hide new game button.
        
        document.getElementById('newGameButton').style.display = 'none'

        // Reset scores and positions
        questionNumber = 1
        incorrectAnswers = 0
        dinoPosition = 1
        userPosition = 4

        // Reset status
        document.getElementById('status').innerText = 'Pick the right answer!'

        // Show and reset dino and player position
        document.getElementById("player").style.gridColumn = userPosition
        document.getElementById("beast").style.gridColumn = dinoPosition
        document.getElementById("player").style.display = 'block'
        document.getElementById("beast").style.display = 'block'

        // Run game again
        nextQuestion()
    })
}


function nextQuestion() {
    // Clear countdown interval if it's already set
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // //If statement for when there are no more questions left to read
    // if(questionNumber>question.length) {
    //     document.getElementById("beast").style.display = 'none'
    //     document.getElementById('status').innerText = "CONGRATULATIONS! You've survived."

    // }

    // Send a GET request to the server to fetch the next question
    fetch(`http://localhost:3000/next-question?questionNumber=${questionNumber}`)
        .then(response => response.json())
        .then(question => {

            

            // Get a reference to the options div and clear it
            let optionsDiv = document.getElementById('options')
            optionsDiv.innerHTML = ''

            // For each possible answer
            for (let i = 0; i < question.answers.length; i++) {
                // Create a new button element
                let optionButton = document.createElement('button')

                // Set the button's text to the current answer option
                optionButton.innerText = question.answers[i]

               // When an answer is chosen, clear the countdown interval and text
                optionButton.addEventListener('click', () => {
                    clearInterval(countdownInterval)
                    document.getElementById('countdown').innerText = ''
                    checkAnswer(i+1, question.correct_answer)
                })
            

                // Add the button to the options div
                optionsDiv.appendChild(optionButton)
            }

            // Update the question text on the page
            document.getElementById('question').innerText = question.question

            // COUNTDOWN
            // Reset the countdown
            countdown = 10
            document.getElementById('countdown').innerText = countdown + ' seconds remaining.'

            // Begin the countdown
            countdownInterval = setInterval(() => {
                countdown--

                

                // If time runs out they lose a position
                if (userPosition === dinoPosition) {
                    endGame()
                }
                else if (countdown < 0) {
                    clearInterval(countdownInterval)
                    incorrectAnswers++
                    
                    // Move the dinosaur one place to the right. '++' is before 'dinoPosition' so it increments it before returning it
                    document.getElementById("player").style.gridColumn = --userPosition

                    
                    // Update the status text to indicate an incorrect answer
                    document.getElementById('status').innerText = 'You ran out of time. New question!'

                    // ELLIOT Decremenet user score on locally and on server
                    currentScore--
                    updateScore(username, currentScore)
                    
                    // Go to the next question
                    questionNumber++
                    console.log(questionNumber)
                    nextQuestion()

                }else {
                    // Otherwise, update the countdown with the remaining time
                    document.getElementById('countdown').innerText = countdown + ' seconds remaining.'
                }
            }, 1000)

        })
        // If there's an error, log it to the console
        .catch(error => console.error('Error:', error))
}



// Function to check if the chosen answer is correct
function checkAnswer(index, correctAnswerIndex) {
    // If the chosen answer is correct
    if (index === correctAnswerIndex) {
        
        // Update the status text to indicate a correct answer
        document.getElementById('status').innerText = 'Correct! You moved away from the dinosaur.'

        // Increment the question number and fetch the next question by running nextQuestion again
        questionNumber++


        // ELLIOT Increment user score and on server too
        currentScore++
        updateScore(username, currentScore)

        // Make sure userPosition won't exceed 8 on the grid. If not move the user one place to the right. '++' is before 'userPosition' so it increments it before returning it.
        document.getElementById("player").style.gridColumn = userPosition < 8 ? ++userPosition : userPosition

        nextQuestion()
    } else {
        
        // If the chosen answer is incorrect
        // Increment the incorrect answers counter
        incorrectAnswers++

        // ELLIOT Decremenet user score on locally and on server
        currentScore--
        updateScore(username, currentScore)

        // Move the dinosaur one place to the right. '++' is before 'dinoPosition' so it increments it before returning it
        document.getElementById("player").style.gridColumn = --userPosition


        // Update the status text to indicate an incorrect answer
        document.getElementById('status').innerText = 'Incorrect! The dinosaur is getting closer!'

        // If the user gets eaten
        if (userPosition === dinoPosition) {
            endGame()
        } else {
            // Restart the timer for a new question if the game is not over
            nextQuestion()
        }
    }
}


function openModal() {
    document.getElementById("myModal").style.display = "block";
    displayMessage();
  }
  
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
//   displayMessage() function is called when the popup is opened ()
  function displayMessage() {
    const messageTextarea = document.getElementById("messageTextarea");
    messageTextarea.value = "Players must stay ahead of the beasts by answering a series of questions where each correct response allows our explorers to make one step towards safety. Sounds easy enough right? Well try answering a series of multiple choice questions with 10ton Dinosaur chasing you down! If our explorers answer too many incorrect questions then the Dinosaurs will get to enjoy an early Dinner. 1) Enter username and Submit, 2) Answer questions correctly to ensure you stay alive, 3) Check leaderboard to see your score";
  }
 
