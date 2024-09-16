// Function to populate player dropdowns
function populatePlayerDropdowns() {
    const player1Select = document.getElementById('player1Select');
    const player2Select = document.getElementById('player2Select');

    // Retrieve player data from localStorage
    const players = JSON.parse(localStorage.getItem('players')) || [];

    // Clear existing options
    player1Select.innerHTML = '<option value="">Select Player 1</option>';
    player2Select.innerHTML = '<option value="">Select Player 2</option>';

    // Populate dropdowns with player names
    players.forEach(player => {
        const option1 = document.createElement('option');
        option1.value = player.name;
        option1.textContent = player.name;
        player1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = player.name;
        option2.textContent = player.name;
        player2Select.appendChild(option2);
    });
}

// Handle form submission
document.getElementById('matchForm').addEventListener('submit', event => {
    event.preventDefault();

    // Collect form data
    const player1 = document.getElementById('player1Select').value;
    const player2 = document.getElementById('player2Select').value;
    const player1Score = parseInt(document.getElementById('player1Score').value, 10) || 0;
    const player2Score = parseInt(document.getElementById('player2Score').value, 10) || 0;
    const player1Division = document.getElementById('player1Division').value;
    const player2Division = document.getElementById('player2Division').value;

    // Validate form data
    if (!player1 || !player2 || player1 === player2) {
        alert('Please select different players.');
        return;
    }

    // Retrieve player data from localStorage
    const players = JSON.parse(localStorage.getItem('players')) || [];

    // Find player objects
    const player1Obj = players.find(player => player.name === player1);
    const player2Obj = players.find(player => player.name === player2);

    if (!player1Obj || !player2Obj) {
        alert('Selected players not found.');
        return;
    }

    // Calculate goal difference
    const goalDifference = player1Score - player2Score;

    // Initialize goal ratings
    player1Obj.goalsRatingDiv1 = player1Obj.goalsRatingDiv1 || 0;
    player1Obj.goalsRatingDiv2 = player1Obj.goalsRatingDiv2 || 0;
    player2Obj.goalsRatingDiv1 = player2Obj.goalsRatingDiv1 || 0;
    player2Obj.goalsRatingDiv2 = player2Obj.goalsRatingDiv2 || 0;

    // Update player data based on match result
    if (player1Score > player2Score) {
        // Player 1 wins
        player1Obj.wins += 1;
        player2Obj.losses += 1;

        if (player1Division === 'Div 1') player1Obj.div1Wins += 1;
        if (player2Division === 'Div 1') player2Obj.div1Losses += 1;
        if (player1Division === 'Div 2') player1Obj.div2Wins += 1; // Handle Div 2 Wins
        if (player2Division === 'Div 2') player2Obj.div2Losses += 1; // Handle Div 2 Losses

        player1Obj.rating += 15;
        player2Obj.rating -= 5;
    } else if (player1Score < player2Score) {
        // Player 2 wins
        player2Obj.wins += 1;
        player1Obj.losses += 1;

        if (player2Division === 'Div 1') player2Obj.div1Wins += 1;
        if (player1Division === 'Div 1') player1Obj.div1Losses += 1;
        if (player2Division === 'Div 2') player2Obj.div2Wins += 1; // Handle Div 2 Wins
        if (player1Division === 'Div 2') player1Obj.div2Losses += 1; // Handle Div 2 Losses

        player2Obj.rating += 15;
        player1Obj.rating -= 5;
    } else {
        // Draw
        player1Obj.draws += 1;
        player2Obj.draws += 1;
    }

    // Goal-based adjustments
    if (player1Division === 'Div 2' && player2Division === 'Div 1') {
        player1Obj.goalsRatingDiv2 += player1Score * 3;
        player1Obj.rating += player1Score * 3;
    } else if (player1Division === 'Div 1' && player2Division === 'Div 1') {
        player1Obj.goalsRatingDiv1 += player1Score * 2;
        if (player2Score >= 3) {
            player1Obj.rating -= (player2Score - 2) * 2;
        }
    } else if (player1Division === 'Div 2' && player2Division === 'Div 2') {
        player1Obj.goalsRatingDiv2 += player1Score;
        if (player2Score >= 3) {
            player1Obj.rating -= (player2Score - 2) * 2;
        }
    }

    // Update opponent's goal-based adjustments
    if (player2Division === 'Div 2' && player1Division === 'Div 1') {
        player2Obj.goalsRatingDiv2 += player2Score * 3;
        player2Obj.rating += player2Score * 3;
    } else if (player2Division === 'Div 1' && player1Division === 'Div 1') {
        player2Obj.goalsRatingDiv1 += player2Score * 2;
        if (player1Score >= 3) {
            player2Obj.rating -= (player1Score - 2) * 2;
        }
    } else if (player2Division === 'Div 2' && player1Division === 'Div 2') {
        player2Obj.goalsRatingDiv2 += player2Score;
        if (player1Score >= 3) {
            player2Obj.rating -= (player1Score - 2) * 2;
        }
    }

    // Update goal difference
    player1Obj.goalDif += goalDifference;
    player2Obj.goalDif -= goalDifference;

    // Calculate Goal Rating and add to Rating
    player1Obj.goalRating = player1Obj.goalsRatingDiv1 + player1Obj.goalsRatingDiv2;
    player2Obj.goalRating = player2Obj.goalsRatingDiv1 + player2Obj.goalsRatingDiv2;

    player1Obj.rating += player1Obj.goalRating;
    player2Obj.rating += player2Obj.goalRating;

    // Save updated players to localStorage
    localStorage.setItem('players', JSON.stringify(players));

    // Redirect back to index.html
    window.location.href = 'index.html';
});

// Initialize page
window.addEventListener('DOMContentLoaded', () => {
    populatePlayerDropdowns();
});
