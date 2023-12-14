const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost', // or your database host
  user     : 'root',
  password : '1Metagross?',
  database : 'UNI'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

module.exports = connection;


// Optionally, you can test a simple query here
connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    // Close the connection when done
    connection.end();
  });