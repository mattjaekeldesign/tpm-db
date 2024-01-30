const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_ENDPOINT = `${process.env.AZURE_API_URL}`;
const USERNAME = `${process.env.AZURE_API_USERNAME}`;
const PASSWORD = `${process.env.AZURE_API_PASSWORD}`;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'https://tpmexchange.webflow.io'
}));

app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const response = await axios.get(`${API_ENDPOINT}/search?q=${query}`, {
            auth: {
                username: USERNAME,
                password: PASSWORD
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
