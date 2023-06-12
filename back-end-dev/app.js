const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())

const questionsData = require("./questions.json")
const questions = questionsData.questions

// Define a new GET route for "/next-question"
app.get('/next-question', (req, res) => {
    
    // Try to retrieve the "questionNumber" parameter from the request query.
    // If it doesn't exist, default to 0.
    // Use parseInt to ensure that we're comparing numbers later on.
    const questionNumber = req.query.questionNumber ? parseInt(req.query.questionNumber) : 0
    
    // Use the .find() to get the first question that matches the given question number.
    const question = questions.find(q => q.number === questionNumber)
    
    // If we found a matching question
    if (question) {
        // Respond to the request with the found question in JSON format.
        res.json(question)
    } else {
        // If there was no matching question (i.e., we've exhausted all questions),
        // respond with a 404 status and an error message.
        res.status(404).json({ error: 'No more questions available.' })
    }
})






module.exports = app
