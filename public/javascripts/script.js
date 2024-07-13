// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const productTableBody = document.querySelector('#product-table tbody');
    const userId = 1;  // Example user ID, replace with the actual user ID

    searchBar.addEventListener('input', () => {
        const query = searchBar.value;

        if (query.length === 0) {
            productTableBody.innerHTML = '';
            return;
        }

        axios.get(`/search?medicineName=${query}&userId=${userId}`)
            .then(response => {
                const products = response.data;
                productTableBody.innerHTML = '';

                products.forEach(product => {
                    const row = document.createElement('tr');
                    const nameCell = document.createElement('td');
                    const detailsCell = document.createElement('td');

                    nameCell.textContent = product.medicineName;
                    detailsCell.textContent = product.details;

                    row.appendChild(nameCell);
                    row.appendChild(detailsCell);
                    productTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    });
});
