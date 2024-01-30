const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_ENDPOINT = 'https://nam04.safelinks.protection.outlook.com/?url=https%3A%2F%2Fapitpm.azurewebsites.net%2Fswagger%2Findex.html&data=05%7C02%7Cmjaekel%40Maintech.com%7C9d03f28133604fe8d14508dc0c7e3b59%7Ce46f931e83c94e84a13a55e173ea6039%7C0%7C0%7C638398984004150041%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=pArlv9XAtqcLuhD8geQODLeD2sgu0Rto9%2BUs6peE7Bc%3D&reserved=0';
const USERNAME = `${process.env.AZURE_API_USERNAME}`;
const PASSWORD = `${process.env.AZURE_API_PASSWORD}`;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
