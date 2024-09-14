document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const storedData = localStorage.getItem('formData');

    if (storedData) {
        const data = JSON.parse(storedData);

        // Create a new row and populate it with data
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.player1}</td>
            <td>${data.player1Score}</td>
            <td>${data.player2Score}</td>
            <td>${data.player2Division}</td>
            <td>${data.player2}</td>
            <td>${data.points.player1}</td>
            <td>${data.points.player2}</td>
            <td></td> <!-- Placeholder for other columns -->
            <td></td> <!-- Placeholder for other columns -->
            <td></td> <!-- Placeholder for other columns -->
            <td></td> <!-- Placeholder for other columns -->
            <td></td> <!-- Placeholder for other columns -->
            <td>${data.points.player1}</td> <!-- Example for rating column -->
            <td><button class="edit-btn">Edit</button></td>
        `;

        // Add the row to the table body
        tableBody.appendChild(row);

        // Remove the data from local storage after adding it to the table
        localStorage.removeItem('formData');

        // Attach event listener to the edit button
        row.querySelector('.edit-btn').addEventListener('click', function() {
            const index = Array.from(tableBody.children).indexOf(row);
            editPlayer(index); // Call the editPlayer function with the row index
        });
    }
});
