
/**This file is in charge of the leaderboard and username submit features.
 * These features could all be placed inside of of the index.js in the 
 * future to make it easily accessible as they all belong on the same page.
 * Another option could be to bundle the two JS files.
 */



// Update the username form submission event.
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
            }
        } else if (action === 'login') {
            // Log in existing user
            if (usernames.includes(userInputName)) {
                // Store the username in localStorage
                localStorage.setItem('username', userInputName);

                // Redirect to index.html
                window.location.href = 'index.html';
            } else {
                // If the username doesn't exist, show an error
                alert("Username does not exist.");
            }
        }
    } else {
        console.log("Error: " + resp.status);
    }
})




//retrieve leaderboard when button pressed
document.querySelector("#revealLeaderboard").addEventListener("click", (e) => {
    const users = userData("emmajones");
    const leaderboard = document.querySelector("#Leaderboard");
    leaderboard.hidden = false;
  });
  //add user when submitted
  document.querySelector("#userInput").addEventListener("submit", (e) => {
    event.preventDefault();
    let userInputName = document.querySelector("#username").value;
    addUser(userInputName);
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
          )} Username : ${data[i].username}   Total Score : ${
            data[i].totalScore
          }`;
          if (username === data[i]["username"]) {
            listElement.style.backgroundColor = "green";
            const position = i;
            const h3 = document.createElement("h3");
            h3.textContent = `Well done in you are in ${ordinal_suffix_of(
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

            // Redirect to index.html
            window.location.href = 'index.html';
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



