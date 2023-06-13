let questionNumber = 1
let incorrectAnswers = 0
let dinoPosition = 1
let userPosition = 4

// When pages loads run nextQuestion function
window.onload = () => {
    nextQuestion()
}



// Function to fetch and display the next question
function nextQuestion() {
    // Send a GET request to the server to fetch the next question
    fetch(`http://localhost:3000/next-question?questionNumber=${questionNumber}`)
        .then(response => response.json())
        .then(question => {
            
            // Update the question text on the page
            document.getElementById('question').innerText = question.question
            
            // Get a reference to the options div and clear it
            let optionsDiv = document.getElementById('options')
            optionsDiv.innerHTML = ''

            // For each possible answer
            for (let i = 0; i < question.answers.length; i++) {
                // Create a new button element
                let optionButton = document.createElement('button')

                // Set the button's text to the current answer option
                optionButton.innerText = question.answers[i]

                // Add a click event listener to the button that checks if the chosen answer is correct
                optionButton.addEventListener('click', () => checkAnswer(i+1, question.correct_answer))

                // Add the button to the options div
                optionsDiv.appendChild(optionButton)
            }
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

        // Increment the question number and fetch the next question bu running nextQuestion again
        questionNumber++

        // Make sure userPosition won't exceed 8 on the grid. If not move the user one place to the right. '++' is before 'userPosition' so it increments it before returning it.
        document.getElementById("player").style.gridColumn = userPosition < 8 ? ++userPosition : userPosition


        nextQuestion()
    } else {
        // If the chosen answer is incorrect
        // Increment the incorrect answers counter
        incorrectAnswers++

        // Move the user one place to the left. '--' is before 'userPosition' so it decrements it before returning it
        document.getElementById("player").style.gridColumn = --userPosition

        // Update the status text to indicate an incorrect answer
        document.getElementById('status').innerText = 'Incorrect! The dinosaur is getting closer!'

        // If the user gets eaten
        if (userPosition === dinoPosition) {
            // Update the status text to indicate the game is over
            document.getElementById('status').innerText = ' The dinosaur caught you. Game over!'

            // Clear the options div so no more answers can be chosen
            document.getElementById('options').innerHTML = ''

            // Hide dino and player
            document.getElementById("player").style.display = 'none'
            document.getElementById("beast").style.display = 'none'

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
}
}
