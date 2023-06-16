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
const names = ['<a href="https://github.com/elliotclowes">Elliot Clowes</a>', '<a href="https://github.com/hasancan99">Hasancan Cifci</a>', '<a href="https://github.com/JoeyF92">Joe Fountain</a>', '<a href="https://github.com/SumeetChoat">Sumeetpal Choat</a>'];

// Randomize the order of names
const shuffledNames = shuffleNames(names);

// Update the names element with the shuffled names
namesElement.innerHTML = 'Made by ' + shuffledNames.join(' / ') + '.';
