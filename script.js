document.addEventListener('DOMContentLoaded', function () {

    fetch('users.json')
        .then(response => response.json())//promise->json format
        .then(data => populateTable(data))
        .catch(error => console.error('Error fetching the data:', error));
});

function populateTable(users) {
    const tbody = document.querySelector('tbody');


    tbody.innerHTML = ''; // prevent duplicates

    users.forEach(user => {

        const row = document.createElement('tr'); //new row

        //User
        const userCell = document.createElement('td');
        userCell.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${user.avatar}" class="avatar" alt="Avatar">
                <div class="ms-2">
                    ${user.name}
                    <br><span class="text-muted">${user.role}</span>
                </div>
            </div>`;
        row.appendChild(userCell);

        //Created
        const createdCell = document.createElement('td');
        createdCell.textContent = user.created;
        row.appendChild(createdCell);

        //Status
        const statusCell = document.createElement('td');
        const statusBadge = document.createElement('span');
        statusBadge.classList.add('badge');
        if (user.status === 'Active') {
            statusBadge.classList.add('bg-success');
        } else if (user.status === 'Inactive') {
            statusBadge.classList.add('bg-secondary');
        } else if (user.status === 'Banned') {
            statusBadge.classList.add('bg-danger');
        } else if (user.status === 'Pending') {
            statusBadge.classList.add('bg-warning');
        }
        statusBadge.textContent = user.status;
        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        //Email
        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        //Buttons
        const actionCell = document.createElement('td');
        actionCell.innerHTML = `
            <button class="btn btn-custom btn-sm"><i class="bi bi-eye"></i></button>
            <button class="btn btn-custom btn-sm"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>`;
        row.appendChild(actionCell);


        tbody.appendChild(row);
    });
}
