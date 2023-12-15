const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Import blockchain interaction functions if needed
// const blockchain = require('./server/blockchain');

const app = express();
const port = 3000; // You can use process.env.PORT to set port dynamically

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Body parser middleware to handle JSON data
app.use(bodyParser.json());

// REST API endpoint example (if you need server-side interaction with the blockchain)
app.post('/api/getStudentData', async (req, res) => {
    try {
        const { studentId } = req.body;
        
        // Call your blockchain interaction function here
        // const data = await blockchain.getStudentData(studentId);
        
        // For now, we'll just return the studentId received
        // Replace this with the actual blockchain call result
        res.json({ studentId, data: 'Blockchain data here...' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
