let players = [
  {
    name: "Sam",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Alex",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Mac",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Rav",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Dan",
    rating: 900,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "David",
    rating: 900,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Dru",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Brent",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Bass",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Kelvin",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Oscar S",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Lei",
    rating: 1000,
    division: 1,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Elliot",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "John",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Lachlan T",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Lachlan W",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Jude",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Manjeeve",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Matthew",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Patrick",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Ricardo",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
  {
    name: "Justin",
    rating: 900,
    division: 2,
    goalsScored: 0,
    goalsConceded: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    form: [],
    headToHead: {},
  },
];

let matchHistory = [];

function calculateRatingChange(player1, player2, goals1, goals2, matchType) {
    const ratingDiff = player2.rating - player1.rating;
    const expectedScore = 1 / (1 + Math.pow(10, ratingDiff / 400));
  
    // Adjust base K factor based on division and rank difference
    let baseK;
    switch (matchType) {
      case "div1":
        baseK = 30;
        break;
      case "div2":
        baseK = 15; // Reduced impact for Division 2 matches
        break;
      case "knockout":
        baseK = 35;
        break;
      default:
        baseK = 30;
    }
  
    // Determine outcome
    let outcome;
    if (goals1 > goals2) outcome = 1;
    else if (goals1 < goals2) outcome = 0;
    else outcome = 0.5;
  
    // Calculate base rating change
    let ratingChange = baseK * (outcome - expectedScore);
  
    // Adjust for goal difference
    const goalDiff = Math.abs(goals1 - goals2);
    ratingChange *= 1 + goalDiff / 10;
  
    // Adjust for rank difference
    const rankDiffFactor = 1 + Math.abs(ratingDiff) / 1000;
    ratingChange *= rankDiffFactor;
  
    // Penalize higher-ranked player for losing to lower-ranked player (EVEN LESS HARSH)
    if (player1.rating > player2.rating && outcome === 0) {
      const rankDifference = (player1.rating - player2.rating) / 400; // Further reduced scaling factor
      ratingChange *= (1.1 + rankDifference); // Further reduced base penalty
    }
  
    // Reduce points for high-ranked player beating low-ranked player
    if (player1.rating > player2.rating && outcome === 1) {
      ratingChange *= 0.5;
    }
  
    // Adjust based on goals conceded average
    const totalGames = player2.wins + player2.losses + player2.draws;
    const goalsConcededAvg = totalGames > 0 ? player2.goalsConceded / totalGames : 0;
    const goalsConcededFactor = 1 + (goals1 - goalsConcededAvg) / 10;
    ratingChange *= goalsConcededFactor;
  
    // Calculate goal value based on rating difference
    const goalValue = 5 * (1 + Math.abs(ratingDiff) / 1000);
  
    return {
      ratingChange: ratingChange,
      goalValue: goalValue,
    };
  }
  

function updateRankings(player1, player2, goals1, goals2, matchType) {
  const result = calculateRatingChange(player1, player2, goals1, goals2, matchType);

  // Update ratings
  player1.rating += Math.round(result.ratingChange);
  player2.rating -= Math.round(result.ratingChange);

  // Update goals and apply goal-based rating changes
  player1.goalsScored += goals1;
  player1.goalsConceded += goals2;
  player2.goalsScored += goals2;
  player2.goalsConceded += goals1;
  player1.rating += Math.round(goals1 * result.goalValue);
  player1.rating -= Math.round(goals2 * result.goalValue * 0.5);
  player2.rating += Math.round(goals2 * result.goalValue);
  player2.rating -= Math.round(goals1 * result.goalValue * 0.5);

  // Update win/loss/draw counts and form
  let outcome1, outcome2;
  if (goals1 > goals2) {
    player1.wins++;
    player2.losses++;
    outcome1 = "W";
    outcome2 = "L";
  } else if (goals1 < goals2) {
    player1.losses++;
    player2.wins++;
    outcome1 = "L";
    outcome2 = "W";
  } else {
    player1.draws++;
    player2.draws++;
    outcome1 = outcome2 = "D";
  }

  // Update form (last 5 matches)
  player1.form.unshift(outcome1);
  player2.form.unshift(outcome2);
  player1.form = player1.form.slice(0, 5);
  player2.form = player2.form.slice(0, 5);

  // Ensure ratings don't go below 0
  player1.rating = Math.max(0, player1.rating);
  player2.rating = Math.max(0, player2.rating);

  // Update match history
  matchHistory.unshift({
    date: new Date().toISOString(),
    player1: player1.name,
    player2: player2.name,
    score: `${goals1}-${goals2}`,
    matchType: matchType,
  });

  // Save data to local storage
  saveData();
}

function displayRankings() {
    const sorted = [...players].sort((a, b) => b.rating - a.rating);
    const tbody = document.querySelector("#rankings tbody");
    tbody.innerHTML = "";
    sorted.forEach((player, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = index + 1;
        const nameCell = row.insertCell(1);
        nameCell.textContent = player.name;
        nameCell.style.backgroundColor = player.division === 1 ? "#90EE90" : player.division === 2 ? "#FFB6C1" : player.division === 3 ? "#ADD8E6" : "";
        row.insertCell(2).textContent = Math.round(player.rating);
        row.insertCell(3).textContent = player.division === 3 ? "?" : `Division ${player.division}`;
        row.insertCell(4).textContent = player.goalsScored;
        row.insertCell(5).textContent = player.goalsConceded;
        row.insertCell(6).textContent = `${player.wins}/${player.draws}/${player.losses}`;
        row.insertCell(7).textContent = player.form.join("");
        const totalGames = player.wins + player.draws + player.losses;
        const winPercentage = totalGames > 0 ? ((player.wins / totalGames) * 100).toFixed(2) + "%" : "N/A";
        row.insertCell(8).textContent = winPercentage;
    });
}



function displayMatchHistory() {
  const historyTable = document.getElementById("matchHistory");
  const tbody = historyTable.querySelector("tbody");
  tbody.innerHTML = "";

  matchHistory.forEach((match, index) => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = new Date(match.date).toLocaleString();
    row.insertCell(1).textContent = match.player1;
    row.insertCell(2).textContent = match.player2;
    row.insertCell(3).textContent = match.score;
    row.insertCell(4).textContent = match.matchType;

    // Add Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editMatch(index));
    row.insertCell(5).appendChild(editButton);

    // Add Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteMatch(index));
    row.insertCell(6).appendChild(deleteButton);
  });
}


document.getElementById('matchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const player1Name = document.getElementById('player1').value;
  const player2Name = document.getElementById('player2').value;
  const goals1 = parseInt(document.getElementById('goals1').value);
  const goals2 = parseInt(document.getElementById('goals2').value);
  const matchType = document.getElementById('matchContext').value;

  const player1 = players.find(p => p.name === player1Name);
  const player2 = players.find(p => p.name === player2Name);

  if (player1 && player2) {
    addMatch(player1, player2, goals1, goals2, matchType); //Add the match here
    displayRankings();
    displayMatchHistory();
  } else {
    alert("Please select both players.");
  }
  this.reset();
});


function resetAllRankings() {
    //Re-initialise the players to their original ratings and divisions
    players = [
        {name: "Sam", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Alex", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Dan", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Dru", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Brent", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Bass", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
		{name: "Kelvin", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
		{name: "David", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
		{name: "Oscar S", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
		{name: "Lei", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
		{name: "Rav", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "John", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
		{name: "Mac", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
		{name: "Elliot", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Lachlan T", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Lachlan W", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Jude", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Manjeeve", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Matthew", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Ricardo", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
        {name: "Justin", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
		{name: "Patrick", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}},
		{name: "aaaaaa", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: [], headToHead: {}}
    ];
    matchHistory = [];
    displayRankings();
    displayMatchHistory();
    saveData();
}

function updateHeadToHead(player1, player2, goals1, goals2) {
    // Initialize head-to-head stats if they don't exist
    if (!player1.headToHead[player2.name]) {
        player1.headToHead[player2.name] = { wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0 };
    }
    if (!player2.headToHead[player1.name]) {
        player2.headToHead[player1.name] = { wins: 0, losses: 0, draws: 0, goalsFor: 0, goalsAgainst: 0 };
    }

    // Update stats based on the match outcome
    if (goals1 > goals2) {
        player1.headToHead[player2.name].wins++;
        player2.headToHead[player1.name].losses++;
    } else if (goals1 < goals2) {
        player1.headToHead[player2.name].losses++;
        player2.headToHead[player1.name].wins++;
    } else {
        player1.headToHead[player2.name].draws++;
        player2.headToHead[player1.name].draws++;
    }

    // Update goals scored and conceded
    player1.headToHead[player2.name].goalsFor += goals1;
    player1.headToHead[player2.name].goalsAgainst += goals2;
    player2.headToHead[player1.name].goalsFor += goals2;
    player2.headToHead[player1.name].goalsAgainst += goals1;
}


function addMatch(player1, player2, goals1, goals2, matchType) {
  updateRankings(player1, player2, goals1, goals2, matchType);

  // Add to match history
  matchHistory.unshift({
    date: new Date().toISOString(),
    player1: player1.name,
    player2: player2.name,
    score: `${goals1}-${goals2}`,
    matchType: matchType,
  });

  saveData();
}

function deleteMatch(index) {
  if (index >= 0 && index < matchHistory.length) {
    const deletedMatch = matchHistory.splice(index, 1)[0]; // Remove match from array

    //Revert the changes made by the match
    const player1 = players.find((player) => player.name === deletedMatch.player1);
    const player2 = players.find((player) => player.name === deletedMatch.player2);
    const [goals1, goals2] = deletedMatch.score.split("-").map(Number);
    revertRankings(player1, player2, goals1, goals2, deletedMatch.matchType);

    //Revert the Head to Head changes
    revertHeadToHead(player1, player2, goals1, goals2);

    saveData();
    displayRankings();
    displayMatchHistory();
  }
}

function editMatch(index) {
  if (index >= 0 && index < matchHistory.length) {
    const match = matchHistory[index];
    const player1Name = match.player1;
    const player2Name = match.player2;
    const [goals1, goals2] = match.score.split("-").map(Number);
    const matchType = match.matchType;

    // Populate the match form with the match details for editing
    document.getElementById("goals1").value = goals1;
    document.getElementById("goals2").value = goals2;
    document.getElementById("matchContext").value = matchType;

    // Change the submit button text to "Update Match"
    const submitButton = document.querySelector("#matchForm button[type=submit]");
    submitButton.textContent = "Update Match";

    // Store the index of the match being edited
    document.getElementById("matchForm").dataset.editIndex = index;

    // Remove the existing submit listener
    const matchForm = document.getElementById("matchForm");
    const newMatchForm = matchForm.cloneNode(true);
    matchForm.parentNode.replaceChild(newMatchForm, matchForm);

    // Re-populate the player selects with only the matched players
    const player1Select = newMatchForm.querySelector("#player1");
    const player2Select = newMatchForm.querySelector("#player2");

    // Clear existing options
    player1Select.innerHTML = "";
    player2Select.innerHTML = "";

    // Add options for the specific players in the selected match
    const player1 = players.find((p) => p.name === player1Name);
    const player2 = players.find((p) => p.name === player2Name);

    if (player1) {
      const option1 = document.createElement("option");
      option1.value = player1.name;
      option1.textContent = `${player1.name} (Div ${player1.division})`;
      player1Select.appendChild(option1);
      player1Select.value = player1.name; //Select the option
    }

    if (player2) {
      const option2 = document.createElement("option");
      option2.value = player2.name;
      option2.textContent = `${player2.name} (Div ${player2.division})`;
      player2Select.appendChild(option2);
      player2Select.value = player2.name; //Select the option
    }

    // Add the new submit listener
    newMatchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const player1Name = document.getElementById("player1").value;
      const player2Name = document.getElementById("player2").value;
      const goals1 = parseInt(document.getElementById("goals1").value);
      const goals2 = parseInt(document.getElementById("goals2").value);
      const matchType = document.getElementById("matchContext").value;

      const player1 = players.find((p) => p.name === player1Name);
      const player2 = players.find((p) => p.name === player2Name);

      if (player1 && player2) {
        const editIndex = parseInt(newMatchForm.dataset.editIndex);
        updateMatch(editIndex, player1, player2, goals1, goals2, matchType);
        displayRankings();
        displayMatchHistory();
      } else {
        alert("Please select both players.");
      }
      delete newMatchForm.dataset.editIndex;
      submitButton.textContent = "Add Match"; // reset the text
      this.reset();
    });
  }
}


function updateMatch(index, player1, player2, goals1, goals2, matchType) {
  if (index >= 0 && index < matchHistory.length) {
    const oldMatch = matchHistory[index];

    //Revert the changes made by the old match
    const oldPlayer1 = players.find((player) => player.name === oldMatch.player1);
    const oldPlayer2 = players.find((player) => player.name === oldMatch.player2);
    const [oldGoals1, oldGoals2] = oldMatch.score.split("-").map(Number);
    revertRankings(oldPlayer1, oldPlayer2, oldGoals1, oldGoals2, oldMatch.matchType);

    //Revert the Head to Head changes
    revertHeadToHead(oldPlayer1, oldPlayer2, oldGoals1, oldGoals2);

    //Update with new match details
    updateRankings(player1, player2, goals1, goals2, matchType);

    //Update the Head to Head details
    updateHeadToHead(player1, player2, goals1, goals2);

    //Update the match in matchHistory
    matchHistory[index] = {
      date: new Date().toISOString(),
      player1: player1.name,
      player2: player2.name,
      score: `${goals1}-${goals2}`,
      matchType: matchType,
    };

    saveData();
  }
}

function updateRankings(player1, player2, goals1, goals2, matchType) {
  const result = calculateRatingChange(player1, player2, goals1, goals2, matchType);
  const ratingChange = Math.round(result.ratingChange);

  // Store current form before updating
  const oldOutcome1 = player1.form[0] || null;
  const oldOutcome2 = player2.form[0] || null;

  // Update ratings
  player1.rating += ratingChange;
  player2.rating -= ratingChange;

  // Update goals and apply goal-based rating changes
  player1.goalsScored += goals1;
  player1.goalsConceded += goals2;
  player2.goalsScored += goals2;
  player2.goalsConceded += goals1;
  player1.rating += Math.round(goals1 * result.goalValue);
  player1.rating -= Math.round(goals2 * result.goalValue * 0.5);
  player2.rating += Math.round(goals2 * result.goalValue);
  player2.rating -= Math.round(goals1 * result.goalValue * 0.5);

  // Update win/loss/draw counts and form
  let outcome1, outcome2;
  if (goals1 > goals2) {
    player1.wins++;
    player2.losses++;
    outcome1 = "W";
    outcome2 = "L";
  } else if (goals1 < goals2) {
    player1.losses++;
    player2.wins++;
    outcome1 = "L";
    outcome2 = "W";
  } else {
    player1.draws++;
    player2.draws++;
    outcome1 = outcome2 = "D";
  }

  // Update form (last 5 matches)
  player1.form.unshift(outcome1);
  player2.form.unshift(outcome2);
  player1.form = player1.form.slice(0, 5);
  player2.form = player2.form.slice(0, 5);

  // Ensure ratings don't go below 0
  player1.rating = Math.max(0, player1.rating);
  player2.rating = Math.max(0, player2.rating);
}

function revertRankings(player1, player2, goals1, goals2, matchType) {
    const result = calculateRatingChange(player1, player2, goals1, goals2, matchType);
    const ratingChange = Math.round(result.ratingChange);

    let outcome1, outcome2;
    if (goals1 > goals2) {
        outcome1 = "W";
        outcome2 = "L";
    } else if (goals1 < goals2) {
        outcome1 = "L";
        outcome2 = "W";
    } else {
        outcome1 = outcome2 = "D";
    }

    // Revert form
    if (player1.form.length > 0) {
        player1.form.shift(); // Remove the most recent form
    }
    if (player2.form.length > 0) {
        player2.form.shift(); // Remove the most recent form
    }

    player1.rating -= ratingChange;
    player2.rating += ratingChange;

    player1.goalsScored -= goals1;
    player1.goalsConceded -= goals2;
    player2.goalsScored -= goals2;
    player2.goalsConceded -= goals1;
    player1.rating -= Math.round(goals1 * result.goalValue);
    player1.rating += Math.round(goals2 * result.goalValue * 0.5);
    player2.rating -= Math.round(goals2 * result.goalValue);
    player2.rating += Math.round(goals1 * result.goalValue * 0.5);

    if (goals1 > goals2) {
        player1.wins--;
        player2.losses--;
    } else if (goals1 < goals2) {
        player1.losses--;
        player2.wins--;
    } else {
        player1.draws--;
        player2.draws--;
    }

    player1.rating = Math.max(0, player1.rating);
    player2.rating = Math.max(0, player2.rating);
}

function revertHeadToHead(player1, player2, goals1, goals2) {
  // Check if head-to-head stats exist
  if (!player1.headToHead[player2.name] || !player2.headToHead[player1.name]) {
    return; // If stats don't exist, exit function
  }

  // Revert stats based on the match outcome
  if (goals1 > goals2) {
    player1.headToHead[player2.name].wins--;
    player2.headToHead[player1.name].losses--;
  } else if (goals1 < goals2) {
    player1.headToHead[player2.name].losses--;
    player2.headToHead[player1.name].wins--;
  } else {
    player1.headToHead[player2.name].draws--;
    player2.headToHead[player1.name].draws--;
  }

  // Revert goals scored and conceded
  player1.headToHead[player2.name].goalsFor -= goals1;
  player1.headToHead[player2.name].goalsAgainst -= goals2;
  player2.headToHead[player1.name].goalsFor -= goals2;
  player2.headToHead[player1.name].goalsAgainst -= goals1;

  // Ensure counts don't go below zero
  player1.headToHead[player2.name].wins = Math.max(0, player1.headToHead[player2.name].wins);
  player1.headToHead[player2.name].losses = Math.max(0, player1.headToHead[player2.name].losses);
  player1.headToHead[player2.name].draws = Math.max(0, player1.headToHead[player2.name].draws);
  player2.headToHead[player1.name].wins = Math.max(0, player2.headToHead[player1.name].wins);
  player2.headToHead[player1.name].losses = Math.max(0, player2.headToHead[player1.name].losses);
  player2.headToHead[player1.name].draws = Math.max(0, player2.headToHead[player1.name].draws);
}

function saveData() {
  localStorage.setItem("fifaRankingsPlayers", JSON.stringify(players));
  localStorage.setItem("fifaRankingsMatchHistory", JSON.stringify(matchHistory));
}

function loadData() {
  const savedPlayers = localStorage.getItem("fifaRankingsPlayers");
  const savedMatchHistory = localStorage.getItem("fifaRankingsMatchHistory");
  if (savedPlayers) {
    players = JSON.parse(savedPlayers);
  }
  if (savedMatchHistory) {
    matchHistory = JSON.parse(savedMatchHistory);
  }
}

function exportData() {
  const data = { players: players, matchHistory: matchHistory };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "fifa_rankings_export.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function importData(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    players = data.players;
    matchHistory = data.matchHistory;
    saveData();
    displayRankings();
    displayMatchHistory();
  };
  reader.readAsText(file);
}

function predictMatch(player1, player2) {
  const ratingDiff = player2.rating - player1.rating;
  const expectedScore1 = 1 / (1 + Math.pow(10, ratingDiff / 400));
  const expectedScore2 = 1 - expectedScore1;

  const avgGoalsScored1 = player1.goalsScored / (player1.wins + player1.draws + player1.losses || 0);
  const avgGoalsScored2 = player2.goalsScored / (player2.wins + player2.draws + player2.losses || 0);

  const expectedGoals1 = avgGoalsScored1 * expectedScore1 * 2;
  const expectedGoals2 = avgGoalsScored2 * expectedScore2 * 2;

  return {
    player1ExpectedGoals: expectedGoals1.toFixed(2),
    player2ExpectedGoals: expectedGoals2.toFixed(2),
    player1WinProbability: (expectedScore1 * 100).toFixed(2) + "%",
    player2WinProbability: (expectedScore2 * 100).toFixed(2) + "%",
    drawProbability: ((1 - Math.abs(expectedScore1 - expectedScore2)) * 100).toFixed(2) + "%",
  };
}

function displayHeadToHead(player1Name, player2Name) {
    const player1 = players.find(p => p.name === player1Name);
    const player2 = players.find(p => p.name === player2Name);
    const headToHeadDiv = document.getElementById('headToHeadStats');

    if (!player1 || !player2) {
        headToHeadDiv.innerHTML = "<p>Players not found.</p>";
        return;
    }

    if (!player1.headToHead[player2.name] || !player2.headToHead[player1.name]) {
        headToHeadDiv.innerHTML = "<p>No head-to-head data available.</p>";
        return;
    }

    const h2h = player1.headToHead[player2.name];
    const h2hReverse = player2.headToHead[player1.name]; // Get stats from Player 2's perspective

    headToHeadDiv.innerHTML = `
        <h4>Head-to-Head Stats: ${player1.name} vs ${player2.name}</h4>
        <p><strong>${player1.name}:</strong> Wins: ${h2h.wins}, Losses: ${h2h.losses}, Draws: ${h2h.draws}, Goals For: ${h2h.goalsFor}, Goals Against: ${h2h.goalsAgainst}</p>
        <p><strong>${player2.name}:</strong> Wins: ${h2hReverse.wins}, Losses: ${h2hReverse.losses}, Draws: ${h2hReverse.draws}, Goals For: ${h2hReverse.goalsFor}, Goals Against: ${h2hReverse.goalsAgainst}</p>
    `;
}


function init() {
  loadData();

  const player1Select = document.getElementById("player1");
  const player2Select = document.getElementById("player2");
  const predictPlayer1Select = document.getElementById("predictPlayer1");
  const predictPlayer2Select = document.getElementById("predictPlayer2");

  // Clear existing options
  player1Select.innerHTML = "";
  player2Select.innerHTML = "";
  predictPlayer1Select.innerHTML = "";
  predictPlayer2Select.innerHTML = "";

  // Populate player dropdowns
  players.forEach((player) => {
    const option1 = document.createElement("option");
    option1.value = player.name;
    option1.textContent = `${player.name} (Div ${player.division})`;
    player1Select.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = player.name;
    option2.textContent = `${player.name} (Div ${player.division})`;
    player2Select.appendChild(option2);

    const predictOption1 = option1.cloneNode(true);
    const predictOption2 = option2.cloneNode(true);
    predictPlayer1Select.appendChild(predictOption1);
    predictPlayer2Select.appendChild(predictOption2);
  });

  const matchContextSelect = document.getElementById("matchContext");
  matchContextSelect.innerHTML = "";

  // Add Match Type Options
  const matchTypes = ["div1", "div2", "knockout"]; // Define match types
  matchTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    matchContextSelect.appendChild(option);
  });

  document.getElementById("resetButton").addEventListener("click", resetAllRankings);
  document.getElementById("exportButton").addEventListener("click", exportData);
  document.getElementById("importButton").addEventListener("click", () => document.getElementById("importInput").click());
  document.getElementById("importInput").addEventListener("change", importData);

  const predictButton = document.getElementById("predictButton");
  const predictionResult = document.getElementById("predictionResult");

  predictButton.addEventListener("click", () => {
    const player1 = players.find((p) => p.name === predictPlayer1Select.value);
    const player2 = players.find((p) => p.name === predictPlayer2Select.value);
    if (player1 && player2) {
      const prediction = predictMatch(player1, player2);
      predictionResult.innerHTML = `

Expected Goals: ${player1.name} ${prediction.player1ExpectedGoals} - ${prediction.player2ExpectedGoals} ${player2.name}

Win Probability: ${player1.name} ${prediction.player1WinProbability} - ${prediction.player2WinProbability} ${player2.name}

Draw Probability: ${prediction.drawProbability}`;
    } else {
      predictionResult.innerHTML = "<p>Please select both players for prediction.</p>";
    }
  });

  // Add event listeners to the player selects to update head-to-head stats
  player1Select.addEventListener("change", () => {
    if (player1Select.value && player2Select.value) {
      displayHeadToHead(player1Select.value, player2Select.value);
    }
  });

  player2Select.addEventListener("change", () => {
    if (player1Select.value && player2Select.value) {
      displayHeadToHead(player1Select.value, player2Select.value);
    }
  });

  displayRankings();
  displayMatchHistory();
}

init();
