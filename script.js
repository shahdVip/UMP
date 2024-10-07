document.addEventListener('DOMContentLoaded', function () {
    const loadingSpinner = document.getElementById('loading-spinner');
    const tableContainer = document.getElementById('table-container');


    loadingSpinner.style.display = 'block';
    tableContainer.style.display = 'none';


    fetch('https://randomuser.me/api/?results=10')
        .then(response => response.json())
        .then(data => {

            loadingSpinner.style.display = 'none';
            tableContainer.style.display = 'block';


            populateTable(data.results);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);


            loadingSpinner.style.display = 'none';
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('alert', 'alert-danger');
            errorMessage.textContent = 'Failed to load user data. Please try again later.';
            document.body.appendChild(errorMessage);
        });
});

function populateTable(users) {
    const tbody = document.querySelector('tbody');
    tbody.replaceChildren(); // Clear previous rows

    users.forEach(user => {
        const row = document.createElement('tr'); // Create new row

        // User
        const userCell = document.createElement('td');
        userCell.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${user.picture.thumbnail}" class="avatar" alt="Avatar">
                <div class="ms-2">
                    ${user.name.first} ${user.name.last}
                    <br><span class="text-muted">${user.login.username}</span>
                </div>
            </div>`;
        row.appendChild(userCell);

        // Created Date
        const createdCell = document.createElement('td');
        const createdDate = new Date(user.registered.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
        createdCell.textContent = createdDate;
        row.appendChild(createdCell);

        // Status
        const statusCell = document.createElement('td');
        const status = getRandomStatus(); // Generate a random status
        const statusBadge = document.createElement('span');
        statusBadge.classList.add('badge', getStatusClass(status));
        statusBadge.textContent = status;
        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        // Email
        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        // Action Buttons
        const actionCell = document.createElement('td');
        actionCell.innerHTML = `
            <button class="btn btn-custom btn-sm" aria-label="View user"><i class="bi bi-eye"></i></button>
            <button class="btn btn-custom btn-sm" aria-label="Edit user"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger btn-sm" aria-label="Delete user"><i class="bi bi-trash"></i></button>`;
        row.appendChild(actionCell);

        tbody.appendChild(row);
    });
}


function getRandomStatus() {
    const statuses = ['Active', 'Inactive', 'Banned', 'Pending'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}


function getStatusClass(status) {
    const statusClasses = {
        'Active': 'bg-success',
        'Inactive': 'bg-secondary',
        'Banned': 'bg-danger',
        'Pending': 'bg-warning'
    };
    return statusClasses[status] || 'bg-dark';
}
