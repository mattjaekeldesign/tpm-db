require('dotenv').config()

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const query = this.query.value;
    fetch(`/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('results').innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
  


// console.log(process.env.AZURE_API_PASSWORD);