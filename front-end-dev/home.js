// Prefetch leaderboard data when page loads
let leaderboardData;
window.addEventListener('load', async () => {
  leaderboardData = await userData();
});


let countdown = 30;
const countdownElement = document.getElementById('countdown');

const interval = setInterval(() => {
  countdown--;
  countdownElement.innerText = `Wait ` + countdown + ` seconds.`;
  
  if(countdown <= 0) {
    clearInterval(interval);
    countdownElement.innerText = 'Dino Chase is now ready! :)';
  }
}, 1000);



document.querySelector('#userInput').addEventListener("submit", async event => {
  event.preventDefault();
  let userInputName = document.querySelector('#username').value;

  // Determine whether the event is for registration or login based on the clicked button's id
  let action = event.submitter.id;

  // Fetch all usernames
  const resp = await fetch('https://thedinochase.onrender.com/usernames');
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






// Function to retrieve and order data for leaderboard
const userData = async (username) => {
  try {
    const resp = await fetch("https://thedinochase.onrender.com/leaderboard/");
    if (resp.ok) {
      const data = await resp.json();
      // Set a counter to work out people's position
      let positionCount = 1;
      // For loop to append each data element to leaderboard list on HTML
      for (let i = 0; i < data.length; i++) {
        if (i != 0 && data[i].totalScore != data[i - 1].totalScore) {
          positionCount++;
        }

        // add information to 3 spans in a li element
        const leaderboardList = document.querySelector("#leaderboardList");
        const listElement = document.createElement("li");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const span3 = document.createElement("span");
        span1.textContent = `${ordinal_suffix_of(positionCount)}`;
        span2.textContent = `${data[i].username}`;
        span3.textContent = `${data[i].totalScore} points`;
        listElement.append(span1, span2, span3);

        // Apply CSS classes to the spans
        span1.classList.add("leaderboard-position");
        span2.classList.add("leaderboard-username");
        span3.classList.add("leaderboard-score");

        // Add CSS classes to the list element
        listElement.classList.add("leaderboard-row");

        if (username === data[i].username) {
          listElement.style.backgroundColor = "#1976d2d3";
          const position = i;
          const h3 = document.createElement("h3");
          h3.id = "h3leaderboard";
          h3.textContent = `You are in ${ordinal_suffix_of(
            positionCount
          )} position!`;
          leaderboardList.prepend(h3);
        }

        leaderboardList.appendChild(listElement);
      }
      return data;
    } else {
      throw "Error: HTTP status code = " + resp.status;
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
        const resp = await fetch(`https://thedinochase.onrender.com/add-user/${username}`, {
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
            const resp = await fetch(`https://thedinochase.onrender.com/add-totalScore/${username}/${totalScore}`, {
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


document.querySelector('#revealLeaderboard').addEventListener('click', function() {
  this.classList.toggle('active');
});

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
  
  const users = leaderboardData || await userData(username);

  // Toggle leaderboard visibility
  leaderboardVisible = true;
  leaderboard.hidden = false;

  leaderboardGenerated = true; // Set the leaderboard as generated

  // Change button text
  leaderboardButton.textContent = 'Hide the Leaderboard';
});
