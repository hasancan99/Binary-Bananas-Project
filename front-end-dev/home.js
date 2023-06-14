
/**This file is in charge of the leaderboard and username submit features.
 * These features could all be placed inside of of the index.js in the 
 * future to make it easily accessible as they all belong on the same page.
 * Another option could be to bundle the two JS files.
 */



// Update the username form submission event.
document.querySelector('#userInput').addEventListener("submit", async event =>{
    event.preventDefault();
    let userInputName = document.querySelector('#username').value;
    
    // Fetch all usernames
    const resp = await fetch('http://localhost:3000/usernames');
    if (resp.ok) {
        const usernames = await resp.json();

        // Check if the username already exists
        if (usernames.includes(userInputName)) {
            // Store the username in localStorage
            localStorage.setItem('username', userInputName);

            // Redirect to index.html
            window.location.href = 'index.html';
        } else {
            // If the username doesn't exist, show an error
            alert("Username does not exist.");
        }
    } else {
        console.log("Error: " + resp.status);
    }
})




document.querySelector('#userInput').addEventListener("submit", async event =>{
    event.preventDefault();
    let userInputName = document.querySelector('#username').value;
    
    // Check if the username already exists
    try {
        const resp = await fetch(`http://localhost:3000/check-user/${userInputName}`);
        if (resp.ok) {
            const data = await resp.json();
            if (data.userExists) {
                localStorage.setItem('username', userInputName); // Store the username

                // Redirect to index.html
                window.location.href = 'index.html';
            } else {
                alert("User does not exist.");
            }
        } else {
            throw "Error: http status code = " + resp.status;
        }
    } catch (err) {
        console.log(err);
    }
})



//function to retrieve and order data for leaderboard
const userData= async ()=>{
    try{
        const resp = await fetch('http://localhost:3000/leaderboard')
    if (resp.ok) {
        const data = await resp.json();
        //for loop to append each data element to leaderboard list on html
        for(let i =0; i<data.length; i++){   
            
            const leaderboardList =document.querySelector('#leaderboardList') 
            const listElement = document.createElement("li")
            listElement.textContent = `Username : ${data[i].username}   Total Score : ${data[i].totalScore}`
            leaderboardList.appendChild(listElement)
            
        }
        return data
       } else {
        throw "Error: http status code = " + resp.status;
       }
      } catch (err) {
       console.log(err);
      }
      
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

