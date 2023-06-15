// Shuffle function to randomize the order of names
function shuffleNames(names) {
    for (let i = names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [names[i], names[j]] = [names[j], names[i]];
    }
    return names;
  }
  
  // Get the names element
  const namesElement = document.getElementById("names");
  
  // Array of names
  const names = ["Elliot", "Hasancan", "Joe", "Sumeetpal"];
  
  // Randomize the order of names
  const shuffledNames = shuffleNames(names);
  
  // Update the names element with the shuffled names
  namesElement.textContent = "Made by " + shuffledNames.join(", ") + ".";
  