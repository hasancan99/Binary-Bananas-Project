const fs = require('fs'); //

const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())



const questionsData = require("./questions.json")
const questions = questionsData.questions
const leaderboard = require("./people.json")

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

app.get('/leaderboard', (req,res)=>{

    res.send(leaderboard)
    
})

// Posting usernames to leaderboard.
app.post('/add-user/:user', (req,res) => {
    const userName = req.params.user
console.log(req.params.user);
    if (userName) {
        const checkUser = leaderboard.people.find(element => element.username === userName)
        console.log(checkUser);
        if (!checkUser) {
            fs.readFile('./people.json', 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
                const peopleData = JSON.parse(data);
            const data = {username: userName, totalScore: 0 }
            fs.writeFile('./people.json', JSON.stringify(data), 'utf8', (err) => 
            { if (err) { console.error(err); return; } console.log('Data has been written to the JSON file.'); });
            })
            res.status(200).json({ success: 'username added' })
            console.log(leaderboard);
        }
        else {
            res.status(409).json({ error: 'Username already in use' })
        }
    }
    else {
        res.status(400).json({ error: 'Please enter username' })
    }
})

// Adds totalscore
app.post('/add-totalScore/:user/:score', (req,res) => {
    const totalScore = req.params.score
    const user = req.params.user
    console.log(user);
    if (totalScore) {
        if (user) {
            const checkUser = leaderboard.people.find(element => element.username === user)
            if (checkUser) {
                checkUser.totalScore = totalScore;
                console.log(leaderboard);
                res.status(200).json({ success: `score updated: ${totalScore}` })
            } else {
                res.status(404).json({ error: 'user not found' })
            }
        } else {
            res.status(400).json({ error: 'please enter username' })
        }
    } else {
        res.status(400).json({ error: 'score not found' })
    }

})



module.exports = app
