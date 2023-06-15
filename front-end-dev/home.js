
document.querySelector('#userInput').addEventListener("submit", async event => {
  event.preventDefault();
  let userInputName = document.querySelector('#username').value;

  // Determine whether the event is for registration or login based on the clicked button's id
  let action = event.submitter.id;

  // Fetch all usernames
  const resp = await fetch('http://localhost:3000/usernames');
  if (resp.ok) {
      const usernames = await resp.json();

      // Registering a new user
      if (action === 'register') {
          if (usernames.includes(userInputName)) {
              // If the username already exists, show an error
              alert("Username already exists.");
          } else {
              // If the username doesn't exist, create new user
              addUser(userInputName);
              localStorage.setItem('username', userInputName);
              window.location.href = 'game.html';
          }
      } else if (action === 'login') {
          // Log in existing user
          if (usernames.includes(userInputName)) {
              // Store the username in localStorage
              localStorage.setItem('username', userInputName);

              // Redirect to game.html
              window.location.href = 'game.html';
          } else {
              // If the username doesn't exist, show an error
              alert("Username does not exist.");
          }
      }
  } else {
      console.log("Error: " + resp.status);
  }
});






//function to retrieve and order data for leaderboard
const userData = async (username) => {
    try {
      const resp = await fetch("http://localhost:3000/leaderboard/");
      if (resp.ok) {
        const data = await resp.json();
        //set a counter to work out peoples position
        let positionCount = 1;
        //for loop to append each data element to leaderboard list on html
        for (let i = 0; i < data.length; i++) {
          if (i != 0 && data[i].totalScore != data[i - 1].totalScore) {
            positionCount++;
          }
  
          const leaderboardList = document.querySelector("#leaderboardList");
          const listElement = document.createElement("li");
          listElement.textContent = `${ordinal_suffix_of(
            positionCount
          )}: ${data[i].username} = ${
            data[i].totalScore
          } points`;
          if (username === data[i]["username"]) {
            listElement.style.backgroundColor = "#4CAF50";
            const position = i;
            const h3 = document.createElement("h3");
            h3.textContent = `You are in ${ordinal_suffix_of(
              positionCount
            )} position!`;
            leaderboardList.prepend(h3);
          }
          leaderboardList.appendChild(listElement);
        }
        return data;
      } else {
        throw "Error: http status code = " + resp.status;
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  // function to add suffix to users position in leaderboard
  function ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  
//checks if submitted username exists, and adds to database if not
const addUser = async(username) => {
    try {
        const resp = await fetch(`http://localhost:3000/add-user/${username}`, {
            method: "POST"
        })
        if (resp.ok) {
            console.log(`${username} successfully added`);
            localStorage.setItem('username', userInputName); // Store the username

            // Redirect to game.html
            window.location.href = 'game.html';
        } else {
        throw "Error: http status code = " + resp.status;
       }
      } catch (err) {
       console.log(err);
      }
    }

//checks if username exists, and changes score of user 
const addScore = async(username, totalScore) => {
        try {
            const resp = await fetch(`http://localhost:3000/add-totalScore/${username}/${totalScore}`, {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })
            if (resp.ok) {
                console.log(`${totalScore} successfully added`);
            } else {
            throw "Error: http status code = " + resp.status;
           }
          } catch (err) {
           console.log(err);
          }
        }
/** This function can be updated in the future to add on to the users score rather than replacing it */


// Retrieve leaderboard when button pressed
const leaderboardButton = document.querySelector("#revealLeaderboard");
const leaderboard = document.querySelector("#Leaderboard");
let leaderboardVisible = false;
let leaderboardGenerated = false; // Track if the leaderboard has been generated

leaderboardButton.addEventListener("click", async (e) => {
  const username = localStorage.getItem('username');
  
  // If leaderboard has already been generated, toggle visibility only
  if (leaderboardGenerated) {
    leaderboardVisible = !leaderboardVisible;
    leaderboard.hidden = !leaderboardVisible;

    // Change button text based on the visibility of the leaderboard
    leaderboardButton.textContent = leaderboardVisible ? 'Hide the Leaderboard' : 'See the Leaderboard';
    return;
  }
  
  const users = await userData(username);

  // Toggle leaderboard visibility
  leaderboardVisible = true;
  leaderboard.hidden = false;

  leaderboardGenerated = true; // Set the leaderboard as generated

  // Change button text
  leaderboardButton.textContent = 'Hide the Leaderboard';
});



