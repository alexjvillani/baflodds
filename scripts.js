document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const inputForm = document.getElementById('inputForm');
    const submitButton = document.getElementById('submitButton');
    const cancelButton = document.getElementById('cancelButton');
    let editIndex = null;

    // Function to populate the table with data from localStorage
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

        // Sort by rating descending
        sortTableByRating();
    }

    // Function to sort the table rows by rating in descending order
    function sortTableByRating() {
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        rows.sort((rowA, rowB) => {
            const ratingA = parseInt(rowA.children[12].textContent, 10);
            const ratingB = parseInt(rowB.children[12].textContent, 10);
            return ratingB - ratingA; // Sort descending
        });
        rows.forEach(row => tableBody.appendChild(row)); // Append rows in sorted order
    }

    function initializeData() {
        const players = JSON.parse(localStorage.getItem('players'));

        // Only initialize data if localStorage is empty
        if (!players || players.length === 0) {
            const initialPlayers = [
            { name: 'Sam', wins: 10, losses: 1, draws: 0, goalDif: 30, div1Wins: 10, div2Wins: 0, div1Losses: 1, div2Losses: 0, goalsRatingDiv1: 28, goalsRatingDiv2: 0, goalRating: 28, rating: 279 },
            { name: 'Dan', wins: 8, losses: 2, draws: 0, goalDif: 24, div1Wins: 3, div2Wins: 5, div1Losses: 1, div2Losses: 1, goalsRatingDiv1: 30, goalsRatingDiv2: 17, goalRating: 47, rating: 246 },
            { name: 'Macca', wins: 9, losses: 1, draws: 1, goalDif: 18, div1Wins: 9, div2Wins: 0, div1Losses: 1, div2Losses: 0, goalsRatingDiv1: 22, goalsRatingDiv2: 0, goalRating: 22, rating: 214 },
            { name: 'Lei', wins: 4, losses: 3, draws: 1, goalDif: 18, div1Wins: 5, div2Wins: 0, div1Losses: 3, div2Losses: 0, goalsRatingDiv1: 33, goalsRatingDiv2: 0, goalRating: 33, rating: 197 },
            { name: 'Kelvin', wins: 4, losses: 3, draws: 1, goalDif: 6, div1Wins: 4, div2Wins: 0, div1Losses: 3, div2Losses: 0, goalsRatingDiv1: 18, goalsRatingDiv2: 0, goalRating: 18, rating: 109 },
            { name: 'Alex', wins: 5, losses: 5, draws: 0, goalDif: 3, div1Wins: 5, div2Wins: 0, div1Losses: 5, div2Losses: 0, goalsRatingDiv1: 19, goalsRatingDiv2: 0, goalRating: 19, rating: 77 },
            { name: 'Oscar', wins: 1, losses: 1, draws: 1, goalDif: -3, div1Wins: 0, div2Wins: 0, div1Losses: 0, div2Losses: 0, goalsRatingDiv1: 6, goalsRatingDiv2: 6, goalRating: 12, rating: 32 },
            { name: 'Lachlan', wins: 4, losses: 4, draws: 0, goalDif: -4, div1Wins: 0, div2Wins: 4, div1Losses: 1, div2Losses: 3, goalsRatingDiv1: 0, goalsRatingDiv2: 2, goalRating: 2, rating: 19 },
            { name: 'Regi', wins: 3, losses: 2, draws: 0, goalDif: 3, div1Wins: 0, div2Wins: 3, div1Losses: 0, div2Losses: 2, goalsRatingDiv1: 0, goalsRatingDiv2: 3, goalRating: 3, rating: 17 },
            { name: 'Jude', wins: 2, losses: 5, draws: 0, goalDif: 0, div1Wins: 0, div2Wins: 1, div1Losses: 0, div2Losses: 4, goalsRatingDiv1: 0, goalsRatingDiv2: 5, goalRating: 5, rating: 6 },
            { name: 'Rav', wins: 4, losses: 3, draws: 0, goalDif: -5, div1Wins: 0, div2Wins: 4, div1Losses: 1, div2Losses: 1, goalsRatingDiv1: 2, goalsRatingDiv2: 1, goalRating: 3, rating: 6 },
            { name: 'Yasin', wins: 0, losses: 1, draws: 0, goalDif: -4, div1Wins: 0, div2Wins: 0, div1Losses: 0, div2Losses: 0, goalsRatingDiv1: 0, goalsRatingDiv2: 0, goalRating: 0, rating: -5 },
            { name: 'Justin', wins: 0, losses: 1, draws: 0, goalDif: -6, div1Wins: 0, div2Wins: 0, div1Losses: 0, div2Losses: 0, goalsRatingDiv1: 0, goalsRatingDiv2: 0, goalRating: 0, rating: -13 },
            { name: 'John', wins: 0, losses: 3, draws: 0, goalDif: -14, div1Wins: 0, div2Wins: 0, div1Losses: 2, div2Losses: 0, goalsRatingDiv1: 2, goalsRatingDiv2: 3, goalRating: 5, rating: -15 },
            { name: 'Pat', wins: 2, losses: 4, draws: 0, goalDif: -12, div1Wins: 0, div2Wins: 2, div1Losses: 0, div2Losses: 3, goalsRatingDiv1: 0, goalsRatingDiv2: -5, goalRating: -5, rating: -16 },
            { name: 'Dru', wins: 1, losses: 6, draws: 0, goalDif: -11, div1Wins: 0, div2Wins: 1, div1Losses: 0, div2Losses: 5, goalsRatingDiv1: 0, goalsRatingDiv2: -6, goalRating: -6, rating: -31 },
            { name: 'David', wins: 1, losses: 6, draws: 1, goalDif: -19, div1Wins: 1, div2Wins: 0, div1Losses: 6, div2Losses: 0, goalsRatingDiv1: -16, goalsRatingDiv2: 2, goalRating: -14, rating: -63 },
            { name: 'Elliot', wins: 1, losses: 8, draws: 1, goalDif: -24, div1Wins: 1, div2Wins: 0, div1Losses: 7, div2Losses: 1, goalsRatingDiv1: -21, goalsRatingDiv2: 3, goalRating: -18, rating: -134 }
        ];
        localStorage.setItem('players', JSON.stringify(initialPlayers));
    }
    }
     // Function to add a player to the table and localStorage
     function addPlayer(player) {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        players.push(player);
        localStorage.setItem('players', JSON.stringify(players));
        populateTable(); // Update table after adding player
    }

    // Function to edit a player's details
    function editPlayer(index) {
        const players = JSON.parse(localStorage.getItem('players'));
        const player = players[index];
        document.getElementById('playerName').value = player.name;
        document.getElementById('wins').value = player.wins;
        document.getElementById('losses').value = player.losses;
        document.getElementById('draws').value = player.draws;
        document.getElementById('goalDif').value = player.goalDif;
        document.getElementById('div1Wins').value = player.div1Wins;
        document.getElementById('div2Wins').value = player.div2Wins;
        document.getElementById('div1Losses').value = player.div1Losses;
        document.getElementById('div2Losses').value = player.div2Losses;
        document.getElementById('goalsRatingDiv1').value = player.goalsRatingDiv1;
        document.getElementById('goalsRatingDiv2').value = player.goalsRatingDiv2;
        document.getElementById('goalRating').value = player.goalRating;
        document.getElementById('rating').value = player.rating;
        editIndex = index;
        submitButton.textContent = 'Update Entry';
        cancelButton.style.display = 'inline';
    }

    // Function to delete a player
    function deletePlayer(index) {
        let players = JSON.parse(localStorage.getItem('players'));
        players = players.filter((_, i) => i !== index);
        localStorage.setItem('players', JSON.stringify(players));
        populateTable(); // Update table after deletion
    }

    // Function to clear a player's entry
    function clearEntry(index) {
        let players = JSON.parse(localStorage.getItem('players'));
        players[index] = { ...players[index], rating: 0, goalRating: 0, goalsRatingDiv1: 0, goalsRatingDiv2: 0 };
        localStorage.setItem('players', JSON.stringify(players));
        populateTable(); // Update table after clearing entry
    }

    // Handle form submission for adding or updating a player
    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const player = {
            name: document.getElementById('playerName').value,
            wins: parseInt(document.getElementById('wins').value, 10),
            losses: parseInt(document.getElementById('losses').value, 10),
            draws: parseInt(document.getElementById('draws').value, 10),
            goalDif: parseInt(document.getElementById('goalDif').value, 10),
            div1Wins: parseInt(document.getElementById('div1Wins').value, 10),
            div2Wins: parseInt(document.getElementById('div2Wins').value, 10),
            div1Losses: parseInt(document.getElementById('div1Losses').value, 10),
            div2Losses: parseInt(document.getElementById('div2Losses').value, 10),
            goalsRatingDiv1: parseInt(document.getElementById('goalsRatingDiv1').value, 10),
            goalsRatingDiv2: parseInt(document.getElementById('goalsRatingDiv2').value, 10),
            goalRating: parseInt(document.getElementById('goalRating').value, 10),
            rating: parseInt(document.getElementById('rating').value, 10)
        };

        if (editIndex !== null) {
            let players = JSON.parse(localStorage.getItem('players'));
            players[editIndex] = player;
            localStorage.setItem('players', JSON.stringify(players));
            editIndex = null;
            submitButton.textContent = 'Add Entry';
            cancelButton.style.display = 'none';
        } else {
            addPlayer(player);
        }

        inputForm.reset();
        populateTable();
    });

    // Handle cancel button click
    cancelButton.addEventListener('click', () => {
        editIndex = null;
        submitButton.textContent = 'Add Entry';
        cancelButton.style.display = 'none';
        inputForm.reset();
    });

    initializeData(); // Initialize pre-populated data only if necessary
    populateTable(); // Populate table with data from localStorage
});