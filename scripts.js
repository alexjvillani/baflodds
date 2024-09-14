document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const inputForm = document.getElementById('inputForm');
    const submitButton = document.getElementById('submitButton');
    const cancelButton = document.getElementById('cancelButton');
    let editIndex = null;

    // Populate table with data from localStorage
    function populateTable() {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        tableBody.innerHTML = ''; // Clear existing table content

        players.forEach((player, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.name}</td>
                <td>${player.wins}</td>
                <td>${player.losses}</td>
                <td>${player.draws}</td>
                <td>${player.goalDif}</td>
                <td>${player.div1Wins}</td>
                <td>${player.div2Wins}</td>
                <td>${player.div1Losses}</td>
                <td>${player.div2Losses}</td>
                <td>${player.goalsRatingDiv1}</td>
                <td>${player.goalsRatingDiv2}</td>
                <td>${player.goalRating}</td>
                <td>${player.rating}</td>
                <td>
                    <button onclick="editPlayer(${index})">Edit</button>
                    <button onclick="deletePlayer(${index})">Delete</button>
                    <button onclick="clearEntry(${index})">Clear</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Edit player
    window.editPlayer = function(index) {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const player = players[index];

        if (player) {
            document.getElementById('playerName').value = player.name || '';
            document.getElementById('wins').value = player.wins || 0;
            document.getElementById('losses').value = player.losses || 0;
            document.getElementById('draws').value = player.draws || 0;
            document.getElementById('goalDif').value = player.goalDif || 0;
            document.getElementById('div1Wins').value = player.div1Wins || 0;
            document.getElementById('div2Wins').value = player.div2Wins || 0;
            document.getElementById('div1Losses').value = player.div1Losses || 0;
            document.getElementById('div2Losses').value = player.div2Losses || 0;
            document.getElementById('goalsRatingDiv1').value = player.goalsRatingDiv1 || 0;
            document.getElementById('goalsRatingDiv2').value = player.goalsRatingDiv2 || 0;
            document.getElementById('goalRating').value = player.goalRating || 0;
            document.getElementById('rating').value = player.rating || 0;

            editIndex = index;
            submitButton.textContent = 'Update Entry'; // Change button text for update
            cancelButton.style.display = 'inline'; // Show cancel button
        }
    }

    // Delete player
    window.deletePlayer = function(index) {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        players.splice(index, 1);
        localStorage.setItem('players', JSON.stringify(players));
        populateTable();
    }

    // Clear entry
    window.clearEntry = function(index) {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const player = players[index];
        if (player) {
            player.wins = 0;
            player.losses = 0;
            player.draws = 0;
            player.goalDif = 0;
            player.div1Wins = 0;
            player.div2Wins = 0;
            player.div1Losses = 0;
            player.div2Losses = 0;
            player.goalsRatingDiv1 = 0;
            player.goalsRatingDiv2 = 0;
            player.goalRating = 0;
            player.rating = 0;
            localStorage.setItem('players', JSON.stringify(players));
            populateTable();
        }
    }

    // Handle form submission
    inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const newPlayer = {
            name: document.getElementById('playerName').value,
            wins: parseInt(document.getElementById('wins').value, 10) || 0,
            losses: parseInt(document.getElementById('losses').value, 10) || 0,
            draws: parseInt(document.getElementById('draws').value, 10) || 0,
            goalDif: parseInt(document.getElementById('goalDif').value, 10) || 0,
            div1Wins: parseInt(document.getElementById('div1Wins').value, 10) || 0,
            div2Wins: parseInt(document.getElementById('div2Wins').value, 10) || 0,
            div1Losses: parseInt(document.getElementById('div1Losses').value, 10) || 0,
            div2Losses: parseInt(document.getElementById('div2Losses').value, 10) || 0,
            goalsRatingDiv1: parseInt(document.getElementById('goalsRatingDiv1').value, 10) || 0,
            goalsRatingDiv2: parseInt(document.getElementById('goalsRatingDiv2').value, 10) || 0,
            goalRating: parseInt(document.getElementById('goalRating').value, 10) || 0,
            rating: parseInt(document.getElementById('rating').value, 10) || 0
        };

        if (editIndex !== null) {
            players[editIndex] = newPlayer;
            editIndex = null; // Reset edit index
            submitButton.textContent = 'Add Entry'; // Reset button text
            cancelButton.style.display = 'none'; // Hide cancel button
        } else {
            players.push(newPlayer);
        }

        localStorage.setItem('players', JSON.stringify(players));
        populateTable();
        inputForm.reset();
    });

    cancelButton.addEventListener('click', () => {
        editIndex = null; // Reset edit index
        submitButton.textContent = 'Add Entry'; // Reset button text
        cancelButton.style.display = 'none'; // Hide cancel button
        inputForm.reset();
    });

    populateTable();
});
