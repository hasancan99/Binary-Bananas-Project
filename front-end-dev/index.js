let questionNumber = 1
let incorrectAnswers = 0

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
        nextQuestion()
    } else {
        // If the chosen answer is incorrect
        // Increment the incorrect answers counter
        incorrectAnswers++

        // Update the status text to indicate an incorrect answer
        document.getElementById('status').innerText = 'Incorrect! The dinosaur is getting closer!'

        // If there have been 3 incorrect answers
        if (incorrectAnswers >= 3) {
            // Update the status text to indicate the game is over
            document.getElementById('status').innerText += ' The dinosaur caught you. Game over!'

            // Clear the options div so no more answers can be chosen
            document.getElementById('options').innerHTML = ''
        }
    }
}
