// Function to load and parse CSV
function loadCSV() {
    fetch('fifa_league.csv')  // Path to your CSV file
      .then(response => response.text())
      .then(data => {
        // Parse the CSV data
        Papa.parse(data, {
          header: true,
          complete: function(results) {
            console.log(results.data); // Parsed CSV data
            calculateOdds(results.data); // Pass data to the odds calculation function
          }
        });
      });
  }
  
  // Function to calculate odds (dummy example)
  function calculateOdds(playersData) {
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;
  
    const player1 = playersData.find(player => player.Player === player1Name);
    const player2 = playersData.find(player => player.Player === player2Name);
  
    if (player1 && player2) {
      const player1WinRate = player1.Wins / player1.GamesPlayed;
      const player2WinRate = player2.Wins / player2.GamesPlayed;
  
      const oddsPlayer1 = (player1WinRate / (player1WinRate + player2WinRate)) * 100;
      const oddsPlayer2 = 100 - oddsPlayer1;
  
      document.getElementById("odds").textContent = `${player1Name} has ${oddsPlayer1.toFixed(2)}% chance of winning, ${player2Name} has ${oddsPlayer2.toFixed(2)}%`;
    } else {
      document.getElementById("odds").textContent = "Players not found in data.";
    }
  }
  
  // Trigger CSV loading and odds calculation on form submission
  document.getElementById("calculateOddsBtn").addEventListener("click", loadCSV);
  