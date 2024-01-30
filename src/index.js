require('dotenv').config()



document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const query = this.query.value;
    fetch(`/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const table = createTable(data);
            document.getElementById('results').innerHTML = table;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function createTable(data) {
    let table = '<table>';

    // Assuming 'data' is an array of objects, and you know the keys.
    // Add table headers
    table += '<thead><tr>';
    for (let key in data[0]) {
        table += `<th>${key}</th>`;
    }
    table += '</tr></thead>';

    // Add table rows
    table += '<tbody>';
    data.forEach(item => {
        table += '<tr>';
        for (let key in item) {
            table += `<td>${item[key]}</td>`;
        }
        table += '</tr>';
    });
    table += '</tbody>';

    table += '</table>';
    return table;
}

  


// console.log(process.env.AZURE_API_PASSWORD);