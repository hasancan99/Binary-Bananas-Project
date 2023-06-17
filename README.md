# The Dino Chase

Hi there! Known as the 'Binary Bananas', we're [Hasancan Cifci](https://github.com/hasancan99), [Sumeetpal Choat](https://github.com/SumeetChoat), [Elliot Clowes](https://github.com/elliotclowes) and [Joe Fountain](https://github.com/JoeyF92).

We're all doing the [La Fosse Academy](https://www.lafosseacademy.com/). And for our third week we were tasked with creating an educational game for a group of schools to increase engagement in non-STEM subjects (full brief [here](https://github.com/LaFosseAcademy/cohort_resources/blob/main/liskov/projects/lap1-project.md)).

We decided to make a fun and interactive online quiz called **The Dino Chase** where students have to escape a ravenous Dino by answering questions correctly and getting points.

You can see it live at: [thedinochase.com](http://thedinochase.com/)

You can see a copy of our project presentation slides [here](https://github.com/hasancan99/Binary-Bananas-Project/blob/production/Project-Presentation.pdf).

## Table of Contents

- [Known bugs](#known-bugs)
- [Installation](#install-and-run-this-project-locally)
- [Description](#description)
- [Features and Usage](#features-and-usage)
- [Technology Used](#technology-used)
- [Our Process](#our-process)
- [Other Issues](#other-issues)

## Known Bugs
- If the player loses the game via running out of time the dinosaur and player briefly remain on screen.
- CSS for the leaderboard has some alignment issues.

## Install and Run This Project Locally

### Requirements

[Node](https://nodejs.org/en). Type `node -v` in your terminal. If it doesn't give you a version number then you need to install [node](https://nodejs.dev/en/download/).

### Installation

- Launch Terminal, GitBash or your shell of choice.
- Use `cd name-of-folder` to navigate to where you want to have the `Binary-Bananas-Project` folder and repository saved.
    - For example, the command `cd Dropbox/code` will result in the following folder structure `Dropbox/code/Binary-Bananas-Project` once you've pulled the repository.
- Clone into the repository: `git clone https://github.com/hasancan99/Binary-Bananas-Project.git`
- Navigate into the folder via `Binary-Bananas-Project`
- Open up the folder in Visual Studio Code via `code .`
	- Skip the step above if you use a different code editor.
- In the files `game.js`, `home.js` and `leaderboard.js` edit any mention of `https://the-dino-chase.ew.r.appspot.com` and replace it with `http://localhost:3000`. This will make your copy talk to a local copy of the API instead of a live, remote one hosted on the web.
- Go back to your terminal and enter `cd back-end-dev` to move into the `back-end-dev` folder.
- Type `npm install` to install needed dependencies.
- Type `npm start` to start the API server.
    - If it's working your terminal should display: `API listening on port 3000.`
- Go back to Visual Studio Code.
- Right click the file `index.html` in the `client` folder and then click on the option `Open with Live Server`.
- The functioning website should now open up in your browser of choice.

## Features and Usage

The website allows the user to login/register and start the quiz. 

If the user gets the question right they add to their score and move away from the **Dino**.

If the user gets the question wrong they get closer to the **Dino**. Getting enough wrong answers in a row will ensure that the user gets eaten. This will cause the end game screen.

At the end game screen the user can proceed to the leaderboard page where they can see their username (that they previously submitted) along with their total score which was their score before-hand added to their recent quiz score. 

### Key Features

- Adding your username to the webpage will store your score
- The Dinosaur will progress with every correct answer
- The user will progress with every wrong answer
- The game will end if the user gets enough wrong answers in a row
- The end game screen will have the option for the user to see the leaderboard with their new score
- The *how to play* button will direct the user to a page where they can read the rules of the game so far
- The *Study More* button will direct the user to a page where the user can find helpful study tips and resources
- The *Leaderboard* button will direct the user to a page where they can see the leaderboard

## Technology Used

- HTML
- CSS
- JavaScript
- Node
	- [npm](https://www.npmjs.com/) dependencies
		- [express](https://www.npmjs.com/package/express): routing of HTTP methods and URLs.
		- [cors](https://www.npmjs.com/package/cors): to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
		- [dotenv](https://www.npmjs.com/package/dotenv): for better and more secure loading of environment variables.

### TheDinoChase.com

- The front-end is hosted on [Linode](https://www.linode.com/) on a simple, static Apache server.
- The backend and API is hosted on [Google Cloud Platform](https://cloud.google.com/) via their [App Engine](https://cloud.google.com/appengine) and [Cloud API](https://cloud.google.com/apis). 

## Our Process

Our group focussed on getting some back end functionality for the website before looking at detail on the front-end. This meant being able to add to a user json file and being able to fetch the questions. 

## Other Issues

- Previously there was an issue where upon submitting the users score where the page would refresh, taking you back to the start of the game. We noticed that the code for writing to the people.JSON file (`fs writefilesync`) would cause the browser to refresh potentially due to the contents of a file being updated in the project. We had to workaround this by only submitting the users score at the end of the game (rather than each round) and directing the user to a separate leaderboard page.
- We originally used Render to host the API. But on the free plan it spins down after 15 minutes of inactivity. As our website will be rarely accessed this wasn't good enough so we moved to the Google Cloud Platform instead.