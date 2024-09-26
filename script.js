document.addEventListener('DOMContentLoaded', function () {
    fetch('users.json')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => {
            console.error('Error fetching the data:', error);
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('alert', 'alert-danger');
            errorMessage.textContent = 'Failed to load user data. Please try again later.';
            document.body.appendChild(errorMessage);
        });
});

function populateTable(users) {
    const tbody = document.querySelector('tbody');
    tbody.replaceChildren(); // Clear previous rows

    const statusClasses = {
        'Active': 'bg-success',
        'Inactive': 'bg-secondary',
        'Banned': 'bg-danger',
        'Pending': 'bg-warning'
    };

    users.forEach(user => {
        const row = document.createElement('tr'); // Create new row

        // User
        const userCell = document.createElement('td');
        userCell.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${user.avatar}" class="avatar" alt="Avatar" onerror="this.src='default-avatar.png'">
                <div class="ms-2">
                    ${user.name}
                    <br><span class="text-muted">${user.role}</span>
                </div>
            </div>`;
        row.appendChild(userCell);

        // Created Date
        const createdCell = document.createElement('td');
        const createdDate = new Date(user.created).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
        createdCell.textContent = createdDate;
        row.appendChild(createdCell);

        // Status
        const statusCell = document.createElement('td');
        const statusBadge = document.createElement('span');
        statusBadge.classList.add('badge', statusClasses[user.status] || 'bg-dark');
        statusBadge.textContent = user.status;
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
