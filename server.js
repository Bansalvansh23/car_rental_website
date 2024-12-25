const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername',
    password: 'yourPassword',
    database: 'formDataDB'
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Form Data:', formData);

    // Prepare SQL query
    const sql = 'INSERT INTO formData (location, pickup_date, return_date) VALUES (?, ?, ?)';

    // Execute SQL query
    connection.query(sql, [formData.location, formData.pickup_date, formData.return_date], (err, result) => {
        if (err) throw err;
        console.log('Data inserted into MySQL database:', result);

        res.send('Form submitted successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
