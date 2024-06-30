const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

// Define route
app.get('/api/define', async (req, res) => {
  const word = req.query.word;
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const definition = response.data[0].meanings[0].definitions[0].definition;
    res.json({ definition });
  } catch (error) {
    res.status(500).json({ error: 'Definition not found' });
  }
});

// Serve static files from React app
app.use(express.static('https://crosswordapp-client.onrender.com/'));


// Serve React app
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '.https://crosswordapp-client.onrender.com' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
