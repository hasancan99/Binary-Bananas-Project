

document.querySelector('#revealLeaderboard').addEventListener("click", e => {
    const users = userData()
    const leaderboard = document.querySelector('#Leaderboard')
    leaderboard.hidden = false
    
    
})

//
const userData= async ()=>{
    try{
        const resp = await fetch('http://localhost:3000/leaderboard')
    if (resp.ok) {
        const data = await resp.json();
        console.log(data);
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

const addUser = async(username) => {
    try {
        const resp = await fetch(`http://localhost:3000/add-user/${username}`, {
            method: "POST"
        })
        if (resp.ok) {
            console.log(`${username} successfully added`);
        } else {
        throw "Error: http status code = " + resp.status;
       }
      } catch (err) {
       console.log(err);
      }
    }


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
    
addScore('tom', '3333333');
