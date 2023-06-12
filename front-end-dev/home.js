

document.querySelector('#revealLeaderboard').addEventListener("click", e => {
    console.log("hi")
    const users = userData()
    const leaderboard = document.querySelector('#Leaderboard')
    leaderboard.hidden = false
    
    
})


const userData= async ()=>{
    try{
        const resp = await fetch('http://localhost:3000/leaderboard')
    if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        for(let i =0; i<10; i++){   
        
            const leaderboardList =document.querySelector('#leaderboardList')
            const listElement = document.createElement("li")
            listElement.textContent = `Username : ${data.people[i].username}   Total Score : ${data.people[i].totalScore}`
            console.log("listElement")
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


