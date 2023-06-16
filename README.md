# BINARY BANANAS DINO CHASE PROJECT

The Binary Bananas group have made the fun and interative online quiz **DINO CHASE** where students can escape the ravenous Dino and brag about their final score to their classmates! 

## Table of Contents

- [Installation](#installation)
- [Description](#description)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Process](#process)
- [Bugs](#bugs)

## Installation

*If the user does not have node installed, install this prior to cloning the repo.*

In the cloned repository the user can run : 

`npm init y`

This should install all the required packages.

## Description

The Dino Chase quiz is a game-quiz where we wanted to put in game elements to make the learning and testing of knowlegde fun for students. This was to be coupled with a live leaderboard of users and their score to add an element of competitiveness so that students completed the quizzes regularly. The future feature that we are missing is teachers being able to add to the quizzes so that they are reflective of what the students are studying at school. Additionaly more game elements could be introduced.

## Usage

The website allows the user to login/register and start the quiz. 

If the user gets the question right they add to their score and move away from the **Dino**.

If the user gets the question wrong they get closer to the **Dino**. Getting enough wrong answers in a row will ensure that the user gets eaten. This will cause the end game screen.

At the end game screen the user can proceed to the leaderboard page where they can see their username (that they previously submitted) along with their total score which was their score before-hand added to their recent quiz score. 

## Features

Key Features

- Adding your username to the webpage will store your score
- The Dinosaur will progress with every correct answer
- The user will progress with every wrong answer
- The game will end if the user gets enough wrong answers in a row
- The end game screen will have the option for the user to see the leaderboard with their new score
- The *how to play* button will direct the user to a page where they can read the rules of the game so far
- The *Study More* button will direct the user to a page where the user can find helpful study tips and resources
- The *Leaderboard* button will direct the user to a page where they can see the leaderboard

## Technologies

We used *express* for the back end server framework.

## Process

Our group focussed on getting some back end functionality for the website before looking at detail on the front-end. This meant being able to add to a user json file and being able to fetch the questions. 

## Bugs
Currently no bugs noted. Previously, there was an issue where upon submitting the users score, the page would refresh - taking you back to the start of the game.
We noticed that the code for writing to the json file (fs writefilesync), would cause the browser to refresh potentially due to the contents of a file being updated in the project.
We fixed this, by only submitting the users score at the end of the game (rather than each round), and directing the user to a seperate leaderboard page.
