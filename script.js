let players = [
    {name: "Sam", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Alex", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Dan", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Dru", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Brent", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Bass", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "John", rating: 1000, division: 1, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Lachlan T", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Lachlan W", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Jude", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Manjeeve", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Matthew", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Ricardo", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []},
    {name: "Justin", rating: 900, division: 2, goalsScored: 0, goalsConceded: 0, wins: 0, losses: 0, draws: 0, form: []}
];

let matchHistory = [];

function calculateRatingChange(player1, player2, goals1, goals2, matchType) {
    const ratingDiff = player2.rating - player1.rating;
    const expectedScore = 1 / (1 + Math.pow(10, ratingDiff / 400));
    
    let baseK;
    switch(matchType) {
        case 'div1': baseK = 30; break;
        case 'div2': baseK = 25; break;
        case 'knockout': baseK = 40; break;
        default: baseK = 30;
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
    ratingChange *= (1 + goalDiff / 10);
    
    // Calculate goal value based on rating difference
    const goalValue = 10 * (1 + Math.abs(ratingDiff) / 1000);
    
    return {
        ratingChange: ratingChange,
        goalValue: goalValue
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
        outcome1 = 'W';
        outcome2 = 'L';
    } else if (goals1 < goals2) {
        player1.losses++;
        player2.wins++;
        outcome1 = 'L';
        outcome2 = 'W';
    } else {
        player1.draws++;
        player2.draws++;
        outcome1 = outcome2 = 'D';
    }
    
    // Update form (last 5 matches)
    player1.form.unshift(outcome1);
    player2.form.unshift(outcome2);
    player1.form = player1.form.slice(0, 5);
    player2.form = player2.form.slice(0, 5);
    
    // Ensure ratings don't go below 0
    player1.rating = Math.max(0, player1.rating);
    player2.rating = Math.max(0, player2.rating);
    
    // Add to match history
    matchHistory.unshift({
        date: new Date().toISOString(),
        player1: player1.name,
        player2: player2.name,
        score: `${goals1}-${goals2}`,
        matchType: matchType
    });
    
    // Save data to local storage
    saveData();
}

function displayRankings() {
    const sorted = [...players].sort((a, b) => b.rating - a.rating);
    const tbody = document.querySelector('#rankings tbody');
    tbody.innerHTML = '';
    
    sorted.forEach((player, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = index + 1;
        const nameCell = row.insertCell(1);
        nameCell.textContent = player.name;
        nameCell.style.backgroundColor = player.division === 1 ? '#90EE90' : '#FFB6C1';
        row.insertCell(2).textContent = Math.round(player.rating);
        row.insertCell(3).textContent = `Division ${player.division}`;
        row.insertCell(4).textContent = player.goalsScored;
        row.insertCell(5).textContent = player.goalsConceded;
        row.insertCell(6).textContent = `${player.wins}/${player.draws}/${player.losses}`;
        row.insertCell(7).textContent = player.form.join('');
        const totalGames = player.wins + player.draws + player.losses;
        const winPercentage = totalGames > 0 ? ((player.wins / totalGames) * 100).toFixed(2) + '%' : 'N/A';
        row.insertCell(8).textContent = winPercentage;
    });
}

function displayMatchHistory() {
    const historyTable = document.getElementById('matchHistory');
    const tbody = historyTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    matchHistory.forEach((match, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = new Date(match.date).toLocaleString();
        row.insertCell(1).textContent = match.player1;
        row.insertCell(2).textContent = match.player2;
        row.insertCell(3).textContent = match.score;
        row.insertCell(4).textContent = match.matchType;
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
        updateRankings(player1, player2, goals1, goals2, matchType);
        displayRankings();
        displayMatchHistory();
    } else {
        alert("Please select both players.");
    }
    
    this.reset();
});

function resetAllRankings() {
    players.forEach(player => {
        player.rating = player.division === 1 ? 1000 : 900;
        player.goalsScored = 0;
        player.goalsConceded = 0;
        player.wins = 0;
        player.losses = 0;
        player.draws = 0;
        player.form = [];
    });
    matchHistory = [];
    displayRankings();
    displayMatchHistory();
    saveData();
}

function saveData() {
    localStorage.setItem('fifaRankingsPlayers', JSON.stringify(players));
    localStorage.setItem('fifaRankingsMatchHistory', JSON.stringify(matchHistory));
}

function loadData() {
    const savedPlayers = localStorage.getItem('fifaRankingsPlayers');
    const savedMatchHistory = localStorage.getItem('fifaRankingsMatchHistory');
    
    if (savedPlayers) {
        players = JSON.parse(savedPlayers);
    }
    
    if (savedMatchHistory) {
        matchHistory = JSON.parse(savedMatchHistory);
    }
}

function exportData() {
    const data = {
        players: players,
        matchHistory: matchHistory
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "fifa_rankings_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        players = data.players;
        matchHistory = data.matchHistory;
        saveData();
        displayRankings();
        displayMatchHistory();
    };
    reader.readAsText(file);
}

function init() {
    loadData();
    
    const player1Select = document.getElementById('player1');
    const player2Select = document.getElementById('player2');
    
    // Clear existing options
    player1Select.innerHTML = '<option value="">Select Player 1</option>';
    player2Select.innerHTML = '<option value="">Select Player 2</option>';
    
    // Populate player dropdowns
    players.forEach(player => {
        const option1 = document.createElement('option');
        option1.value = player.name;
        option1.textContent = `${player.name} (Div ${player.division})`;
        player1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = player.name;
        option2.textContent = `${player.name} (Div ${player.division})`;
        player2Select.appendChild(option2);
    });
    
    const matchContextSelect = document.getElementById('matchContext');
    matchContextSelect.innerHTML = `
        <option value="">Select Match Type</option>
        <option value="div1">Division 1 Match</option>
        <option value="div2">Division 2 Match</option>
        <option value="knockout">Knockout Tournament</option>
    `;
    
    document.getElementById('resetButton').addEventListener('click', resetAllRankings);
    document.getElementById('exportButton').addEventListener('click', exportData);
    document.getElementById('importButton').addEventListener('click', () => document.getElementById('importInput').click());
    document.getElementById('importInput').addEventListener('change', importData);
    
    displayRankings();
    displayMatchHistory();
}

init();
